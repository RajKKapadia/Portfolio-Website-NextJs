export interface Project {
    id: string
    title: string
    description: string
    image: string
    url: string
    students: number
    rating: number
    reviews: number
}

export const projects: Project[] = [
    {
        id: "dialogflow-course",
        title: "EasyMeet",
        description: "A seamless scheduling platform that allows users to share their availability and let others effortlessly book appointments. Simplify time management, eliminate back-and-forth emails, and make scheduling a breeze.",
        image: "/courses/dialogflow-es.png",
        url: "https://www.udemy.com/course/master-google-dialogflow-build-smart-chatbots",
        students: 22,
        rating: 4.7,
        reviews: 4
    }
]
