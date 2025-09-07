
const FAQ = () => {
  return (
    <div className="container py-4 mx-auto px-4">
      <h2 className="text-4xl font-extrabold text-center uppercase tracking-wide">
        <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
          Frequently Asked Questions
        </span>
        <div className="w-24 h-1 bg-orange-500 mx-auto m-5 rounded"></div>
      </h2>

      <div className="max-w-3xl mx-auto space-y-6 mt-6">
        {/* FAQ Item 1 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            🚗 How do I purchase a car from your website?
          </h3>
          <p className="text-gray-600 mt-2">
            You can browse cars, add them to your cart, and complete the purchase by following the checkout process.
          </p>
        </div>

        {/* FAQ Item 2 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            🛠️ Do you offer any warranty on the cars?
          </h3>
          <p className="text-gray-600 mt-2">
            Yes, all our cars come with a limited warranty depending on the brand and model.
          </p>
        </div>

        {/* FAQ Item 3 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            💳 What payment methods are accepted?
          </h3>
          <p className="text-gray-600 mt-2">
            We accept all major credit cards, bank transfers, and secure digital payments.
          </p>
        </div>

        {/* Add more FAQs here if needed */}
      </div>
    </div>
  );
};

export default FAQ;
