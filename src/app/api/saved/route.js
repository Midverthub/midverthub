import { NextResponse } from "next/server";
import connect from "../../../../db";
import { PrismaClient } from "@prisma/client";
import { Types } from "mongoose";


//getting all the data saved by a user
//add a product to saved
//delete a product from saved
const prisma = new PrismaClient()


export const DELETE = async (request, context) => {
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

        await connect()

        const deleted = await prisma.savedProduct.deleteMany({
            where: {
                userId: userId,
            }
        })

        return new NextResponse(JSON.stringify({ message: " All saved products deleted successfully from saved", data: deleted }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in deleting all product from saved " + error.message,
            { status: 500 })
    }
}