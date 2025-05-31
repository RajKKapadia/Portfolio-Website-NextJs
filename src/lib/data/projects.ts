export interface Project {
    id: string
    title: string
    description: string
    url: string
    technology: string
}

export const projects: Project[] = [
    {
        id: "habit-tracker",
        title: "Habit Tracker Telegram Bot",
        description: "Track daily habits with reminders and weekly summaries.",
        url: "https://t.me/your_streak_bot",
        technology: "TypeScript (Grammy), PostgreSQL, AWS EC2"
    },
    {
        id: "dialogflow-template",
        title: "Dialogflow CX Webhook Template",
        description: "Dialogflow Webhook Template for faster development, secure and scalable.",
        url: "https://github.com/RajKKapadia/Dialogflow-CX-Webhook-Template",
        technology: "Python FastAPI"
    },
    {
        id: "easy-meet",
        title: "EasyMeet",
        description: "A seamless scheduling platform that allows users to share their availability and let others effortlessly book appointments. Simplify time management, eliminate back-and-forth emails, and make scheduling a breeze.",
        url: "https://project-easy-meet.vercel.app/",
        technology: "NextJs, Drizzle, Shadcn, TailwindCSS"
    },
    {
        id: "price-parity",
        title: "PriceParity",
        description: "We are dedicated to helping you find the best deals across various categories. Our platform uses advanced tools to match, compare, and showcase deals that fit your needs and budget. At [Your Website Name], transparency and fairness are at the core of what we do.",
        url: "https://project-price-parity.vercel.app/",
        technology: "NextJs, Drizzle, Shadcn, TailwindCSS"
    },
    {
        id: "langgraph-table-booking",
        title: "Langgraph Table Booking Agent",
        description: "AI agent development project using LangGraph, Python, and FastAPI on the backend, along with Next.js on the frontend.",
        url: "https://github.com/RajKKapadia/Langgraph-Table-Booking",
        technology: "Frontend (NextJs, Drizzle, Shadcn, TailwindCSS), Backend (Python , FastAPI)"
    }
]
