"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Check, CreditCard, Landmark, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"

// Mock cart data for checkout
const cartItems = [
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

// Calculate order summary
const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
const shipping = 499
const tax = Math.round(subtotal * 0.18) // 18% GST
const total = subtotal + shipping + tax

export default function CheckoutPage() {
  const { toast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [upiId, setUpiId] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCvv, setCvv] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isPaymentComplete, setIsPaymentComplete] = useState(false)

  const handlePayment = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsPaymentComplete(true)

      toast({
        title: "Payment Successful!",
        description: "Your order has been placed successfully.",
      })
    }, 2000)
  }

  if (isPaymentComplete) {
    return (
      <main className="flex min-h-screen flex-col">
        <div className="container max-w-3xl py-12">
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Payment Successful!</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Thank you for your purchase. Your order has been placed successfully and will be shipped soon.
            </p>
            <div className="bg-muted/50 rounded-lg p-6 max-w-md mx-auto">
              <h2 className="font-medium mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Order Number:</span>
                  <span className="font-medium">
                    KV
                    {Math.floor(Math.random() * 10000)
                      .toString()
                      .padStart(4, "0")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Order Date:</span>
                  <span className="font-medium">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="font-medium capitalize">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-medium">₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
              <Button variant="outline">View Order Details</Button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="container py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" asChild className="gap-1">
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4" /> Back to Cart
            </Link>
          </Button>
          <h1 className="text-2xl font-bold ml-4">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="Enter your address" />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Enter your city" />
                  </div>
                  <div>
                    <Label htmlFor="pincode">PIN Code</Label>
                    <Input id="pincode" placeholder="Enter PIN code" />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="Enter your state" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                <Tabs defaultValue="upi" onValueChange={setPaymentMethod}>
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="upi" className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" /> UPI
                    </TabsTrigger>
                    <TabsTrigger value="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" /> Card
                    </TabsTrigger>
                    <TabsTrigger value="netbanking" className="flex items-center gap-2">
                      <Landmark className="h-4 w-4" /> Net Banking
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="upi" className="space-y-4 mt-4">
                    <div className="flex items-center justify-center py-4">
                      <Image
                        src="/images/payment/upi.png"
                        alt="UPI Payment"
                        width={120}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="card" className="space-y-4 mt-4">
                    <div className="flex items-center justify-center py-4">
                      <Image
                        src="/images/payment/cards.png"
                        alt="Card Payment"
                        width={200}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor="expiry">Expiry</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            type="password"
                            value={cardCvv}
                            onChange={(e) => setCvv(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="netbanking" className="space-y-4 mt-4">
                    <div className="flex items-center justify-center py-4">
                      <Image
                        src="/images/payment/netbanking.png"
                        alt="Net Banking"
                        width={200}
                        height={60}
                        className="object-contain"
                      />
                    </div>
                    <RadioGroup defaultValue="hdfc">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="hdfc" id="hdfc" />
                          <Label htmlFor="hdfc">HDFC Bank</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="sbi" id="sbi" />
                          <Label htmlFor="sbi">State Bank of India</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="icici" id="icici" />
                          <Label htmlFor="icici">ICICI Bank</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-3">
                          <RadioGroupItem value="axis" id="axis" />
                          <Label htmlFor="axis">Axis Bank</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="border rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <Accordion type="single" collapsible defaultValue="items">
                <AccordionItem value="items">
                  <AccordionTrigger>
                    <span className="text-sm font-medium">
                      {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 py-2">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex gap-3">
                          <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Size: {item.size} • Color: {item.color}
                            </p>
                            <div className="flex justify-between mt-1">
                              <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                              <p className="text-sm">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Separator className="my-4" />

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
                  <span className="text-muted-foreground">GST (18%)</span>
                  <span>₹{tax.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>

              <Button className="w-full" size="lg" onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Pay ₹{total.toLocaleString("en-IN")} <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

