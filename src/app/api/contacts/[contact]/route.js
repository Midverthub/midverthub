import { NextResponse } from "next/server";
import connect from "../../../../../db";
import { PrismaClient } from "@prisma/client";
import { Types } from "mongoose";


const prisma = new PrismaClient()

export const POST = async (request, context) => {
    try {
        const { userId, followingId, } = await request.json()


        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        if (!followingId || !Types.ObjectId.isValid(followingId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing followingId" }),
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

        const Tofollow = await prisma.user.findUnique({
            where: {
                id: followingId
            }
        })

        if (!Tofollow) {
            return new NextResponse(JSON.stringify({ message: "The user you are try to follow can't be found" }),
                { status: 404 })

        }

        const following = await prisma.userFollowing.create({
            data: {
                follower: {
                    connect: { id: userId },
                },
                following: {
                    connect: { id: followingId },
                },
            }
        })

        if (!following) {
            return new NextResponse(JSON.stringify({ message: "Error in following user" }),
                { status: 404 })

        }

        return new NextResponse(JSON.stringify({ message: "User successfully added to following", data: following }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in following user " + error.message,
            { status: 500 })
    }
}


export const DELETE = async (request, context) => {
    try {
        const { userId, followId, } = await request.json()


        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        if (!followId || !Types.ObjectId.isValid(followId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing followId" }),
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

        const follow = await prisma.userFollowing.findUnique({
            where: {
                id: followId
            }
        })

        if (!follow) {
            return new NextResponse(JSON.stringify({ message: "Follow could not be found" }),
                { status: 404 })

        }


        const deleteFollow = await prisma.userFollowing.delete({
            where: {
                id: followId
            },
        })

        if (!deleteFollow) {
            return new NextResponse(JSON.stringify({ message: "Error in deleting follow" }),
                { status: 404 })

        }

        return new NextResponse(JSON.stringify({ message: "Follow deleted successfully", data: deleteFollow }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in deleting follow " + error.message,
            { status: 500 })
    }
}