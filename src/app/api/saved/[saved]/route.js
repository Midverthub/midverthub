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
    const userId = context.params.saved

    try {
        //collecting the userid as a query from the url
        // const { searchParams } = new URL(request.url)
        // const userId = searchParams.get('userId')
        // const productId = searchParams.get('productId')

        //checking if the userId is correct or exisiting
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        await connect()

        const saved = await prisma.savedProduct.findMany(
            {
                where: {
                    userId: userId
                },
                // include: {
                //     savedProducts: true
                // }
            }
        )
        //checking if the user saved products is exisiting
        if (!saved) {
            return new NextResponse(JSON.stringify({ message: "User saved products not found" }),
                { status: 404 })
        }

        return new NextResponse(JSON.stringify({ message: "Here are the user saved products ", data: saved }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in fetching a user saved products " + error.message,
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

        const saved = await prisma.savedProduct.create({
            data: {
                user: {
                    connect: { id: userId }, // Replace "user-id" with the actual user ID
                },
                product: {
                    connect: { id: productId }, // Replace "Category Title" with the actual category title
                },
            }
        })

        return new NextResponse(JSON.stringify({ message: "Product added to saved", data: saved }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in adding a product to saved " + error.message,
            { status: 500 })
    }
}


export const DELETE = async (request, context) => {
    // const userId = context.params.saved

    try {
        //collecting the userid as a query from the url
        // const { searchParams } = new URL(request.url)
        // const userId = searchParams.get('userId')
        const { userId, productId, savedId } = await request.json()

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

        if (!savedId || !Types.ObjectId.isValid(savedId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing savedId" }),
                { status: 404 })
        }

        await connect()

        const deleted = await prisma.savedProduct.delete({
            where: {
                id: savedId
            }
        })

        return new NextResponse(JSON.stringify({ message: "Product deleted successfully from saved", data: deleted }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in deleting a product from saved " + error.message,
            { status: 500 })
    }
}