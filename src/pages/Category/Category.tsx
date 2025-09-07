// src/pages/Category/CategoryPage.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
  Home,
} from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

// Define category mappings
const categoryMappings: Record<string, { filterKey: string; filterValue: string | number }> = {
  // Brand categories
  "apple": { filterKey: "brand", filterValue: "Apple" },
  "samsung": { filterKey: "brand", filterValue: "Samsung" },
  "google": { filterKey: "brand", filterValue: "Google" },
  "xiaomi": { filterKey: "brand", filterValue: "Xiaomi" },
  "motorola": { filterKey: "brand", filterValue: "Motorola" },
  "oneplus": { filterKey: "brand", filterValue: "OnePlus" },
  
  // Price categories
  "budget": { filterKey: "priceMax", filterValue: 300 },
  "mid-range": { filterKey: "priceRange", filterValue: "300-700" },
  "flagship": { filterKey: "priceMin", filterValue: 700 },
  
  // Feature categories
  "5g": { filterKey: "features", filterValue: "5G" },
  "gaming": { filterKey: "features", filterValue: "Gaming" },
  "camera": { filterKey: "features", filterValue: "Camera" },
  "battery": { filterKey: "features", filterValue: "Battery" },
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
 
  
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("default");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get category info from URL
  const categoryInfo = category ? categoryMappings[category] : null;
  const categoryName = category ? category.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ') : '';

  // Set initial filters based on category
  useEffect(() => {
    if (categoryInfo) {
      if (categoryInfo.filterKey === "brand") {
        setBrand(categoryInfo.filterValue as string);
      } else if (categoryInfo.filterKey === "priceMax") {
        setPriceRange([0, categoryInfo.filterValue as number]);
      } else if (categoryInfo.filterKey === "priceMin") {
        setPriceRange([categoryInfo.filterValue as number, 2000]);
      }
    }
  }, [categoryInfo]);

  const { data: phonesData, isLoading } = useGetAllPhonesQuery({
    search,
    brand: brand === "all" ? "" : brand,
    priceMin: priceRange[0],
    priceMax: priceRange[1],
    sortBy: sortBy === "default" ? "" : sortBy,
    sortOrder,
    page,
    limit,
    ...(categoryInfo?.filterKey === "features" ? { 
      features: categoryInfo.filterValue as string 
    } : {}),
  });

  const clearFilters = () => {
    setSearch("");
    setBrand("all");
    setPriceRange([0, 2000]);
    setSortBy("default");
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/allProducts">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink className="capitalize">{categoryName}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4 capitalize">
            {categoryName} Phones
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {categoryInfo?.filterKey === "brand" ? `Discover our collection of ${categoryName} smartphones` :
             categoryInfo?.filterKey === "priceMax" ? "Budget-friendly smartphones under $300" :
             categoryInfo?.filterKey === "priceMin" ? "Premium flagship smartphones $700 and above" :
             categoryInfo?.filterKey === "features" ? `Phones with excellent ${categoryName} features` :
             "Browse our smartphone collection"}
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search phones by model or features..."
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
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </CardTitle>
                  {hasActiveFilters && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      <X className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
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
                      <SelectItem value="Motorola">Motorola</SelectItem>
                      <SelectItem value="Nokia">Nokia</SelectItem>
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
                      <SelectValue placeholder="Default" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="year">Release Year</SelectItem>
                      <SelectItem value="brand">Brand</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {sortBy && sortBy !== "default" && (
                    <Select value={sortOrder} onValueChange={setSortOrder}>
                      <SelectTrigger>
                        <SelectValue placeholder="Order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Product Cards */}
          <div className="w-full lg:w-3/4">
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {phonesData?.data?.length || 0} of {phonesData?.meta?.total || 0} products
              </p>
              {hasActiveFilters && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {brand && brand !== "all" && (
                    <Badge variant="secondary" className="capitalize">
                      Brand: {brand}
                    </Badge>
                  )}
                  {categoryInfo && (
                    <Badge variant="secondary" className="capitalize">
                      {categoryName}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid/List */}
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }>
              {phonesData?.data?.map((item: any) => (
                <ProductCard 
                  key={item._id} 
                  car={item} 
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* No Results */}
            {phonesData?.data?.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">📱</div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {phonesData?.meta?.total > 0 && (
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
                  {Array.from({ length: Math.min(5, Math.ceil((phonesData?.meta.total || 0) / limit)) }, (_, i) => {
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
                  {(phonesData?.meta.total || 0) / limit > 5 && (
                    <span className="text-gray-500">...</span>
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page >= Math.ceil((phonesData?.meta.total || 0) / limit)}
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

export default CategoryPage;