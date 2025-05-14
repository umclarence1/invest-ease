
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import FeaturedArticles from '../components/FeaturedArticles';
import FinancialTools from '../components/FinancialTools';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import AdSlot from '../components/AdSlot';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Lightbulb, BookOpen } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8 text-finance-primary" />,
      title: "Smart Financial Tools",
      description: "Interactive calculators to help you budget, plan investments, and track goals."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-finance-primary" />,
      title: "Expert Advice",
      description: "Practical tips and strategies from financial professionals for every life stage."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-finance-primary" />,
      title: "Educational Guides",
      description: "Comprehensive guides that break down complex financial topics into easy lessons."
    }
  ];

  return (
    <>
      <Header />
      <main>
        <Hero />
        
        {/* Ad placement after hero section */}
        <div className="py-6 bg-gray-50">
          <div className="container-custom">
            <AdSlot id="home-top" format="leaderboard" className="mx-auto" />
          </div>
        </div>
        
        {/* Features Section */}
        <section className="section bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="mx-auto mb-4 p-4 bg-finance-secondary rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <FeaturedArticles />
        
        {/* Ad placement before CTA */}
        <div className="py-6 bg-white">
          <div className="container-custom">
            <AdSlot id="home-mid" format="rectangle" className="mx-auto" />
          </div>
        </div>
        
        {/* CTA Section - Enhanced for conversion */}
        <section className="section bg-finance-secondary">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-6 text-finance-primary">Ready to Take Control of Your Finances?</h2>
              <p className="text-xl text-gray-700 mb-8">
                Join thousands of readers already using our expert guides and interactive tools to achieve financial freedom.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-finance-primary hover:bg-finance-primary/90 text-white px-8 py-6 text-lg">
                  <Link to="/tools">Explore Free Tools</Link>
                </Button>
                <Button variant="outline" className="border-finance-primary text-finance-primary px-8 py-6 text-lg">
                  <Link to="/blog">Read Expert Articles</Link>
                </Button>
              </div>
              
              {/* Social proof addition */}
              <div className="mt-8 p-4 bg-white rounded-lg inline-block">
                <p className="text-sm text-gray-600">
                  ★★★★★ <span className="font-medium">4.9/5 rating</span> from our readers
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <FinancialTools />
        
        {/* Ad placement before testimonials */}
        <div className="py-6 bg-gray-50">
          <div className="container-custom">
            <AdSlot id="home-bottom" format="rectangle" className="mx-auto" />
          </div>
        </div>
        
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Index;
