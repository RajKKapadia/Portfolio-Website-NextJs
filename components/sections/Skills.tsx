import { Card, CardContent } from "@/components/ui/card"

export function Skills() {
    const skillCategories = [
        {
            title: "Large Language Models (LLMs)",
            skills: ["Fine-tuning & Training", "Inference Optimization", "AI Agent Development (OpenAI Agent SDK, Google ADK)", "LLM Application Development", "Prompt Engineering"]
        },
        {
            title: "AI/ML/DL",
            skills: ["TensorFlow", "PyTorch", "Image Classification", "Object Detection", "Natural Language Processing (NLP)", "Computer Vision", "Deep Learning", "Vector Databases (Elastic, Qdrant)"]
        },
        {
            title: "API Development",
            skills: ["Python + Flask", "Python + FastAPI", "Node.js + Express (JavaScript)", "Node.js + Express (TypeScript)", "RESTful APIs", "Webhook Development"]
        },
        {
            title: "Full-Stack Development",
            skills: ["React (TypeScript)", "Next.js (App Router, TypeScript)", "Drizzle ORM", "Prisma", "ShadCN UI", "TailwindCSS", "PostgreSQL"]
        },
        {
            title: "Cloud Platforms",
            skills: ["Google Cloud Platform (GCP)", "Amazon Web Services (AWS)", "Docker", "Cloud Deployment", "Serverless Architecture"]
        },
        {
            title: "Chatbot Development",
            skills: ["Google Dialogflow ES", "Google Dialogflow CX", "Actions on Google", "Conversational AI", "100+ Production Chatbots"]
        },
        {
            title: "Bot Development",
            skills: ["Telegram Bots (Python: python-telegram-bot, aiogram)", "Telegram Bots (TypeScript: telegraf, grammy)", "WhatsApp Integration"]
        },
        {
            title: "Specialized Projects",
            skills: ["Text-to-SQL Systems", "Image Search Engines", "Face Recognition", "Voice Authentication", "Toxic Comment Classification"]
        }
    ]

    return (
        <section className="container mx-auto px-4 py-20">
            <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {skillCategories.map((category) => (
                    <Card key={category.title}>
                        <CardContent className="pt-6">
                            <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                            <ul className="list-disc list-inside space-y-2">
                                {category.skills.map((skill) => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}
