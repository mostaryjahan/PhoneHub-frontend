import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TPhone } from "@/types"
import { Star, ShoppingCart, Eye, Truck, Shield } from "lucide-react"

const ProductCard = ({ car }: { car: TPhone }) => {
  const { _id, image, brand, model, price, discount = 0, inStock, category, rating = 4.5 } = car

  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price

  // Generate star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-3.5 h-3.5 ${index < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <Card className="group relative overflow-hidden border border-gray-200/60 bg-white shadow-sm hover:shadow-2xl hover:border-gray-300/80 transition-all duration-500 h-full flex flex-col rounded-2xl">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 space-y-2">
        {discount > 0 && (
          <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 text-xs font-bold rounded-full shadow-lg">
            -{discount}%
          </Badge>
        )}
        {category && (
          <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 text-xs font-bold rounded-full shadow-lg">
            {category}
          </Badge>
        )}
      </div>

      <Button
        size="icon"
        className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur-sm text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-full shadow-lg hover:shadow-xl hover:scale-110 border border-gray-200/50"
        disabled={!inStock}
      >
        <ShoppingCart className="w-4 h-4" />
      </Button>

      {/* Image Section */}
      <CardHeader className="p-6 pb-0">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 aspect-square group-hover:from-gray-100 group-hover:to-gray-200 transition-all duration-500">
          <img
            src={image || "/placeholder.svg"}
            alt={`${brand} ${model}`}
            className="w-full h-52 object-contain group-hover:scale-110 transition-transform duration-700 p-6"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-xl">
              <span className="text-white font-bold bg-red-500 px-4 py-2 rounded-full shadow-lg">Out of Stock</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
        </div>
      </CardHeader>

      {/* Content Section */}
      <CardContent className="p-6 flex-1 space-y-4">
        {/* Brand & Model */}
        <div className="space-y-1">
          <p className="font-medium text-gray-500 text-sm uppercase tracking-wide">{brand}</p>
          <h4 className="font-bold text-xl text-gray-900 line-clamp-2 leading-tight">{model}</h4>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">{renderStars(rating)}</div>
          <span className="text-sm font-medium text-gray-600">({rating})</span>
          <span className="text-xs text-gray-400">25 reviews</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-6 text-xs font-medium text-gray-500">
          <div className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-green-500" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-500" />
            <span>1 Year Warranty</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 pt-2">
          <span className="text-3xl font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
          {discount > 0 && <span className="text-lg text-gray-400 line-through font-medium">${price.toFixed(2)}</span>}
        </div>
      </CardContent>

      {/* Actions Section */}
      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          disabled={!inStock}
          asChild
        >
          <Link to={`/details/${_id}`}>
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Link>
        </Button>
      </CardFooter>

      <div className="absolute inset-0 rounded-2xl ring-1 ring-blue-500/0 group-hover:ring-blue-500/20 transition-all duration-500 pointer-events-none" />
    </Card>
  )
}

export default ProductCard
