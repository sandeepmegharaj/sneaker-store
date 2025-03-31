import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const categories = [
  {
    id: "running",
    name: "Running",
    image: "/images/categories/running.png",
    count: 42,
    description: "Engineered for speed, comfort, and endurance on any terrain",
  },
  {
    id: "basketball",
    name: "Basketball",
    image: "/images/categories/basketball.png",
    count: 36,
    description: "Designed for explosive movements, stability, and court control",
  },
  {
    id: "lifestyle",
    name: "Lifestyle",
    image: "/images/categories/lifestyle.png",
    count: 58,
    description: "Blend of style and comfort for everyday urban adventures",
  },
]

export default function Categories() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Shop By Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections designed for specific activities and styles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="overflow-hidden h-full group border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0 relative">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end p-6 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm text-white/80 mb-3 text-center">{category.description}</p>
                    <p className="mb-4">{category.count} Products</p>
                    <Button
                      asChild
                      variant="outline"
                      className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white"
                    >
                      <Link href={`/categories/${category.id}`} className="flex items-center gap-2">
                        Explore Collection <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

