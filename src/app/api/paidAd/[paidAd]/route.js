import { NextResponse } from "next/server";
import connect from "../../../../../db";
import { PrismaClient } from "@prisma/client";
import { Types } from "mongoose";


const prisma = new PrismaClient()

export const GET = async (request, context) => {
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

        const paidAds = await prisma.paidAdvert.findMany({
            where: {
                userId: userId
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
        return new NextResponse(JSON.stringify({ message: "All paid adverts by user found", data: paidAds }),
            { status: 200 })


    } catch (error) {
        return new NextResponse("Error in getting all paid ad " + error.message,
            { status: 500 })

    }
}

export const POST = async (request, context) => {
    try {
        const { userId, productId, subscription } = await request.json()


        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        if (!productId || !Types.ObjectId.isValid(productId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing productId" }),
                { status: 404 })

        }

        if (!subscription) {
            return new NextResponse(JSON.stringify({ message: "Missing subscription field" }),
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

        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })

        if (!product) {
            return new NextResponse(JSON.stringify({ message: "Product not found" }),
                { status: 404 })

        }

        const paidAd = await prisma.paidAdvert.create({
            data: {
                user: {
                    connect: { id: userId },
                },
                product: {
                    connect: { id: productId },
                },
                subscription: subscription,
                count: 1

            }
        })

        if (!paidAd) {
            return new NextResponse(JSON.stringify({ message: "Error in creating paid ad" }),
                { status: 404 })

        }

        return new NextResponse(JSON.stringify({ message: "Paid Ad created successfully", data: paidAd }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in creating paid ad " + error.message,
            { status: 500 })
    }
}


export const PATCH = async (request, context) => {
    try {
        const { userId, productId, paidAdId, subscription, count } = await request.json()


        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        if (!productId || !Types.ObjectId.isValid(productId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing productId" }),
                { status: 404 })

        }

        if (!paidAdId || !Types.ObjectId.isValid(paidAdId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing paidAdId" }),
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

        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })

        if (!product) {
            return new NextResponse(JSON.stringify({ message: "Product not found" }),
                { status: 404 })

        }

        const ad = await prisma.paidAdvert.findUnique({
            where: {
                id: paidAdId
            }
        })

        if (!ad) {
            return new NextResponse(JSON.stringify({ message: "Paid Ad not found" }),
                { status: 404 })

        }

        const newPaidAd = await prisma.paidAdvert.update({
            where: {
                id: paidAdId
            },
            data: {
                user: {
                    connect: { id: userId ? userId : ad.userId },
                },
                product: {
                    connect: { id: productId ? productId : ad.productId },
                },
                subscription: subscription ? subscription : ad.subscription,
                count: count ? count + 1 : ad.count + 1
            }
        })

        if (!newPaidAd) {
            return new NextResponse(JSON.stringify({ message: "Error in updating paid ad" }),
                { status: 404 })

        }

        return new NextResponse(JSON.stringify({ message: "Paid Ad updated successfully", data: newPaidAd }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in updating paid ad " + error.message,
            { status: 500 })
    }
}

export const DELETE = async (request, context) => {
    try {
        const { userId, paidAdId, } = await request.json()


        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        if (!paidAdId || !Types.ObjectId.isValid(paidAdId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing paidAdId" }),
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

        const ad = await prisma.paidAdvert.findUnique({
            where: {
                id: paidAdId
            }
        })

        if (!ad) {
            return new NextResponse(JSON.stringify({ message: "Paid Ad not found" }),
                { status: 404 })

        }


        const deletedAd = await prisma.paidAdvert.delete({
            where: {
                id: paidAdId
            },
        })

        if (!deletedAd) {
            return new NextResponse(JSON.stringify({ message: "Error in deleting paid ad" }),
                { status: 404 })

        }

        return new NextResponse(JSON.stringify({ message: "Paid Ad deleted successfully", data: deletedAd }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in deleting paid ad " + error.message,
            { status: 500 })
    }
}