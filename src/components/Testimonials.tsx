
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      message: "The budgeting tools on WealthWise helped me organize my business finances and personal expenses. I've saved over $500 monthly by following their advice.",
      stars: 5
    },
    {
      name: "Michael Chen",
      role: "Recent Graduate",
      message: "As a new graduate with student loans, the articles about debt repayment strategies were incredibly helpful. I now have a clear plan to become debt-free.",
      stars: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Aspiring Investor",
      message: "The investing guides made complex topics easy to understand. I finally feel confident enough to start building my investment portfolio.",
      stars: 4
    }
  ];

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="mb-4">What Our Readers Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how WealthWise has helped people improve their financial lives
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="pt-6">
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < testimonial.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                
                {/* Testimonial */}
                <p className="text-gray-700 mb-6 italic">"{testimonial.message}"</p>
                
                {/* User */}
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-600">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
