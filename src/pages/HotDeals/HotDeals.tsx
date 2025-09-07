import React, { useState } from "react";
import { useGetAllPhonesQuery } from "@/redux/features/phone/phoneManagementApi";
import ProductCard from "../Phones/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Slider,
} from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  Search,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  X,
  Flame
} from "lucide-react";
import { TPhone } from "@/types";

const HotDeals = () => {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("discount");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: phonesData, isLoading, error } = useGetAllPhonesQuery({
    search,
    brand: brand === "all" ? "" : brand,
    priceMin: priceRange[0],
    priceMax: priceRange[1],
    sortBy: sortBy === "default" ? "" : sortBy,
    sortOrder,
    page,
    limit,
  });

  // Filter products with discount and apply search/brand filters
  const discountProducts = phonesData?.data?.filter((product: any) => {
    const hasDiscount = product.discount > 0;
    const matchesSearch = search ? 
      product.name.toLowerCase().includes(search.toLowerCase()) || 
      product.brand.toLowerCase().includes(search.toLowerCase()) : true;
    const matchesBrand = brand === "all" ? true : product.brand === brand;
    
    return hasDiscount && matchesSearch && matchesBrand;
  }) || [];

  const clearFilters = () => {
    setSearch("");
    setBrand("all");
    setPriceRange([0, 2000]);
    setSortBy("discount");
    setSortOrder("desc");
    setPage(1);
  };

  const hasActiveFilters = search || brand !== "all" || priceRange[0] > 0 || priceRange[1] < 2000;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Products</h2>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <Flame className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Hot <span className="text-red-600">Deals</span>
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing discounts on premium smartphones. Limited time offers!
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search hot deals by brand or model..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 h-11"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
              <SelectTrigger className="w-20">
                <SelectValue placeholder="12" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="36">36</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="bg-white text-gray-700 hover:bg-gray-100"
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="bg-white text-gray-700 hover:bg-gray-100"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="w-5 h-5 text-red-600" />
                    Filter Deals
                  </CardTitle>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Brand Filter */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">Brand</h3>
                  <Select 
                    value={brand} 
                    onValueChange={setBrand}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Brands" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Brands</SelectItem>
                      <SelectItem value="Apple">Apple</SelectItem>
                      <SelectItem value="Samsung">Samsung</SelectItem>
                      <SelectItem value="Google">Google</SelectItem>
                      <SelectItem value="OnePlus">OnePlus</SelectItem>
                      <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">Price Range</h3>
                  <div className="space-y-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={2000}
                      step={50}
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Sort Options */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">Sort By</h3>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Discount" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="discount">Discount %</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="brand">Brand</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger>
                      <SelectValue placeholder="Order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Highest First</SelectItem>
                      <SelectItem value="asc">Lowest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Discount Stats */}
            <Card className="mt-6 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Deals Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Deals</span>
                    <Badge variant="outline" className="bg-red-50 text-red-700">
                      {discountProducts.length}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Max Discount</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {discountProducts.length > 0 
                        ? `${Math.max(...discountProducts.map((p: TPhone) => p.discount))}%` 
                        : '0%'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Cards */}
          <div className="w-full lg:w-3/4">
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {discountProducts.length} hot deals
              </p>
              {hasActiveFilters && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {brand && brand !== "all" && (
                    <Badge variant="secondary" className="capitalize bg-red-100 text-red-800">
                      Brand: {brand}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Special Banner */}
            {discountProducts.length > 0 && (
              <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-lg p-4 mb-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">🔥 Limited Time Offers</h3>
                    <p className="text-sm">Save up to {Math.max(...discountProducts.map((p: TPhone) => p.discount))}% on selected phones</p>
                  </div>
                  <Badge variant="outline" className="bg-white text-red-600">
                    Hot Deals
                  </Badge>
                </div>
              </div>
            )}

            {/* Products Grid/List */}
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }>
              {discountProducts.map((product:any) => (
                <ProductCard 
                  key={product._id} 
                  car={product} 
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* No Results */}
            {discountProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4 text-6xl">🔥</div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No hot deals found
                </h3>
                <p className="text-gray-500 mb-4">
                  {hasActiveFilters 
                    ? "Try adjusting your filters to see more deals"
                    : "Check back later for new discounts and promotions"
                  }
                </p>
                {hasActiveFilters && (
                  <Button onClick={clearFilters} className="bg-red-600 hover:bg-red-700">
                    Clear Filters
                  </Button>
                )}
              </div>
            )}

            {/* Pagination - Only show if we have many discounted products */}
            {discountProducts.length > limit && (
              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, Math.ceil(discountProducts.length / limit)) }, (_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <Button
                        key={pageNumber}
                        variant={page === pageNumber ? "default" : "outline"}
                        onClick={() => setPage(pageNumber)}
                        className="w-10 h-10 p-0"
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page >= Math.ceil(discountProducts.length / limit)}
                  className="flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotDeals;