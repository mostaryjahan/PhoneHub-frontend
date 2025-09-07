import { Button } from "@/components/ui/button";
import { Contact, ShoppingBagIcon } from "lucide-react";

const CTA = () => {
  return (
    <div>
       {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 mt-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-3">Join the PhoneHub Family</h2>
          <p className="text-lg text-secondary mb-6 max-w-2xl mx-auto">
            Experience the difference that quality products and exceptional service can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                <ShoppingBagIcon className="h-5 w-5 mr-2" /> Call Support
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
                <Contact className="h-5 w-5 mr-2" /> Contact Us
              </Button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default CTA;