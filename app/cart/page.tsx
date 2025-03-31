"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// Update the cart items with real image paths and convert prices to INR
const initialCartItems = [
  {
    id: 1,
    name: "Air Max Pulse",
    price: 11999,
    image: "/images/sneakers/air-max-pulse.png",
    quantity: 1,
    size: "US 9",
    color: "Black/White",
  },
  {
    id: 3,
    name: "Retro High OG",
    price: 13499,
    image: "/images/sneakers/retro-high-og.png",
    quantity: 2,
    size: "US 10",
    color: "Blue/Yellow",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  // Update the shipping cost to INR
  const shipping = 499
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4">
                    <div className="relative aspect-square w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <Link href={`/products/${item.id}`} className="font-medium hover:underline">
                          {item.name}
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-sm text-muted-foreground mt-1">
                        <p>Size: {item.size}</p>
                        <p>Color: {item.color}</p>
                      </div>

                      <div className="flex items-center justify-between mt-auto pt-4">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        {/* Update the item price display */}
                        <div className="font-medium">₹{(item.price * item.quantity).toLocaleString("en-IN")}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-between items-center">
                <Link href="/products" className="text-primary hover:underline flex items-center gap-1">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  Continue Shopping
                </Link>

                <Button variant="outline" onClick={() => setCartItems([])}>
                  Clear Cart
                </Button>
              </div>
            </div>

            <div>
              <div className="border rounded-lg p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                {/* Update all price displays to use ₹ symbol */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>₹{shipping.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>₹{tax.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Update all price displays to use ₹ symbol */}
                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                    <Button variant="outline">Apply</Button>
                  </div>

                  {/* Update the checkout button to link to the new checkout page */}
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/checkout">Checkout</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 space-y-6">
            <div className="flex justify-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold">Your cart is empty</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Looks like you haven't added any sneakers to your cart yet. Browse our collection and find your perfect
              pair.
            </p>
            <Button asChild className="mt-4">
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}

