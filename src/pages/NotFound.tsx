
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gray-50 py-12">
        <div className="container-custom text-center">
          <h1 className="text-4xl font-bold mb-4 text-finance-primary">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
            We're sorry, but the page you were looking for doesn't exist. You might have typed the address incorrectly or the page may have moved.
          </p>
          
          {/* Ad-friendly content recommendation section */}
          <div className="my-8 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-finance-primary">You might be interested in these articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="font-medium mb-2">How to Create a Budget that Works</h3>
                <p className="text-gray-600 mb-2">Learn simple steps to manage your finances effectively...</p>
                <Link to="/blog" className="text-finance-accent hover:underline">Read more</Link>
              </div>
              <div className="p-4 border rounded-md bg-gray-50">
                <h3 className="font-medium mb-2">Smart Investing for Beginners</h3>
                <p className="text-gray-600 mb-2">Get started with investing with these proven strategies...</p>
                <Link to="/investing" className="text-finance-accent hover:underline">Read more</Link>
              </div>
            </div>
          </div>
          
          {/* Clear CTA to get back to main content */}
          <Link 
            to="/" 
            className="bg-finance-primary hover:bg-finance-primary/90 text-white px-6 py-3 rounded-md text-lg font-medium"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
