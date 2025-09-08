import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { TPhone } from "@/types"
import { Star, ShoppingCart, Eye, Truck, Shield, Loader2 } from "lucide-react"
import { useAddToCartMutation } from "@/redux/features/Cart/CartApi"
import { useAppSelector } from "@/redux/features/hook"
import { selectCurrentUser } from "@/redux/features/auth/authSlice"
import { toast } from "sonner"
import { useState } from "react"

const ProductCard = ({ car }: { car: TPhone }) => {
  const { _id, image, brand, model, price, discount = 0, inStock, category, rating = 4.5 } = car
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  
  const currentUser = useAppSelector(selectCurrentUser)
  const [addToCart] = useAddToCartMutation()

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

  const handleAddToCart = async () => {
    if (!currentUser) {
      toast.error("Please login to add items to cart")
      return
    }

    if (!inStock) {
      toast.error("This product is out of stock")
      return
    }

    setIsAddingToCart(true)
    
    try {
      const cartItem = {
        productId: _id,
        email: currentUser.email
      }

      const result = await addToCart(cartItem).unwrap()
      
      if (result.success) {
        toast.success(result.message || "Product added to cart successfully!")
      } else {
        toast.error(result.message || "Failed to add to cart")
      }
    } catch (error: any) {
      console.error("Add to cart error:", error)
      
      // Handle different error formats
      if (error?.data?.message) {
        toast.error(error.data.message)
      } else if (error?.data?.errorSources?.[0]?.message) {
        toast.error(error.data.errorSources[0].message)
      } else if (error?.status === 401) {
        toast.error("Please login to add items to cart")
      } else if (error?.status === 400) {
        toast.error("Invalid request. Please try again.")
      } else {
        toast.error("Failed to add to cart. Please try again.")
      }
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <Card className="group relative overflow-hidden border border-gray-200/60 shadow-sm hover:shadow-xl hover:border-gray-300/80 transition-all duration-500 h-full flex flex-col rounded-2xl">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 space-y-2 space-x-1">
        {discount > 0 && (
          <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-1 text-xs font-bold rounded-full shadow-lg">
            -{discount}%
          </Badge>
        )}
        {category && (
          <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-1 text-xs font-bold rounded-full shadow-lg">
            {category}
          </Badge>
        )}
      </div>

      <Button
        size="icon"
        onClick={handleAddToCart}
        className="absolute top-52 right-4 z-20 bg-accent/10 backdrop-blur-sm text-accent hover:bg-blue-500 hover:text-white transition-all duration-300 rounded-full shadow-lg hover:shadow-lg hover:scale-110 border border-gray-200/50"
        disabled={!inStock || isAddingToCart}
      >
        {isAddingToCart ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <ShoppingCart className="w-4 h-4" />
        )}
      </Button>

      {/* Image Section */}
      <CardHeader className="">
        <div className="relative overflow-hidden aspect-square bg-gradient-to-t from-white to-gray-100 group-hover:from-gray-100 group-hover:to-gray-200 transition-all duration-500">
          <img
            src={image || "/placeholder.svg"}
            alt={`${brand} ${model}`}
            className="w-full object-contain group-hover:scale-110 transition-transform duration-700"
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
      <CardContent className="px-4 flex-1 space-y-2">
        {/* Brand & Model */}
        <div className="space-y-1">
          <p className="font-medium text-gray-500 text-sm uppercase tracking-wide">{brand}</p>
          <h4 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight">{model}</h4>
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
          <span className="text-xl font-bold text-gray-900">${discountedPrice.toFixed(2)}</span>
          {discount > 0 && <span className=" text-gray-400 line-through font-medium">${price.toFixed(2)}</span>}
        </div>
      </CardContent>

      {/* Actions Section */}
      <CardFooter className="px-6 pt-0">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
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