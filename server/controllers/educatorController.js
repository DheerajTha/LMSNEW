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
        console.log('Request body:', req.body);
        console.log('Request files:', req.files);
        console.log('All files received:', req.files?.map(f => ({ fieldname: f.fieldname, 
        originalname: f.originalname })));
        
        const {courseData} = req.body
        const imagesFile = req.files?.find(file => file.fieldname === 'thumbnail')
        const educatorId = req.auth.userId

        if(!imagesFile){
            return res.json({success: false, message: "Thumbnail Not Attached"})
        }

        if(!courseData){
            return res.json({success: false, message: "Course data is required"})
        }

        const parsedCourseData = JSON.parse(courseData)
        parsedCourseData.educator = educatorId
        
        console.log('Parsed course data:', parsedCourseData);
        
        const newCourse = await Course.create(parsedCourseData)
        const imageUpload = await cloudinary.uploader.upload(imagesFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url
        await newCourse.save()
        
        res.json({success: true, message: 'Course Added Successfully', courseId: newCourse._id})

    } catch (error) {
        console.error('Error in addCourse:', error);
        res.json({success: false, message: error.message})
    }
}