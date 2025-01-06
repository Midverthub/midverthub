'use server'
// import { signIn, signOut } from "next-auth/react";
// import { signIn, signOut } from "@/auth";
import { signIn, signOut } from "../auth";
import { revalidatePath } from "next/cache";
// import { db } from "@/db";
import { db } from "../db";
import { redirect } from "next/dist/server/api-utils";
import { AuthError } from "next-auth";
import { PrismaClient } from "@prisma/client";
// import { redirectTo } from "next/navigation";


const prisma = new PrismaClient()

// for debugging purpose and to check if the user already exists in the database or not 
export const getUserByEmail = async (email) => {
    try {
        //find the user by email in the database and return the user
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        return user
        // return true
    } catch (error) {
        console.log(error);
        return false
        // return null
    }
}

// signup function to signup with the provider passed as an argument
export const signup = async (provider) => {
    // signIn function from next-auth/react to sign in with the provider passed as an argument
    //once a successful login is done, the user will be redirected to the home page
    await signIn(provider, { redirectTo: '/signup/userinfo' });
    //and revalidate the cache of the home page to get the latest data from the server
    revalidatePath('/signup/userinfo');

}

// login function to login with the provider passed as an argument
//it's dynamic, so you can pass any provider you want to login with
export const login = async (provider) => {
    // signIn function from next-auth/react to sign in with the provider passed as an argument
    //once a successful login is done, the user will be redirected to the home page
    await signIn(provider, { redirectTo: '/' });
    //and revalidate the cache of the home page to get the latest data from the server
    revalidatePath('/');

}

// logout function to logout the user
export const logout = async () => {
    // signOut function from next-auth/react to sign out the user
    await signOut({ redirectTo: '/' });
    //once the user is signed out, redirect the user to the home page
    //and revalidate the cache of the home page to get the latest data from the server
    revalidatePath('/');
}



export const getUsers = async (email) => {
    try {
        //find the user by email in the database and return the user
        const user = await prisma.user.findMany()
        // const user = await db.getUsers()
        return user
        // return true
    } catch (error) {
        console.log(error);
        // return false
        return null
    }
}

//once the form is submitted this action is called and the signIn function is executed the credentials are passed to the auth provider in the auth file that is in the root folder

export const signupWithCredentials = async (email, password) => {

    //get the email and password from the formData
    const rawFormData = {
        email: email,
        // email: formData.get('email'),
        password: password,
        // password: formData.get('password'),
        role: "ADMIN",
        redirectTo: '/signup/userinfo'
    }

    //add for debugging purpose
    //check if the user already exists in the database or not
    // const existingUser = await getUserByEmail(email)
    // const existingUser = await getUserByEmail(formData.get('email'))
    // console.log(existingUser);

    try {
        await signIn('credentials', rawFormData)
    } catch (error) {
        //check if the error is an instance of Error
        if (error instanceof AuthError) {
            //get the key from the error object
            switch (error.type) {
                case "CredentialsSignin":

                    return { error: "Invalid credentials" }

                default:
                    return { error: "Something went wrong" }
            }

        }
        throw error
    }
    revalidatePath('/signup/userinfo')
}

// login function to login with the formData passed as an argument
export const loginWithCredentials = async (email, password) => {

    //get the email and password from the formData
    const rawFormData = {
        email: email,
        // email: formData.get('email'),
        password: password,
        // password: formData.get('password'),
        role: "ADMIN",
        redirectTo: '/'
    }

    //add for debugging purpose
    //check if the user already exists in the database or not
    // const existingUser = await getUserByEmail(email)
    // const existingUser = await getUserByEmail(formData.get('email'))
    // console.log(existingUser);

    try {
        await signIn('credentials', rawFormData)
    } catch (error) {
        //check if the error is an instance of Error
        if (error instanceof AuthError) {
            //get the key from the error object
            switch (error.type) {
                case "CredentialsSignin":

                    return { error: "Invalid credentials" }

                default:
                    return { error: "Something went wrong" }
            }

        }
        throw error
    }
    revalidatePath('/')
}