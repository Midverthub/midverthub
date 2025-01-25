import { NextResponse } from "next/server";
import React from "react";


const protectedRoutes = ["/savedItems", "/upload", "/adverts", "/contacts", "/rating", "/userProfile", "/reShuffle"];

export default async function middleware(request) {

    // get the session object from the auth function to check if the user is logged in or not
    const sessionToken = request.cookies.get('authjs.session-token' || '__Secure-authjs.session-token')?.value;
    console.log(sessionToken);

    // check if the user is on a protected route or not by checking the pathname of the url and comparing it to the protected routes array 
    const isProtectedRoute = protectedRoutes.some((route) => {
        return request.nextUrl.pathname.startsWith(route);
    });

    // if the user is not logged in and is on a protected route, redirect them to the home page
    if (!sessionToken && isProtectedRoute) {
        // if (isProtectedRoute) {
        // redirect to the home page 
        const absoluteUrl = new URL('/login', request.nextUrl.origin);
        // return the redirect response 
        return NextResponse.redirect(absoluteUrl.toString());
    }


    return NextResponse.next();
}



export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}