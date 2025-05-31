export interface Course {
    id: string
    title: string
    description: string
    image: string
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
        image: "/courses/dialogflow-es.png",
        url: "https://www.udemy.com/course/master-google-dialogflow-build-smart-chatbots",
        students: 44,
        rating: 4.74,
        reviews: 9
    },
    {
        id: "dialogflow-cx-course",
        title: "Master Dialogflow CX - Build Engaging Chatbots [2025]",
        description: "Learn to build chatbots using the Dialogflow CX, supported by Python and FastAPI.",
        image: "/courses/dialogflow-cx.png",
        url: "https://www.udemy.com/course/master-dialogflow-cx-build-engaging-chatbots-2025",
        students: 19,
        rating: 0.0,
        reviews: 0
    }
]
