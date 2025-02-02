import { NextResponse } from "next/server";
import connect from "../../../../../db";
import { PrismaClient } from "@prisma/client";
import { Types } from "mongoose";
import { Admin } from "mongodb";


const prisma = new PrismaClient()

const ObjectId = require("mongoose").Types.ObjectId

export const GET = async () => {

    try {
        await connect()
        // const users = await User.find()
        const users = await prisma.user.findMany()
        // return new NextResponse({ status: 200 })
        return new NextResponse(JSON.stringify(users), { status: 200 })

    } catch (error) {
        return new NextResponse("Errors in fetching users" + error.message,
            { status: 500 })
    }
    // return new NextResponse("this is my first api")
}

export const POST = async (request) => {
    try {
        const body = await request.json()
        await connect()
        const newUser = new User(body)
        await newUser.save()

        return new NextResponse(JSON.stringify({ message: "User is created", user: newUser }),
            { status: 200 }
        )

    } catch (error) {
        return new NextResponse("Error in creating user " + error.message,
            { status: 500 }
        )
    }
}

export const PATCH = async (request) => {
    try {
        //get userId and newUsername from the request body
        const body = await request.json();
        const { userId, name, phone, state, lga, postalcode } = body

        //connect to the database
        await connect()

        //check if the userId or newUsername is not found
        if (!userId || !name || !phone || !state || !lga) {
            return new NextResponse(JSON.stringify({ message: "ID or name or phone or state or lga not found" }),
                { status: 400 })
        }

        //check if the userId is valid
        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid User Id" }),
                { status: 400 })
        }

        const updateUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name: name,
                phone: phone,
                state: state,
                town: lga,
                ...(postalcode && { postalCode: postalcode })
            }
        })

        //check if the user is not found in the database
        if (!updateUser) {

            return new NextResponse(JSON.stringify({ message: "user not found in the database" }),
                { status: 400 })
        }

        //return the updated user   
        return new NextResponse(JSON.stringify({ message: "user is updated", user: updateUser }),
            { status: 200 })

    } catch (error) {
        //return the error message
        return new NextResponse("Error in updating user " + error.message,
            { status: 500 }
        )
    }
}

export const DELETE = async (request) => {
    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        if (!userId) {
            return new NextResponse(JSON.stringify({ message: "ID not found" }),
                { status: 400 })
        }


        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid User Id" }),
                { status: 400 })
        }
        await connect()

        const deletedUser = await User.findByIdAndDelete(
            new Types.ObjectId(userId)
        )

        if (!deletedUser) {
            return new NextResponse(JSON.stringify({ message: "user not found in the database" }),
                { status: 400 })
        }

        return new NextResponse(JSON.stringify({ message: "User is deleted", user: deletedUser }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in deleting user " + error.message,
            { status: 500 }
        )
    }
}