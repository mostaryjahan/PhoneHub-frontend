/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "iPhone 15 Pro Max",
      subtitle: "The ultimate smartphone experience",
      description: "Titanium. So strong. So light. So Pro.",
      price: "From $1199",
      image: "/images/banner/img-1.jpeg",
      buttonText: "Pre-order Now",
      buttonLink: "/iphone-15-pro"
    },
    {
      id: 2,
      title: "Samsung Galaxy S23 Ultra",
      subtitle: "Epic moments deserve epic photos",
      description: "200MP camera. Nightography. S Pen included.",
      price: "From $1199.99",
      image: "/images/banner/img-2.jpeg",
      buttonText: "Shop Now",
      buttonLink: "/galaxy-s23"
    },
    {
      id: 3,
      title: "Google Pixel 8 Pro",
      subtitle: "The only phone with AI built in",
      description: "Magic Editor. Best Take. Audio Magic Eraser.",
      price: "From $999",
      image: "/images/banner/img-3.jpeg",
      buttonText: "Discover",
      buttonLink: "/pixel-8"
    }
  ];

  // Auto-play functionality
  // useEffect(() => {
  //   let interval: NodeJS.Timeout;
    
  //   if (isPlaying) {
  //     interval = setInterval(() => {
  //       setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  //     }, 5000);
  //   }
    
  //   return () => clearInterval(interval);
  // }, [isPlaying, slides.length]);

  const goToNext = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const goToPrev = () => {
    setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="">
      <div className="relative h-[70vh] overflow-hidden group mx-auto">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
            
            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="text-white max-w-lg ml-12 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">{slide.title}</h1>
                <h2 className="text-xl md:text-2xl text-secondary">{slide.subtitle}</h2>
                <p className="text-lg">{slide.description}</p>
                <p className="text-2xl font-semibold text-secondary">{slide.price}</p>
                <Button 
                  className="bg-secondary text-primary hover:bg-secondary/90 font-bold py-3 px-6 rounded-lg"
                  asChild
                >
                  <a href={slide.buttonLink}>{slide.buttonText}</a>
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
        
      
        
        
        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? "bg-secondary scale-125" 
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
       
      </div>
    </div>
  );
};

export default Banner;