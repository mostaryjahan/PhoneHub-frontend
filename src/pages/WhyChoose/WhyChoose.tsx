import { Clock, HeadphonesIcon, Shield, Truck } from "lucide-react";

const WhyChoose = () => {
      const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "On orders over $499"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Dedicated customer service"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Warranty",
      description: "On all products"
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8" />,
      title: "Expert Advice",
      description: "Tech specialists available"
    }
  ];
  return (
    <div>
       {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16">Why Choose PhoneHub?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-secondary mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default WhyChoose;