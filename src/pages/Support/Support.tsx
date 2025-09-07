/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import {
  Phone,
  Mail,
  MessageCircle,
  HeadphonesIcon,
  ShieldCheck,
  Truck,
  Search,
  BookOpen,
  Video,
  FileText,
  HelpCircle,
  Zap,
  Calendar,
  UserCheck,

  MessageSquare,

  Wrench,
} from "lucide-react";

const Support = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("help");

  console.log("Active Tab:", activeTab);

  const faqItems = [
    {
      question: "How long does shipping take?",
      answer:
        "Most orders are processed within 24 hours and delivered within 3-5 business days. Express shipping options are available at checkout.",
      category: "shipping",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for unused items in original packaging. Returns are free for defective products.",
      category: "returns",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email. You can also check order status in your account dashboard.",
      category: "orders",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries. International shipping rates and delivery times vary by location.",
      category: "shipping",
    },
    {
      question: "How can I contact customer service?",
      answer:
        "You can reach us via phone at +1 (555) 123-4567, email at support@phonehub.com, or through our live chat service during business hours.",
      category: "support",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and bank transfers for certain orders.",
      category: "payments",
    },
  ];

  const supportTopics = [
    {
      title: "Order Support",
      description: "Help with orders, shipping, and returns",
      icon: <Truck className="h-8 w-8" />,
      link: "#orders",
    },
    {
      title: "Device Help",
      description: "Troubleshooting and device-specific questions",
      icon: <HelpCircle className="h-8 w-8" />,
      link: "#devices",
    },
    {
      title: "Account & Billing",
      description: "Password, payment, and account issues",
      icon: <UserCheck className="h-8 w-8" />,
      link: "#billing",
    },
    {
      title: "Repair Services",
      description: "Screen repair, battery replacement and more",
      icon: <Wrench className="h-8 w-8" />,
      link: "#repairs",
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm font-medium py-1 px-3">
            <HeadphonesIcon className="h-4 w-4 mr-1" /> Support Center
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How can we help you today?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get answers to your questions, troubleshoot issues, or contact our
            support team.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-16 max-w-2xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Find answers quickly
                </h2>
                <p className="text-gray-600">
                  Search our knowledge base or browse help topics
                </p>
              </div>
              <form
                onSubmit={handleSearch}
                className="relative max-w-2xl mx-auto"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for help articles, FAQs, and guides..."
                  className="pl-10 pr-4 py-6 text-lg border-2 "
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-blue-600 hover:bg-blue-700"
                >
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Support Topics Grid */}
        <div className="mb-16 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Popular Support Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportTopics.map((topic, index) => (
              <Card
                key={index}
                className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-blue-600 mb-4 flex justify-center group-hover:text-blue-700 transition-colors">
                    {topic.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          defaultValue="help"
          className="mb-16 max-w-4xl mx-auto"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-primary/10">
            <TabsTrigger
              value="help"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
            >
              <BookOpen className="h-4 w-4 mr-2" /> Help Articles
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
            >
              <MessageCircle className="h-4 w-4 mr-2" /> Contact Support
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-800"
            >
              <MessageSquare className="h-4 w-4 mr-2" /> Community
            </TabsTrigger>
          </TabsList>

          {/* Help Articles Tab */}
          <TabsContent value="help">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  Frequently Asked Questions
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left font-medium hover:text-blue-600">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              <div className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Video className="h-5 w-5 mr-2 text-blue-600" />
                      Video Tutorials
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Watch step-by-step guides for common tasks.
                    </p>
                    <Badge
                      variant="outline"
                      className="w-full p-2 justify-start"
                    >
                      <FileText className="h-4 w-4 mr-2" /> Device Setup Guides
                    </Badge>
                    <Badge
                      variant="outline"
                      className="w-full p-2 justify-start mt-2"
                    >
                      <FileText className="h-4 w-4 mr-2" /> Troubleshooting
                      Videos
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Contact Support Tab */}
          <TabsContent value="contact">
            <div className="grid grid-cols-1 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <MessageCircle className="mr-2 h-6 w-6" />
                    Contact Support
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    Get in touch with our support team
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-">
                  <div className="flex items-start space-x-4 p-4  rounded-lg">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Call Us</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">
                        Mon-Fri 9am-6pm EST
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 hover:text-white">
                        <a href="tel:+15551234567"> Call Now</a>
                       
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4  rounded-lg">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email Us</h3>
                      <p className="text-gray-600">support@phonehub.com</p>
                      <p className="text-sm text-gray-500">
                        We respond within 24 hours
                      </p>
                      <Button variant="outline" size="sm" className="mt-2 hover:text-white">
                        <a href="support@phonehub.com">Send Email</a>
                      
                       
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4  rounded-lg">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <MessageCircle className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Live Chat</h3>
                      <p className="text-gray-600">
                        Available during business hours
                      </p>
                      <p className="text-sm text-gray-500">
                        Get instant help from our agents
                      </p>
                      <Badge className="mt-2 p-2 bg-green-600 text-gray-200 hover:bg-green-700">
                        Start Chat
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center">
                    <MessageSquare className="mr-2 h-6 w-6" />
                    Community Forum
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-gray-600 mb-4">
                    Join our community of PhoneHub users to share tips, ask
                    questions, and get help from other enthusiasts.
                  </p>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Device Discussions</span>
                      <Badge>284 topics</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Tips & Tricks</span>
                      <Badge>156 topics</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Troubleshooting</span>
                      <Badge>432 topics</Badge>
                    </div>
                  </div>
                  <Button className="w-full mt-6">Join the Community</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Support Resources</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Zap className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Service Status</h4>
                      <p className="text-sm text-gray-600">
                        Check system status and outages
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Repair Appointment</h4>
                      <p className="text-sm text-gray-600">
                        Schedule a device repair
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <ShieldCheck className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Warranty Check</h4>
                      <p className="text-sm text-gray-600">
                        Check your device warranty status
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bottom CTA */}
        <div className="text-center max-w-xl mx-auto bg-accent/10 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Still need help?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Our customer support team is here to help you with any questions or
            issues you might have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-blue-600 text-white hover:bg-blue-700">
              <a href="tel:+1234567890">
                <Phone className="h-5 w-5 mr-2" /> Call Support
              </a>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white" size="lg" asChild>
              <a href="mailto:phonehub@gmail.com">
                <Mail className="h-5 w-5 mr-2" /> Email Us
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
