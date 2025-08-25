import express from 'express'
import { getUserCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userEnrolledCourse } from '../controllers/userController.js'


const userRouter = express.Router()


userRouter.get("/data",  getUserData)
userRouter.get("/enrolled-Course",  userEnrolledCourse)
userRouter.post("/purchase",  purchaseCourse)

userRouter.post('/update-course-progress', updateUserCourseProgress)
userRouter.post('/get-user-course-progress', getUserCourseProgress)



export default userRouter;