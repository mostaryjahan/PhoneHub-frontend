import { Link } from "react-router-dom";
import { homeCategoryData } from "./homeCategoryData";
import { TPhoneData } from "@/types";

interface SliderCategoryProps {
  data: { data: TPhoneData[] };
  title?: string;
  maxItems?: number;
}

const SliderCategory = ({ 
  data, 
  title = "Shop by brand", 
  maxItems = 6 
}: SliderCategoryProps) => {
  if (!data || data.data.length === 0) {
    return (
      <p className="text-center mt-8 text-gray-500">
        No categories to show
      </p>
    );
  }

  // Limit the number of items displayed
  const categoriesToShow = homeCategoryData[0].categories.slice(0, maxItems);

  return (
    <section className="container pt-4 mx-auto px-4">
      <h2 className="text-4xl font-extrabold text-center relative uppercase tracking-wide">
        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">{title}</span>
        </h2>
        <div className="w-24 h-1 bg-orange-500 mx-auto m-5 rounded"></div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-6">
        {categoriesToShow.map(({ id, image, title }) => (
          <div 
            key={id}
            className="group flex flex-col"
          >
            <Link
              to="/allProducts"
              className="relative block rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              aria-label={`Browse ${title} products`}
            >
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
            
            <div className="mt-3 text-center">
              <Link 
                to="/allProducts" 
                className="text-lg font-medium text-gray-800 hover:text-primary-600 transition-colors duration-200"
              >
                {title}
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {homeCategoryData[0].categories.length > maxItems && (
        <div className="text-center mt-10">
          <Link 
            to="/allBrands" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200"
          >
            View All Brands
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      )}
    </section>
  );
};

export default SliderCategory;