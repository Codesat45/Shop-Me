import multer from "multer";
import fs from "fs";
import path from "path";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js"; // Import Cloudinary config

const hasCloudinary =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

const localUploadDir = path.join(process.cwd(), "uploads", "avatars");

const storage = hasCloudinary
  ? new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: "avatars",
        allowed_formats: ["jpg", "png", "jpeg"],
        transformation: [{ width: 500, height: 500, crop: "limit" }],
      },
    })
  : multer.diskStorage({
      destination: (req, file, cb) => {
        fs.mkdirSync(localUploadDir, { recursive: true });
        cb(null, localUploadDir);
      },
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
        const safeBase = path.basename(file.originalname, ext).replace(/[^a-z0-9_-]/gi, "_");
        cb(null, `${Date.now()}_${safeBase}${ext}`);
      },
    });

const upload = multer({ storage });

export default upload;
