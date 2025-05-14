
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gray-50">
      {/* Colorful accent gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-2 hero-gradient"></div>
      
      <div className="container-custom pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Make smarter decisions with your money
            </h1>
            <p className="text-xl text-gray-600">
              Your journey to financial freedom starts here. Learn, plan and grow with our expert advice and powerful financial tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-finance-primary hover:bg-finance-primary/90 text-white px-6 py-6 text-lg">
                Get Started
              </Button>
              <Button variant="outline" className="border-finance-primary text-finance-primary px-6 py-6 text-lg">
                Explore Tools
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="bg-white rounded-xl overflow-hidden shadow-xl p-6 lg:mr-4">
              <div className="aspect-video bg-gray-100 rounded-lg mb-4"></div>
              <div className="space-y-4">
                <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                <div className="h-4 bg-gray-100 rounded w-4/6"></div>
                <div className="flex justify-between items-center mt-6">
                  <div className="h-10 bg-finance-primary rounded w-1/3"></div>
                  <div className="h-10 bg-gray-100 rounded-full w-10"></div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 -bottom-10 -left-10 w-32 h-32 bg-finance-secondary rounded-full opacity-60"></div>
            <div className="absolute -z-10 -top-8 -right-8 w-24 h-24 bg-finance-accent rounded-full opacity-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
