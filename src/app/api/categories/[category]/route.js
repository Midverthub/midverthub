import { NextResponse } from "next/server";
import connect from "../../../../../db";
// import User from "@/lib/modals/user";
// import Category from "@/lib/modals/category";
import { Types } from "mongoose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


const ObjectId = require("mongoose").Types.ObjectId


//i only need to get the category by title or id
//i don't need to post a category because the category is already created
//i don't need to patch a category because the category is already created
//i don't need to delete a category because the category is already created

export const GET = async (request, context) => {
    try {
        // const body = await request.json();
        // const { email } = body

        const { searchParams } = new URL(request.url);
        const title = searchParams.get('title');


        // await connect()
        // const users = await User.find()
        const category = await prisma.categories.findUnique(
            {
                where: {
                    title: title
                },
                include: {
                    products: true,
                },
            }
        )

        // return new NextResponse({ status: 200 })
        return new NextResponse(JSON.stringify({ message: `this is the ${title} category and it products`, category }), { status: 200 })

    } catch (error) {
        return new NextResponse("Errors in fetching category" + error.message,
            { status: 500 })
    }

}


// export const POST = async (request) => {

//     try {

//         //get userid and categoryid from the query

//         //get new product data from the request body
//         const body = await request.json();
//         const { userId, category,
//             cityOrState, provinceAndRegion, productName,
//             condition, description, price,
//             negotiation, phone, email, update, images
//         } = body

//         await connect();
//         // await prisma.$connect()

//         if (!userId || !category || !cityOrState || !provinceAndRegion || !productName || !condition || !description || !price || !negotiation || !phone || !email || !update || !images) {
//             return new NextResponse(JSON.stringify({ message: "missing fields" }),
//                 { status: 400 })

//         }

//         //checking if the user is exisiting
//         // if (!Types.ObjectId.isValid(userId)) {
//         //     return new NextResponse(JSON.stringify({ message: "Invalid User Id" }),
//         //         { status: 400 })
//         // }

//         //checking if the userId is correct or exisiting
//         //checking if the categoryId is correct or exisiting
//         //connect to the database
//         //checking if the category is exisiting
//         //setting the new product data
//         //saving the new product data

//         console.log('i got to this point');

//         // const newProduct = await prisma.product.create({
//         //     data: {
//         //         userId: userId,
//         //         categoryTitle: category,


//         //         images: images,
//         //         state: cityOrState,
//         //         town: provinceAndRegion,
//         //         name: productName,
//         //         condition: condition,
//         //         description: description,
//         //         price: price,
//         //         negotiation: negotiation,
//         //         phone: phone,
//         //         email: email,
//         //     }
//         // })


//         // const addCategory = await prisma.categories.upsert({
//         //     // prisma.categories.create({
//         //     where: {
//         //         id: "67451344164133170a56caa8"
//         //     },
//         //     data: {
//         //         products: {
//         //             // create: [
//         //             // {
//         //             // connect: { id: newProduct.id },

//         //             userId: userId,
//         //             categoryTitle: category,
//         //             images: images,
//         //             state: cityOrState,
//         //             town: provinceAndRegion,
//         //             name: productName,
//         //             condition: condition,
//         //             description: description,
//         //             price: price,
//         //             negotiation: negotiation,
//         //             phone: phone,
//         //             email: email,
//         //             // }
//         //             // ]
//         //         },
//         //     },
//         //     include: {
//         //         products: true
//         //     }
//         // })

//         // const newProduct = await prisma.product.create({
//         //     data: {
//         //         user: {
//         //             connect: { id: userId }, // Replace "user-id" with the actual user ID
//         //         },
//         //         category: {
//         //             connect: { title: category }, // Replace "Category Title" with the actual category title
//         //         },


//         //         images: images, // Array of image URLs
//         //         state: cityOrState,
//         //         town: provinceAndRegion,
//         //         name: productName,
//         //         condition: condition, // or "used"
//         //         description: description,
//         //         price: price,
//         //         negotiation: negotiation, // optional
//         //         phone: phone,
//         //         email: email,
//         //     },
//         // });

//         const createProduct = await prisma.categories.update({
//             where: {
//                 title: category,
//             },
//             data: {
//                 products: {
//                     create: {
//                         // categoryTitle: category,
//                         images: images, // Array of image URLs
//                         state: cityOrState,
//                         town: provinceAndRegion,
//                         name: productName,
//                         condition: condition, // or "used"
//                         description: description,
//                         price: price,
//                         negotiation: negotiation, // optional
//                         phone: phone,
//                         email: email,
//                         user: {
//                             connect: { id: userId }, // Replace "user-id" with the actual user ID
//                         }
//                     }
//                 }
//             },
//             include: {
//                 products: true
//             }
//         })



//         //check if the upload is successful
//         if (!createProduct) {

//             return new NextResponse(JSON.stringify({ message: "Product upload failed" }),
//                 { status: 400 })
//         }

//         //return the uploaded product
//         return new NextResponse(JSON.stringify({
//             message: "information saved", info: { createProduct }
//         }),
//             { status: 200 })


//     } catch (error) {
//         return new NextResponse("Error in creating blog" + error.message,
//             { status: 500 })
//     }
// }


// export const PATCH = async (request, context) => {
//     // collecting categoryId dynamically
//     const categoryId = context.params.category

//     try {
//         //collecting the new title from the body
//         const body = await request.json();
//         const { title } = body

//         //collecting the userid as a query from the url
//         const { searchParams } = new URL(request.url)
//         const userId = searchParams.get('userId')

//         //checking if the userId is correct or exisiting
//         if (!userId || !Types.ObjectId.isValid(userId)) {
//             return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
//                 { status: 400 })
//         }

//         //checking if the categoryId is correct or exisiting
//         if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
//             return new NextResponse(JSON.stringify({ message: "Invalid or missing categoryId" }),
//                 { status: 400 })
//         }

//         await connect()

//         const user = await User.findById(userId)
//         //checking if the user is exisiting
//         if (!user) {
//             return new NextResponse(JSON.stringify({ message: "User not found in database" }),
//                 { status: 400 })
//         }

//         //checking if the category is exisiting
//         const category = await Category.findOne({ _id: categoryId, user: userId })
//         if (!category) {
//             return new NextResponse(JSON.stringify({ message: "Category not found in database" }),
//                 { status: 400 })
//         }

//         //updating the category
//         const updatedCategory = await Category.findByIdAndUpdate(
//             categoryId,
//             { title },
//             { new: true }
//         )

//         //checking if the category is updated
//         if (!updatedCategory) {

//             return new NextResponse(JSON.stringify({ message: "Category update failed" }),
//                 { status: 400 })
//         }

//         //returning the updated category
//         return new NextResponse(JSON.stringify({ message: "Category is updated", category: updatedCategory }),
//             { status: 200 })

//     } catch (error) {
//         return new NextResponse("Error in updating category " + error.message,
//             { status: 500 }
//         )
//     }
// }

// export const DELETE = async (request, context) => {
//     // collecting categoryId dynamically
//     const categoryId = context.params.category

//     try {
//         //collecting the userid as a query from the url
//         const { searchParams } = new URL(request.url)
//         const userId = searchParams.get('userId')

//         //checking if the userId is correct or exisiting
//         if (!userId || !Types.ObjectId.isValid(userId)) {
//             return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
//                 { status: 400 })
//         }

//         //checking if the categoryId is correct or exisiting
//         if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
//             return new NextResponse(JSON.stringify({ message: "Invalid or missing categoryId" }),
//                 { status: 400 })
//         }

//         await connect()

//         const user = await User.findById(userId)
//         //checking if the user is exisiting
//         if (!user) {
//             return new NextResponse(JSON.stringify({ message: "User not found in database" }),
//                 { status: 404 })
//         }

//         //checking if the category is exisiting
//         const category = await Category.findOne({ _id: categoryId, user: userId })
//         if (!category) {
//             return new NextResponse(JSON.stringify({ message: "Category not found or deos not belong to the user" }),
//                 { status: 404 })
//         }

//         //deleting the category
//         const deletedCategory = await Category.findByIdAndDelete(categoryId)

//         //checking if the category is deleted
//         if (!deletedCategory) {
//             return new NextResponse(JSON.stringify({ message: "Category deletion failed" }),
//                 { status: 400 })
//         }

//         //returning the deleted category
//         return new NextResponse(JSON.stringify({ message: "Category is deleted", category: deletedCategory }),
//             { status: 200 })

//     } catch (error) {
//         return new NextResponse("Error in deleting category " + error.message,
//             { status: 500 }
//         )
//     }

// }