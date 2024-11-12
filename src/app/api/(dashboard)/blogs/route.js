import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Blog from "@/lib/modals/blog";
import User from "@/lib/modals/user";
import Category from "@/lib/modals/category";
import { Types } from "mongoose";

export const GET = async (request) => {
    try {
        //collecting the userid as a query from the url
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')
        const categoryId = searchParams.get('categoryId')

        //adding a search functionality
        const searchKeywords = searchParams.get('search')

        //adding a date and time filter
        const startDate = searchParams.get('startDate')
        const endDate = searchParams.get('endDate')

        //adding a pagination functionality
        //Pagination is a technique used to divide a large set of 
        //data into smaller, more manageable chunks, or "pages." 
        const page = parseInt(searchParams.get('page') || 1) //default page is 1
        const limit = parseInt(searchParams.get('limit') || 10)//default limit is 10

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


        //filtering the blogs based on the user and category
        const filiter = {
            user: new Types.ObjectId(userId),
            category: new Types.ObjectId(categoryId)
        }

        //TODO: add the pagination and sorting based on the user input

        // filitering the blogs based on the search keywords
        if (searchKeywords) {
            filiter.$or = [
                { title: { $regex: searchKeywords, $options: 'i' } },
                { description: { $regex: searchKeywords, $options: 'i' } }
            ]
        }


        //filtering the blogs based on the date and time
        if (startDate && endDate) {
            filiter.createdAt = {
                $gte: new Date(startDate), //greater than or equal to
                $lte: new Date(endDate) //less than or equal to
            }
        } else if (startDate) { //if only start date is provided
            filiter.createdAt = {
                $gte: new Date(startDate)
            }
        } else if (endDate) { //if only end date is provided all the blogs before this date should be returned 
            filiter.createdAt = {
                $lte: new Date(endDate)
            }
        }

        const skip = (page - 1) * limit //calculating the number of blogs to skip


        //fetching the blogs based on the filter and sorting them based on the date with pagination
        const blogs = await Blog.find(filiter).sort({ createdAt: "asc" }).skip(skip).limit(limit)

        return new NextResponse(JSON.stringify({ blogs }),
            { status: 200 })


    } catch (error) {
        return new NextResponse("Error in fetching blogs" + error.message,
            { status: 500 })
    }
}


export const POST = async (request) => {

    try {
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')
        const categoryId = searchParams.get('categoryId')

        const body = await request.json()
        const { title, description } = body

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

        const newBlog = new Blog({
            title,
            description,
            user: new Types.ObjectId(userId),
            category: new Types.ObjectId(categoryId)
        })

        await newBlog.save()
        return new NextResponse(JSON.stringify({ message: "Blog created successfully", blog: newBlog }),
            { status: 200 })


    } catch (error) {
        return new NextResponse("Error in fetching blogs" + error.message,
            { status: 500 })
    }
}