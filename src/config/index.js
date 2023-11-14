import { config } from 'dotenv';
config();

//NOTE: If you are running the project in an instance, you should store these secret keys in its configuration settings.
// This type of storing secret information is only experimental and for the purpose of local running.

const { DB_URI, PORT, JWT_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY, CLOUDINARY_SECRET, CLOUDINARY_KEY, CLOUDINARY_NAME  } = process.env

export const port = PORT || 3000;
export const jwtSecretKey = JWT_SECRET_KEY;
export const refreshTokenSecretKey = REFRESH_TOKEN_SECRET_KEY;
export const dbUri = DB_URI;
export const cloudName = CLOUDINARY_NAME;
export const cloudKey = CLOUDINARY_KEY;
export const cloudSecret = CLOUDINARY_SECRET;
export const prefix = '/api';
export const specs = "/docs";