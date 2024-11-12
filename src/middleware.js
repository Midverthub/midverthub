import { NextResponse } from "next/server";
import { authMiddleware } from "@/middlewares/api/authMiddleware";
import { logMiddleware } from "./middlewares/api/logMiddleware";

//this is the configuration for the middleware
export const config = {
    matcher: "/api/:path*"
}

export default function middleware(req) {
    //this is the middleware function that is triggered when the api is called
    if (req.url.includes("/api/blogs")) {
        const logResult = logMiddleware(req)
        console.log(logResult.response);
    }

    //this is the middleware function that is triggered when the api is called
    const authResult = authMiddleware(req)
    //if the token is not valid then it will return an unauthorized error
    if (!authResult?.isValid) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
        })
    }
    return NextResponse.next()
}