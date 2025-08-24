import User from "../models/user.js";
import { Purchase } from "../models/purchase.js";
import Stripe from 'stripe';
import Course from "../models/course.js";




export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// user enroll with lec links

export const userEnrolledCourse = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userData = await User.findById(userId).populate("enrolledCourses");

    res.json({ success: true, enrolledCourses: userData.enrolledCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const purchaseCourse = async(req,res)=>{
    try {
        const {courseId} = req.body;
        const  {origin} = req.headers;
        const userId = req.auth.userId;
        const userData = await User.findById(userId);
        const courseData = await Course.findById(courseId);

        if(!userData  || !courseData ){
            return res.json({success:false,message:"Data  not found"})
        }
        
        const purchaseData = {
            userId,
            courseId: courseData._id,
            amount:(courseData.coursePrice -courseData.discount * courseData.coursePrice / 100 ).toFixed(2),
        }   

        const newpurchase = await Purchase.create(purchaseData);

        // stirpe gatewa

        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

        const currency =  process.env.CURRENCY.toLowerCase();

        // creating line item start 

        const line_item = [{
          price_data: {
            currency : currency ,
            product_data:{
              name: courseData.courseTitle,
            },
            unit_amount: Math.floor(newpurchase.amount) * 100
          },
          quantity:1



        }]

        const session = await stripeInstance.checkout.sessions.create({
          success_url:`${origin}/loading/my-enrollments`,
          cancel_url:`${origin}/`,
          line_items:line_item,
          mode:'payment',
          metadata: {
            purchaseId: newpurchase._id.toString(),
          }
        }
        )

        res.json({success:true, session_url:session.url })
        
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}