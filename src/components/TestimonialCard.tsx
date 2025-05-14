
import React from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatarUrl?: string;
  rating: number;
}

const TestimonialCard = ({ quote, author, role, avatarUrl, rating }: TestimonialCardProps) => {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Avatar className="h-14 w-14 border-2 border-finance-secondary">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={author} />
            ) : (
              <AvatarFallback className="bg-finance-primary text-white">
                {author.split(' ').map(name => name[0]).join('')}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
        <blockquote className="text-gray-700 mb-4 italic">"{quote}"</blockquote>
        <div className="mt-4">
          <p className="font-semibold text-gray-900">{author}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
