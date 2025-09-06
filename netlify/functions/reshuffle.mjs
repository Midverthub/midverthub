import { PrismaClient } from '@prisma/client';

// Initialize Prisma client with better error handling
const prisma = new PrismaClient({
    log: ['warn', 'error'],
});

export default async function handler(request, context) {
    // console.log("🚀 Reshuffle function started at:", new Date().toISOString());
    // console.log("📋 Request method:", request.method);
    // console.log("🔧 Execution type:", context.clientContext ? "Scheduled" : "Manual");

    // Check if DATABASE_URL is configured
    if (!process.env.DATABASE_URL) {
        console.error("❌ DATABASE_URL environment variable is not set");
        return new Response("Database configuration error", { status: 500 });
    }

    // Scheduled functions typically use GET, but allow POST for manual testing
    if (request.method !== "GET" && request.method !== "POST") {
        console.log("❌ Method not allowed:", request.method);
        return new Response("Method Not Allowed - Only GET and POST are supported", { status: 405 });
    }

    try {
        console.log("📊 Fetching paid ads from database...");

        const paidAds = await prisma.paidAdvert.findMany({
            include: { product: true },
            orderBy: { updatedAt: "asc" },
        });

        console.log(`📈 Found ${paidAds.length} paid ads to check`);

        const now = Date.now();
        let reshuffledCount = 0;

        for (const ad of paidAds) {
            const updatedAt = new Date(ad.updatedAt).getTime();
            const diffMinutes = (now - updatedAt) / (1000 * 60);
            const sub = ad.subscription.toLowerCase();

            console.log(`🔍 Checking ad ${ad.id}: subscription=${sub}, diffMinutes=${diffMinutes.toFixed(2)}`);

            if (
                (sub === 'manual plan' || sub === 'pro package' || sub === 'pro plus package') &&
                diffMinutes > 2
            ) {
                console.log(`✅ Reshuffling ad ${ad.id} (${sub}) - last updated ${diffMinutes.toFixed(2)} minutes ago`);

                await prisma.paidAdvert.update({
                    where: { id: ad.id },
                    data: {
                        product: { connect: { id: ad.productId } },
                        subscription: ad.subscription,
                        count: ad.count + 1,
                        updatedAt: new Date(),
                    },
                });

                reshuffledCount++;
            } else {
                console.log(`⏭️ Skipping ad ${ad.id}: subscription=${sub}, diffMinutes=${diffMinutes.toFixed(2)}`);
            }
        }

        await prisma.$disconnect();
        console.log(`🎉 Reshuffle completed successfully! Reshuffled ${reshuffledCount} out of ${paidAds.length} ads`);
        return new Response(`Reshuffle completed successfully! Reshuffled ${reshuffledCount} ads`, { status: 200 });
    } catch (error) {
        console.error("💥 Error during reshuffle:", error);
        console.error("Error details:", {
            message: error.message,
            stack: error.stack,
            name: error.name
        });

        await prisma.$disconnect();
        return new Response(`Error during reshuffle: ${error.message}`, { status: 500 });
    }
};


export const config = {
    schedule: "@hourly"
}