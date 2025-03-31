import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import FeaturedSneakers from "./components/featured-sneakers"
import HeroSection from "./components/hero-section"
import NewArrivals from "./components/new-arrivals"
import Categories from "./components/categories"
import NewLaunches from "./components/new-launches"
import Testimonials from "./components/testimonials"
import Newsletter from "./components/newsletter"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">KICK</span>VAULT
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="outline" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
            </Link>
            <Link href="/login" className="hidden md:block">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup" className="hidden md:block">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <HeroSection />
      <NewLaunches />
      <FeaturedSneakers />
      <Categories />
      <NewArrivals />
      <Testimonials />
      <Newsletter />

      <footer className="border-t bg-muted/40">
        <div className="container py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="text-primary">KICK</span>VAULT
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium sneakers for the modern enthusiast. Quality, style, and comfort in every step.
            </p>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Created by Sandeep Megharaj</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  All Sneakers
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/running"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Running
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/basketball"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Basketball
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/lifestyle"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Phone: +91 9347775873</li>
              <li className="text-muted-foreground">Email: sandeepmegharaj@gmail.com</li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="container py-6 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} KickVault. All rights reserved.
        </div>
      </footer>
    </main>
  )
}

