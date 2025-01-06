//get all a user following
//get all a user followers
//post/follow a user
//delete/unfollow a user

import { NextResponse } from "next/server";
import connect from "../../../../db";
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

        const contacts = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                following: {
                    include: {
                        following: true
                    }
                },
                followers: {
                    include: {
                        follower: true
                    }
                },
            }
        })


        if (!contacts) {
            return new NextResponse(JSON.stringify({ message: "No followers/following found" }),
                { status: 400 })
        }

        //return the products
        return new NextResponse(JSON.stringify({ message: "All user following/follower ", data: contacts }),
            { status: 200 })


    } catch (error) {
        return new NextResponse("Error in getting user following/follower " + error.message,
            { status: 500 })

    }
}