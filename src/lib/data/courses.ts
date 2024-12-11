export interface Course {
    id: string;
    title: string;
    description: string;
    image: string;
    url: string;
    students: number;
    rating: number;
    reviews: number;
}

export const courses: Course[] = [
    {
        id: "dialogflow-course",
        title: "Master Google Dialogflow ES: Build Smart Chatbots",
        description: "Learn to build chatbots using the Dialogflow ES, supported by Python. Dialogflow ES bot, How to create chatbots.",
        image: "/courses/dialogflow-es.png",
        url: "https://www.udemy.com/course/master-google-dialogflow-build-smart-chatbots",
        students: 22,
        rating: 4.7,
        reviews: 4
    }
];
