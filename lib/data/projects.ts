export interface Project {
    id: string
    title: string
    description: string
    url: string
    technology: string
}

export const projects: Project[] = [
    {
        id: "text-to-sql-whatsapp",
        title: "LLM-Powered Text-to-SQL WhatsApp Application",
        description: "Natural language interface to SQL databases via WhatsApp. Real-time database queries using conversational AI, eliminating the need for SQL knowledge.",
        url: "https://github.com/RajKKapadia/YouTube-SQL-Chatbot-Postgres-Openai",
        technology: "LLM, NLP, WhatsApp API, SQL"
    },
    {
        id: "toxic-comment-classifier",
        title: "Toxic Comment Classifier",
        description: "NLP-based system to identify and classify toxic comments in real-time, helping moderate online communities and maintain healthy discussions.",
        url: "https://github.com/RajKKapadia/YouTube-Gradio-Text-Classification",
        technology: "Python, PyTorch, Flask, NLP"
    },
    {
        id: "object-detection-solution",
        title: "End-to-End Object Detection Solution",
        description: "Complete object detection pipeline from model training to deployment. Includes model evaluation, optimization, and production API endpoints.",
        url: "https://github.com/RajKKapadia/Object-Detection-Generalised-Youtube",
        technology: "TensorFlow, Python, Flask, Computer Vision"
    },
    {
        id: "ai-chat-stack",
        title: "AI Chat Stack",
        description: "Connect your knowledge to conversations with a clean, simple flow. Full-stack SaaS platform for AI-powered conversations.",
        url: "https://aichatstack.com",
        technology: "NextJs, Drizzle, Shadcn, TailwindCSS"
    },
    {
        id: "habit-tracker",
        title: "Habit Tracker Telegram Bot",
        description: "Track daily habits with reminders and weekly summaries. Built with Grammy framework for seamless user experience.",
        url: "https://t.me/your_streak_bot",
        technology: "TypeScript (Grammy), PostgreSQL, AWS EC2"
    },
    {
        id: "dialogflow-template",
        title: "Dialogflow CX Webhook Template",
        description: "Production-ready Dialogflow webhook template for faster chatbot development. Secure, scalable, and optimized for enterprise use.",
        url: "https://github.com/RajKKapadia/Dialogflow-CX-Webhook-Template",
        technology: "Python FastAPI"
    },
    {
        id: "easy-meet",
        title: "EasyMeet - Appointment Scheduling Platform",
        description: "Seamless scheduling platform for sharing availability and booking appointments. Eliminates back-and-forth emails with intuitive interface.",
        url: "https://project-easy-meet.vercel.app/",
        technology: "NextJs, Drizzle, Shadcn, TailwindCSS"
    },
    {
        id: "price-parity",
        title: "PriceParity - Deal Comparison Platform",
        description: "Find the best deals across various categories with advanced comparison tools. Transparent pricing and fairness-focused deal matching.",
        url: "https://project-price-parity.vercel.app/",
        technology: "NextJs, Drizzle, Shadcn, TailwindCSS"
    },
    {
        id: "langgraph-table-booking",
        title: "LangGraph Table Booking AI Agent",
        description: "Intelligent AI agent for restaurant table booking using LangGraph. Demonstrates advanced agent orchestration and decision-making capabilities.",
        url: "https://github.com/RajKKapadia/Langgraph-Table-Booking",
        technology: "LangGraph, Python, FastAPI, NextJs"
    }
]
