import { NextResponse } from "next/server";
import connect from "../../../../../../db";
// import connect, { db } from "../../../../../db";
// import User from "@/lib/modals/user";
import { PrismaClient } from "@prisma/client";
import { Types } from "mongoose";
// import { Admin } from "mongodb";
const prisma = new PrismaClient()

const ObjectId = require("mongoose").Types.ObjectId

export const GET = async (request) => {

    try {

        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');


        await connect()
        const user = await prisma.user.findUnique(
            {
                where: {
                    email: email
                },
                // include: {
                //     products: true,
                // },
                omit: {
                    hashedPassword: true,
                }
            },
        )

        // return new NextResponse({ status: 200 })
        return new NextResponse(JSON.stringify(user), { status: 200 })

    } catch (error) {
        return new NextResponse("Errors in fetching users" + error.message,
            { status: 500 })
    }
    // return new NextResponse("this is my first api")
}

//To be done later
//write a post request to create a new user "profile"
//write a patch request to update a user "profile"
//write a delete request to delete a user "profile" and user itself


// export const POST = async (request) => {
//     try {
//         const body = await request.json()
//         await connect()
//         const newUser = new User(body)
//         await newUser.save()

//         return new NextResponse(JSON.stringify({ message: "User is created", user: newUser }),
//             { status: 200 }
//         )

//     } catch (error) {
//         return new NextResponse("Error in creating user " + error.message,
//             { status: 500 }
//         )
//     }
// }

// export const PATCH = async (request) => {
//     try {
//         //get userId and newUsername from the request body
//         const body = await request.json();
//         const { userId, newUsername } = body

//         //connect to the database
//         await connect()

//         //check if the userId or newUsername is not found
//         if (!userId || !newUsername) {
//             return new NextResponse(JSON.stringify({ message: "ID or new username not found" }),
//                 { status: 400 })
//         }

//         //check if the userId is valid
//         if (!Types.ObjectId.isValid(userId)) {
//             return new NextResponse(JSON.stringify({ message: "Invalid User Id" }),
//                 { status: 400 })
//         }

//         //find the user by Id and update the username
//         const UpdatedUser = await User.findOneAndUpdate(
//             { _id: new ObjectId(userId) },
//             { username: newUsername },
//             { new: true }
//         )
//         //check if the user is not found in the database
//         if (!UpdatedUser) {

//             return new NextResponse(JSON.stringify({ message: "user not found in the database" }),
//                 { status: 400 })
//         }

//         //return the updated user
//         return new NextResponse(JSON.stringify({ message: "user is updated", user: UpdatedUser }),
//             { status: 200 })

//     } catch (error) {
//         //return the error message
//         return new NextResponse("Error in updating user " + error.message,
//             { status: 500 }
//         )
//     }
// }

// export const DELETE = async (request) => {
//     try {
//         const { searchParams } = new URL(request.url)
//         const userId = searchParams.get('userId')

//         if (!userId) {
//             return new NextResponse(JSON.stringify({ message: "ID not found" }),
//                 { status: 400 })
//         }


//         if (!Types.ObjectId.isValid(userId)) {
//             return new NextResponse(JSON.stringify({ message: "Invalid User Id" }),
//                 { status: 400 })
//         }
//         await connect()

//         const deletedUser = await User.findByIdAndDelete(
//             new Types.ObjectId(userId)
//         )

//         if (!deletedUser) {
//             return new NextResponse(JSON.stringify({ message: "user not found in the database" }),
//                 { status: 400 })
//         }

//         return new NextResponse(JSON.stringify({ message: "User is deleted", user: deletedUser }),
//             { status: 200 })

//     } catch (error) {
//         return new NextResponse("Error in deleting user " + error.message,
//             { status: 500 }
//         )
//     }
// }