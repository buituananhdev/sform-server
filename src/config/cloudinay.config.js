import { v2 as cloudinary } from 'cloudinary';
import { cloudName, cloudKey, cloudSecret } from './index.js';
cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudKey,
  api_secret: cloudSecret
});

export default cloudinary;
