import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Newsletter from '../components/Newsletter';
import FinancialTipsCarousel from '../components/FinancialTipsCarousel';
import LiveMarketWidget from '../components/LiveMarketWidget';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, BookOpen, Calculator, TrendingUp, Shield, Target } from 'lucide-react';
import EnhancedFeaturedArticles from '../components/EnhancedFeaturedArticles';
import EnhancedTestimonials from '../components/EnhancedTestimonials';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const features = [
    {
      icon: Calculator,
      title: "Smart Financial Tools",
      description: "Interactive calculators to help you budget, plan investments, and track goals with personalized recommendations.",
      color: "from-finance-primary to-purple-600",
    },
    {
      icon: TrendingUp,
      title: "Investment Insights",
      description: "Learn investment strategies, understand market trends, and build a portfolio that works for your goals.",
      color: "from-finance-accent to-blue-600",
    },
    {
      icon: Lightbulb,
      title: "Expert Advice",
      description: "Practical tips and strategies from financial professionals for every life stage and situation.",
      color: "from-finance-warning to-amber-600",
    },
    {
      icon: Shield,
      title: "Financial Security",
      description: "Build emergency funds, manage debt effectively, and protect your financial future.",
      color: "from-finance-success to-emerald-600",
    },
    {
      icon: BookOpen,
      title: "Educational Guides",
      description: "Comprehensive guides that break down complex financial topics into easy-to-understand lessons.",
      color: "from-rose-500 to-pink-600",
    },
    {
      icon: Target,
      title: "Goal Planning",
      description: "Set and track financial goals from retirement to your dream vacation with actionable plans.",
      color: "from-indigo-500 to-violet-600",
    },
  ];

  const quickTools = [
    { name: 'Budget Calculator', href: '/tools?tab=budget', icon: Calculator },
    { name: 'Investment Growth', href: '/tools?tab=investment', icon: TrendingUp },
    { name: 'Debt Payoff', href: '/tools?tab=debt', icon: Shield },
    { name: 'Retirement Planner', href: '/tools?tab=retirement', icon: Target },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <Hero />

        {/* Financial Tips Carousel */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container-custom">
            <FinancialTipsCarousel />
          </div>
        </section>

        {/* Quick Tools Access */}
        <section className="py-8 md:py-12 border-b border-border">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Quick Access Tools</h2>
                <p className="text-muted-foreground">Jump right into our most popular calculators</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {quickTools.map((tool) => (
                  <Link key={tool.name} to={tool.href}>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 hover:bg-finance-primary hover:text-white hover:border-finance-primary transition-all"
                    >
                      <tool.icon className="h-4 w-4" />
                      {tool.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live Market Widget */}
        <section className="py-8 md:py-12">
          <div className="container-custom">
            <LiveMarketWidget />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-20 bg-muted/30">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Take Control of Your Financial Future
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our tools and resources are designed to help you make smarter financial decisions and build lasting wealth.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-6 md:p-8">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-finance-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Featured Articles */}
        <EnhancedFeaturedArticles />

        {/* Enhanced Testimonials */}
        <EnhancedTestimonials />

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-finance-primary/10 via-background to-finance-accent/10">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
                Ready to Take Control of Your Finances?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join thousands of readers already using our expert guides and interactive tools to achieve financial freedom.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <Link to="/tools">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-finance-primary hover:bg-finance-primary/90 text-white px-8 py-6 text-lg shadow-lg shadow-finance-primary/20"
                  >
                    Explore Free Tools
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-finance-primary text-finance-primary hover:bg-finance-primary/10 px-8 py-6 text-lg"
                  >
                    Read Expert Articles
                  </Button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                <div className="bg-card rounded-xl shadow-md px-6 py-4 flex items-center border border-border">
                  <div className="flex -space-x-2 mr-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-finance-primary to-finance-accent border-2 border-background flex items-center justify-center text-white text-xs font-bold"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-foreground">10,000+</p>
                    <p className="text-sm text-muted-foreground">Active Users</p>
                  </div>
                </div>

                <div className="bg-card rounded-xl shadow-md px-6 py-4 border border-border">
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <span key={i} className="text-yellow-500">★</span>
                    ))}
                  </div>
                  <p className="text-sm">
                    <span className="font-bold text-foreground">4.9/5</span>
                    <span className="text-muted-foreground"> from 2,500+ reviews</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
};

export default Index;
