import { Card, CardContent } from "@/components/ui/card"
import { courses } from "@/lib/data/courses"
import { Star, Users } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Courses() {
    return (
        <section className="container mx-auto px-4 py-20">
            <h2 className="text-3xl font-bold mb-8">
                Online Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map((course) => (
                    <div key={course.id} className="h-full">
                        <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                            <div className="relative aspect-video overflow-hidden">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    placeholder="blur"
                                />
                            </div>
                            <CardContent className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                                    {course.title}
                                </h3>
                                <p className="text-muted-foreground mb-4 line-clamp-2 flex-1">
                                    {course.description}
                                </p>
                                <div className="flex items-center gap-4 mb-4 mt-auto">
                                    <div className="flex items-center gap-1">
                                        <Users className="w-4 h-4" />
                                        <span>{course.students.toLocaleString()} students</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span>
                                            {course.rating} ({course.reviews} reviews)
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    asChild
                                    className="w-full transform hover:scale-[1.02] transition-transform duration-200"
                                >
                                    <a href={course.url} target="_blank" rel="noopener noreferrer">
                                        Enroll Now
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    )
}
