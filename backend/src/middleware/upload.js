import multer from 'multer';

// Use memory storage so buffer can be streamed to R2 / validated
const storage = multer.memoryStorage();

// Resume file filter: PDF, DOC, DOCX up to 10MB
export const uploadResume = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid resume file type. Only PDF, DOC, and DOCX files are allowed.'));
    }
  }
}).single('resume');

// Media file filter: Images & standard web media up to 10MB
export const uploadMedia = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
      'application/pdf'
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid media file type. Allowed: WEBP, PNG, JPG, GIF, SVG, PDF.'));
    }
  }
}).single('file');
