//i need to get all the reviews about a particular product
//i need to get all the reviews by a particular user
//i need to get all the reviews by a particular user about a particular product
//i need to get all the reviews about a particular product by a particular user
//i need to post a rating about a particular product by a particular user
//i need to update a rating about a particular product by a particular user
//i need to delete a rating about a particular product by a particular user
import { NextResponse } from "next/server";
import connect from "../../../../../db";
import { PrismaClient } from "@prisma/client";
import { Types } from "mongoose";


//getting all the data saved by a user
//add a product to saved
//delete a product from saved
const prisma = new PrismaClient()

export const GET = async (request, context) => {
    //i need to get the product id from the url
    // const userId = context.params.reviews

    try {
        //collecting the userid as a query from the url
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')
        // const productId = searchParams.get('productId')

        //checking if the userId is correct or exisiting
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        await connect()

        const rating = await prisma.rating.findMany(
            {
                where: {
                    userId: userId
                },
                include: {
                    product: true
                }
            }

        )
        //checking if the user saved products is exisiting
        if (!rating) {
            return new NextResponse(JSON.stringify({ message: "User rating not found" }),
                { status: 404 })
        }

        return new NextResponse(JSON.stringify({ message: "Here are user rating", data: rating }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in fetching user rating" + error.message,
            { status: 500 })
    }
}


export const POST = async (request, context) => {
    // const userId = context.params.saved

    try {
        //collecting the userid as a query from the url
        // const { searchParams } = new URL(request.url)
        // const userId = searchParams.get('userId')

        const { userId, productId } = await request.json()

        //checking if the userId is correct or exisiting
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        //checking if the productId is correct or exisiting
        if (!productId || !Types.ObjectId.isValid(productId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing productId" }),
                { status: 404 })
        }

        await connect()

        const rating = await prisma.rating.create({
            data: {
                user: {
                    connect: { id: userId },
                },
                product: {
                    connect: { id: productId },
                }
            }
        })

        if (!rating) {
            return new NextResponse(JSON.stringify({ message: "Error in adding product to rating" }),
                { status: 404 })

        }

        return new NextResponse(JSON.stringify({ message: "product successful added to rating", data: rating }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in adding product to rating" + error.message,
            { status: 500 })
    }
}

export const DELETE = async (request, context) => {
    try {
        //collecting the userid as a query from the url
        // const { searchParams } = new URL(request.url)
        // const userId = searchParams.get('userId')

        const { userId, ratingId } = await request.json()

        //checking if the userId is correct or exisiting
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        //checking if the productId is correct or exisiting
        if (!ratingId || !Types.ObjectId.isValid(ratingId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing ratingId" }),
                { status: 404 })
        }

        await connect()

        const rating = await prisma.rating.findUnique({
            where: {
                id: ratingId
            }
        })

        if (!rating) {
            return new NextResponse(JSON.stringify({ message: "Rating not found" }),
                { status: 404 })

        }

        const deletedRating = await prisma.rating.delete({
            where: {
                id: ratingId
            }
        })

        if (!deletedRating) {
            return new NextResponse(JSON.stringify({ message: "Error in removing rating" }),
                { status: 404 })

        }

        return new NextResponse(JSON.stringify({ message: "Product rating removed", data: deletedRating }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in removing product rating " + error.message,
            { status: 500 })
    }
}