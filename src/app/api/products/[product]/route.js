import { NextResponse } from "next/server";
import connect from "../../../../../db";
import { PrismaClient } from "@prisma/client";
import { Types } from "mongoose";


//getting the data for a single product
//patch a single product
//delete a single product
const prisma = new PrismaClient()

export const GET = async (request, context) => {
    //i need to get the product id from the url
    const productId = context.params.product

    try {
        //collecting the userid as a query from the url
        // const { searchParams } = new URL(request.url)
        // const userId = searchParams.get('userId')
        // const productId = searchParams.get('productId')

        //checking if the userId is correct or exisiting
        // if (!userId || !Types.ObjectId.isValid(userId)) {
        //     return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
        //         { status: 404 })
        // }

        //checking if the categoryId is correct or exisiting
        if (!productId || !Types.ObjectId.isValid(productId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing productId" }),
                { status: 404 })
        }

        await connect()

        // const user = await prisma.user.findUnique(
        //     {
        //         where: {
        //             id: userId
        //         },
        //     }
        // )
        //checking if the user is exisiting
        // if (!user) {
        //     return new NextResponse(JSON.stringify({ message: "User not found in database" }),
        //         { status: 404 })
        // }

        //getting the product
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            },
            include: {
                paidAdvert: true
            }
        })
        if (!product) {
            return new NextResponse(JSON.stringify({ message: "Product not found in database" }),
                { status: 404 })
        }

        return new NextResponse(JSON.stringify({ data: product }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in fetching a product" + error.message,
            { status: 500 })
    }
}

export const PATCH = async (request, context) => {
    //i need to get the product id from the url
    const productId = context.params.product

    try {
        //collecting the userid as a query from the url
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')

        const body = await request.json();
        const { category,
            cityOrState, provinceAndRegion, productName,
            condition, description, price,
            negotiation, phone, email, update, images
        } = body

        //checking if the userId is correct or exisiting
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        //checking if the categoryId is correct or exisiting
        if (!productId || !Types.ObjectId.isValid(productId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing productId" }),
                { status: 404 })
        }

        await connect()

        const user = await prisma.user.findUnique(
            {
                where: {
                    id: userId
                },
            }
        )
        //checking if the user is exisiting
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found in database" }),
                { status: 404 })
        }

        //getting the product
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })
        if (!product) {
            return new NextResponse(JSON.stringify({ message: "Product not found in database" }),
                { status: 404 })
        }

        const updatedProduct = await prisma.product.update({
            where: {
                id: productId
            },
            data: {
                // user: {
                //     connect: { id: userId }, // Replace "user-id" with the actual user ID
                // },
                category: {
                    connect: { title: category ? category : product.categoryTitle }, // Replace "Category Title" with the actual category title
                },
                images: images ? images : product.images, // Array of image URLs
                state: cityOrState ? cityOrState : product.state,
                town: provinceAndRegion ? provinceAndRegion : product.town,
                name: productName ? productName : product.name,
                condition: condition ? condition : product.condition, // or "used"
                description: description ? description : product.description,
                price: price ? price : product.price,
                negotiation: negotiation ? negotiation : product.negotiation, // optional
                phone: phone ? phone : product.phone,
                email: email ? email : product.email,
            },
        });

        return new NextResponse(JSON.stringify({ data: updatedProduct }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in fetching a product" + error.message,
            { status: 500 })
    }
}

// export const OLDPATCH = async (request, context) => {

//     const blogId = context.params.blog

//     //updating the data for a single blog
//     try {

//         // const categoryId = searchParams.get('categoryId')
//         const body = await request.json()
//         const { title, description } = body

//         //collecting the userid as a query from the url
//         const { searchParams } = new URL(request.url)
//         const userId = searchParams.get('userId')

//         //checking if the userId is correct or exisiting
//         if (!userId || !Types.ObjectId.isValid(userId)) {
//             return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
//                 { status: 404 })
//         }

//         //checking if the categoryId is correct or exisiting
//         // if (!categoryId || !Types.ObjectId.isValid(categoryId)) {
//         //     return new NextResponse(JSON.stringify({ message: "Invalid or missing categoryId" }),
//         //         { status: 404 })
//         // }

//         //checking if the blogId is correct or exisiting
//         if (!blogId || !Types.ObjectId.isValid(blogId)) {
//             return new NextResponse(JSON.stringify({ message: "Invalid or missing blogId" }),
//                 { status: 404 })
//         }

//         await connect()

//         const user = await User.findById(userId)
//         //checking if the user is exisiting
//         if (!user) {
//             return new NextResponse(JSON.stringify({ message: "User not found in database" }),
//                 { status: 404 })
//         }

//         //checking if the category is exisiting
//         // const category = await Category.findOne({ _id: categoryId, user: userId })
//         // if (!category) {
//         //     return new NextResponse(JSON.stringify({ message: "Category not found in database" }),
//         //         { status: 404 })
//         // }

//         //checking if the blog is exisiting
//         const blog = await Blog.findOne({ _id: blogId, user: userId, })
//         if (!blog) {
//             return new NextResponse(JSON.stringify({ message: "Blog not found in database" }),
//                 { status: 404 })
//         }

//         const updatedBlog = await Blog.findByIdAndUpdate(
//             blogId,
//             { title, description },
//             { new: true }
//         )

//         return new NextResponse(JSON.stringify({ message: "Blog updated successfully", blog: updatedBlog }),
//             { status: 200 })

//     } catch (error) {
//         return new NextResponse("Error updating a blog " + error.message,
//             { status: 500 })
//     }

// }


export const DELETE = async (request, context) => {
    //i need to get the product id from the url
    const productId = context.params.product

    try {
        //collecting the userid as a query from the url
        const { searchParams } = new URL(request.url)
        const userId = searchParams.get('userId')
        // const productId = searchParams.get('productId')

        //checking if the userId is correct or exisiting
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
                { status: 404 })
        }

        //checking if the categoryId is correct or exisiting
        if (!productId || !Types.ObjectId.isValid(productId)) {
            return new NextResponse(JSON.stringify({ message: "Invalid or missing productId" }),
                { status: 404 })
        }

        await connect()

        const user = await prisma.user.findUnique(
            {
                where: {
                    id: userId
                },
            }
        )
        //checking if the user is exisiting
        if (!user) {
            return new NextResponse(JSON.stringify({ message: "User not found in database" }),
                { status: 404 })
        }

        //getting the product
        const product = await prisma.product.findUnique({
            where: {
                id: productId
            }
        })
        if (!product) {
            return new NextResponse(JSON.stringify({ message: "Product not found in database" }),
                { status: 404 })
        }

        const deletedProduct = await prisma.product.delete({
            where: {
                id: productId
            }
        })

        if (!deletedProduct) {
            return new NextResponse(JSON.stringify({ message: "Product not successfully deleted" }),
                { status: 404 })

        }

        return new NextResponse(JSON.stringify({ message: "Product successfully deleted", data: deletedProduct }),
            { status: 200 })

    } catch (error) {
        return new NextResponse("Error in deleting product" + error.message,
            { status: 500 })
    }
}


// export const OLDDELETE = async (request, context) => {

//     const blogId = context.params.blog

//     //deleting the data for a single blog
//     try {

//         //collecting the userid as a query from the url
//         const { searchParams } = new URL(request.url)
//         const userId = searchParams.get('userId')

//         //checking if the userId is correct or exisiting
//         if (!userId || !Types.ObjectId.isValid(userId)) {
//             return new NextResponse(JSON.stringify({ message: "Invalid or missing userId" }),
//                 { status: 404 })
//         }

//         //checking if the blogId is correct or exisiting
//         if (!blogId || !Types.ObjectId.isValid(blogId)) {
//             return new NextResponse(JSON.stringify({ message: "Invalid or missing blogId" }),
//                 { status: 404 })
//         }

//         await connect()

//         const user = await User.findById(userId)
//         //checking if the user is exisiting
//         if (!user) {
//             return new NextResponse(JSON.stringify({ message: "User not found in database" }),
//                 { status: 404 })
//         }

//         //checking if the blog is exisiting
//         const blog = await Blog.findOne({ _id: blogId, user: userId })
//         if (!blog) {
//             return new NextResponse(JSON.stringify({ message: "Blog not found in database" }),
//                 { status: 404 })
//         }

//         await Blog.findByIdAndDelete(blogId)

//         return new NextResponse(JSON.stringify({ message: "Blog deleted successfully" }),
//             { status: 200 })

//     } catch (error) {
//         return new NextResponse("Error deleting a blog " + error.message,
//             { status: 500 })
//     }

// }