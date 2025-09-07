import { companyFeaturesData } from "@/db/companyFeaturesData";

const CompanyFeatures = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Featured Brands
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {companyFeaturesData.map(({ img, title }) => (
            <div
              key={title}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 mb-3 flex items-center justify-center">
                  <img 
                    src={img} 
                    alt={title}
                    className="w-30 h-30 object-contain"
                  />
                </div>
                <span className="text-sm font-semibold text-muted">
                  {title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyFeatures;