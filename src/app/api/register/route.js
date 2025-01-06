// import User from "@/lib/modals/user";
import connect from "../../../../db";
import bcrypt from "bcryptjs";
import { saltAndHashPassword } from "../../../../utils/helper";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const POST = async (req, res) => {
    try {
        //getting the email and password from the request body
        const { email, password } = await req.json();

        //connecting to the database
        await connect();
        //checking if the user already exists
        // const existingUser = await User.findOne({ email });
        //here we are finding the user by email in the database
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        //if the user already exists, return a response with a status of 400
        if (existingUser) {
            return new NextResponse("User already exists", { status: 400 });
        }

        //hashing the password
        const hashedPassword = saltAndHashPassword(password)

        // const hashedPassword = await bcrypt.hash(password, 12);

        // //creating a new user
        // const newUser = new User({
        //     email,
        //     password: hashedPassword,
        // });

        // Creating a new user
        const newUser = await prisma.user.create({
            data: {
                email,
                hashedPassword,
            },
        });

        //saving the new user to the database
        // await newUser.save();

        //returning a response with a status of 200
        // return new NextResponse({ user: newUser, message: "User created" }, { status: 200 });
        return new NextResponse(JSON.stringify({ user: newUser, message: "User created" }), { status: 200 });

    } catch (error) {
        // return new NextResponse(err, { status: 500 })
        return new NextResponse("Error creating user: " + error.message, { status: 500 });
    }
}