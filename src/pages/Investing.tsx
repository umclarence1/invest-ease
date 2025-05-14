
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, TrendingUp, BarChart3, LineChart, Wallet } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Investing = () => {
  const investmentTypes = [
    {
      title: "Stocks",
      description: "Ownership shares in publicly traded companies that can appreciate in value and pay dividends",
      articles: [
        "How to Start Investing in the Stock Market",
        "Understanding Stock Valuation Metrics",
        "Dividend Investing: Building Passive Income"
      ]
    },
    {
      title: "Bonds",
      description: "Debt securities that pay interest over time and return principal at maturity",
      articles: [
        "Bond Investment Basics for Beginners",
        "Treasury vs. Corporate Bonds: Key Differences",
        "How Interest Rates Affect Bond Prices"
      ]
    },
    {
      title: "Mutual Funds & ETFs",
      description: "Pooled investment vehicles that offer diversification across many securities",
      articles: [
        "Index Funds Explained: Low-Cost Investing",
        "Active vs. Passive Investing: Pros and Cons",
        "How to Choose the Right ETF for Your Portfolio"
      ]
    },
    {
      title: "Real Estate",
      description: "Property investments that can generate rental income and appreciate in value",
      articles: [
        "Real Estate Investment Trusts (REITs) Overview",
        "Rental Property Investing: Getting Started",
        "Real Estate Crowdfunding Platforms Compared"
      ]
    }
  ];

  const articles = [
    {
      id: "1",
      title: "What Are Index Funds? A Beginner's Guide",
      excerpt: "Discover why index funds are a powerful investment vehicle and how you can start investing in them with minimal risk.",
      category: "ETFs & Funds",
      slug: "index-funds-guide",
      date: "May 8, 2025"
    },
    {
      id: "2",
      title: "The Pros and Cons of Cryptocurrency Investing",
      excerpt: "An objective look at cryptocurrency investments, examining the potential benefits, risks, and strategies for beginners.",
      category: "Cryptocurrency",
      slug: "cryptocurrency-investing",
      date: "April 28, 2025"
    },
    {
      id: "3",
      title: "How to Start Investing with $500 or Less",
      excerpt: "You don't need thousands of dollars to start investing. Here's how to begin building wealth with a modest amount.",
      category: "Beginner",
      slug: "investing-with-little-money",
      date: "April 25, 2025"
    },
    {
      id: "4",
      title: "Understanding Asset Allocation: Balancing Risk and Reward",
      excerpt: "Learn how to distribute your investments across different asset classes based on your goals and risk tolerance.",
      category: "Strategy",
      slug: "asset-allocation",
      date: "April 18, 2025"
    },
    {
      id: "5",
      title: "Tax-Efficient Investing Strategies",
      excerpt: "Maximize your returns by implementing strategies that minimize the tax impact on your investment portfolio.",
      category: "Tax",
      slug: "tax-efficient-investing",
      date: "April 12, 2025"
    },
    {
      id: "6",
      title: "Retirement Accounts Compared: 401(k) vs. IRA vs. Roth",
      excerpt: "A detailed comparison of the most common retirement accounts to help you choose the right options.",
      category: "Retirement",
      slug: "retirement-accounts-compared",
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
              <h1 className="text-finance-primary">Investing & Wealth Building</h1>
              <p className="text-xl text-gray-600 mt-4">
                Learn how to grow your wealth through smart investing strategies, from beginners to advanced concepts.
              </p>
            </div>
          </div>
        </section>

        {/* Investment Types Section */}
        <section className="section bg-white">
          <div className="container-custom">
            <h2 className="text-center mb-12">Investment Types</h2>
            
            <Tabs defaultValue="stocks">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="stocks">Stocks</TabsTrigger>
                <TabsTrigger value="bonds">Bonds</TabsTrigger>
                <TabsTrigger value="funds">Mutual Funds & ETFs</TabsTrigger>
                <TabsTrigger value="real-estate">Real Estate</TabsTrigger>
              </TabsList>
              
              {investmentTypes.map((type, index) => (
                <TabsContent key={index} value={type.title.toLowerCase().replace(" & etfs", "").replace(" ", "-")}>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex justify-center mb-6">
                        {index === 0 && <TrendingUp className="h-12 w-12 text-finance-primary" />}
                        {index === 1 && <LineChart className="h-12 w-12 text-finance-primary" />}
                        {index === 2 && <BarChart3 className="h-12 w-12 text-finance-primary" />}
                        {index === 3 && <Wallet className="h-12 w-12 text-finance-primary" />}
                      </div>
                      <h3 className="text-2xl font-semibold text-center mb-3">{type.title}</h3>
                      <p className="text-gray-600 text-center mb-8 max-w-lg mx-auto">{type.description}</p>
                      
                      <div className="max-w-xl mx-auto">
                        <h4 className="font-medium mb-4">Popular Articles on {type.title}</h4>
                        <ul className="space-y-3">
                          {type.articles.map((article, idx) => (
                            <li key={idx} className="border-b pb-3">
                              <Link 
                                to="/blog" 
                                className="flex items-center justify-between text-finance-primary hover:text-finance-accent"
                              >
                                <span>{article}</span>
                                <ArrowUpRight className="h-4 w-4 ml-2 flex-shrink-0" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Key Concepts Section */}
        <section className="section bg-finance-secondary">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-center mb-8">Key Investing Concepts</h2>
              
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Risk vs. Return</h3>
                  <p className="text-gray-700">
                    Higher potential returns generally come with higher risk. Understanding this relationship 
                    is fundamental to making investment decisions aligned with your goals and risk tolerance.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Diversification</h3>
                  <p className="text-gray-700">
                    Spreading investments across different asset classes, sectors, and geographic regions 
                    can help reduce risk and smooth out returns over time.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Compound Growth</h3>
                  <p className="text-gray-700">
                    The effect of earning returns on both your initial investment and accumulated returns over time. 
                    This powerful concept is why starting early is so beneficial.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Time Horizon</h3>
                  <p className="text-gray-700">
                    The expected period of time you'll hold an investment before needing the money. 
                    Longer time horizons generally allow for taking on more risk.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Articles Section */}
        <section className="section bg-white">
          <div className="container-custom">
            <h2 className="text-center mb-12">Popular Investing Articles</h2>
            
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

export default Investing;
