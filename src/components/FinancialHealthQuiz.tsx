import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import {
  Heart,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Shield,
  Wallet,
  Target,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  id: number;
  category: 'emergency' | 'debt' | 'savings' | 'planning';
  question: string;
  options: { value: string; label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    category: 'emergency',
    question: 'How many months of expenses do you have saved in an emergency fund?',
    options: [
      { value: 'none', label: 'No emergency fund', score: 0 },
      { value: 'less1', label: 'Less than 1 month', score: 25 },
      { value: '1-3', label: '1-3 months', score: 50 },
      { value: '3-6', label: '3-6 months', score: 75 },
      { value: '6+', label: '6+ months', score: 100 },
    ],
  },
  {
    id: 2,
    category: 'debt',
    question: 'What percentage of your monthly income goes toward debt payments?',
    options: [
      { value: 'none', label: 'No debt payments', score: 100 },
      { value: 'under10', label: 'Less than 10%', score: 80 },
      { value: '10-20', label: '10-20%', score: 60 },
      { value: '20-30', label: '20-30%', score: 40 },
      { value: 'over30', label: 'More than 30%', score: 20 },
    ],
  },
  {
    id: 3,
    category: 'savings',
    question: 'What percentage of your income do you save/invest each month?',
    options: [
      { value: 'none', label: "I don't save regularly", score: 0 },
      { value: 'under5', label: 'Less than 5%', score: 25 },
      { value: '5-10', label: '5-10%', score: 50 },
      { value: '10-20', label: '10-20%', score: 75 },
      { value: 'over20', label: 'More than 20%', score: 100 },
    ],
  },
  {
    id: 4,
    category: 'planning',
    question: 'Do you have a written budget or financial plan?',
    options: [
      { value: 'no', label: 'No budget or plan', score: 0 },
      { value: 'mental', label: 'I track mentally', score: 30 },
      { value: 'sometimes', label: 'Sometimes, but not consistently', score: 50 },
      { value: 'budget', label: 'Yes, a budget I follow', score: 75 },
      { value: 'plan', label: 'Yes, a comprehensive financial plan', score: 100 },
    ],
  },
  {
    id: 5,
    category: 'savings',
    question: 'Are you contributing to a retirement account?',
    options: [
      { value: 'no', label: 'No', score: 0 },
      { value: 'sometimes', label: 'Occasionally', score: 25 },
      { value: 'employer', label: 'Yes, employer match only', score: 50 },
      { value: 'over-match', label: 'Yes, more than employer match', score: 75 },
      { value: 'max', label: 'Yes, maxing out contributions', score: 100 },
    ],
  },
  {
    id: 6,
    category: 'emergency',
    question: 'Do you have health, life, and property insurance?',
    options: [
      { value: 'none', label: 'No insurance', score: 0 },
      { value: 'minimal', label: 'Minimal coverage', score: 35 },
      { value: 'health', label: 'Health only', score: 50 },
      { value: 'most', label: 'Most types covered', score: 75 },
      { value: 'full', label: 'Fully insured for my needs', score: 100 },
    ],
  },
  {
    id: 7,
    category: 'debt',
    question: 'What is your credit score?',
    options: [
      { value: 'unknown', label: "Don't know", score: 30 },
      { value: 'poor', label: 'Poor (below 580)', score: 20 },
      { value: 'fair', label: 'Fair (580-669)', score: 40 },
      { value: 'good', label: 'Good (670-739)', score: 70 },
      { value: 'excellent', label: 'Very Good/Excellent (740+)', score: 100 },
    ],
  },
  {
    id: 8,
    category: 'planning',
    question: 'Do you have financial goals with specific targets?',
    options: [
      { value: 'no', label: 'No specific goals', score: 0 },
      { value: 'vague', label: 'Vague ideas but nothing specific', score: 25 },
      { value: 'some', label: 'Some goals, no timelines', score: 50 },
      { value: 'goals', label: 'Yes, clear goals with timelines', score: 75 },
      { value: 'tracking', label: 'Yes, and I track progress regularly', score: 100 },
    ],
  },
];

const categoryInfo = {
  emergency: { icon: Shield, label: 'Emergency Preparedness', color: 'text-blue-500' },
  debt: { icon: TrendingUp, label: 'Debt Management', color: 'text-red-500' },
  savings: { icon: Wallet, label: 'Savings & Investing', color: 'text-green-500' },
  planning: { icon: Target, label: 'Financial Planning', color: 'text-purple-500' },
};

const FinancialHealthQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const goNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const goPrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const calculateResults = () => {
    const categoryScores: Record<string, { total: number; count: number }> = {
      emergency: { total: 0, count: 0 },
      debt: { total: 0, count: 0 },
      savings: { total: 0, count: 0 },
      planning: { total: 0, count: 0 },
    };

    questions.forEach((q) => {
      const answer = answers[q.id];
      if (answer) {
        const option = q.options.find((o) => o.value === answer);
        if (option) {
          categoryScores[q.category].total += option.score;
          categoryScores[q.category].count += 1;
        }
      }
    });

    const results = Object.entries(categoryScores).map(([category, data]) => ({
      category,
      score: data.count > 0 ? Math.round(data.total / data.count) : 0,
    }));

    const overallScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;

    return { categoryResults: results, overallScore: Math.round(overallScore) };
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-finance-success';
    if (score >= 60) return 'text-finance-accent';
    if (score >= 40) return 'text-finance-warning';
    return 'text-finance-danger';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  const getRecommendations = (categoryResults: { category: string; score: number }[]) => {
    const recommendations: string[] = [];
    categoryResults.forEach(({ category, score }) => {
      if (score < 50) {
        switch (category) {
          case 'emergency':
            recommendations.push('Build your emergency fund to cover 3-6 months of expenses.');
            break;
          case 'debt':
            recommendations.push('Focus on paying down high-interest debt.');
            break;
          case 'savings':
            recommendations.push('Increase your savings rate by automating transfers.');
            break;
          case 'planning':
            recommendations.push('Create a written budget and set specific financial goals.');
            break;
        }
      }
    });
    return recommendations;
  };

  if (showResults) {
    const { categoryResults, overallScore } = calculateResults();
    const recommendations = getRecommendations(categoryResults);

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-finance-primary flex items-center justify-center gap-2">
            <Sparkles className="h-6 w-6" />
            Your Financial Health Score
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-8 bg-gradient-to-br from-finance-primary/10 to-finance-accent/10 rounded-xl">
            <div className={cn('text-6xl font-bold mb-2', getScoreColor(overallScore))}>
              {overallScore}
            </div>
            <p className="text-xl font-medium text-foreground">{getScoreLabel(overallScore)}</p>
            <p className="text-muted-foreground mt-1">out of 100</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Category Breakdown</h3>
            {categoryResults.map(({ category, score }) => {
              const info = categoryInfo[category as keyof typeof categoryInfo];
              const Icon = info.icon;
              return (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={cn('h-5 w-5', info.color)} />
                      <span className="font-medium">{info.label}</span>
                    </div>
                    <span className={cn('font-semibold', getScoreColor(score))}>{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              );
            })}
          </div>

          {recommendations.length > 0 && (
            <div className="bg-muted/50 rounded-lg p-4 border border-border">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-finance-warning" />
                Recommendations
              </h3>
              <ul className="space-y-2">
                {recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-finance-accent mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Button onClick={resetQuiz} className="w-full" variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const CategoryIcon = categoryInfo[question.category].icon;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-finance-primary flex items-center justify-center gap-2">
          <Heart className="h-6 w-6" />
          Financial Health Quiz
        </CardTitle>
        <CardDescription className="text-center">
          Answer these questions to assess your financial wellness
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span className="flex items-center gap-1">
              <CategoryIcon className={cn('h-4 w-4', categoryInfo[question.category].color)} />
              {categoryInfo[question.category].label}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="py-4">
          <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
          <RadioGroup
            value={answers[question.id] || ''}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {question.options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  'flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer',
                  answers[question.id] === option.value
                    ? 'border-finance-primary bg-finance-primary/5'
                    : 'border-border hover:border-finance-primary/50'
                )}
                onClick={() => handleAnswer(option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-grow cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button onClick={goPrev} disabled={currentQuestion === 0} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={goNext}
            disabled={!answers[question.id]}
            className="bg-finance-primary hover:bg-finance-primary/90"
          >
            {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialHealthQuiz;