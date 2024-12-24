//i need to get all the reviews about a particular product
//i need to get all the reviews by a particular user
//i need to get all the reviews by a particular user about a particular product
//i need to get all the reviews about a particular product by a particular user
//i need to post a review about a particular product by a particular user
//i need to update a review about a particular product by a particular user
//i need to delete a review about a particular product by a particular user
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
    const productId = context.params.reviews

    try {
        //collecting the userid as a query from the url
        // const { searchParams } = new URL(request.url)
        // const userId = searchParams.get('userId')
        // const productId = searchParams.get('productId')

        //checking if the userId is correct or exisiting
        if (!productId || !Types.ObjectId.isValid(productId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing productId" }),
                { status: 404 })
        }

        await connect()

        const reviwed = await prisma.review.findMany(
            {
                where: {
                    productId: productId
                },
                include: {
                    product: true
                }
            }
        )
        //checking if the user saved products is exisiting
        if (!reviwed) {
            return new NextResponse(JSON.stringify({ message: "Product reveiws not found" }),
                { status: 404 })
        }

        return new NextResponse(JSON.stringify({ message: "Here are product reviews", data: reviwed }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in fetching product reviews" + error.message,
            { status: 500 })
    }
}

export const POST = async (request, context) => {
    // const userId = context.params.saved

    try {
        //collecting the userid as a query from the url
        // const { searchParams } = new URL(request.url)
        // const userId = searchParams.get('userId')

        const { userId, productId, content, rating } = await request.json()

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

        const review = await prisma.review.create({
            data: {
                user: {
                    connect: { id: userId },
                },
                product: {
                    connect: { id: productId },
                },
                content: content,
                rating: rating
            }
        })

        if (!review) {
            return new NextResponse(JSON.stringify({ message: "Error in reviewing product" }),
                { status: 404 })

        }

        return new NextResponse(JSON.stringify({ message: "review successful uploaded", data: review }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in reviewing product" + error.message,
            { status: 500 })
    }
}

export const PATCH = async (request, context) => {

    try {
        //collecting the userid as a query from the url
        // const { searchParams } = new URL(request.url)
        // const userId = searchParams.get('userId')

        const { userId, productId, reviewId, content, rating } = await request.json()

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

        const review = await prisma.review.findUnique({
            where: {
                id: reviewId
            }
        })

        if (!review) {
            return new NextResponse(JSON.stringify({ message: "Review not found" }),
                { status: 404 })

        }

        const updatedreview = await prisma.review.update({
            where: {
                id: reviewId
            },
            data: {
                user: {
                    connect: { id: userId ? userId : review.userId },
                },
                product: {
                    connect: { id: productId ? productId : review.productId },
                },
                content: content ? content : review.content,
                rating: rating ? rating : review.rating
            }
        })

        if (!updatedreview) {
            return new NextResponse(JSON.stringify({ message: "Error in updating product review" }),
                { status: 404 })

        }

        return new NextResponse(JSON.stringify({ message: "Product review updated", data: updatedreview }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in updating product review " + error.message,
            { status: 500 })
    }
}


export const DELETE = async (request, context) => {
    try {
        //collecting the userid as a query from the url
        // const { searchParams } = new URL(request.url)
        // const userId = searchParams.get('userId')

        const { userId, reviewId } = await request.json()

        //checking if the userId is correct or exisiting
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        //checking if the productId is correct or exisiting
        if (!reviewId || !Types.ObjectId.isValid(reviewId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing reviewId" }),
                { status: 404 })
        }

        await connect()

        const review = await prisma.review.findUnique({
            where: {
                id: reviewId
            }
        })

        if (!review) {
            return new NextResponse(JSON.stringify({ message: "Review not found" }),
                { status: 404 })

        }

        const deletedreview = await prisma.review.delete({
            where: {
                id: reviewId
            }
        })

        if (!deletedreview) {
            return new NextResponse(JSON.stringify({ message: "Error in deleting product review" }),
                { status: 404 })

        }

        return new NextResponse(JSON.stringify({ message: "Product review deleted", data: deletedreview }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in deleting product review " + error.message,
            { status: 500 })
    }
}