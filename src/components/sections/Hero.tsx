import { Button } from "@/components/ui/button"
import { FileDown, Github, Mail } from "lucide-react"
import Image from "next/image"

export function Hero() {
    return (
        <section className="container mx-auto px-4 py-20">
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
                <div className="flex-1 space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold">Raj Kapadia</h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400">Senior Software Developer & AI Expert</p>
                    <div className="flex gap-4">
                        <Button asChild>
                            <a href="mailto:rajkkapadia@gmail.com">
                                <Mail className="mr-2 h-4 w-4" />
                                Contact Me
                            </a>
                        </Button>
                        <Button variant="outline" asChild>
                            <a href="https://github.com/RajKKapadia" target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </a>
                        </Button>
                        <Button variant="outline" asChild>
                            <a href="/RajKapadia.pdf" download="RajKapadia-AIML-7-Years.pdf">
                                <FileDown className="mr-2 h-4 w-4" />
                                Download Resume
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden">
                    <Image
                        src="/avatar.jpeg"
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    )
}
