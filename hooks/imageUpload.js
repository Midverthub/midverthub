import React from 'react'
// require("dotenv").config();

// import { v2 as cloudinary } from 'cloudinary'
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});





function ImageUpload() {
    cloudname = cloudinary.config().cloud_name
    // console.log(cloud_name);


    return {
        cloudname
    }
}

export default ImageUpload