import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
  HeadphonesIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/Logo";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: any) => {
    e.preventDefault();
    
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      // In a real application, you would call your newsletter API here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll just set the subscribed state to true
      setIsSubscribed(true);
      setEmail("");
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-950 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className=" bg-secondary/90 rounded-lg flex items-center justify-center p-1">
               <Logo/>
              </div>
              <span className="text-2xl font-bold">PhoneHub</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted destination for the latest smartphones, accessories, 
              and technology solutions. We bring innovation to your fingertips.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-secondary hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-secondary hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-secondary hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-secondary hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-secondary">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-secondary transition-colors">Home</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-secondary transition-colors">Products</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-secondary transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-secondary transition-colors">Contact</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-secondary transition-colors">Blog</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-secondary transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-secondary">Categories</h3>
            <ul className="space-y-3">
              <li><a href="/phones/flagship" className="text-gray-300 hover:text-secondary transition-colors">Flagship Phones</a></li>
              <li><a href="/phones/budget" className="text-gray-300 hover:text-secondary transition-colors">Budget Phones</a></li>
              <li><a href="/phones/5g" className="text-gray-300 hover:text-secondary transition-colors">5G Phones</a></li>
              <li><a href="/accessories" className="text-gray-300 hover:text-secondary transition-colors">Accessories</a></li>
              <li><a href="/brands/apple" className="text-gray-300 hover:text-secondary transition-colors">Apple</a></li>
              <li><a href="/brands/samsung" className="text-gray-300 hover:text-secondary transition-colors">Samsung</a></li>
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-secondary">Stay Updated</h3>
            <p className="text-gray-300">Subscribe to our newsletter for the latest products and offers</p>
            
            {isSubscribed ? (
              <div className="p-3 bg-green-900/30 border border-green-800 rounded-md text-green-400 text-center">
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit"
                  className="w-full bg-secondary text-primary hover:bg-secondary/90 font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            )}
            
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary" />
                <span className="text-gray-300">support@phonehub.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-secondary" />
                <span className="text-gray-300">123 Tech Street, Silicon Valley, CA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-secondary/40" />
              <span className="text-gray-400">Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="w-6 h-6 text-secondary/40" />
              <span className="text-gray-400">Free Shipping Over $499</span>
            </div>
            <div className="flex items-center space-x-2">
              <HeadphonesIcon className="w-6 h-6 text-secondary/40" />
              <span className="text-gray-400">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <CreditCard className="w-6 h-6 text-secondary/40" />
              <span className="text-gray-400">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 PhoneHub. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <p className="text-gray-400 hover:text-secondary text-sm transition-colors">
                Privacy Policy
              </p>
              <p className="text-gray-400 hover:text-secondary text-sm transition-colors">
                Terms of Service
              </p>
              <p className="text-gray-400 hover:text-secondary text-sm transition-colors">
                Refund Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;