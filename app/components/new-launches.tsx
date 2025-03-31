"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const newLaunches = [
  {
    id: 101,
    name: "AeroGlide X",
    price: 15999,
    image: "/images/sneakers/air-max-pulse.png",
    color: "Cosmic Blue",
    releaseDate: "Just Released",
    description: "Revolutionary cushioning with adaptive fit technology",
  },
  {
    id: 102,
    name: "Velocity Pro",
    price: 18499,
    image: "/images/sneakers/ultra-boost.png",
    color: "Neon Fusion",
    releaseDate: "Limited Edition",
    description: "Engineered for speed with responsive energy return",
  },
  {
    id: 103,
    name: "Horizon Elite",
    price: 16999,
    image: "/images/sneakers/retro-high-og.png",
    color: "Sunset Gradient",
    releaseDate: "New Collection",
    description: "Premium materials with iconic silhouette reimagined",
  },
  {
    id: 104,
    name: "Quantum Leap",
    price: 14999,
    image: "/images/sneakers/cloud-runner.png",
    color: "Metallic Silver",
    releaseDate: "Exclusive Drop",
    description: "Futuristic design with cutting-edge performance features",
  },
]

export default function NewLaunches() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === newLaunches.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setActiveIndex((prev) => (prev === 0 ? newLaunches.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [activeIndex, isAnimating])

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30 overflow-hidden">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              New Launches
            </h2>
            <p className="text-muted-foreground mt-2">Exclusive 2D portrait collection of our latest releases</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full" onClick={prevSlide} disabled={isAnimating}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={nextSlide} disabled={isAnimating}>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-xl bg-muted/20">
          {newLaunches.map((launch, index) => (
            <div
              key={launch.id}
              className={cn(
                "absolute inset-0 flex flex-col md:flex-row items-center transition-all duration-500 ease-in-out",
                index === activeIndex
                  ? "opacity-100 translate-x-0"
                  : index < activeIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full",
              )}
            >
              <div className="w-full md:w-1/2 p-8 md:p-16 flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square">
                  <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
                  <Image
                    src={launch.image || "/placeholder.svg"}
                    alt={launch.name}
                    fill
                    className="object-contain drop-shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                <Badge className="w-fit mb-4">{launch.releaseDate}</Badge>
                <h3 className="text-3xl md:text-5xl font-bold mb-2">{launch.name}</h3>
                <p className="text-xl text-muted-foreground mb-2">{launch.color}</p>
                <p className="text-2xl font-bold mb-4">₹{launch.price.toLocaleString("en-IN")}</p>
                <p className="text-muted-foreground mb-8">{launch.description}</p>
                <div className="flex gap-4">
                  <Button asChild size="lg">
                    <Link href={`/products/${launch.id}`}>
                      <ShoppingBag className="mr-2 h-5 w-5" /> Shop Now
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/products">View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {newLaunches.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === activeIndex ? "w-8 bg-primary" : "bg-muted-foreground/30",
                )}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

