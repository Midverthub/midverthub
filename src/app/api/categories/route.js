import { NextResponse } from "next/server";
import connect from "../../../../db";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const ObjectId = require("mongoose").Types.ObjectId

export const GET = async (request) => {

    try {
        await connect()
        // const categories = await User.find()
        const categories = await prisma.categories.findMany()
        // return new NextResponse({ status: 200 })
        return new NextResponse(JSON.stringify({ message: "Here are all the categories", categories }), { status: 200 })

    } catch (error) {
        return new NextResponse("Errors in fetching categories" + error.message,
            { status: 500 })
    }

    // try {
    //     const { searchParams } = new URL(request.url)
    //     const userId = searchParams.get('userId')


    //     if (!userId || !Types.ObjectId.isValid(userId)) {
    //         return new NextResponse(JSON.stringify({ message: "ID not found or Invalid User Id" }),
    //             { status: 400 })
    //     }

    //     await connect()
    //     const user = await User.findById(userId)

    //     if (!user) {
    //         return new NextResponse(JSON.stringify({ message: "User not found in database" }),
    //             { status: 400 })
    //     }

    //     const categories = await Category.find({ user: new Types.ObjectId(userId) })

    //     return new NextResponse(JSON.stringify(categories),
    //         { status: 200 })

    // } catch (error) {
    //     return new NextResponse("Errors in fetching categories" + error.message,
    //         { status: 500 })
    // }
    // return new NextResponse("this is my first api")
}

// export const POST = async (request) => {
//     try {

//         const { searchParams } = new URL(request.url)
//         const userId = searchParams.get('userId')


//         const { title } = await request.json()

//         if (!userId || !Types.ObjectId.isValid(userId)) {
//             return new NextResponse(JSON.stringify({ message: "ID not found or Invalid User Id" }),
//                 { status: 400 })
//         }

//         await connect()
//         const user = await User.findById(userId)

//         if (!user) {
//             return new NextResponse(JSON.stringify({ message: "User not found in database" }),

//                 { status: 400 })
//         }


//         const newCategory = new Category({
//             title,
//             user: new Types.ObjectId(userId)
//         })
//         await newCategory.save()

//         return new NextResponse(JSON.stringify({ message: "Category is created", category: newCategory }),
//             { status: 200 }
//         )

//     } catch (error) {
//         return new NextResponse("Error in creating categories " + error.message,
//             { status: 500 }

//         )
//     }
// }