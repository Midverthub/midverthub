import React from "react";
import { NextResponse } from "next/server";
import connect from "../../../../db";
import { Types } from "mongoose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

//remeber don't send a body when sending a get request
export const GET = async (request) => {
    try {
        //collecting the userid as a query from the url
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        await connect();
        // await prisma.$connect()

        if (!userId) {
            return new NextResponse(JSON.stringify({ message: "missing user id field" }),
                { status: 400 })

        }

        // checking if the user is exisiting
        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid User Id" }),
                { status: 400 })
        }

        const products = await prisma.product.findMany({
            where: {
                userId: userId
            }
        })


        if (!products) {
            return new NextResponse(JSON.stringify({ message: "Products not found" }),
                { status: 400 })
        }

        //return the products
        return new NextResponse(JSON.stringify({
            message: "Products Found", data: products
        }),
            { status: 200 })



    } catch (error) {
        return new NextResponse("Error in fectching products" + error.message,
            { status: 500 })
    }
}

// export const OLDGET = async (request) => {
//     try {
//         //collecting the userid as a query from the url
//         const { searchParams } = new URL(request.url)
//         const userId = searchParams.get('userId')
//         const categoryId = searchParams.get('categoryId')

//         //adding a search functionality
//         const searchKeywords = searchParams.get('search')

//         //adding a date and time filter
//         const startDate = searchParams.get('startDate')
//         const endDate = searchParams.get('endDate')

//         //adding a pagination functionality
//         //Pagination is a technique used to divide a large set of 
//         //data into smaller, more manageable chunks, or "pages." 
//         const page = parseInt(searchParams.get('page') || 1) //default page is 1
//         const limit = parseInt(searchParams.get('limit') || 10)//default limit is 10

//         //checking if the userId is correct or exisiting
//         if (!userId || !Types.ObjectId.isValid(userId)) {
//             return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
//                 { status: 404 })
//         }

//         //checking if the categoryId is correct or exisiting
//         if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
//             return new NextResponse(JSON.stringify({ message: "Invalid or missing categoryId" }),
//                 { status: 404 })
//         }


//         // await connect()

//         const user = await User.findById(userId)
//         //checking if the user is exisiting
//         if (!user) {
//             return new NextResponse(JSON.stringify({ message: "User not found in database" }),
//                 { status: 404 })
//         }

//         //checking if the category is exisiting
//         const category = await Category.findOne({ _id: categoryId, user: userId })
//         if (!category) {
//             return new NextResponse(JSON.stringify({ message: "Category not found in database" }),
//                 { status: 404 })
//         }


//         //filtering the blogs based on the user and category
//         const filiter = {
//             user: new Types.ObjectId(userId),
//             category: new Types.ObjectId(categoryId)
//         }

//         //TODO: add the pagination and sorting based on the user input

//         // filitering the blogs based on the search keywords
//         if (searchKeywords) {
//             filiter.$or = [
//                 { title: { $regex: searchKeywords, $options: 'i' } },
//                 { description: { $regex: searchKeywords, $options: 'i' } }
//             ]
//         }


//         //filtering the blogs based on the date and time
//         if (startDate && endDate) {
//             filiter.createdAt = {
//                 $gte: new Date(startDate), //greater than or equal to
//                 $lte: new Date(endDate) //less than or equal to
//             }
//         } else if (startDate) { //if only start date is provided
//             filiter.createdAt = {
//                 $gte: new Date(startDate)
//             }
//         } else if (endDate) { //if only end date is provided all the blogs before this date should be returned 
//             filiter.createdAt = {
//                 $lte: new Date(endDate)
//             }
//         }

//         const skip = (page - 1) * limit //calculating the number of blogs to skip


//         //fetching the blogs based on the filter and sorting them based on the date with pagination
//         const blogs = await Blog.find(filiter).sort({ createdAt: "asc" }).skip(skip).limit(limit)

//         return new NextResponse(JSON.stringify({ blogs }),
//             { status: 200 })


//     } catch (error) {
//         return new NextResponse("Error in fetching blogs" + error.message,
//             { status: 500 })
//     }
// }


export const POST = async (request) => {

    try {

        //get userid and categoryid from the query

        //get new product data from the request body
        const body = await request.json();
        const { userId, category,
            cityOrState, provinceAndRegion, productName,
            condition, description, price,
            negotiation, phone, email, update, images
        } = body

        await connect();
        // await prisma.$connect()

        if (!userId || !category || !cityOrState || !provinceAndRegion || !productName || !condition || !description || !price || !negotiation || !phone || !email || !update || !images) {
            return new NextResponse(JSON.stringify({ message: "missing fields" }),
                { status: 400 })

        }

        // checking if the user is exisiting
        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid User Id" }),
                { status: 400 })
        }

        const newProduct = await prisma.product.create({
            data: {
                user: {
                    connect: { id: userId },
                },
                category: {
                    connect: { title: category },
                },


                images: images,
                state: cityOrState,
                town: provinceAndRegion,
                name: productName,
                condition: condition,
                description: description,
                price: price,
                negotiation: negotiation,
                phone: phone,
                email: email,
            },
        });

        //check if the upload is successful
        if (!newProduct) {

            return new NextResponse(JSON.stringify({ message: "Product upload failed" }),
                { status: 400 })
        }

        //return the uploaded product
        return new NextResponse(JSON.stringify({ message: "Product Uploaded", data: newProduct }),
            { status: 200 })


    } catch (error) {
        return new NextResponse("Error in creating blog" + error.message,
            { status: 500 })
    }
}
