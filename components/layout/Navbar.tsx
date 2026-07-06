"use client"

import { Calendar, Menu } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import Link from "next/link"
import { profile } from "@/lib/data/profile"
import { cn } from "@/lib/utils"

export function Navbar() {
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
                    <Button asChild variant="ghost" className="h-auto p-0 hover:bg-transparent">
                        <Link href="/" className="flex items-center gap-3">
                            <Badge className="size-9 rounded-md p-0 text-sm font-bold">
                                RK
                            </Badge>
                            <span className="hidden text-left leading-tight sm:block">
                                <span className="block text-sm font-semibold">Raj Kapadia</span>
                                <span className="block text-xs text-muted-foreground">AI consulting</span>
                            </span>
                        </Link>
                    </Button>

                    <div className="hidden items-center gap-3 md:flex">
                        <NavigationMenu viewport={false}>
                            <NavigationMenuList>
                                {navItems.map((item) => (
                                    <NavigationMenuItem key={item.href}>
                                        <NavigationMenuLink asChild>
                                            <a
                                                href={item.href}
                                                className="bg-transparent px-3 py-2 text-muted-foreground hover:text-foreground"
                                            >
                                                {item.label}
                                            </a>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                        <ThemeToggle />
                        <Button asChild size="sm">
                            <a href={profile.bookingUrl} target="_blank" rel="noopener noreferrer">
                                <Calendar className="size-4" />
                                Book call
                            </a>
                        </Button>
                    </div>

                    <div className="flex items-center gap-2 md:hidden">
                        <ThemeToggle />
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Open navigation">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="w-[min(22rem,85vw)]">
                                <SheetHeader>
                                    <SheetTitle>Navigation</SheetTitle>
                                    <SheetDescription>
                                        Explore Raj&apos;s services, work, resources, and contact options.
                                    </SheetDescription>
                                </SheetHeader>
                                <nav className="grid gap-2 px-4" aria-label="Mobile navigation">
                                    {navItems.map((item) => (
                                        <SheetClose asChild key={item.href}>
                                            <a
                                                href={item.href}
                                                className={cn(
                                                    buttonVariants({ variant: "ghost" }),
                                                    "justify-start"
                                                )}
                                            >
                                                {item.label}
                                            </a>
                                        </SheetClose>
                                    ))}
                                </nav>
                                <div className="mt-auto p-4">
                                    <Button asChild className="w-full">
                                        <a
                                            href={profile.bookingUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <Calendar className="size-4" />
                                            Book consulting call
                                        </a>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    )
}
