import NextAuth from "next-auth"
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "./db"
import { saltAndHashPassword } from "./utils/helper"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    providers: [
        Github,
        Google,

        //here we are using the credentials provider to login with email and password
        //we receive the raw form data here to use them to login
        Credentials({
            name: "Credentials",
            //here we are using the credentials provider to login with email and password
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "email@example.com"
                },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {

                if (!credentials || !credentials.email || !credentials.password) {
                    return null
                }

                //here we are getting the email and password from the credentials
                const email = credentials.email
                //here we are hashing the password
                const hash = saltAndHashPassword(credentials.password)


                //here we are finding the user by email in the database
                let user = await db.user.findUnique({
                    where: {
                        email: email
                    }
                })

                //if the user is not found in the database, we are creating a new user with the email and password
                // if (!user) {
                //     user = await db.user.create({
                //         data: {
                //             email,
                //             hashedPassword: hash
                //         }
                //     })

                // }
                // //if the user is found in the database, we are checking if the password matches the hashed password
                // else {
                //     const isMatch = bcrypt.compareSync(credentials.password,
                //         user.hashedPassword
                //     )
                //     //if the password does not match, we are throwing an error
                //     if (!isMatch) {
                //         throw new Error("Password does not match")
                //     }
                // }

                //if user email is found in the database, we are checking if the password matches the hashed password
                if (user) {
                    const isMatch = bcrypt.compareSync(credentials.password,
                        user.hashedPassword
                    )
                    //if the password does not match, we are throwing an error
                    if (!isMatch) {
                        throw new Error("Password does not match")
                    }
                }

                return user
            }
        })
    ],
})