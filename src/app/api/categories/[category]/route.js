import { NextResponse } from "next/server";
import connect from "../../../../../../db";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";
import { Types } from "mongoose";


const ObjectId = require("mongoose").Types.ObjectId

export const PATCH = async (request, context) => {
    // collecting categoryId dynamically  
    const categoryId = context.params.category

    try {
        //collecting the new title from the body
        const body = await request.json();
        const { title } = body

        //collecting the userid as a query from the url
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        //checking if the userId is correct or exisiting
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 400 })
        }

        //checking if the categoryId is correct or exisiting
        if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing categoryId" }),
                { status: 400 })
        }

        await connect()

        const user = await User.findById(userId)
        //checking if the user is exisiting
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found in database" }),
                { status: 400 })
        }

        //checking if the category is exisiting
        const category = await Category.findOne({ _id: categoryId, user: userId })
        if (!category) {
            return new NextResponse(JSON.stringify({ message: "Category not found in database" }),
                { status: 400 })
        }

        //updating the category
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { title },
            { new: true }
        )

        //checking if the category is updated
        if (!updatedCategory) {

            return new NextResponse(JSON.stringify({ message: "Category update failed" }),
                { status: 400 })
        }

        //returning the updated category
        return new NextResponse(JSON.stringify({ message: "Category is updated", category: updatedCategory }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in updating category " + error.message,
            { status: 500 }
        )
    }
}

export const DELETE = async (request, context) => {
    // collecting categoryId dynamically
    const categoryId = context.params.category

    try {
        //collecting the userid as a query from the url
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        //checking if the userId is correct or exisiting
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 400 })
        }

        //checking if the categoryId is correct or exisiting
        if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing categoryId" }),
                { status: 400 })
        }

        await connect()

        const user = await User.findById(userId)
        //checking if the user is exisiting
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found in database" }),
                { status: 404 })
        }

        //checking if the category is exisiting
        const category = await Category.findOne({ _id: categoryId, user: userId })
        if (!category) {
            return new NextResponse(JSON.stringify({ message: "Category not found or deos not belong to the user" }),
                { status: 404 })
        }

        //deleting the category
        const deletedCategory = await Category.findByIdAndDelete(categoryId)

        //checking if the category is deleted
        if (!deletedCategory) {
            return new NextResponse(JSON.stringify({ message: "Category deletion failed" }),
                { status: 400 })
        }

        //returning the deleted category
        return new NextResponse(JSON.stringify({ message: "Category is deleted", category: deletedCategory }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in deleting category " + error.message,
            { status: 500 }
        )
    }

}