import { Card, CardContent } from "@/components/ui/card"

export function Skills() {
    const skillCategories = [
        {
            title: "Large Language Model",
            skills: ["Fine tuning", "Inference", "Agent Development"]
        },
        {
            title: "AI & Machine Learning",
            skills: ["Natural Language Processing", "Chatbot Development", "Deep Learning"]
        },
        {
            title: "Web Development",
            skills: ["Node.js/Express", "Python/Flask", "React/Next.js"]
        },
        {
            title: "Cloud & DevOps",
            skills: ["AWS", "Docker", "GCP"]
        }
    ]

    return (
        <section className="container mx-auto px-4 py-20">
            <h2 className="text-3xl font-bold mb-8">Skills & Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
