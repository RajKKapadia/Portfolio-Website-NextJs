export interface Project {
    id: string
    title: string
    description: string
    url: string
    technology: string
    category: string
    role: string
    problem: string
    outcome: string
    highlights: string[]
}

export const projects: Project[] = [
    {
        id: "calorie-buddy-ai",
        title: "Calorie Buddy AI",
        description: "Telegram-first nutrition and fitness product for logging meals, photos, voice notes, workouts, and progress without another tracking app.",
        url: "https://caloriebuddy.trishiai.com",
        technology: "TypeScript, OpenAI Agents SDK, Telegram, Next.js, PostgreSQL, Redis, Docker",
        category: "AI Product",
        role: "Creator and lead developer",
        problem: "Make everyday calorie, macro, and exercise tracking conversational while keeping users in control of what gets saved.",
        outcome: "A live Telegram product with approval-based logging, personalized goals, daily and long-range summaries, local-time reminders, and an operational admin dashboard.",
        highlights: ["Text, photo, voice, and workout inputs", "Approval before logging", "Live product and Telegram bot"]
    },
    {
        id: "youtube-animation-generator",
        title: "YouTube Animation Generator",
        description: "TypeScript and Remotion CLI for grounded narrated videos and editor-ready animation overlays in landscape and vertical formats.",
        url: "https://github.com/RajKKapadia/youtube-animation-generator",
        technology: "TypeScript, Remotion, OpenAI, Structured Outputs, Local TTS",
        category: "Creator Tools",
        role: "Product architecture and implementation",
        problem: "Turn source material or subtitles into useful video visuals without fabricating evidence or rebuilding every scene by hand.",
        outcome: "A deterministic workflow with optional cited research, source-backed charts, local voice synthesis, reusable media, and native 16:9 and 9:16 rendering.",
        highlights: ["Grounded visual planning", "Local narrated-video pipeline", "Responsive Remotion rendering"]
    },
    {
        id: "ai-invoice-processing-backend",
        title: "AI Invoice Processing with Human Review",
        description: "Multimodal invoice extraction backed by deterministic validation, durable LangGraph checkpoints, and reviewer correction.",
        url: "https://github.com/RajKKapadia/ai-invoice-processing-backend",
        technology: "Python, FastAPI, LangGraph, Celery, PostgreSQL, MinIO",
        category: "Agent Workflows",
        role: "Backend architecture and implementation",
        problem: "Automate invoice processing without allowing model confidence alone to approve financially inconsistent or ambiguous documents.",
        outcome: "A durable background workflow in which application rules auto-approve clean results and route every warning or mismatch to human review.",
        highlights: ["Multimodal structured extraction", "Durable pause and resume", "Deterministic financial checks"]
    },
    {
        id: "youtube-ai-knowledge-base",
        title: "YouTube AI Knowledge Base",
        description: "Dockerized ingestion and RAG backend that turns videos into timestamped, searchable, source-grounded knowledge.",
        url: "https://github.com/RajKKapadia/youtube-ai-knowledge-base",
        technology: "Python, FastAPI, Celery, Whisper, Qdrant, PostgreSQL",
        category: "RAG Systems",
        role: "System architecture and implementation",
        problem: "Make long-form video content searchable and answerable without losing the exact point in the source that supports a result.",
        outcome: "A background ingestion pipeline with local transcription and embeddings, filtered vector retrieval, and timestamped search and chat sources.",
        highlights: ["Local Whisper transcription", "Timestamped Qdrant retrieval", "Grounded answers with source links"]
    },
    {
        id: "agent-framework-comparison",
        title: "Same Agent in Three Frameworks",
        description: "The same task manager implemented with OpenAI Agents SDK, LangGraph, and Google ADK over one shared tool layer.",
        url: "https://github.com/RajKKapadia/LangGraph-vs-Google-ADK-vs-OpenAI-Agents-SDK",
        technology: "Python, OpenAI Agents SDK, LangGraph, Google ADK",
        category: "AI Agents",
        role: "Framework comparison and implementation",
        problem: "Compare agent orchestration models without changing the user problem, tools, or persistence layer between implementations.",
        outcome: "A practical side-by-side reference that makes differences in agent loops, graph routing, and framework discovery concrete.",
        highlights: ["Shared tools and task store", "Three equivalent implementations", "Explicit architecture comparison"]
    },
    {
        id: "ai-agents-beyond-jupyter-notebooks",
        title: "AI Agents Beyond Jupyter Notebooks",
        description: "FastAPI + Telegram bot backend that runs an OpenAI Agent with background job processing via ARQ.",
        url: "https://github.com/RajKKapadia/ai-agents-beyond-jupyter-notebook",
        technology: "Python, FastAPI, Telegram, OpenAI Agents SDK",
        category: "AI Agents",
        role: "Architecture and implementation",
        problem: "Move agent demos out of notebooks and into a production-style async messaging backend.",
        outcome: "A durable FastAPI and Telegram workflow that processes agent jobs in the background without blocking users.",
        highlights: ["Async ARQ worker", "Telegram interface", "OpenAI Agents SDK"]
    },
    {
        id: "gca-whatsapp",
        title: "WhatsApp + Google Conversational Agents Integration",
        description: "A FastAPI webhook server that connects WhatsApp to Google Conversational Agents (Dialogflow CX) and Gemini AI. Incoming WhatsApp messages are enqueued to a Redis-backed ARQ worker for async processing, so the webhook returns 200 OK immediately without risking Meta timeout/retries.",
        url: "https://github.com/RajKKapadia/Google-Conversational-Agents-WhatsApp-Python",
        technology: "Python, FastAPI, Meta, Google Cloud Platform, GCA",
        category: "Conversational AI",
        role: "Webhook and worker system",
        problem: "Connect WhatsApp conversations to Google Conversational Agents without webhook timeout failures.",
        outcome: "A production-ready async pattern for Meta webhooks, Dialogflow CX, Gemini, Redis, and background processing.",
        highlights: ["Meta webhook handling", "Redis queue", "Dialogflow CX and Gemini"]
    },
    {
        id: "text-to-sql-whatsapp",
        title: "LLM-Powered Text-to-SQL WhatsApp Application",
        description: "Natural language interface to SQL databases via WhatsApp. Real-time database queries using conversational AI, eliminating the need for SQL knowledge.",
        url: "https://github.com/RajKKapadia/YouTube-SQL-Chatbot-Postgres-Openai",
        technology: "LLM, NLP, WhatsApp API, SQL",
        category: "LLM Applications",
        role: "Prototype to applied workflow",
        problem: "Let non-technical users query structured data from a familiar chat interface.",
        outcome: "A WhatsApp-first text-to-SQL workflow that turns natural language questions into useful database answers.",
        highlights: ["Natural language SQL", "WhatsApp UX", "PostgreSQL workflow"]
    },
    {
        id: "toxic-comment-classifier",
        title: "Toxic Comment Classifier",
        description: "NLP-based system to identify and classify toxic comments in real-time, helping moderate online communities and maintain healthy discussions.",
        url: "https://github.com/RajKKapadia/YouTube-Gradio-Text-Classification",
        technology: "Python, PyTorch, Flask, NLP",
        category: "Applied ML",
        role: "Model and application build",
        problem: "Detect harmful user-generated text quickly enough to support community moderation workflows.",
        outcome: "A practical NLP classifier with a simple interface for testing and demonstrating moderation behavior.",
        highlights: ["Text classification", "PyTorch", "Gradio interface"]
    },
    {
        id: "object-detection-solution",
        title: "End-to-End Object Detection Solution",
        description: "Complete object detection pipeline from model training to deployment. Includes model evaluation, optimization, and production API endpoints.",
        url: "https://github.com/RajKKapadia/Object-Detection-Generalised-Youtube",
        technology: "TensorFlow, Python, Flask, Computer Vision",
        category: "Computer Vision",
        role: "ML pipeline delivery",
        problem: "Create a repeatable object detection path from model training through application integration.",
        outcome: "An end-to-end pipeline with training, evaluation, optimization, and API delivery foundations.",
        highlights: ["Training pipeline", "API endpoint", "Model evaluation"]
    },
    {
        id: "habit-tracker",
        title: "Habit Tracker Telegram Bot",
        description: "Track daily habits with reminders and weekly summaries. Built with Grammy framework for seamless user experience.",
        url: "https://t.me/your_streak_bot",
        technology: "TypeScript (Grammy), PostgreSQL, AWS EC2",
        category: "Bot Products",
        role: "Product engineering",
        problem: "Help users track habits without requiring another dashboard or mobile app.",
        outcome: "A Telegram-native bot with reminders, tracking, and weekly summaries backed by PostgreSQL.",
        highlights: ["Telegram UX", "PostgreSQL storage", "AWS deployment"]
    },
    {
        id: "dialogflow-template",
        title: "Dialogflow CX Webhook Template",
        description: "Production-ready Dialogflow webhook template for faster chatbot development. Secure, scalable, and optimized for enterprise use.",
        url: "https://github.com/RajKKapadia/Dialogflow-CX-Webhook-Template",
        technology: "Python FastAPI",
        category: "Developer Tools",
        role: "Template system",
        problem: "Reduce repetitive setup work when building Dialogflow CX webhook projects.",
        outcome: "A reusable FastAPI template that speeds up chatbot implementation and keeps webhook structure consistent.",
        highlights: ["FastAPI template", "Dialogflow CX", "Reusable structure"]
    },
    {
        id: "langgraph-table-booking",
        title: "LangGraph Table Booking AI Agent",
        description: "Intelligent AI agent for restaurant table booking using LangGraph. Demonstrates advanced agent orchestration and decision-making capabilities.",
        url: "https://github.com/RajKKapadia/Langgraph-Table-Booking",
        technology: "LangGraph, Python, FastAPI, NextJs",
        category: "AI Agents",
        role: "Agent orchestration",
        problem: "Coordinate multi-step booking decisions with a structured agent workflow.",
        outcome: "A restaurant booking agent concept that demonstrates orchestration across conversation, logic, and UI.",
        highlights: ["LangGraph orchestration", "FastAPI backend", "Next.js interface"]
    }
]
