"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, Variants } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight } from "lucide-react"
import type { Resource } from "@/lib/sheets"

interface ResourceCardGridProps {
  resources: Resource[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants: Variants = {
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

export function ResourceCardGrid({ resources }: ResourceCardGridProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {resources.map((resource) => (
        <motion.div key={resource.id} variants={cardVariants} className="h-full">
          <Link href={`/resources/${resource.id}`} className="block h-full">
            <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={resource.thumbnailUrl}
                  alt={resource.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-4 line-clamp-2 flex-1">
                  {resource.title}
                </h3>
                <Button className="w-full transform hover:scale-[1.02] transition-transform duration-200">
                  Get Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}
