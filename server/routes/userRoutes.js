import express from 'express'
import { getUserData, userEnrolledCourse } from '../controllers/userController.js'


const userRouter = express.Router()


userRouter.get("/data",  getUserData)
userRouter.get("/enrolled-Course",  userEnrolledCourse)


export default userRouter;