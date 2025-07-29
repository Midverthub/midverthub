import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(request, context) {
    if (request.method !== "GET") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    try {


        const paidAds = await prisma.paidAdvert.findMany({
            include: { product: true },
            orderBy: { updatedAt: "asc" },
        });

        const now = Date.now();

        for (const ad of paidAds) {

            const updatedAt = new Date(ad.updatedAt).getTime();
            const diffMinutes = (now - updatedAt) / (1000 * 60);
            const sub = ad.subscription.toLowerCase();

            if (
                (sub === 'manual plan' || sub === 'pro package' || sub === 'pro plus package') &&
                diffMinutes > 2
            ) {
                await prisma.paidAdvert.update({
                    where: { id: ad.id },
                    data: {
                        product: { connect: { id: ad.productId } },
                        subscription: ad.subscription,
                        count: ad.count + 1,
                        updatedAt: new Date(),
                    },
                });

            }
        }

        await prisma.$disconnect();
        console.log("Reshuffle completed successfully");
        return new Response("Reshuffle completed successfully", { status: 200 });
    } catch (error) {

        await prisma.$disconnect();
        return new Response("Error during reshuffle", { status: 500 });
    }
};


export const config = {
    schedule: "@hourly"
}