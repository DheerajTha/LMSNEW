import { Webhook } from "svix";
import User from "../models/user.js";
import Stripe from "stripe";
import { Purchase } from "../models/purchase.js";
import { use } from "react";
import Course from "../models/course.js";

export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })
        
        const {data, type} = req.body

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    imageUrl: data.image_url
                }
                await User.create(userData)
                res.json({})
                break;
            }

            case 'user.updated': {
                const userData = {
                    email:data.email_address[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    imageUrl: data.image_url
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
                
                
        
            default:
                break;
        }

    } catch (error) {
        res.json({succes : false, message: error.message})
    }
}


// stripe weebhooks 

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req,res)=>{
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = Stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
        
    } catch (error) {
        res.status(400).json({
            success:false,
            message:error.message
        })
        
    }

    // handle the event here 

    switch(event.type){
        case 'peyment_intent.succeeded':{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const session = await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId
            })

            const {purchaseId} = session.data[0].metadata;

            const purchaseData = await Purchase.findById(purchaseId);
            const userData = await User.findById(purchaseData.userId);
            const courseData = await Course.findById(purchaseData.courseId.toString());

            courseData.enrolledStudents.push(userData);
            await courseData.save();

            userData.enrolledCourses.push(courseData._id);
            await userData.save();

            purchaseData.status = 'completed'
            await purchaseData.save();


            break;
        }
        case 'payment_intent.payment_failed':{
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const session = await stripeInstance.checkout.sessions.list({
                payment_intent:paymentIntentId
            })

            const {purchaseId} = session.data[0].metadata;

            const purchaseData = await Purchase.findById(purchaseId)

            purchaseData.status = 'failed';
            await purchaseData.save();

            break;

        }         

        default:{
            console.log(`Unhandled Event Type ${event.type}`)
        }
    }

    res.json({received:true})

 

}

