
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Wallet, CreditCard, PiggyBank } from 'lucide-react';

const PersonalFinance = () => {
  const topics = [
    {
      icon: <Wallet className="h-6 w-6 text-finance-primary" />,
      title: "Budgeting",
      description: "Learn how to create and stick to a budget that works for your lifestyle",
      slug: "budgeting"
    },
    {
      icon: <CreditCard className="h-6 w-6 text-finance-primary" />,
      title: "Credit & Debt",
      description: "Manage credit responsibly and develop strategies for paying down debt",
      slug: "credit-debt"
    },
    {
      icon: <PiggyBank className="h-6 w-6 text-finance-primary" />,
      title: "Saving Money",
      description: "Practical tips for saving money on everyday expenses and for future goals",
      slug: "saving-money"
    }
  ];

  const articles = [
    {
      id: "1",
      title: "How to Create a Budget that Works for You",
      excerpt: "Learn the simple steps to create a personalized budget that you'll actually stick to, no matter your income level.",
      category: "Budgeting",
      slug: "budget-that-works",
      date: "May 10, 2025"
    },
    {
      id: "2",
      title: "5 Ways to Save Money on Monthly Bills",
      excerpt: "Practical strategies to reduce your recurring expenses and keep more money in your pocket every month.",
      category: "Saving",
      slug: "save-on-monthly-bills",
      date: "May 5, 2025"
    },
    {
      id: "3",
      title: "Understanding Credit Scores: What You Need to Know",
      excerpt: "A comprehensive guide to credit scores - what they are, how they're calculated, and practical steps to improve yours.",
      category: "Credit",
      slug: "understanding-credit-scores",
      date: "May 2, 2025"
    },
    {
      id: "4",
      title: "How to Pay Off $10,000 in Credit Card Debt in One Year",
      excerpt: "A step-by-step case study of how one reader eliminated significant credit card debt through strategic planning.",
      category: "Debt",
      slug: "paying-off-credit-card-debt",
      date: "April 15, 2025"
    },
    {
      id: "5",
      title: "Creating an Emergency Fund: How Much Do You Need?",
      excerpt: "Learn why emergency funds are crucial and how to determine the right size for your situation.",
      category: "Saving",
      slug: "emergency-fund-size",
      date: "April 10, 2025"
    },
    {
      id: "6",
      title: "The 50/30/20 Budget Rule Explained",
      excerpt: "A simple budgeting framework that allocates your income to needs, wants, and financial goals.",
      category: "Budgeting",
      slug: "50-30-20-budget",
      date: "April 5, 2025"
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-finance-primary">Personal Finance Tips & Strategies</h1>
              <p className="text-xl text-gray-600 mt-4">
                Master your money with practical advice on budgeting, saving, managing debt, and building a secure financial foundation.
              </p>
            </div>
          </div>
        </section>

        {/* Topics Section */}
        <section className="section bg-white">
          <div className="container-custom">
            <h2 className="text-center mb-12">Explore Personal Finance Topics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topics.map((topic, index) => (
                <div key={index} className="finance-card p-6 bg-white">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-finance-secondary rounded-full">
                      {topic.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-3">{topic.title}</h3>
                  <p className="text-gray-600 text-center mb-4">{topic.description}</p>
                  <div className="text-center">
                    <Link 
                      to={`/personal-finance/${topic.slug}`} 
                      className="inline-flex items-center text-finance-accent hover:underline font-medium"
                    >
                      Explore articles <ArrowUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles Section */}
        <section className="section bg-gray-50">
          <div className="container-custom">
            <h2 className="text-center mb-12">Popular Personal Finance Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Card key={article.id} className="finance-card h-full flex flex-col">
                  <div className="bg-gray-200 aspect-video w-full"></div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="mb-2">
                      <Badge variant="outline" className="bg-finance-secondary text-finance-primary">
                        {article.category}
                      </Badge>
                    </div>
                    <Link to={`/blog/${article.slug}`} className="hover:text-finance-accent transition-colors">
                      <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                    </Link>
                    <p className="text-gray-600 mb-4 flex-grow">{article.excerpt}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-xs text-gray-500">{article.date}</span>
                      <Link 
                        to={`/blog/${article.slug}`} 
                        className="flex items-center text-finance-accent hover:underline font-medium"
                      >
                        Read more <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/blog" 
                className="inline-flex items-center text-finance-primary hover:text-finance-accent font-medium"
              >
                Browse all articles <ArrowUpRight className="ml-1 h-4 w-4" />
              </Link>
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

export default PersonalFinance;
