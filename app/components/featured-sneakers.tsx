import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredSneakers = [
  {
    id: 1,
    name: "Air Max extreme",
    price: 11999,
    image: "app/components/images/sneakers/air-max-pulse.png",
    category: "Running",
    isNew: true,
  },
  {
    id: 2,
    name: "Ultra Boost 23",
    price: 14249,
    image: "/images/sneakers/ultra-boost.png",
    category: "Running",
    isNew: false,
  },
  {
    id: 3,
    name: "Retro High OG",
    price: 13499,
    image: "/images/sneakers/retro-high-og.png",
    category: "Basketball",
    isNew: true,
  },
  {
    id: 4,
    name: "Classic Leather",
    price: 7499,
    image: "/images/sneakers/classic-leather.png",
    category: "Lifestyle",
    isNew: false,
  },
]

export default function FeaturedSneakers() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Sneakers</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/products" className="flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredSneakers.map((sneaker) => (
            <Card key={sneaker.id} className="overflow-hidden group">
              <CardContent className="p-0 relative">
                <Link href={`/products/${sneaker.id}`}>
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={sneaker.image || "/placeholder.svg"}
                      alt={sneaker.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  {sneaker.isNew && <Badge className="absolute top-3 left-3">New</Badge>}
                </Link>
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4">
                <div className="text-sm text-muted-foreground mb-1">{sneaker.category}</div>
                <Link href={`/products/${sneaker.id}`} className="font-medium hover:underline mb-1">
                  {sneaker.name}
                </Link>
                <div className="font-bold">₹{sneaker.price.toLocaleString("en-IN")}</div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

