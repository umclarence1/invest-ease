
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const Newsletter = () => {
  return (
    <section className="section py-20 bg-finance-primary relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/5"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 rounded-full bg-white/5"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-white/10"></div>
      </div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white overflow-hidden">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-3/5">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-finance-primary/10 mb-6">
                    <Mail className="h-6 w-6 text-finance-primary" />
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">
                    Get Weekly Financial Insights
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-6">
                    Join 10,000+ subscribers who receive our weekly financial tips, market updates, and exclusive tools directly in their inbox.
                  </p>
                  
                  <ul className="space-y-3 mb-6">
                    {[
                      'Weekly financial tips tailored to your goals',
                      'Market insights and investment opportunities',
                      'First access to new financial tools and calculators',
                      'Exclusive guides not published on our website'
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 text-finance-success flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="w-full md:w-2/5">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-gray-900">Subscribe Now</h3>
                    
                    <form className="space-y-4">
                      <div>
                        <Input 
                          type="text"
                          placeholder="Your name"
                          className="bg-white"
                        />
                      </div>
                      <div>
                        <Input 
                          type="email"
                          placeholder="Your email"
                          className="bg-white"
                        />
                      </div>
                      <Button className="w-full bg-finance-primary hover:bg-finance-primary/90 text-white shadow-md">
                        Subscribe
                      </Button>
                      <p className="text-xs text-gray-500 text-center">
                        By subscribing, you agree to our Privacy Policy. We'll never spam you.
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
