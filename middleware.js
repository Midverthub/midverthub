// import { NextResponse } from "next/server";
// import { authMiddleware } from "@/middlewares/api/authMiddleware";
// import { logMiddleware } from "./middlewares/api/logMiddleware";

// //this is the configuration for the middleware
// export const config = {
//     matcher: "/api/:path*"
// }

// export default function middleware(req) {
//     //this is the middleware function that is triggered when the api is called
//     if (req.url.includes("/api/blogs")) {
//         const logResult = logMiddleware(req)
//         console.log(logResult.response);
//     }

//     //this is the middleware function that is triggered when the api is called
//     const authResult = authMiddleware(req)
//     //if the token is not valid then it will return an unauthorized error
//     if (!authResult?.isValid) {
//         return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
//             status: 401,
//         })
//     }
//     return NextResponse.next()
// }

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
// import { auth as middleware } from "@/middleware";

// const { auth } = require("@/auth");

// module.exports = { middleware: auth };

//array of protected routes
const protectedRoutes = ["/middleware"];

export default async function middleware(NextRequest) {
    // get the session object from the auth function to check if the user is logged in or not
    const session = await auth();

    // check if the user is on a protected route or not by checking the pathname of the url and comparing it to the protected routes array 
    const isProtectedRoute = protectedRoutes.some((route) => {
        return NextRequest.nextUrl.pathname.startsWith(route);
    });

    // if the user is not logged in and is on a protected route, redirect them to the home page
    if (!session && isProtectedRoute) {
        // redirect to the home page 
        const absoluteUrl = new URL('/', NextRequest.nextUrl.origin);
        // return the redirect response 
        return NextResponse.redirect(absoluteUrl.toString());
    }


    return NextResponse.next();
}


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}