"use client"

import { Card, CardContent } from "@/components/ui/card"
import { courses } from "@/lib/data/courses"
import { Star, Users } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function Projects() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
    }

    return (
        <section className="container mx-auto px-4 py-20">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-bold mb-8"
            >
                Online Courses
            </motion.h2>
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {courses.map((course) => (
                    <motion.div key={course.id} variants={cardVariants}>
                        <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                            <div className="relative aspect-video overflow-hidden">
                                <Image
                                    src={course.image}
                                    alt={course.title}
                                    fill
                                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                                    {course.title}
                                </h3>
                                <p className="text-muted-foreground mb-4 line-clamp-2">
                                    {course.description}
                                </p>
                                <div className="flex items-center gap-4 mb-4">
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
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}
