import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../../config/cloudinay.config.js';

const getFolderName = () => {
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  return `${day}-${month}-${year}`;
};

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: getFolderName(),
    public_id: (req, file) => file.originalname
  }
});

const upload = multer({ storage });

export default upload;
