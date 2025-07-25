// schedule: "* * * * *" // runs every 1 minute


import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Optional: adjust to every second if using netlify schedule (see below)
export async function handler(event, context) {
    if (event.httpMethod !== "GET") {
        return { statusCode: 405, body: "Method Not Allowed" };
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
        return { statusCode: 200, body: "Reshuffle completed successfully" };
    } catch (error) {

        await prisma.$disconnect();
        return { statusCode: 500, body: "Error during reshuffle" };
    }
};
