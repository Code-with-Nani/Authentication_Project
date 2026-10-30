import { v2 as clodinary } from "cloudinary";
import fs from "fs";

clodinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImgOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    } else {
      let uploadResult = await clodinary.uploader.upload(filePath);

      fs.unlinkSync(filePath);

      return uploadResult.url;
    }
  } catch (error) {
    console.log(error);
  }
};

export default uploadImgOnCloudinary;
