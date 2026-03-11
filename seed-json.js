const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const homeContent = {
        hero: {
            title: "A Space for Healing & Lasting Hope",
            subtitle: "At SSHIMOH, we provide a sanctuary for transformation, combining evidence-based clinical care with holistic therapies in a serene environment.",
            bgImage: "/hero-bg.jpg" // Placeholder if they upload one
        },
        experience: {
            title: "Experience SSHIMOH",
            subtitle: "Take a virtual tour of our facility and hear from our lead clinicians about our approach to healing & Specialized Care.",
            videoUrl: "" // Placeholder
        },
        healingPath: {
            title: "The SSHIMOH Healing Path",
            subtitle: "A structured 4-step journey designed for sustainable recovery.",
            steps: [
                { num: "01", title: "In-depth Assessment", desc: "Comprehensive medical and psychological evaluation." },
                { num: "02", title: "Custom Plan", desc: "Developing a personalized treatment roadmap." },
                { num: "03", title: "Intensive Care", desc: "Immersive therapy and clinical intervention." },
                { num: "04", title: "Lifelong Support", desc: "Continuous aftercare for sustained recovery." }
            ]
        },
        testimonials: {
            title: "Patient Stories of Hope",
            subtitle: "Join thousands who have rediscovered joy and purpose.",
            quote: "\"SSHIMOH’s team carries the wisdom and strength to handle even the toughest cases with ease. A place where hope is reborn and healing feels divine. My life has completely changed.\"",
            author: "Recovered Patient"
        }
    };

    await prisma.pageContent.upsert({
        where: { slug: 'home' },
        update: {
            title: "Homepage",
            content: JSON.stringify(homeContent, null, 2)
        },
        create: {
            slug: 'home',
            title: "Homepage",
            content: JSON.stringify(homeContent, null, 2)
        }
    });

    console.log("Seeded Home JSON successfully.");
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
