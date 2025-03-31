import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const blogPosts = [
  {
    id: 1,
    title: "The Evolution of Sneaker Culture in India",
    excerpt:
      "From functional footwear to fashion statements, explore how sneaker culture has evolved in India and what's driving the current boom in the market.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 15, 2024",
    readTime: "8 min read",
    author: "Sandeep Megharaj",
    category: "Culture",
  },
  {
    id: 2,
    title: "How to Choose the Perfect Running Shoes",
    excerpt:
      "A comprehensive guide to finding running shoes that match your gait, foot type, and running style for maximum comfort and performance.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 10, 2024",
    readTime: "6 min read",
    author: "Sandeep Megharaj",
    category: "Guides",
  },
  {
    id: 3,
    title: "The Sustainable Sneaker Revolution",
    excerpt:
      "Discover how eco-friendly materials and ethical manufacturing are changing the sneaker industry for the better.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 5, 2024",
    readTime: "5 min read",
    author: "Sandeep Megharaj",
    category: "Sustainability",
  },
  {
    id: 4,
    title: "Iconic Basketball Shoes That Changed the Game",
    excerpt:
      "From the Air Jordan 1 to modern performance marvels, these are the basketball shoes that revolutionized the sport and fashion.",
    image: "/placeholder.svg?height=400&width=600",
    date: "February 28, 2024",
    readTime: "7 min read",
    author: "Sandeep Megharaj",
    category: "History",
  },
]

export default function BlogPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Insights, guides, and stories from the world of sneakers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden group hover:shadow-lg transition-all">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute top-3 left-3">{post.category}</Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{post.author}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline">Load More Articles</Button>
        </div>

        <div className="mt-16 p-8 bg-muted/30 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-2">Created by Sandeep Megharaj</h2>
          <p className="text-muted-foreground mb-4">
            Sneaker enthusiast, writer, and digital creator passionate about footwear culture
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm">
              Follow on Instagram
            </Button>
            <Button variant="outline" size="sm">
              Connect on LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

