
import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, Clock, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { AspectRatio } from './ui/aspect-ratio'; 

interface Article {
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: number;
  views: number;
  date: string;
  slug: string;
}

const EnhancedFeaturedArticles = () => {
  const articles: Article[] = [
    {
      title: "How to Build a $100,000 Investment Portfolio from Scratch",
      excerpt: "Learn the step-by-step process to creating a six-figure investment portfolio with minimal starting capital.",
      image: "https://images.unsplash.com/photo-1579532536935-619928decd08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      category: "Investing",
      readTime: 8,
      views: 3250,
      date: "May 10, 2023",
      slug: "/blog/build-investment-portfolio"
    },
    {
      title: "The 50/30/20 Budget Rule: How to Simplify Your Financial Life",
      excerpt: "Discover how this simple budgeting method can help you manage your money more effectively with less stress.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      category: "Budgeting",
      readTime: 6,
      views: 2840,
      date: "May 5, 2023",
      slug: "/blog/50-30-20-budget-rule"
    },
    {
      title: "Retirement Planning in Your 30s: What You Need to Know Now",
      excerpt: "Why starting retirement planning in your 30s can make all the difference, and the exact steps to take.",
      image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      category: "Retirement",
      readTime: 9,
      views: 1950,
      date: "May 2, 2023",
      slug: "/blog/retirement-30s"
    }
  ];

  return (
    <section className="section py-16">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Articles</h2>
            <p className="text-gray-600 max-w-2xl">
              Explore our most popular articles to boost your financial knowledge and make smarter money decisions.
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 border-finance-primary text-finance-primary hover:bg-finance-primary/10">
            <Link to="/blog" className="flex items-center">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.title} className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-md">
              <div>
                <AspectRatio ratio={16/9} className="bg-gray-100">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
              
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="secondary" className="bg-finance-secondary/20 hover:bg-finance-secondary/30 text-finance-primary border-0">
                    {article.category}
                  </Badge>
                  <span className="text-gray-500 text-xs">{article.date}</span>
                </div>
                <h3 className="text-xl font-semibold leading-tight hover:text-finance-primary transition-colors">
                  <Link to={article.slug}>
                    {article.title}
                  </Link>
                </h3>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 line-clamp-3">
                  {article.excerpt}
                </p>
              </CardContent>
              
              <CardFooter className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-100 pt-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{article.readTime} min read</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{article.views.toLocaleString()}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedFeaturedArticles;
