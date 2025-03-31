"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

// Update the products array with real image paths and convert prices to INR
const products = [
  {
    id: 1,
    name: "Air Max Pulse",
    price: 11999,
    image: "/images/sneakers/air-max-pulse.png",
    category: "Running",
    isNew: true,
    brand: "Nike",
  },
  {
    id: 2,
    name: "Ultra Boost 23",
    price: 14249,
    image: "/images/sneakers/ultra-boost.png",
    category: "Running",
    isNew: false,
    brand: "Adidas",
  },
  {
    id: 3,
    name: "Retro High OG",
    price: 13499,
    image: "/images/sneakers/retro-high-og.png",
    category: "Basketball",
    isNew: true,
    brand: "Jordan",
  },
  {
    id: 4,
    name: "Classic Leather",
    price: 7499,
    image: "/images/sneakers/classic-leather.png",
    category: "Lifestyle",
    isNew: false,
    brand: "Reebok",
  },
  {
    id: 5,
    name: "Cloud Runner",
    price: 11249,
    image: "/images/sneakers/cloud-runner.png",
    category: "Running",
    isNew: true,
    brand: "On",
  },
  {
    id: 6,
    name: "Street Legend",
    price: 9749,
    image: "/images/sneakers/street-legend.png",
    category: "Lifestyle",
    isNew: true,
    brand: "Puma",
  },
  {
    id: 7,
    name: "Court Dominator",
    price: 12749,
    image: "/images/sneakers/court-dominator.png",
    category: "Basketball",
    isNew: true,
    brand: "Nike",
  },
  {
    id: 8,
    name: "Urban Walker",
    price: 8999,
    image: "/images/sneakers/urban-walker.png",
    category: "Lifestyle",
    isNew: false,
    brand: "New Balance",
  },
  {
    id: 9,
    name: "Sprint Elite",
    price: 10499,
    image: "/placeholder.svg?height=400&width=400",
    category: "Running",
    isNew: false,
    brand: "Asics",
  },
  {
    id: 10,
    name: "Hoops Pro",
    price: 11999,
    image: "/placeholder.svg?height=400&width=400",
    category: "Basketball",
    isNew: false,
    brand: "Under Armour",
  },
  {
    id: 11,
    name: "Daily Comfort",
    price: 6749,
    image: "/placeholder.svg?height=400&width=400",
    category: "Lifestyle",
    isNew: false,
    brand: "Converse",
  },
  {
    id: 12,
    name: "Trail Blazer",
    price: 11249,
    image: "/placeholder.svg?height=400&width=400",
    category: "Running",
    isNew: false,
    brand: "Salomon",
  },
]

const brands = [
  "All Brands",
  "Nike",
  "Adidas",
  "Jordan",
  "Reebok",
  "On",
  "Puma",
  "New Balance",
  "Asics",
  "Under Armour",
  "Converse",
  "Salomon",
]
const categories = ["All Categories", "Running", "Basketball", "Lifestyle"]

export default function ProductsPage() {
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 15000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const filteredProducts = products.filter((product) => {
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Filter by brand
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
      return false
    }

    // Filter by category
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price
    } else if (sortBy === "price-high") {
      return b.price - a.price
    }
    // Default: featured
    return 0
  })

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Sneakers</h1>
            <p className="text-muted-foreground">{sortedProducts.length} products found</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Products</SheetTitle>
                  <SheetDescription>Narrow down your product search with filters</SheetDescription>
                </SheetHeader>

                <div className="py-6 space-y-6">
                  <div>
                    <h3 className="font-medium mb-4">Price Range</h3>
                    <div className="px-2">
                      <Slider
                        defaultValue={[0, 15000]}
                        max={15000}
                        step={500}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
                        <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Brands</h3>
                    <div className="space-y-2">
                      {brands.slice(1).map((brand) => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox
                            id={`brand-${brand}`}
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedBrands([...selectedBrands, brand])
                              } else {
                                setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                              }
                            }}
                          />
                          <label htmlFor={`brand-${brand}`} className="text-sm">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Categories</h3>
                    <div className="space-y-2">
                      {categories.slice(1).map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories([...selectedCategories, category])
                              } else {
                                setSelectedCategories(selectedCategories.filter((c) => c !== category))
                              }
                            }}
                          />
                          <label htmlFor={`category-${category}`} className="text-sm">
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setPriceRange([0, 15000])
                      setSelectedBrands([])
                      setSelectedCategories([])
                    }}
                  >
                    Reset
                  </Button>
                  <Button className="flex-1">Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden group">
              <CardContent className="p-0 relative">
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  {product.isNew && <Badge className="absolute top-3 left-3">New</Badge>}
                </Link>
              </CardContent>
              <CardFooter className="flex flex-col items-start p-4">
                <div className="flex justify-between w-full">
                  <div className="text-sm text-muted-foreground">{product.category}</div>
                  <div className="text-sm text-muted-foreground">{product.brand}</div>
                </div>
                <Link href={`/products/${product.id}`} className="font-medium hover:underline mb-1">
                  {product.name}
                </Link>
                <div className="font-bold">₹{product.price.toLocaleString("en-IN")}</div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your filters to find what you're looking for.</p>
            <Button
              variant="outline"
              onClick={() => {
                setPriceRange([0, 15000])
                setSelectedBrands([])
                setSelectedCategories([])
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

