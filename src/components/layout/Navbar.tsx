"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { href: "/#about", label: "About" },
        { href: "/#skills", label: "Skills" },
        { href: "/#projects", label: "Projects" },
        { href: "/#videos", label: "Videos" },
        { href: "/#courses", label: "Courses" },
        { href: "/#contact", label: "Contact" },
    ]

    const menuVariants = {
        closed: {
            opacity: 0,
            height: 0,
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            },
        },
    }

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b"
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-bold"
                    >
                        <Link href={"/"}>Raj Kapadia</Link>
                    </motion.span>

                    <div className="hidden md:flex items-center gap-6">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.href}
                                href={item.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * (index + 1) }}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item.label}
                            </motion.a>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <ThemeToggle />
                        </motion.div>
                    </div>

                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="md:hidden border-t overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4 space-y-2">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="block py-2 text-muted-foreground hover:text-foreground transition-colors"
                                    onClick={() => setIsOpen(false)}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
