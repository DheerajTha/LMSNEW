import express from 'express'

import { addCourse, updateRoleEducator } from '../controllers/educatorController.js'
import upload from '../configs/multer.js'
import { protectEducator } from '../middlewares/authMiddleware.js'

const educatorRouter = express.Router()

educatorRouter.get('/update-role', updateRoleEducator)
educatorRouter.post(
  '/add-course',
  upload.single('thumbnail'),  
  protectEducator,
  addCourse
);

export default educatorRouter;