import {clerkClient} from '@clerk/express'
import {v2 as cloudinary } from "cloudinary"
import Course from '../models/course.js'


export const updateRoleEducator = async (req,res) =>{
    try {
        
        const userId = req.auth.userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata:{
                role: 'educator'
            }
        })
        res.json({success: true, message:"You Can Published course now" })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//Add new course


export const addCourse = async (req, res) => {
    try {
        const {courseData} = req.body
        const imagesFile = req.file
        const educatorId = req.auth.userId

        if(!imagesFile){
            return res.json({success: false, message: "Thumnail Not Atteched"})
        }
        const paredCourseData = await JSON.parse(courseData)
        paredCourseData.educator = educatorId
        const newCourse =  await Course.create(paredCourseData)
        const imageUpload = await cloudinary.uploader.upload(imagesFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url
        await newCourse.save()

        res.json({success: true, message: 'Course Added'})

    } catch (error) {

        res.json({success: false, message: error.message})
    }
}