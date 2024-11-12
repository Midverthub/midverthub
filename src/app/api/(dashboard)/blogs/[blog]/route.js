import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Blog from "@/lib/modals/blog";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";
import { Types } from "mongoose";


//getting the data for a single blog

export const GET = async (request, context) => {
    const blogId = context.params.blog

    try {
        //collecting the userid as a query from the url
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')
        const categoryId = searchParams.get('categoryId')

        //checking if the userId is correct or exisiting
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        //checking if the categoryId is correct or exisiting
        if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing categoryId" }),
                { status: 404 })
        }

        //checking if the blogId is correct or exisiting
        if (!blogId || !Types.ObjectId.isValid(blogId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing blogId" }),
                { status: 404 })
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
            return new NextResponse(JSON.stringify({ message: "Category not found in database" }),
                { status: 404 })
        }
        //checking if the blog is exisiting
        const blog = await Blog.findOne({ _id: blogId, user: userId, category: categoryId })
        if (!blog) {
            return new NextResponse(JSON.stringify({ message: "Blog not found in database" }),
                { status: 404 })
        }

        return new NextResponse(JSON.stringify({ blog }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in fetching a blog" + error.message,
            { status: 500 })
    }
}

export const PATCH = async (request, context) => {

    const blogId = context.params.blog

    //updating the data for a single blog
    try {

        // const categoryId = searchParams.get('categoryId')
        const body = await request.json()
        const { title, description } = body

        //collecting the userid as a query from the url
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        //checking if the userId is correct or exisiting
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        //checking if the categoryId is correct or exisiting
        // if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
        //     return new NextResponse(JSON.stringify({ message: "Invalid or missing categoryId" }),
        //         { status: 404 })
        // }

        //checking if the blogId is correct or exisiting
        if (!blogId || !Types.ObjectId.isValid(blogId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing blogId" }),
                { status: 404 })
        }

        await connect()

        const user = await User.findById(userId)
        //checking if the user is exisiting
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found in database" }),
                { status: 404 })
        }

        //checking if the category is exisiting
        // const category = await Category.findOne({ _id: categoryId, user: userId })
        // if (!category) {
        //     return new NextResponse(JSON.stringify({ message: "Category not found in database" }),
        //         { status: 404 })
        // }

        //checking if the blog is exisiting
        const blog = await Blog.findOne({ _id: blogId, user: userId, })
        if (!blog) {
            return new NextResponse(JSON.stringify({ message: "Blog not found in database" }),
                { status: 404 })
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { title, description },
            { new: true }
        )

        return new NextResponse(JSON.stringify({ message: "Blog updated successfully", blog: updatedBlog }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error updating a blog " + error.message,
            { status: 500 })
    }

}

export const DELETE = async (request, context) => {

    const blogId = context.params.blog

    //deleting the data for a single blog
    try {

        //collecting the userid as a query from the url
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        //checking if the userId is correct or exisiting
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        //checking if the blogId is correct or exisiting
        if (!blogId || !Types.ObjectId.isValid(blogId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing blogId" }),
                { status: 404 })
        }

        await connect()

        const user = await User.findById(userId)
        //checking if the user is exisiting
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found in database" }),
                { status: 404 })
        }

        //checking if the blog is exisiting
        const blog = await Blog.findOne({ _id: blogId, user: userId })
        if (!blog) {
            return new NextResponse(JSON.stringify({ message: "Blog not found in database" }),
                { status: 404 })
        }

        await Blog.findByIdAndDelete(blogId)

        return new NextResponse(JSON.stringify({ message: "Blog deleted successfully" }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error deleting a blog " + error.message,
            { status: 500 })
    }

}