"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Update the product data with real image paths and convert prices to INR
const product = {
  id: 1,
  name: "Air Max Pulse",
  price: 11999,
  images: [
    "/images/sneakers/air-max-pulse.png",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ],
  category: "Running",
  brand: "Nike",
  isNew: true,
  description:
    "The Nike Air Max Pulse draws inspiration from the London music scene, bringing an underground touch to the iconic Air Max line. The textile-wrapped midsole and vacuum-sealed accents give these sneakers a progressive feel, while the Air unit in the heel provides responsive cushioning for all-day comfort.",
  features: [
    "Mesh and synthetic upper for breathability",
    "Air cushioning for comfort",
    "Rubber outsole for traction",
    "Padded collar for a comfortable fit",
    "Pull tab for easy on and off",
  ],
  sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12],
  colors: ["Black/White", "Grey/Red", "Blue/Yellow"],
  rating: 4.5,
  reviewCount: 128,
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(product.images[0])

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-8">
        <div className="flex flex-wrap text-sm mb-6">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link href="/products" className="text-muted-foreground hover:text-foreground">
            Products
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="aspect-square relative rounded-lg overflow-hidden border">
              <Image src={mainImage || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              {product.isNew && <Badge className="absolute top-3 left-3">New</Badge>}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square relative rounded-md overflow-hidden border ${
                    mainImage === image ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setMainImage(image)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">{product.brand}</div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : i < product.rating
                          ? "text-yellow-400 fill-yellow-400 opacity-50"
                          : "text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            {/* Update the price display to use ₹ symbol */}
            <p className="text-2xl font-bold mb-6">₹{product.price.toLocaleString("en-IN")}</p>

            <p className="text-muted-foreground mb-6">{product.description}</p>

            <div className="space-y-6">
              <div>
                <label htmlFor="color" className="block text-sm font-medium mb-2">
                  Color
                </label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger id="color" className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium mb-2">
                  Size
                </label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger id="size" className="w-full">
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size.toString()} value={size.toString()}>
                        US {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center">
                  <Button variant="outline" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={incrementQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="flex-1 gap-2" size="lg">
                  <ShoppingBag className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Heart className="h-5 w-5" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList className="w-full justify-start border-b rounded-none">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="py-4">
              <p>{product.description}</p>
            </TabsContent>
            <TabsContent value="features" className="py-4">
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews" className="py-4">
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < product.rating
                            ? "text-yellow-400 fill-yellow-400 opacity-50"
                            : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating} out of 5</span>
              </div>
              <p className="text-muted-foreground mb-6">Based on {product.reviewCount} reviews</p>

              <Button>Write a Review</Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

