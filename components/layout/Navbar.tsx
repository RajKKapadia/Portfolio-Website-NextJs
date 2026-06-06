"use client"

import { useState } from "react"
import { Calendar, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import Link from "next/link"
import { profile } from "@/lib/data/profile"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { href: "/#services", label: "Services" },
        { href: "/#work", label: "Work" },
        { href: "/#expertise", label: "Expertise" },
        { href: "/resources", label: "Resources" },
        { href: "/#courses", label: "Courses" },
        { href: "/#contact", label: "Contact" },
    ]

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-xl">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="grid size-9 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
                            RK
                        </span>
                        <span className="hidden leading-tight sm:block">
                            <span className="block text-sm font-semibold">Raj Kapadia</span>
                            <span className="block text-xs text-muted-foreground">AI consulting</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                        <ThemeToggle />
                        <Button asChild size="sm">
                            <a href={profile.bookingUrl} target="_blank" rel="noopener noreferrer">
                                <Calendar className="size-4" />
                                Book call
                            </a>
                        </Button>
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
                <div id="mobile-navigation" className="border-t border-border/70 bg-background md:hidden">
                    <div className="container mx-auto px-4 py-4 space-y-2">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        <Button asChild className="mt-3 w-full">
                            <a
                                href={profile.bookingUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsOpen(false)}
                            >
                                <Calendar className="size-4" />
                                Book consulting call
                            </a>
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    )
}
