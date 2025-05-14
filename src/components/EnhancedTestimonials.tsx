
import React from 'react';
import TestimonialCard from './TestimonialCard';
import { Separator } from './ui/separator';

const EnhancedTestimonials = () => {
  const testimonials = [
    {
      quote: "This site's budgeting calculator helped me save an extra $500 per month. The personalized tips were exactly what I needed.",
      author: "Jennifer Liu",
      role: "Marketing Professional",
      rating: 5
    },
    {
      quote: "After using the investment strategies recommended here, my portfolio has seen a 12% increase in just 6 months!",
      author: "Michael Rodriguez",
      role: "Software Engineer",
      rating: 5
    },
    {
      quote: "The debt reduction calculator gave me a clear path to becoming debt-free in 3 years instead of 10. Life-changing!",
      author: "Sarah Johnson",
      role: "Healthcare Worker",
      rating: 4
    }
  ];

  return (
    <section className="section py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Readers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. See how our financial tools and advice have helped thousands of readers achieve their financial goals.
          </p>
          <Separator className="mt-8 mx-auto w-24 bg-finance-primary h-1 rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              rating={testimonial.rating}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block rounded-full bg-finance-primary/10 px-4 py-1.5">
            <p className="text-finance-primary text-sm font-medium">
              Join 10,000+ readers already using our financial guidance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonials;
