
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { Link } from 'react-router-dom';
import { CheckCircle2, Users, Award, BookOpen } from 'lucide-react';

const About = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-finance-primary">About WealthWise</h1>
              <p className="text-xl text-gray-600 mt-4">
                Our mission is to empower you to make smarter financial decisions through education, tools, and actionable advice.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="section bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="mb-6">Our Story</h2>
                <p className="text-lg text-gray-700 mb-4">
                  WealthWise was founded with a simple belief: financial education should be accessible to everyone, not just those who can afford expensive advisors.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  We saw too many people struggling with money decisions, not because they weren't intelligent, but because financial concepts are often presented in overly complex ways.
                </p>
                <p className="text-lg text-gray-700">
                  Our team of financial experts, educators, and technologists came together to create a platform that breaks down complex topics into clear, actionable advice that anyone can understand and apply.
                </p>
              </div>
              <div className="bg-gray-100 aspect-square rounded-lg"></div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="section bg-finance-secondary">
          <div className="container-custom">
            <h2 className="text-center mb-12">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-finance-secondary rounded-full">
                    <CheckCircle2 className="h-8 w-8 text-finance-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Accessibility</h3>
                <p className="text-gray-600 text-center">
                  We believe everyone deserves access to high-quality financial information regardless of their background or current financial situation.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-finance-secondary rounded-full">
                    <Award className="h-8 w-8 text-finance-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Integrity</h3>
                <p className="text-gray-600 text-center">
                  We provide unbiased information that puts your best interests first. When we recommend financial products, we clearly disclose our relationships.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="flex justify-center mb-6">
                  <div className="p-3 bg-finance-secondary rounded-full">
                    <BookOpen className="h-8 w-8 text-finance-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center mb-3">Education</h3>
                <p className="text-gray-600 text-center">
                  We're committed to explaining complex topics in simple terms, providing practical advice that you can apply to your own financial journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="section bg-white">
          <div className="container-custom">
            <h2 className="text-center mb-12">Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="bg-gray-200 w-40 h-40 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                <p className="text-gray-600 mb-2">Founder & Financial Advisor</p>
                <p className="text-gray-700 max-w-xs mx-auto">
                  With 15 years in personal finance, Sarah is passionate about making financial advice accessible to everyone.
                </p>
              </div>
              
              {/* Team Member 2 */}
              <div className="text-center">
                <div className="bg-gray-200 w-40 h-40 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold">Michael Chen</h3>
                <p className="text-gray-600 mb-2">Investment Specialist</p>
                <p className="text-gray-700 max-w-xs mx-auto">
                  Michael brings years of experience from Wall Street to help simplify investing strategies for our readers.
                </p>
              </div>
              
              {/* Team Member 3 */}
              <div className="text-center">
                <div className="bg-gray-200 w-40 h-40 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold">Emma Rodriguez</h3>
                <p className="text-gray-600 mb-2">Content Director</p>
                <p className="text-gray-700 max-w-xs mx-auto">
                  Emma ensures all our content is not only accurate but also engaging and easy to understand.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section bg-gray-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-4">Start Your Financial Journey Today</h2>
              <p className="text-xl text-gray-600 mb-8">
                Explore our resources, use our tools, and take the first step toward financial confidence.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  to="/tools" 
                  className="bg-finance-primary text-white px-8 py-3 rounded-md hover:bg-finance-primary/90 transition-colors"
                >
                  Explore Tools
                </Link>
                <Link 
                  to="/blog" 
                  className="border border-finance-primary text-finance-primary px-8 py-3 rounded-md hover:bg-finance-secondary transition-colors"
                >
                  Read Articles
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default About;
