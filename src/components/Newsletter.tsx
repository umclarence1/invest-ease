
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="section bg-finance-primary text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Mail className="h-12 w-12" />
          </div>
          <h2 className="text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg opacity-90 mb-8">
            Get the latest financial tips, tools, and insights delivered straight to your inbox. No spam, just valuable content.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <Input 
              type="email"
              placeholder="Enter your email"
              className="bg-white/20 border-white/40 placeholder:text-white/70 text-white"
            />
            <Button className="bg-white text-finance-primary hover:bg-white/90">
              Subscribe
            </Button>
          </div>
          
          <p className="text-sm opacity-70 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive financial updates and marketing communications.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
