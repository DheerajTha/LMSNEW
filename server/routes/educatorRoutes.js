import express from 'express'

import { addCourse, updateRoleEducator } from '../controllers/educatorController.js'
import upload from '../configs/multer.js'
import { protectEducator } from '../middlewares/authMiddleware.js'
import { requireAuth } from '@clerk/express'

const educatorRouter = express.Router()

// Debug middleware to log form fields
const debugFormData = (req, res, next) => {
  console.log('=== DEBUG FORM DATA ===');
  console.log('Content-Type:', req.headers['content-type']);
  console.log('Raw body available:', !!req.body);
  next();
};

educatorRouter.get('/update-role', express.json(), updateRoleEducator)
educatorRouter.post(
  '/add-course',
  requireAuth(),
  debugFormData,
  upload.any(),  
  protectEducator,
  addCourse
);

export default educatorRouter;