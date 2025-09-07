import { Button } from "@/components/ui/button";
import ProductCard from "@/pages/Phones/ProductCard";
import { useGetAllPhonesQuery } from "@/redux/features/phone/phoneManagementApi";
import { TPhone } from "@/types";
import { Link } from "react-router-dom";
import { TrendingUp, Zap } from "lucide-react";

const Featured = () => {
  const { data: carsData, isLoading } = useGetAllPhonesQuery({});

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full mb-4">
            <Zap className="w-4 h-4 text-secondary" />
            <span className="text-sm font-semibold text-primary">Featured Collection</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Premium <span className="text-secondary">Smartphones</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of the latest and most innovative smartphones
          </p>
          <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {carsData?.data.slice(0, 8).map((item: TPhone) => (
            <ProductCard key={item._id} car={item} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 text-gray-600 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Over 500+ premium devices in stock</span>
            </div>
          </div>
          <Link to="/allProducts">
            <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg font-semibold rounded-lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Featured;