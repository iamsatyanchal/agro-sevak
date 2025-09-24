import { useNavigate, useLocation } from "react-router-dom";
import { MobileLayout } from "../components/layout/MobileLayout";
import { mockCareerPaths } from "../data/mockData";
import { ChevronLeft, ExternalLink, TrendingUp, DollarSign } from "lucide-react";

export const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const answers = location.state?.answers || {};

  // In a real app, this would be processed by AI
  const topMatches = mockCareerPaths.slice(0, 3);

  return (
    <MobileLayout currentPage="assessment">
      <div className="min-h-full">
        {/* Header */}
        <div className="px-4 py-4 border-b border-border-light">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate("/")}
              className="p-2 -ml-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <ChevronLeft size={20} className="text-text-primary" />
            </button>
            
            <h1 className="font-semibold text-text-primary">Your Results</h1>
            
            <div className="w-10" />
          </div>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Results Summary */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-text-primary">
              Your Career Matches
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Based on your responses, here are the career paths that align best with your 
              personality, interests, and values.
            </p>
          </div>

          {/* Career Matches */}
          <div className="space-y-4">
            {topMatches.map((career, index) => (
              <div key={career.id} className="bg-surface rounded-lg border border-card-border p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-text-primary">{career.title}</h3>
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                        #{index + 1}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {career.description}
                    </p>
                  </div>
                  <div className="ml-3 text-right">
                    <div className="text-lg font-bold text-primary">
                      {career.matchPercentage}%
                    </div>
                    <div className="text-xs text-text-muted">match</div>
                  </div>
                </div>

                {/* Career Details */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <DollarSign size={16} className="text-text-secondary" />
                      <div>
                        <div className="text-xs text-text-muted">Salary Range</div>
                        <div className="text-sm font-medium text-text-primary">
                          {career.averageSalary}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <TrendingUp size={16} className="text-text-secondary" />
                      <div>
                        <div className="text-xs text-text-muted">Job Growth</div>
                        <div className="text-sm font-medium text-text-primary">
                          {career.jobGrowth}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-text-muted mb-2">Key Skills</div>
                    <div className="flex flex-wrap gap-2">
                      {career.skills.map((skill) => (
                        <span 
                          key={skill}
                          className="text-xs bg-surface-secondary text-text-primary px-2 py-1 rounded border border-border-light"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full mt-3 py-2 px-4 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors flex items-center justify-center space-x-2">
                    <span>Explore Learning Path</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <button
              onClick={() => navigate("/assessment")}
              className="w-full py-3 px-4 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary-hover transition-colors"
            >
              Retake Assessment
            </button>
            
            <button
              onClick={() => navigate("/")}
              className="w-full py-3 px-4 border border-border text-text-primary rounded-lg text-sm font-medium hover:bg-surface-secondary transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};