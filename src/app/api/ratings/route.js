import { NextResponse } from "next/server";
import connect from "../../../../db";
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
        const ratingId = searchParams.get('ratingId')
        // const productId = searchParams.get('productId')

        //checking if the userId is correct or exisiting
        if (!ratingId || !Types.ObjectId.isValid(ratingId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing ratingId" }),
                { status: 404 })
        }

        await connect()

        const rating = await prisma.rating.findUnique(
            {
                where: {
                    id: ratingId
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


export const DELETE = async (request, context) => {
    // const userId = context.params.saved

    try {
        //collecting the userid as a query from the url
        // const { searchParams } = new URL(request.url)
        // const userId = searchParams.get('userId')
        const { userId } = await request.json()

        //checking if the userId is correct or exisiting
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        await connect()

        const deleteAllRatings = await prisma.rating.deleteMany({
            where: {
                userId: userId,
            }
        })

        if (!deleteAllRatings) {
            return new NextResponse(JSON.stringify({ message: "No rating found" }),
                { status: 404 })

        }

        return new NextResponse(JSON.stringify({ message: " All rating have been deleted successfully", data: deleteAllRatings }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in deleting all ratings " + error.message,
            { status: 500 })
    }
}