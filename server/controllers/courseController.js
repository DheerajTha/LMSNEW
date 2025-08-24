import Course from "../models/course.js";



// get all course 


export const getAllCourse = async (req, res) => {

    try {
        
    let courses = await Course.find({isPublished: true}).select([
        '-courseContent' , '-enrolledStudents']).populate({path: 'educator'});

        res.json({ success : true ,courses })
    } catch (error) {
        
        res.json({success:false,message:error.message})
    }
}

//get single course 

export const getCourseId = async( req, res) =>{
    const {id} = req.params

    try {
        const courseData = await Course.findById(id).populate({path: 'educator' })

        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if(!lecture.isPreviewFree){
                    lecture.lectureUrl = ""; 
                }
            } )
        })


        res.json({success:true, courseData})
         }
    catch (error) {
        
        res.json({success:false,message:error.message})
    }
}

