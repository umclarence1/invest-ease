
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Newsletter from '../components/Newsletter';
import AdSlot from '../components/AdSlot';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Lightbulb, BookOpen, Calculator } from 'lucide-react';
import LatestMarketUpdates from '../components/LatestMarketUpdates';
import EnhancedFeaturedArticles from '../components/EnhancedFeaturedArticles';
import EnhancedTestimonials from '../components/EnhancedTestimonials';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const features = [
    {
      icon: <Calculator className="h-12 w-12 p-2 bg-finance-primary/10 rounded-xl text-finance-primary" />,
      title: "Smart Financial Tools",
      description: "Interactive calculators to help you budget, plan investments, and track goals with personalized recommendations."
    },
    {
      icon: <Lightbulb className="h-12 w-12 p-2 bg-finance-primary/10 rounded-xl text-finance-primary" />,
      title: "Expert Advice",
      description: "Practical tips and strategies from financial professionals for every life stage and financial situation."
    },
    {
      icon: <BookOpen className="h-12 w-12 p-2 bg-finance-primary/10 rounded-xl text-finance-primary" />,
      title: "Educational Guides",
      description: "Comprehensive guides that break down complex financial topics into easy-to-understand lessons."
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <Hero />
        
        {/* Ad placement after hero section - optimized for AdSense */}
        <div className="py-6 bg-gray-50 border-y border-gray-200">
          <div className="container-custom">
            <AdSlot id="home-top" format="leaderboard" className="mx-auto monetization-ready" />
          </div>
        </div>
        
        {/* Market Updates Section */}
        <LatestMarketUpdates />
        
        {/* Features Section with improved design */}
        <section className="section py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Take Control of Your Financial Future</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our tools and resources are designed to help you make smarter financial decisions and build lasting wealth.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Enhanced Featured Articles */}
        <EnhancedFeaturedArticles />
        
        {/* Ad placement before testimonials - optimized for AdSense */}
        <div className="py-8 bg-white border-t border-gray-100">
          <div className="container-custom">
            <AdSlot id="home-mid" format="rectangle" className="mx-auto monetization-ready" />
          </div>
        </div>
        
        {/* Enhanced Testimonials */}
        <EnhancedTestimonials />
        
        {/* CTA Section - Enhanced for conversion */}
        <section className="section py-16 bg-gradient-to-r from-finance-primary/10 via-finance-secondary/10 to-finance-accent/10">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Ready to Take Control of Your Finances?</h2>
              <p className="text-xl text-gray-700 mb-8">
                Join thousands of readers already using our expert guides and interactive tools to achieve financial freedom.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button className="bg-finance-primary hover:bg-finance-primary/90 text-white px-8 py-6 text-lg shadow-lg shadow-finance-primary/20">
                  <Link to="/tools" className="flex items-center">
                    Explore Free Tools
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-finance-primary text-finance-primary hover:bg-finance-primary/10 px-8 py-6 text-lg">
                  <Link to="/blog">Read Expert Articles</Link>
                </Button>
              </div>
              
              {/* Social proof addition */}
              <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="bg-white rounded-lg shadow-md px-6 py-3 flex items-center">
                  <div className="flex -space-x-2 mr-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                    ))}
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">10,000+ active users</span>
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow-md px-6 py-3">
                  <p className="text-sm font-medium">
                    ★★★★★ <span className="text-finance-primary">4.9/5 rating</span> from our readers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Ad placement before footer - optimized for AdSense */}
        <div className="py-8 bg-gray-50 border-t border-gray-200">
          <div className="container-custom">
            <AdSlot id="home-bottom" format="rectangle" className="mx-auto monetization-ready" />
          </div>
        </div>
        
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Index;
