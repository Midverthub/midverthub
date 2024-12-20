import React from 'react'
import { NextResponse } from 'next/server'


const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const opts = {
    // overwrite: true,
    // invalidate: true,
    resource_type: "auto",
}

const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
};


const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (error, result) => {
            if (result && result.secure_url) {
                console.log(result.secure_url)
                return resolve(result.secure_url);
            }

            console.log(error.message)
            return reject({ message: error.message });
        });
    });
}


export const POST = async (req, res) => {
    const imageArray = [];

    try {
        const data = await req.json();
        const { files } = data;
        console.log(files);


        if (!data) {
            throw new Error("File not found in the request");
        }
        console.log("i got to this point");

        const uploadFunc = files.map(async (file) => {
            const uploadResult = await cloudinary.uploader.upload(file, {
                resource_type: "image",
                folder: "Product Images",


            });
            console.log("i got to this point");
            console.log((uploadResult).secure_url);
            imageArray.push(uploadResult.secure_url);
        });

        console.log("i got to this point");

        await Promise.all(uploadFunc);


        // const uploadResult = await cloudinary.uploader.upload(`${files}`, {
        //     resource_type: "image",
        //     folder: "Product Images",

        // });
        // console.log((uploadResult).secure_url);

        // return new NextResponse(JSON.stringify(uploadResult), { status: 200 });
        return new NextResponse(JSON.stringify(imageArray), { status: 200 });

    } catch (error) {
        console.log(error);
        return new NextResponse("Errors in Uploading Images: " + error.message, { status: 500 });
    }

}