
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

const Blog = () => {
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "How to Create a Budget that Works for You",
      excerpt: "Learn the simple steps to create a personalized budget that you'll actually stick to, no matter your income level.",
      category: "Personal Finance",
      slug: "budget-that-works",
      date: "May 10, 2025",
      readTime: "5",
      featured: true
    },
    {
      id: "2",
      title: "What Are Index Funds? A Beginner's Guide",
      excerpt: "Discover why index funds are a powerful investment vehicle and how you can start investing in them with minimal risk.",
      category: "Investing",
      slug: "index-funds-guide",
      date: "May 8, 2025",
      readTime: "7",
      featured: true
    },
    {
      id: "3",
      title: "5 Ways to Save Money on Monthly Bills",
      excerpt: "Practical strategies to reduce your recurring expenses and keep more money in your pocket every month.",
      category: "Saving",
      slug: "save-on-monthly-bills",
      date: "May 5, 2025",
      readTime: "4",
      featured: true
    },
    {
      id: "4",
      title: "Understanding Credit Scores: What You Need to Know",
      excerpt: "A comprehensive guide to credit scores - what they are, how they're calculated, and practical steps to improve yours.",
      category: "Credit",
      slug: "understanding-credit-scores",
      date: "May 2, 2025",
      readTime: "8"
    },
    {
      id: "5",
      title: "The Pros and Cons of Cryptocurrency Investing",
      excerpt: "An objective look at cryptocurrency investments, examining the potential benefits, risks, and strategies for beginners.",
      category: "Crypto",
      slug: "cryptocurrency-investing",
      date: "April 28, 2025",
      readTime: "9"
    },
    {
      id: "6",
      title: "How to Start Investing with $500 or Less",
      excerpt: "You don't need thousands of dollars to start investing. Here's how to begin building wealth with a modest amount.",
      category: "Investing",
      slug: "investing-with-little-money",
      date: "April 25, 2025",
      readTime: "6"
    },
    {
      id: "7",
      title: "Best Financial Apps for Managing Your Money in 2025",
      excerpt: "A review of the most effective money management, budgeting, and investing apps to help you take control of your finances.",
      category: "Tools",
      slug: "best-financial-apps-2025",
      date: "April 20, 2025",
      readTime: "10"
    },
    {
      id: "8",
      title: "How to Pay Off $10,000 in Credit Card Debt in One Year",
      excerpt: "A step-by-step case study of how one reader eliminated significant credit card debt through strategic planning.",
      category: "Debt",
      slug: "paying-off-credit-card-debt",
      date: "April 15, 2025",
      readTime: "7"
    }
  ];

  const categories = ["All", "Personal Finance", "Investing", "Saving", "Credit", "Debt", "Crypto", "Tools"];
  
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Page Header */}
        <section className="bg-gray-50 py-12">
          <div className="container-custom">
            <h1 className="text-center">Financial Knowledge Hub</h1>
            <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
              Explore our collection of articles, guides, and resources to help you make smarter financial decisions
            </p>
          </div>
        </section>

        {/* Blog Content */}
        <section className="section">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-12">
              {/* Main Content */}
              <div className="w-full md:w-3/4">
                {/* Featured Articles */}
                <div className="mb-12">
                  <h2 className="mb-6">Featured Articles</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {blogPosts.filter(post => post.featured).map((post) => (
                      <Card key={post.id} className="finance-card h-full flex flex-col">
                        <div className="bg-gray-200 aspect-video w-full"></div>
                        <CardHeader>
                          <div className="flex justify-between items-center mb-2">
                            <Badge variant="outline" className="bg-finance-secondary text-finance-primary">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-gray-500">{post.date}</span>
                          </div>
                          <CardTitle className="text-xl">
                            <Link to={`/blog/${post.slug}`} className="hover:text-finance-accent transition-colors">
                              {post.title}
                            </Link>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-gray-600">{post.excerpt}</p>
                        </CardContent>
                        <div className="p-6 pt-0 flex justify-between items-center">
                          <span className="text-sm text-gray-500">{post.readTime} min read</span>
                          <Link 
                            to={`/blog/${post.slug}`} 
                            className="flex items-center text-finance-accent hover:underline font-medium"
                          >
                            Read more <ArrowUpRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* All Articles */}
                <div>
                  <h2 className="mb-6">All Articles</h2>
                  <div className="space-y-6">
                    {blogPosts.map((post) => (
                      <Card key={post.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="bg-gray-200 w-full md:w-1/4 aspect-video md:aspect-square"></div>
                          <CardContent className="flex-grow p-6">
                            <div className="flex justify-between items-center mb-2">
                              <Badge variant="outline" className="bg-finance-secondary text-finance-primary">
                                {post.category}
                              </Badge>
                              <span className="text-xs text-gray-500">{post.date}</span>
                            </div>
                            <Link to={`/blog/${post.slug}`} className="hover:text-finance-accent transition-colors">
                              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                            </Link>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-500">{post.readTime} min read</span>
                              <Link 
                                to={`/blog/${post.slug}`} 
                                className="flex items-center text-finance-accent hover:underline font-medium"
                              >
                                Read more <ArrowUpRight className="ml-1 h-4 w-4" />
                              </Link>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="w-full md:w-1/4">
                {/* Search */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Search Articles</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      type="text"
                      placeholder="Search..."
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={category === "All" ? "default" : "outline"}
                        className={category === "All" ? "bg-finance-primary" : "hover:bg-finance-secondary cursor-pointer"}
                      >
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Popular Articles */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Popular Articles</h3>
                  <div className="space-y-4">
                    {blogPosts.slice(0, 4).map((post) => (
                      <div key={`popular-${post.id}`} className="border-b pb-4">
                        <Link to={`/blog/${post.slug}`} className="hover:text-finance-accent transition-colors">
                          <h4 className="font-medium">{post.title}</h4>
                        </Link>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500">{post.date}</span>
                          <span className="text-xs text-gray-500">{post.readTime} min read</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Blog;
