import { useState } from "react";
import { MobileLayout } from "../components/layout/MobileLayout";
import { OptionCard } from "../components/ui/OptionCard";
import { Heart, BookOpen, Briefcase, TrendingUp, Users, Lightbulb } from "lucide-react";

export const Advice = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const adviceCategories = [
    { 
      id: "career", 
      title: "Career Growth", 
      icon: Briefcase,
      description: "Professional development and career transitions"
    },
    { 
      id: "education", 
      title: "Education", 
      icon: BookOpen,
      description: "Learning paths and skill development"
    },
    { 
      id: "networking", 
      title: "Networking", 
      icon: Users,
      description: "Building professional relationships"
    },
    { 
      id: "skills", 
      title: "Skills", 
      icon: Lightbulb,
      description: "Technical and soft skill improvement"
    },
    { 
      id: "trends", 
      title: "Industry Trends", 
      icon: TrendingUp,
      description: "Market insights and emerging opportunities"
    },
    { 
      id: "personal", 
      title: "Personal Growth", 
      icon: Heart,
      description: "Work-life balance and personal development"
    }
  ];

  const featuredAdvice = [
    {
      id: "1",
      title: "Career Change Advice",
      author: "Julia Nancy",
      timeAgo: "2 hours ago",
      preview: "I'm contemplating a career change and wondering if any of you have experienced transitioning from a corporate job to pursuing your passion...",
      engagement: { likes: 261, comments: 22, views: 16324 }
    },
    {
      id: "2",
      title: "Help on My Future Journey!",
      author: "Ben Wright",
      timeAgo: "3 hours ago",
      preview: "Hello, amazing community! As my high school graduation approaches, I find myself facing big decisions...",
      engagement: { likes: 123, comments: 11, views: 5123 }
    }
  ];

  return (
    <MobileLayout currentPage="advice">
      <div className="px-4 py-6 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-text-primary">Advice Center</h1>
          <p className="text-text-secondary text-sm">
            Get guidance from our community and AI-powered insights
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-text-primary">Browse Topics</h2>
          <div className="grid grid-cols-2 gap-3">
            {adviceCategories.map((category) => (
              <OptionCard
                key={category.id}
                title={category.title}
                description={category.description}
                icon={category.icon}
                onClick={() => setSelectedCategory(category.id)}
                variant="outlined"
                className={`
                  ${selectedCategory === category.id ? "border-primary bg-primary/5" : ""}
                `}
              />
            ))}
          </div>
        </div>

        {/* Featured Advice */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text-primary">Featured Advice</h2>
            <button className="text-text-muted text-sm">See All</button>
          </div>
          
          <div className="space-y-4">
            {featuredAdvice.map((advice) => (
              <div key={advice.id} className="bg-surface rounded-lg border border-card-border p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-text-primary text-sm mb-1">
                        {advice.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-text-muted">
                        <span>by {advice.author}</span>
                        <span>•</span>
                        <span>{advice.timeAgo}</span>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-surface-secondary rounded-full flex items-center justify-center ml-3">
                      <span className="text-xs font-medium text-text-secondary">
                        {advice.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                    {advice.preview}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-text-muted pt-2 border-t border-border-light">
                    <span>{advice.engagement.likes} likes</span>
                    <span>{advice.engagement.comments} comments</span>
                    <span>{advice.engagement.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ask for Advice CTA */}
        <div className="bg-primary rounded-lg p-4 text-center">
          <h3 className="font-semibold text-primary-foreground mb-2">
            Need Personalized Advice?
          </h3>
          <p className="text-primary-foreground/80 text-sm mb-3">
            Share your situation and get tailored guidance from our AI assistant
          </p>
          <button className="bg-primary-foreground text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-foreground/90 transition-colors">
            Ask AI Assistant
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};