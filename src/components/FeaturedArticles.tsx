
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface ArticleProps {
  title: string;
  excerpt: string;
  category: string;
  slug: string;
  date: string;
  readTime: string;
}

const ArticleCard = ({ title, excerpt, category, slug, date, readTime }: ArticleProps) => {
  return (
    <Card className="finance-card h-full flex flex-col">
      <div className="bg-gray-200 aspect-video w-full"></div>
      <CardHeader className="pt-4 pb-2">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline" className="bg-finance-secondary text-finance-primary">
            {category}
          </Badge>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <CardTitle className="text-xl md:text-2xl">
          <Link to={`/blog/${slug}`} className="hover:text-finance-accent transition-colors">
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="py-2 flex-grow">
        <p className="text-gray-600">{excerpt}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-0">
        <span className="text-sm text-gray-500">{readTime} min read</span>
        <Link 
          to={`/blog/${slug}`} 
          className="flex items-center text-finance-accent hover:underline font-medium"
        >
          Read more <ArrowUpRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};

const FeaturedArticles = () => {
  const articles: ArticleProps[] = [
    {
      title: "How to Create a Budget that Works for You",
      excerpt: "Learn the simple steps to create a personalized budget that you'll actually stick to, no matter your income level.",
      category: "Personal Finance",
      slug: "budget-that-works",
      date: "May 10, 2025",
      readTime: "5"
    },
    {
      title: "What Are Index Funds? A Beginner's Guide",
      excerpt: "Discover why index funds are a powerful investment vehicle and how you can start investing in them with minimal risk.",
      category: "Investing",
      slug: "index-funds-guide",
      date: "May 8, 2025",
      readTime: "7"
    },
    {
      title: "5 Ways to Save Money on Monthly Bills",
      excerpt: "Practical strategies to reduce your recurring expenses and keep more money in your pocket every month.",
      category: "Saving",
      slug: "save-on-monthly-bills",
      date: "May 5, 2025",
      readTime: "4"
    }
  ];

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="mb-4">Latest Articles</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expand your financial knowledge with our latest insights and expert advice
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <ArticleCard key={index} {...article} />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-finance-primary hover:text-finance-accent font-medium"
          >
            Browse all articles <ArrowUpRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticles;
