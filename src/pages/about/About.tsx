import { 
  Shield, 
  Award, 
  Heart, 
  Globe, 
} from "lucide-react";

const About = () => {
  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Products Available" },
    { number: "50+", label: "Brands" },
    { number: "24/7", label: "Customer Support" }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    },
    {
      name: "Michael Chen",
      role: "Tech Director",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Head",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
    },
    {
      name: "David Kim",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    }
  ];

  const values = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Trust & Security",
      description: "We ensure all transactions are secure and your data is protected with industry-standard encryption."
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Quality Assurance",
      description: "Every product undergoes rigorous testing to meet our high standards before reaching your hands."
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Customer First",
      description: "Your satisfaction is our priority. We go above and beyond to ensure you have the best experience."
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Global Reach",
      description: "We ship worldwide, bringing the latest technology to your doorstep no matter where you are."
    }
  ];



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About PhoneHub</h1>
          <p className="text-xl md:text-2xl text-secondary max-w-3xl mx-auto">
            Your trusted partner in the world of mobile technology
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2015, PhoneHub started as a small passion project between tech enthusiasts 
                who believed everyone deserves access to the latest mobile technology at affordable prices.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Today, we've grown into one of the leading online destinations for smartphones, accessories, 
                and tech solutions, serving customers across the globe with the same dedication and passion.
              </p>
              <p className="text-lg text-gray-700">
                Our mission is simple: to connect people with the technology that enhances their lives 
                while providing exceptional service and value.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1715&q=80"
                alt="PhoneHub Team"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-secondary text-primary p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">8+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-secondary">{stat.number}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-secondary mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-primary mb-2">{member.name}</h3>
                <p className="text-secondary">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    
    
    </div>
  );
};

export default About;