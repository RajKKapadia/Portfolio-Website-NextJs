import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { courses } from "@/lib/data/courses"
import { ArrowUpRight, Star, Users } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Courses() {
    return (
        <section className="bg-background">
            <div className="container mx-auto px-4 py-16 lg:py-20">
                <div className="mb-10 max-w-3xl">
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-700 dark:text-amber-400">
                        Courses
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
                        Learn the chatbot foundations behind production consulting work.
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    {courses.map((course) => (
                        <Card key={course.id} className="group h-full overflow-hidden border-border/70 bg-muted/25 p-0 shadow-sm">
                            <AspectRatio ratio={16 / 9} className="relative overflow-hidden">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    placeholder="blur"
                                />
                            </AspectRatio>
                            <CardHeader className="p-5 pb-0 sm:p-6 sm:pb-0">
                                <CardTitle>
                                    <h3 className="text-2xl tracking-normal">{course.title}</h3>
                                </CardTitle>
                                <CardDescription className="text-base leading-7">
                                    {course.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-1.5">
                                        <Users className="size-4" />
                                        <span>{course.students.toLocaleString()} students</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                                        <span>
                                            {course.rating} ({course.reviews} reviews)
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-5 pt-0 sm:p-6 sm:pt-0">
                                <Button asChild className="mt-6 w-full">
                                    <a href={course.url} target="_blank" rel="noopener noreferrer">
                                        View course
                                        <ArrowUpRight className="size-4" />
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
