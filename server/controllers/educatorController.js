import { clerkClient } from "@clerk/express";
import { v2 as cloudinary } from "cloudinary";
import Course from "../models/course.js";
import { Purchase } from "../models/purchase.js";

export const updateRoleEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    });
    res.json({ success: true, message: "You Can Published course now" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Add new course

export const addCourse = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);
    console.log(
      "All files received:",
      req.files?.map((f) => ({
        fieldname: f.fieldname,
        originalname: f.originalname,
      }))
    );

    const { courseData } = req.body;
    const imagesFile = req.files?.find(
      (file) => file.fieldname === "thumbnail" || file.fieldname === "image"
    );
    const educatorId = req.auth.userId;

    if (!imagesFile) {
      return res.json({ success: false, message: "Thumbnail Not Attached" });
    }

    if (!courseData) {
      return res.json({ success: false, message: "Course data is required" });
    }

    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educator = educatorId;

    console.log("Parsed course data:", parsedCourseData);

    const newCourse = await Course.create(parsedCourseData);
    const imageUpload = await cloudinary.uploader.upload(imagesFile.path);
    newCourse.courseThumbnail = imageUpload.secure_url;
    await newCourse.save();

    res.json({
      success: true,
      message: "Course Added Successfully",
      courseId: newCourse._id,
    });
  } catch (error) {
    console.error("Error in addCourse:", error);
    res.json({ success: false, message: error.message });
  }
};

// get educator course

export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (error) {

    res.json({ success: false, message: error.message });
    console.log(error);

  }
};


// get educator dashboard data (total earining , total students enrolled, no of course)


export const educatorDashboard = async (req,res) => {
    
    try {
        const educator = req.auth.userId;
        const courses = await Course.find({educator});
        const totalCourse = courses.length;

        const courseIds = courses.map((course)=> course._id);

        const purchases = await Purchase.find({
            courseId : {$in : courseIds},
            status : 'Completed'
          });
        
          const totalEarning = purchases.reduce((sum,purchase)=> sum + purchase.amount,0);

          const enrolledStudentsData = [];

          for (const course of courses){
              const students = await User.find(
                {_id : {$in : course.enrolledStudents}
              }, 'name imagesUrl' );

              students.forEach(student => {
                enrolledStudentsData.push({
                  courseTitle: course.courseTitle,
                  student
                })
              } )
          }


          res.json({success:true, dashboardData: {
            totalEarning, enrolledStudentsData, totalCourse
          } });

    } catch (error) {
      res.json({success:false,message:error.message});
      console.log(error);
        
    }
        
}


export const getEnrolledStudentsData = async(req,res)=>{
  try {
    
    const educator = req.auth.userId;
    const courses = await Course.find({educator});
    const courseIds = courses.map((course)=> course._id);

    const purchase  = await Purchase.find({
      courseId : {$in : courseIds},
      status : 'Completed'
    }).populate('userId',' name imagesUrl').populate('courseId', 'courseTitle');

    const enrolledStudentsData = purchases.map(purchase=> ({
      courseTitle : purchase.courseId.courseTitle,
      student : purchase.userId,
      purchaseData : purchase.createdAt
    })); 

    res.json({success:true,enrolledStudents});

  } catch (error) {
    
    res.json({success:false,message:error.message});
      console.log(error);
  }
}