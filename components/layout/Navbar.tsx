"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import Link from "next/link"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        // { href: "/#services", label: "Services" },
        { href: "/#about", label: "About" },
        { href: "/#skills", label: "Skills" },
        { href: "/#projects", label: "Projects" },
        { href: "/#videos", label: "Videos" },
        { href: "/#courses", label: "Courses" },
        { href: "/resources", label: "Resources" },
        { href: "/#contact", label: "Contact" },
    ]

    return (
        <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <span className="text-xl font-bold">
                        <Link href={"/"}>Raj Kapadia</Link>
                    </span>

                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                        <div>
                            <ThemeToggle />
                        </div>
                    </div>

                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                            aria-controls="mobile-navigation"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div id="mobile-navigation" className="border-t md:hidden">
                    <div className="container mx-auto px-4 py-4 space-y-2">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}
