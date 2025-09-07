import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <div>
       {/* CTA Section */}
      <section className="bg-accent text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the PhoneHub Family</h2>
          <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
            Experience the difference that quality products and exceptional service can make.
          </p>
          <div className="space-x-4">
            <Button 
              className="bg-secondary text-primary hover:bg-secondary/90 font-bold py-3 px-8 text-lg"
              asChild
            >
              <a href="/shop">Shop Now</a>
            </Button>
            <Button 
              variant="outline" 
              className="border-secondary text-secondary hover:bg-secondary/10 font-bold py-3 px-8 text-lg"
              asChild
            >
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CTA;