import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TPhone } from "@/types";
import { Star, ShoppingCart, Eye, Heart, Truck, Shield } from "lucide-react";

const ProductCard = ({ car, viewMode = "grid" }: { car: TPhone; viewMode?: "grid" | "list" }) => {
  const {
    _id,
    image,
    brand,
    model,
    price,
    discount = 0,
    inStock,
    category,
    rating = 4.5,
  } = car;

  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

  // Generate star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 space-y-2">
        {discount > 0 && (
          <Badge className="bg-red-500 text-white px-2 py-1 text-xs font-bold">
            -{discount}%
          </Badge>
        )}
        {category && (
          <Badge className="bg-secondary text-primary px-2 py-1 text-xs font-bold">
            {category}
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 bg-white/90 rounded-full hover:bg-red-500 hover:text-white transition-colors"
      >
        <Heart className="w-4 h-4" />
      </Button>

      {/* Image Section */}
      <CardHeader className="p-4 pb-0">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square">
          <img
            src={image}
            alt={`${brand} ${model}`}
            className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300 p-4"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold bg-red-500 px-3 py-1 rounded">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="p-4 flex-1">
        {/* Brand */}
        <h3 className="font-semibold text-gray-700 text-sm mb-1">{brand}</h3>
        
        {/* Model */}
        <h4 className="font-bold text-lg text-primary mb-2 line-clamp-1">
          {model}
        </h4>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(rating)}
          </div>
          <span className="text-sm text-gray-600">25</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Truck className="w-3 h-3" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>1 Year Warranty</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-primary">
            ${discountedPrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="text-sm text-gray-500 line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      {/* Actions Section */}
      <CardFooter className="p-4 pt-0">
        <div className="flex gap-2 w-full">
          <Button
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
            disabled={!inStock}
            asChild
          >
            <Link to={`/details/${_id}`}>
              <Eye className="w-4 h-4 mr-2" />
              Details
            </Link>
          </Button>
          <Button
            size="icon"
            className="bg-secondary text-primary hover:bg-secondary/90"
            disabled={!inStock}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </CardFooter>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
};

export default ProductCard;