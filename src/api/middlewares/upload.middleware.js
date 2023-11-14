import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../config/cloudinay.config.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'SForm',
    public_id: (req, file) => file.originalname
  }
});

const upload = multer({ storage });

export default upload;
