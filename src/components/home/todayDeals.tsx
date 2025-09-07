import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Navigation } from "swiper/modules";
import { TPhoneData } from "@/types";
import { Link } from "react-router-dom";
import { MdLocalOffer } from "react-icons/md";

const TodayDeals = ({ data }: { data: { data: TPhoneData[] } }) => {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
         <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full mb-4">
            <MdLocalOffer className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-primary">Hot Deals</span>
          </div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          Today's <span className="text-primary">Hot Deals</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Don't miss out on these exclusive limited-time offers on premium smartphones
        </p>
        <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Super Deals Section */}
        <div className="relative bg-gradient-to-br from-accent to-primary rounded-2xl p-6 group/super overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTR2LTRoNHY0em0tNC00aC00di00aDR2NHptNC00aC00di00aDR2NHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
          
          {/* Header */}
          <div className="relative z-10 text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-3">Flash Sale</h3>
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <span className="text-orange-600 text-sm font-bold">⚡</span>
              </div>
              <span className="text-white font-semibold">Ends in: 18:23:20</span>
              <ChevronRight size={16} className="text-white" />
            </div>
          </div>

          {/* Products Slider */}
          <div className="relative z-10">
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={20}
              navigation={{ nextEl: ".next-el-super", prevEl: ".prev-el-super" }}
              loop
              modules={[Navigation]}
              className="super-deals-slider"
            >
              {data?.data.slice(0, 4).map((item) => (
                <SwiperSlide key={item._id} style={{ width: '200px' }}>
                  <Card {...item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 z-20 w-full opacity-0 group-hover/super:opacity-100 transition-all duration-300">
            <button className="prev-el-super w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full cursor-pointer text-white absolute left-4 hover:bg-white/30 transition-colors">
              <ChevronLeft size={24} />
            </button>
            <button className="next-el-super w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full cursor-pointer text-white absolute right-4 hover:bg-white/30 transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Big Save Section */}
        <div className="relative bg-gradient-to-br from-accent to-primary rounded-2xl p-6 group/big overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>
          
          {/* Header */}
          <div className="relative z-10 text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-3">Premium Brands</h3>
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xs font-bold">A</span>
                </div>
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center -ml-2">
                  <span className="text-green-600 text-xs font-bold">S</span>
                </div>
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center -ml-2">
                  <span className="text-red-600 text-xs font-bold">G</span>
                </div>
              </div>
              <span className="text-white font-semibold">500+ Brands</span>
              <ChevronRight size={16} className="text-white" />
            </div>
          </div>

          {/* Products Slider */}
          <div className="relative z-10">
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={20}
              navigation={{ nextEl: ".next-el-big", prevEl: ".prev-el-big" }}
              loop
              modules={[Navigation]}
              className="big-save-slider"
            >
              {data?.data.slice(0, 4).map((item) => (
                <SwiperSlide key={item._id} style={{ width: '200px' }}>
                  <CardBig {...item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 z-20 w-full opacity-0 group-hover/big:opacity-100 transition-all duration-300">
            <button className="prev-el-big w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full cursor-pointer text-white absolute left-4 hover:bg-white/30 transition-colors">
              <ChevronLeft size={24} />
            </button>
            <button className="next-el-big w-12 h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full cursor-pointer text-white absolute right-4 hover:bg-white/30 transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodayDeals;

// Card Components
interface CardPropsType {
  _id: number | string;
  price: number;
  image: string;
  brand: string;
  model?: string;
  inStock: boolean;
}

const CardBig = ({ _id, price, image, brand, model, inStock }: CardPropsType) => {
  const demoDiscountPercent = 25;
  const discountAmount = (price * demoDiscountPercent) / 100;
  const discountedPrice = (price - discountAmount).toFixed(2);

  return (
    <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/10">
      <Link to={`/product-details/${_id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-white p-4">
          <img 
            src={image} 
            alt={brand}
            className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300" 
          />
          {!inStock && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
              Out of Stock
            </div>
          )}
        </div>
        
        <div className="mt-4 text-white">
          <h4 className="font-semibold text-lg mb-1">{brand}</h4>
          {model && <p className="text-white/80 text-sm mb-3">{model}</p>}
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-300">${discountedPrice}</p>
              <p className="text-white/60 line-through text-sm">${price}</p>
            </div>
            <div className="bg-blue-500 px-3 py-1 rounded-full text-xs font-bold">
              -{demoDiscountPercent}%
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const Card = ({ _id, price, image, brand, model, inStock }: CardPropsType) => {
  const demoDiscountPercent = 20;
  const discountAmount = (price * demoDiscountPercent) / 100;
  const discountedPrice = (price - discountAmount).toFixed(2);

  return (
    <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300 border border-white/10">
      <Link to={`/product-details/${_id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-white p-4">
          <img 
            src={image} 
            alt={brand}
            className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300" 
          />
          {!inStock && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
              Out of Stock
            </div>
          )}
        </div>
        
        <div className="mt-4 text-white">
          <h4 className="font-semibold text-lg mb-1">{brand}</h4>
          {model && <p className="text-white/80 text-sm mb-3">{model}</p>}
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-orange-300">${discountedPrice}</p>
              <p className="text-white/60 line-through text-sm">${price}</p>
            </div>
            <div className="bg-red-500 px-3 py-1 rounded-full text-xs font-bold">
              -{demoDiscountPercent}%
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};