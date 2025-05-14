
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-finance-primary">Contact Us</h1>
              <p className="text-xl text-gray-600 mt-4">
                Have questions or feedback? We'd love to hear from you. Get in touch with our team.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card>
                  <CardContent className="p-8">
                    <h2 className="mb-6">Send Us a Message</h2>
                    
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="block font-medium">First Name</label>
                          <Input id="firstName" placeholder="Enter your first name" />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="block font-medium">Last Name</label>
                          <Input id="lastName" placeholder="Enter your last name" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block font-medium">Email Address</label>
                        <Input id="email" type="email" placeholder="Enter your email address" />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="block font-medium">Subject</label>
                        <Input id="subject" placeholder="What is this regarding?" />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="block font-medium">Message</label>
                        <Textarea 
                          id="message" 
                          placeholder="Please provide details about your inquiry" 
                          className="min-h-[150px]"
                        />
                      </div>
                      
                      <Button className="w-full bg-finance-primary hover:bg-finance-primary/90">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact Info */}
              <div>
                <h2 className="mb-6">Contact Information</h2>
                <p className="text-lg text-gray-600 mb-8">
                  We aim to respond to all inquiries within 24-48 hours during business days.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 p-3 bg-finance-secondary rounded-full">
                      <Mail className="h-6 w-6 text-finance-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Us</h3>
                      <p className="text-gray-600">support@wealthwise.com</p>
                      <p className="text-gray-600">info@wealthwise.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 p-3 bg-finance-secondary rounded-full">
                      <Phone className="h-6 w-6 text-finance-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Call Us</h3>
                      <p className="text-gray-600">(555) 123-4567</p>
                      <p className="text-gray-600">Monday - Friday: 9am - 5pm EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 p-3 bg-finance-secondary rounded-full">
                      <MapPin className="h-6 w-6 text-finance-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office Location</h3>
                      <p className="text-gray-600">123 Financial Street</p>
                      <p className="text-gray-600">New York, NY 10001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mr-4 p-3 bg-finance-secondary rounded-full">
                      <MessageSquare className="h-6 w-6 text-finance-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Social Media</h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <a href="#" className="text-gray-600 hover:text-finance-accent">
                          Twitter
                        </a>
                        <a href="#" className="text-gray-600 hover:text-finance-accent">
                          LinkedIn
                        </a>
                        <a href="#" className="text-gray-600 hover:text-finance-accent">
                          Facebook
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* FAQ Link */}
                <div className="mt-12 p-6 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Frequently Asked Questions</h3>
                  <p className="text-gray-600 mb-4">
                    Find quick answers to common questions on our FAQ page.
                  </p>
                  <Button variant="outline" className="border-finance-primary text-finance-primary">
                    View FAQs
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="bg-gray-200 h-80 rounded-lg w-full"></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
