"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Marathon Runner",
    content:
      "The comfort and support of these running shoes is unmatched. I've completed two marathons in them and they still feel great. The customer service was also exceptional!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Fitness Enthusiast",
    content:
      "I've tried many brands, but KickVault offers the perfect balance of style and performance. The delivery was quick and the shoes fit perfectly. Highly recommend!",
    rating: 5,
  },
  {
    id: 3,
    name: "Vikram Singh",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Basketball Coach",
    content:
      "My team loves these basketball shoes. Great ankle support, excellent grip, and they look amazing on court. The bulk discount was a nice bonus for our team order.",
    rating: 4,
  },
  {
    id: 4,
    name: "Ananya Desai",
    avatar: "/placeholder.svg?height=100&width=100",
    role: "Fashion Blogger",
    content:
      "These sneakers are not just comfortable but also incredibly stylish. They've become a staple in my wardrobe and I get compliments every time I wear them.",
    rating: 5,
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <section className="py-20 bg-muted/10">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="w-full flex-shrink-0 border-0 shadow-lg bg-gradient-to-br from-background to-muted/50"
                >
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-primary/10 flex-shrink-0">
                        <Image
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex justify-center md:justify-start mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "w-5 h-5",
                                i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground",
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-lg md:text-xl italic mb-6">"{testimonial.content}"</p>
                        <div>
                          <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                          <p className="text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
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

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 rounded-full bg-background shadow-md"
            onClick={prevTestimonial}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 rounded-full bg-background shadow-md"
            onClick={nextTestimonial}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

