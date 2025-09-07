import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  ThumbsUp, 
  MessageCircle, 
  Calendar, 
  User,
  Send,
  Filter,
  ChevronDown,
  CheckCircle,
  XCircle
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      user: {
        name: "Sarah Johnson",
        avatar: "",
        verified: true
      },
      rating: 5,
      title: "Excellent phone!",
      comment: "The camera quality is amazing and battery life lasts all day. Very satisfied with my purchase.",
      date: "2024-01-15",
      likes: 24,
      replies: 3,
      helpful: true
    },
    {
      id: 2,
      user: {
        name: "Mike Chen",
        avatar: "",
        verified: false
      },
      rating: 4,
      title: "Great value for money",
      comment: "Good performance and features for the price. The display could be brighter though.",
      date: "2024-01-12",
      likes: 18,
      replies: 1,
      helpful: true
    },
    {
      id: 3,
      user: {
        name: "Emily Davis",
        avatar: "",
        verified: true
      },
      rating: 3,
      title: "Average experience",
      comment: "It's okay for basic use, but I expected better performance. Sometimes lags when multitasking.",
      date: "2024-01-10",
      likes: 8,
      replies: 0,
      helpful: false
    },
    {
      id: 4,
      user: {
        name: "Alex Rodriguez",
        avatar: "",
        verified: true
      },
      rating: 5,
      title: "Best phone I've ever owned",
      comment: "Incredible performance, stunning display, and the battery lasts forever. Highly recommend!",
      date: "2024-01-08",
      likes: 32,
      replies: 5,
      helpful: true
    },
    {
      id: 5,
      user: {
        name: "John Smith",
        avatar: "",
        verified: false
      },
      rating: 5,
      title: "Disappointed",
      comment: "Battery life is poor and the phone overheats easily. Not what I expected.",
      date: "2024-01-05",
      likes: 5,
      replies: 2,
      helpful: false
    },
    {
      id: 6,
      user: {
        name: "Lisa Wang",
        avatar: "",
        verified: true
      },
      rating: 5,
      title: "Terrible experience",
      comment: "Stopped working after 2 weeks. Customer service was unhelpful.",
      date: "2024-01-03",
      likes: 3,
      replies: 1,
      helpful: false
    }
  ];

  // Calculate rating statistics
  const ratingStats = {
    total: reviews.length,
    average: Number((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)),
    distribution: [
      reviews.filter(r => r.rating === 1).length,
      reviews.filter(r => r.rating === 2).length,
      reviews.filter(r => r.rating === 3).length,
      reviews.filter(r => r.rating === 4).length,
      reviews.filter(r => r.rating === 5).length
    ]
  };

  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews;
    
    // Apply star filter
    if (activeFilter !== "all") {
      const starFilter = parseInt(activeFilter);
      filtered = filtered.filter(review => review.rating === starFilter);
    }
    
    // Apply sorting
    switch (sortBy) {
      case "recent":
        return [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case "helpful":
        return [...filtered].sort((a, b) => b.likes - a.likes);
      case "highest":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "lowest":
        return [...filtered].sort((a, b) => a.rating - b.rating);
      default:
        return filtered;
    }
  }, [activeFilter, sortBy]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating || !reviewText) {
      toast.error("Please provide both a rating and review text");
      return;
    }

    setIsSubmitting(true);
    setSubmissionStatus("idle");

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically send the review to your backend
      console.log({ rating, reviewTitle, reviewText });
      
      // Show success message
      setSubmissionStatus("success");
      toast.success("Review submitted successfully!");
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setRating(0);
        setReviewTitle("");
        setReviewText("");
        setSubmissionStatus("idle");
      }, 2000);
      
    } catch (error) {
      setSubmissionStatus("error");
      toast.error("Failed to submit review. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const StarRating = ({ rating, editable = false, onRate }: { 
    rating: number; 
    editable?: boolean;
    onRate?: (rating: number) => void;
  }) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => {
          const starValue = index + 1;
          return (
            <button
              key={index}
              type="button"
              className={`${
                editable ? "cursor-pointer" : "cursor-default"
              } transition-colors duration-150`}
              onClick={() => editable && onRate && onRate(starValue)}
              onMouseEnter={() => editable && setHoverRating(starValue)}
              onMouseLeave={() => editable && setHoverRating(0)}
              disabled={isSubmitting}
            >
              {starValue <= (hoverRating || rating) ? (
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ) : (
                <Star className="w-5 h-5 text-gray-300" />
              )}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Customer Reviews
          </h1>
          <p className="text-lg text-gray-600">
            See what our customers are saying about our products
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rating Summary Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Overall Rating</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-5xl font-bold text-gray-900">
                    {ratingStats.average}
                  </span>
                  <span className="text-2xl text-gray-500">/5</span>
                </div>
                <StarRating rating={ratingStats.average} />
                <p className="text-gray-600 mt-2">
                  Based on {ratingStats.total} reviews
                </p>
                
                {/* Rating Distribution */}
                <div className="mt-6 space-y-2">
                  {[5, 4, 3, 2, 1].map((stars, index) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-4">{stars}</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Progress 
                        value={(ratingStats.distribution[4 - index] / ratingStats.total) * 100} 
                        className="flex-1 h-2"
                      />
                      <span className="text-sm text-gray-600 w-12 text-right">
                        {ratingStats.distribution[4 - index]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Write Review Card */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Write a Review</CardTitle>
              </CardHeader>
              <CardContent>
                {/* Submission Status Message */}
                {submissionStatus === "success" && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">Review submitted successfully!</span>
                  </div>
                )}
                
                {submissionStatus === "error" && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-700 font-medium">Failed to submit review. Please try again.</span>
                  </div>
                )}

                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Your Rating</Label>
                    <StarRating 
                      rating={rating} 
                      editable={true} 
                      onRate={setRating} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Review Title</Label>
                    <Input
                      id="title"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      placeholder="Summarize your experience"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="review">Your Review</Label>
                    <Textarea
                      id="review"
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share your experience with this product..."
                      rows={4}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={!rating || !reviewText || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Review
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Reviews Main Content */}
          <div className="lg:col-span-2">
            {/* Filters and Sorting */}
            <Card className="border-0 shadow-lg mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Filter by:</span>
                    <div className="flex flex-wrap gap-1">
                      {["all", "5", "4", "3", "2", "1"].map((filter) => (
                        <Badge
                          key={filter}
                          variant={activeFilter === filter ? "default" : "outline"}
                          className="cursor-pointer transition-colors" 
                          onClick={() => setActiveFilter(filter)}
                        >
                          {filter === "all" ? "All" : `${filter} stars`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="helpful">Most Helpful</SelectItem>
                      <SelectItem value="highest">Highest Rated</SelectItem>
                      <SelectItem value="lowest">Lowest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Reviews Count */}
            <div className="mb-4">
              <p className="text-gray-600">
                Showing {filteredAndSortedReviews.length} of {reviews.length} reviews
                {activeFilter !== "all" && ` (${activeFilter} stars)`}
              </p>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
              {filteredAndSortedReviews.length > 0 ? (
                filteredAndSortedReviews.map((review) => (
                  <Card key={review.id} className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <Avatar className="w-12 h-12 hidden sm:block">
                          <AvatarImage src={review.user.avatar} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            <User className="w-6 h-6" />
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{review.user.name}</h4>
                            {review.user.verified && (
                              <Badge variant="outline" className="bg-green-50 text-green-700">
                                Verified Buyer
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-4 mb-3">
                            <StarRating rating={review.rating} />
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <h5 className="font-semibold text-lg mb-2">{review.title}</h5>
                          <p className="text-gray-600 mb-4 text-xs sm:text-base">{review.comment}</p>
                          
                          <div className="flex items-center gap-1 md:gap-4">
                            <Button variant="ghost" size="sm" className="text-gray-500">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              Helpful ({review.likes})
                            </Button>
                            <Button variant="ghost" size="sm" className="text-gray-500">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Reply ({review.replies})
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="text-gray-400 text-6xl mb-4">🌟</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      No reviews found
                    </h3>
                    <p className="text-gray-500">
                      {activeFilter !== "all" 
                        ? `No ${activeFilter}-star reviews found. Try a different filter.`
                        : "No reviews available yet."
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Load More Button (only show if there are more reviews) */}
            {filteredAndSortedReviews.length > 0 && filteredAndSortedReviews.length < reviews.length && (
              <div className="text-center mt-8">
                <Button variant="outline" className="px-8">
                  Load More Reviews
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;