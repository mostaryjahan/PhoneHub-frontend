import { useState } from "react";
import ProductCard from "./ProductCard";
import { TPhone } from "@/types";
import { useGetAllPhonesQuery } from "@/redux/features/phone/phoneManagementApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  Search,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  X,
  ChevronDown,
} from "lucide-react";

const AllProduct = () => {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("all");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("default");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: phonesData, isLoading } = useGetAllPhonesQuery({
    search,
    brand: brand === "all" ? "" : brand,
    category: category === "all" ? "" : category,
    priceMin: priceRange[0],
    priceMax: priceRange[1],
    sortBy: sortBy === "default" ? "" : sortBy,
    sortOrder,
    page,
    limit,
  });

  const clearFilters = () => {
    setSearch("");
    setBrand("all");
    setCategory("all");
    setPriceRange([0, 2000]);
    setSortBy("default");
    setSortOrder("desc");
    setPage(1);
  };

  const hasActiveFilters =
    search ||
    brand !== "all" ||
    category !== "all" ||
    priceRange[0] > 0 ||
    priceRange[1] < 2000;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            All <span className="text-primary">Smartphones</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of premium smartphones from top
            brands
          </p>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col justify-end lg:flex-row gap-4 mb-6">
          <div className="flex gap-2">
            <div className="relative">
              <select
                value={limit.toString()}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="w-20 h-10 px-3 pr-8 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
              >
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="36">36</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              className="bg-white"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              className="bg-white"
              onClick={() => setViewMode("list")}
            >
              <List className="w-4 h-4" />
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
                {/* search */}
                <div className="relative flex-1">
                   <h3 className="font-semibold text-sm mb-2">Search</h3>
                  <Search className="absolute left-3 top-2/3 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search phones by brand, model, or features..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 h-11"
                  />
                </div>
                {/* Brand Filter */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">Brand</h3>
                  <div className="relative">
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                    >
                      <option value="all">All Brands</option>
                      <option value="Apple">Apple</option>
                      <option value="Samsung">Samsung</option>
                      <option value="Google">Google</option>
                      <option value="OnePlus">OnePlus</option>
                      <option value="Xiaomi">Xiaomi</option>
                      <option value="Motorola">Motorola</option>
                      <option value="Nokia">Nokia</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">Category</h3>
                  <div className="relative">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                    >
                      <option value="all">All Categories</option>
                      <option value="Official">Official</option>
                      <option value="Unofficial">Unofficial</option>
                      <option value="Refurbished">Refurbished</option>
                      <option value="Used">Used</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
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
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                    >
                      <option value="default">Default</option>
                      <option value="price">Price</option>
                      <option value="year">Release Year</option>
                      <option value="brand">Brand</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {sortBy && sortBy !== "default" && (
                    <div className="relative">
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                      >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
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
                Showing {phonesData?.data?.length || 0} of{" "}
                {phonesData?.meta?.total || 0} products
              </p>
              {hasActiveFilters && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {brand && brand !== "all" && (
                    <Badge variant="secondary" className="capitalize">
                      Brand: {brand}
                    </Badge>
                  )}
                  {category && category !== "all" && (
                    <Badge variant="secondary" className="capitalize">
                      Category: {category}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid/List */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }
            >
              {phonesData?.data?.map((item: TPhone) => (
                <ProductCard
                  key={item._id}
                  car={item}
                  // viewMode={viewMode}
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
                <Button onClick={clearFilters}>Clear All Filters</Button>
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
                  {Array.from(
                    {
                      length: Math.min(
                        5,
                        Math.ceil((phonesData?.meta.total || 0) / limit)
                      ),
                    },
                    (_, i) => {
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
                    }
                  )}
                  {(phonesData?.meta.total || 0) / limit > 5 && (
                    <span className="text-gray-500">...</span>
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={
                    page >= Math.ceil((phonesData?.meta.total || 0) / limit)
                  }
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

export default AllProduct;
