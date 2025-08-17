import multer from "multer";

const storage = multer.diskStorage({})

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log('=== MULTER FILE FILTER ===');
    console.log('Field name:', file.fieldname);
    console.log('Original name:', file.originalname);
    console.log('Mimetype:', file.mimetype);
    
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
})

export default upload;

