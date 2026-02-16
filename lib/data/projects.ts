export interface Project {
    id: string
    title: string
    description: string
    url: string
    technology: string
}

export const projects: Project[] = [
    {
        id: "ai-agents-beyond-jupyter-notebooks",
        title: "AI Agents Beyond Jupyter Notebooks",
        description: "FastAPI + Telegram bot backend that runs an OpenAI Agent with background job processing via ARQ.",
        url: "https://github.com/RajKKapadia/ai-agents-beyond-jupyter-notebook",
        technology: "Python, FastAPI, Telegram, OpenAI Agents SDK"
    },
    {
        id: "gca-whatsapp",
        title: "WhatsApp + Google Conversational Agents Integration",
        description: "A FastAPI webhook server that connects WhatsApp to Google Conversational Agents (Dialogflow CX) and Gemini AI. Incoming WhatsApp messages are enqueued to a Redis-backed ARQ worker for async processing, so the webhook returns 200 OK immediately without risking Meta timeout/retries.",
        url: "https://github.com/RajKKapadia/Google-Conversational-Agents-WhatsApp-Python",
        technology: "Python, FastAPI, Meta, Google Cloud Platform, GCA"
    },
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
        id: "langgraph-table-booking",
        title: "LangGraph Table Booking AI Agent",
        description: "Intelligent AI agent for restaurant table booking using LangGraph. Demonstrates advanced agent orchestration and decision-making capabilities.",
        url: "https://github.com/RajKKapadia/Langgraph-Table-Booking",
        technology: "LangGraph, Python, FastAPI, NextJs"
    }
]
