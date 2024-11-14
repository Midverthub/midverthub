'use server'
// import { signIn, signOut } from "next-auth/react";
// import { signIn, signOut } from "@/auth";
import { signIn, signOut } from "../auth";
import { revalidatePath } from "next/cache";
// import { db } from "@/db";
import { db } from "../db";
import { redirect } from "next/dist/server/api-utils";
import { AuthError } from "next-auth";
// import { redirectTo } from "next/navigation";

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

// for debugging purpose and to check if the user already exists in the database or not 
const getUserByEmail = async (email) => {
    try {
        //find the user by email in the database and return the user
        const user = await db.user.findUnique({
            where: {
                email: email
            }
        })
        return user
    } catch (error) {
        console.log(error);
        return null
    }
}

//once the form is submitted this action is called and the signIn function is executed the credentials are passed to the auth provider in the auth file that is in the root folder

// login function to login with the formData passed as an argument
export const loginWithCredentials = async (formData,) => {

    //get the email and password from the formData
    const rawFormData = {
        email: formData.get('email'),
        password: formData.get('password'),
        role: "ADMIN",
        redirectTo: '/'
    }

    //add for debugging purpose
    //check if the user already exists in the database or not
    const existingUser = await getUserByEmail(formData.get('email'))
    console.log(existingUser);

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