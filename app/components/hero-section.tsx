import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 z-0" />
      <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-10 z-0" />

      {/* Animated circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse z-0"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse z-0"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Step Into <span className="text-primary">Style</span> With Premium Sneakers
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-xl">
              Discover the perfect blend of comfort, performance, and style with our exclusive collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="group">
                <Link href="/products" className="flex items-center">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>

            <div className="flex items-center gap-6 mt-10">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=40&width=40&text=${i}`}
                      alt="Customer"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <div className="font-medium">500+ Reviews</div>
                <div className="text-sm text-muted-foreground">Trusted by sneakerheads</div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative w-full max-w-lg mx-auto aspect-square">
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
              <Image
                src="/images/sneakers/air-max-pulse.png"
                alt="Featured Sneaker"
                fill
                className="object-contain drop-shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500"
              />
            </div>

            <div
              className="absolute top-1/4 -left-4 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-3 animate-bounce"
              style={{ animationDuration: "3s" }}
            >
              <div className="font-medium">New Arrival</div>
              <div className="text-sm text-muted-foreground">Just Dropped</div>
            </div>

            <div
              className="absolute bottom-1/4 -right-4 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-3 animate-bounce"
              style={{ animationDuration: "4s", animationDelay: "1s" }}
            >
              <div className="font-medium">Limited Edition</div>
              <div className="text-sm text-muted-foreground">Selling Fast</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

