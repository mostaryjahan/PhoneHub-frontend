import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MessageCircle,
  Mail,
  Phone,
  Zap,
  Truck,
  Shield,
  CreditCard,
  Sparkles,
} from "lucide-react";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const faqCategories = [
    {
      id: "shipping",
      name: "Shipping & Delivery",
      icon: <Truck className="h-5 w-5" />,
      questions: [
        {
          question: "How long does shipping take?",
          answer:
            "Most orders are processed within 24 hours. Standard shipping takes 3-5 business days, while express shipping delivers in 1-2 business days.",
        },
        {
          question: "Do you offer international shipping?",
          answer:
            "Yes! We ship to over 50 countries. International delivery typically takes 7-14 business days depending on the destination.",
        },
        {
          question: "How can I track my order?",
          answer:
            "You'll receive a tracking number via email once your order ships. You can also check order status in your account dashboard.",
        },
      ],
    },
    {
      id: "products",
      name: "Products & Devices",
      icon: <Zap className="h-5 w-5" />,
      questions: [
        {
          question: "Are the phones unlocked?",
          answer:
            "All our phones are completely unlocked and compatible with major carriers worldwide.",
        },
        {
          question: "What warranty do you offer?",
          answer:
            "New devices come with 1-year manufacturer warranty. Refurbished devices include our 90-day quality guarantee.",
        },
        {
          question: "Do phones come with accessories?",
          answer:
            "Yes, all phones include original charger and cables. Specific accessories are listed on each product page.",
        },
      ],
    },
    {
      id: "payment",
      name: "Payment & Security",
      icon: <CreditCard className="h-5 w-5" />,
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept credit cards, PayPal, Apple Pay, Google Pay, and bank transfers. All payments are securely processed.",
        },
        {
          question: "Is my payment information safe?",
          answer:
            "Absolutely. We use industry-standard encryption and never store your full payment details on our servers.",
        },
        {
          question: "Do you offer installment plans?",
          answer:
            "Yes, we offer flexible payment plans through our financing partners. Options are available at checkout.",
        },
      ],
    },
    {
      id: "support",
      name: "Support & Returns",
      icon: <Shield className="h-5 w-5" />,
      questions: [
        {
          question: "What's your return policy?",
          answer:
            "We offer 30-day returns for unused items in original packaging. Defective products can be returned within 90 days.",
        },
        {
          question: "How do I contact support?",
          answer:
            "Reach us via live chat, email at support@phonehub.com, or phone at +1 (555) 123-4567 during business hours.",
        },
        {
          question: "Do you offer repair services?",
          answer:
            "Yes! We provide professional repair services for most devices. Schedule a repair through your account dashboard.",
        },
      ],
    },
  ];

  // Get all questions for search and "all" tab
  const allQuestions = faqCategories.flatMap((category) =>
    category.questions.map((q) => ({ ...q, category: category.name }))
  );

  const filteredQuestions =
    activeTab === "all"
      ? allQuestions.filter(
          (item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : faqCategories
          .find((cat) => cat.id === activeTab)
          ?.questions.filter(
            (item) =>
              item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.answer.toLowerCase().includes(searchQuery.toLowerCase())
          ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 ">
            Frequently Asked Questions
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about orders, products, and support
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-12 border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">
                What do you need help with?
              </h2>
              <p className="text-blue-100">
                Search our knowledge base or browse by category
              </p>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 h-5 w-5" />
              <Input
                type="text"
                placeholder="Type your question here..."
                className="pl-12 pr-4 py-6 text-lg border-0 bg-white/90 text-gray-800 focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-transparent">
            <TabsTrigger
              value="all"
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg"
            >
              All Questions
            </TabsTrigger>
            {faqCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg flex items-center gap-2"
              >
                {category.icon}
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* FAQ Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Questions List */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                {filteredQuestions.length > 0 ? (
                  <Accordion type="single" collapsible className="w-full">
                    {filteredQuestions.map((item, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        className="border-b last:border-b-0"
                      >
                        <AccordionTrigger className="py-4 text-left font-semibold hover:no-underline hover:bg-blue-50/50 px-4 rounded-lg">
                          <div className="flex items-start gap-3">
                            <Sparkles className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>{item.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 text-gray-600">
                          <div className="pl-8">
                            {item.answer}
                            {(
                              item as {
                                question: string;
                                answer: string;
                                category: string;
                              }
                            ).category &&
                              activeTab === "all" && (
                                <div className="mt-3">
                                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {
                                      (
                                        item as {
                                          question: string;
                                          answer: string;
                                          category: string;
                                        }
                                      ).category
                                    }
                                  </span>
                                </div>
                              )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-500">
                      Try different keywords or contact our support team for
                      help.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Support Sidebar */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Need more help?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Call us</p>
                      <p className="text-blue-100 text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <div className="bg-white/20 p-2 rounded-full">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Email us</p>
                      <p className="text-blue-100 text-sm">
                        support@phonehub.com
                      </p>
                    </div>
                  </div>

                  <Button className="w-full bg-white text-blue-600 hover:bg-blue-50">
                    Start Live Chat
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">
                  Popular Resources
                </h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    📱 Device Setup Guides
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🔧 Repair Services
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    💳 Payment Options
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📦 Track Your Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
