"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check, CreditCard, Landmark, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// Mock order summary
const orderSummary = {
  subtotal: 38997,
  shipping: 499,
  tax: 7019, // 18% GST
  total: 46515,
}

export default function PaymentPage() {
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
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Check className="h-10 w-10 text-primary" />
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
                  <span className="font-medium">₹{orderSummary.total.toLocaleString("en-IN")}</span>
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
      <div className="container py-8 max-w-4xl">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" asChild className="gap-1">
            <Link href="/checkout">
              <ArrowLeft className="h-4 w-4" /> Back to Shipping
            </Link>
          </Button>
          <h1 className="text-2xl font-bold ml-4">Payment</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="bg-muted px-6 py-4 border-b">
                <h2 className="font-medium">Choose Payment Method</h2>
              </div>
              <CardContent className="p-6">
                <Tabs defaultValue="upi" onValueChange={setPaymentMethod} className="w-full">
                  <TabsList className="grid grid-cols-3 w-full mb-6">
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

                  <TabsContent value="upi" className="space-y-6">
                    <div className="flex items-center justify-center py-4">
                      <Image
                        src="/images/payment/upi.png"
                        alt="UPI Payment"
                        width={150}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <div className="space-y-2 max-w-md mx-auto">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        Enter your UPI ID (e.g., mobilenumber@upi, username@bank)
                      </p>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4 max-w-md mx-auto">
                      <h3 className="font-medium mb-2">How to pay using UPI</h3>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                        <li>Enter your UPI ID</li>
                        <li>Click on "Pay Now"</li>
                        <li>Approve the payment request in your UPI app</li>
                        <li>Wait for confirmation</li>
                      </ol>
                    </div>
                  </TabsContent>

                  <TabsContent value="card" className="space-y-6">
                    <div className="flex items-center justify-center py-4">
                      <Image
                        src="/images/payment/cards.png"
                        alt="Card Payment"
                        width={250}
                        height={50}
                        className="object-contain"
                      />
                    </div>
                    <div className="space-y-4 max-w-md mx-auto">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
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

                  <TabsContent value="netbanking" className="space-y-6">
                    <div className="flex items-center justify-center py-4">
                      <Image
                        src="/images/payment/netbanking.png"
                        alt="Net Banking"
                        width={250}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <div className="max-w-md mx-auto">
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
                          <div className="flex items-center space-x-2 border rounded-md p-3">
                            <RadioGroupItem value="kotak" id="kotak" />
                            <Label htmlFor="kotak">Kotak Mahindra</Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-md p-3">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other Banks</Label>
                          </div>
                        </div>
                      </RadioGroup>
                      <p className="text-sm text-muted-foreground mt-4">
                        You will be redirected to your bank's website to complete the payment.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-20">
              <div className="bg-muted px-6 py-4 border-b">
                <h2 className="font-medium">Order Summary</h2>
              </div>
              <CardContent className="p-6">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{orderSummary.subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>₹{orderSummary.shipping.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">GST (18%)</span>
                    <span>₹{orderSummary.tax.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-bold text-lg mb-6">
                  <span>Total</span>
                  <span>₹{orderSummary.total.toLocaleString("en-IN")}</span>
                </div>

                <Button className="w-full" size="lg" onClick={handlePayment} disabled={isProcessing}>
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    `Pay ₹${orderSummary.total.toLocaleString("en-IN")}`
                  )}
                </Button>

                <div className="mt-6 flex items-center justify-center gap-2">
                  <div className="text-xs text-muted-foreground">Secured by</div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-medium">SecurePay</span>
                  </div>
                </div>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}

