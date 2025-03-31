import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const newArrivals = [
  {
    id: 5,
    name: "Cloud Runner",
    price: 11249,
    image: "/images/sneakers/cloud-runner.png",
    category: "Running",
  },
  {
    id: 6,
    name: "Street Legend",
    price: 9749,
    image: "/images/sneakers/street-legend.png",
    category: "Lifestyle",
  },
  {
    id: 7,
    name: "Court Dominator",
    price: 12749,
    image: "/images/sneakers/court-dominator.png",
    category: "Basketball",
  },
  {
    id: 8,
    name: "Urban Walker",
    price: 8999,
    image: "/images/sneakers/urban-walker.png",
    category: "Lifestyle",
  },
]

export default function NewArrivals() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">New Arrivals</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/products" className="flex items-center">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((sneaker) => (
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
                  <Badge variant="secondary" className="absolute top-3 left-3">
                    New
                  </Badge>
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

