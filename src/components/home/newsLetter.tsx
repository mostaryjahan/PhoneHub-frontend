const Newsletter = () => {
    return (
      <section className="bg-[#f9fafb] py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Get updates on new arrivals, exclusive offers, and more straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-[#ea580c] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    );
  };
  
  export default Newsletter;
  