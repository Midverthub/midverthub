import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";
import { Types } from "mongoose";

const ObjectId = require("mongoose").Types.ObjectId

export const GET = async (request) => {

    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')


        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "ID not found or Invalid User Id" }),
                { status: 400 })
        }


        await connect()
        const user = await User.findById(userId)

        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found in database" }),
                { status: 400 })
        }

        const categories = await Category.find({ user: new Types.ObjectId(userId) })

        return new NextResponse(JSON.stringify(categories),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Errors in fetching categories" + error.message,
            { status: 500 })
    }
    // return new NextResponse("this is my first api")
}

export const POST = async (request) => {
    try {

        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')


        const { title } = await request.json()

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "ID not found or Invalid User Id" }),
                { status: 400 })
        }

        await connect()
        const user = await User.findById(userId)

        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found in database" }),
                { status: 400 })
        }


        const newCategory = new Category({
            title,
            user: new Types.ObjectId(userId)
        })
        await newCategory.save()

        return new NextResponse(JSON.stringify({ message: "Category is created", category: newCategory }),
            { status: 200 }
        )

    } catch (error) {
        return new NextResponse("Error in creating categories " + error.message,
            { status: 500 }

        )
    }
}

export const PATCH = async (request) => {
    try {
        const body = await request.json();
        const { userId, newUsername } = body

        await connect()

        if (!userId || !newUsername) {
            return new NextResponse(JSON.stringify({ message: "ID or new username not found" }),
                { status: 400 })
        }

        if (!Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid User Id" }),
                { status: 400 })
        }

        const UpdatedUser = await User.findOneAndUpdate(
            { _id: new ObjectId(userId) },
            { username: newUsername },
            { new: true }
        )
        if (!UpdatedUser) {

            return new NextResponse(JSON.stringify({ message: "user not found in the database" }),
                { status: 400 })
        }

        return new NextResponse(JSON.stringify({ message: "user is updated", user: UpdatedUser }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in updating user " + error.message,
            { status: 500 }
        )
    }
}