"use client"

import { Card, CardContent } from "@/components/ui/card"
import { projects } from "@/lib/data/projects"
import { AlertCircle, Cpu, Globe } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Skeleton } from "../ui/skeleton"
import { useEffect, useState } from "react"


interface PreviewData {
    title: string
    description: string
    image: string | null
}

interface WebsitePreviewProps {
    url: string
}

const WebsitePreview = ({ url }: WebsitePreviewProps) => {
    const [preview, setPreview] = useState<PreviewData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchPreview = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(`/api/preview?url=${url}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json() as PreviewData

                // Validate the response data
                if (!data || typeof data !== 'object') {
                    throw new Error('Invalid response format')
                }

                setPreview(data)
            } catch (err) {
                console.error('Error loading the preview:', err)
                setError(err instanceof Error ? err : new Error('Unknown error occurred'))
            } finally {
                setLoading(false)
            }
        }

        if (url) {
            fetchPreview()
        }
    }, [url])

    if (loading) {
        return (
            <div className="relative aspect-video">
                <Skeleton className="absolute inset-0" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="relative aspect-video bg-muted flex items-center justify-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <AlertCircle className="w-6 h-6" />
                    <span>Failed to load preview: {error.message}</span>
                </div>
            </div>
        )
    }

    return (
        <div className="relative aspect-video overflow-hidden">
            {preview?.image ? (
                <Image
                    src={preview.image}
                    alt={preview.title || 'Website preview'}
                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                    fill
                />
            ) : (
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                    <Globe className="w-8 h-8 text-muted-foreground" />
                </div>
            )}
        </div>
    )
}


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
                Projects
            </motion.h2>
            <motion.div
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {projects.map((project) => (
                    <motion.div key={project.id} variants={cardVariants}>
                        <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                            <div className="relative aspect-video overflow-hidden">
                                <WebsitePreview url={project.url} />
                            </div>
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                                    {project.title}
                                </h3>
                                <p className="text-muted-foreground mb-4 line-clamp-2">
                                    {project.description}
                                </p>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1">
                                        <Cpu className="w-4 h-4" />
                                        <span>{project.technology}</span>
                                    </div>
                                </div>
                                <Button
                                    asChild
                                    className="w-full transform hover:scale-[1.02] transition-transform duration-200"
                                >
                                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                                        Check it out!
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
