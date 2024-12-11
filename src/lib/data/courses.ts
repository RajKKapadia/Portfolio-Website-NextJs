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
        title: "Build ChatBots with Dialogflow ES & CX",
        description: "Learn to create intelligent chatbots using Google's Dialogflow ES & CX. Master intent recognition, entity extraction, and webhook integration.",
        image: "https://images.unsplash.com/photo-1527430253228-e93688616381?w=800&auto=format&fit=crop&q=60",
        url: "https://www.udemy.com/course/build-chatbots-with-dialogflow-es-cx/",
        students: 1200,
        rating: 4.6,
        reviews: 150
    },
    {
        id: "python-course",
        title: "Python for Beginners: Build Real-World Applications",
        description: "Master Python programming through hands-on projects. Learn data structures, algorithms, and build practical applications.",
        image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&auto=format&fit=crop&q=60",
        url: "https://www.udemy.com/course/python-for-beginners-build-real-world-applications/",
        students: 2500,
        rating: 4.8,
        reviews: 320
    }
];
