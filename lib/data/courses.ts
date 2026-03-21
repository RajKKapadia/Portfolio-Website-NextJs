import type { StaticImageData } from "next/image"
import dialogflowCxImage from "@/public/courses/dialogflow-cx.png"
import dialogflowEsImage from "@/public/courses/dialogflow-es.png"

export interface Course {
    id: string
    title: string
    description: string
    image: StaticImageData
    url: string
    students: number
    rating: number
    reviews: number
}

export const courses: Course[] = [
    {
        id: "dialogflow-course",
        title: "Master Google Dialogflow ES: Build Smart Chatbots",
        description: "Learn to build chatbots using the Dialogflow ES, supported by Python.",
        image: dialogflowEsImage,
        url: "https://www.udemy.com/course/master-google-dialogflow-build-smart-chatbots",
        students: 70,
        rating: 4.6,
        reviews: 16
    },
    {
        id: "dialogflow-cx-course",
        title: "Master Dialogflow CX - Build Engaging Chatbots [2025]",
        description: "Learn to build chatbots using the Dialogflow CX, supported by Python and FastAPI.",
        image: dialogflowCxImage,
        url: "https://www.udemy.com/course/master-dialogflow-cx-build-engaging-chatbots-2025",
        students: 1206,
        rating: 4.2,
        reviews: 33
    }
]
