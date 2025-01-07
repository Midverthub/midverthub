import { NextResponse } from "next/server";
import connect from "../../../../db";
import { PrismaClient } from "@prisma/client";
import { Types } from "mongoose";


const prisma = new PrismaClient()

//indicate what type of subscription
//get a list of all paid ad(product)
//get a list of all paid ad by a user
//get a list of all paid ad in a category
//add product to paid category
//extend a paid ad duration**
//delete a paid ad 


export const GET = async (request, context) => {
    try {
        //collecting the userid as a query from the url
        // const { searchParams } = new URL(request.url)
        // const userId = searchParams.get('userId')

        await connect();
        // await prisma.$connect()

        // if (!userId) {
        //     return new NextResponse(JSON.stringify({ message: "missing user id field" }),
        //         { status: 400 })

        // }

        // checking if the user is exisiting
        // if (!Types.ObjectId.isValid(userId)) {
        //     return new NextResponse(JSON.stringify({ message: "Invalid User Id" }),
        //         { status: 400 })
        // }

        const paidAds = await prisma.paidAdvert.findMany({
            include: {
                product: true
            },
            orderBy: {
                updatedAt: "asc"
            }
        })


        if (!paidAds) {
            return new NextResponse(JSON.stringify({ message: "No paid advert found" }),
                { status: 400 })
        }

        //return the products
        return new NextResponse(JSON.stringify({ message: "All paid adverts Found", data: paidAds }),
            { status: 200 })


    } catch (error) {
        return new NextResponse("Error in getting all paid ad " + error.message,
            { status: 500 })

    }
}

export const DELETE = async (request, context) => {
    try {
        const { userId, } = await request.json()


        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        await connect()

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found" }),
                { status: 404 })

        }


        const deletedAd = await prisma.paidAdvert.deleteMany({
            where: {
                userId: userId
            },
        })

        if (!deletedAd) {
            return new NextResponse(JSON.stringify({ message: "Error in deleting all paid ad" }),
                { status: 404 })

        }

        return new NextResponse(JSON.stringify({ message: "All paid ad deleted successfully", data: deletedAd }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in deleting all paid ad " + error.message,
            { status: 500 })
    }
}