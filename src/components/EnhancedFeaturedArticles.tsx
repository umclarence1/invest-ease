import { Card, CardContent, CardHeader, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, Clock, Eye, ExternalLink } from 'lucide-react';
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
  externalUrl: string;
  source: string;
}

const EnhancedFeaturedArticles = () => {
  // Articles linking to real finance education sites
  const articles: Article[] = [
    {
      title: "How to Build an Investment Portfolio from Scratch",
      excerpt: "Learn the step-by-step process to creating a diversified investment portfolio, even if you're just starting out.",
      image: "https://images.unsplash.com/photo-1579532536935-619928decd08?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      category: "Investing",
      readTime: 8,
      views: 3250,
      date: "2024",
      externalUrl: "https://www.investopedia.com/articles/basics/11/3-s-702702702simple-702ways-702to-702build-702your-702portfolio.asp",
      source: "Investopedia"
    },
    {
      title: "The 50/30/20 Budget Rule Explained",
      excerpt: "Discover how this simple budgeting method can help you manage your money more effectively with less stress.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      category: "Budgeting",
      readTime: 6,
      views: 2840,
      date: "2024",
      externalUrl: "https://www.nerdwallet.com/article/finance/nerdwallet-budget-calculator",
      source: "NerdWallet"
    },
    {
      title: "Retirement Planning: How Much Do You Need?",
      excerpt: "Essential retirement planning strategies and calculations to ensure you're on track for a comfortable retirement.",
      image: "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      category: "Retirement",
      readTime: 9,
      views: 1950,
      date: "2024",
      externalUrl: "https://www.investopedia.com/retirement/how-much-you-should-have-saved-age/",
      source: "Investopedia"
    },
    {
      title: "Understanding Stock Market Basics",
      excerpt: "A comprehensive guide to understanding how the stock market works and how to start investing in stocks.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      category: "Stocks",
      readTime: 10,
      views: 4500,
      date: "2024",
      externalUrl: "https://www.investopedia.com/articles/basics/06/invest1000.asp",
      source: "Investopedia"
    },
    {
      title: "How to Improve Your Credit Score Fast",
      excerpt: "Actionable steps you can take today to boost your credit score and qualify for better interest rates.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      category: "Credit",
      readTime: 7,
      views: 5200,
      date: "2024",
      externalUrl: "https://www.nerdwallet.com/article/finance/raise-credit-score-fast",
      source: "NerdWallet"
    },
    {
      title: "Emergency Fund: How Much Should You Save?",
      excerpt: "Learn why an emergency fund is crucial and exactly how much you should aim to save for financial security.",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      category: "Savings",
      readTime: 5,
      views: 3100,
      date: "2024",
      externalUrl: "https://www.bankrate.com/banking/savings/emergency-fund-calculator/",
      source: "Bankrate"
    }
  ];

  // Show only first 3 on homepage
  const displayedArticles = articles.slice(0, 3);

  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">Featured Articles</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore curated articles from top financial experts to boost your knowledge.
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 border-finance-primary text-finance-primary hover:bg-finance-primary/10">
            <Link to="/blog" className="flex items-center">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayedArticles.map((article) => (
            <a
              key={article.title}
              href={article.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-card group-hover:-translate-y-1">
                <div className="relative">
                  <AspectRatio ratio={16 / 9} className="bg-muted">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </AspectRatio>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-background/90 text-foreground text-xs flex items-center gap-1">
                      {article.source}
                      <ExternalLink className="h-3 w-3" />
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary" className="bg-finance-primary/10 hover:bg-finance-primary/20 text-finance-primary border-0">
                      {article.category}
                    </Badge>
                    <span className="text-muted-foreground text-xs">{article.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold leading-tight text-foreground group-hover:text-finance-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </CardHeader>

                <CardContent className="pb-2">
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                </CardContent>

                <CardFooter className="flex justify-between items-center text-sm text-muted-foreground border-t border-border pt-4">
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
            </a>
          ))}
        </div>

        {/* More Resources */}
        <div className="mt-12 p-6 bg-card rounded-xl border border-border">
          <h3 className="text-lg font-semibold mb-4 text-foreground">More Financial Resources</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Investopedia', url: 'https://www.investopedia.com', desc: 'Financial education & terms' },
              { name: 'NerdWallet', url: 'https://www.nerdwallet.com', desc: 'Financial product reviews' },
              { name: 'Bankrate', url: 'https://www.bankrate.com', desc: 'Rates & calculators' },
              { name: 'The Motley Fool', url: 'https://www.fool.com', desc: 'Investment advice' },
            ].map((resource) => (
              <a
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-finance-primary hover:bg-finance-primary/5 transition-all group"
              >
                <div>
                  <p className="font-medium text-foreground group-hover:text-finance-primary">{resource.name}</p>
                  <p className="text-xs text-muted-foreground">{resource.desc}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-finance-primary" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedFeaturedArticles;
