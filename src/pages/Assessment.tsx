import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "../components/layout/MobileLayout";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Card } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { VoiceTextarea } from "../components/ui/VoiceTextarea";
import { assessmentQuestions } from "../data/mockData";
import { ArrowRight, CheckCircle, Circle, PencilSimple } from "@phosphor-icons/react";

export const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [textAnswer, setTextAnswer] = useState<string>("");

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === assessmentQuestions.length - 1;
  const progressPercentage = ((currentQuestionIndex + 1) / assessmentQuestions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer
    }));
  };

  const handleTextAnswer = (text: string) => {
    setTextAnswer(text);
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: text
    }));
  };

  const handleVoiceInput = (transcript: string) => {
    if (transcript.trim()) {
      handleTextAnswer(transcript);
    }
  };

  const handleVoiceError = (error: string) => {
    console.error("Voice input error:", error);
  };

  const handleNext = () => {
    const currentAnswer = currentQuestion.type === "text" ? textAnswer : selectedAnswer;
    
    if (currentAnswer.trim()) {
      if (isLastQuestion) {
        navigate("/results", { state: { answers } });
      } else {
        setCurrentQuestionIndex(prev => prev + 1);
        const nextQuestion = assessmentQuestions[currentQuestionIndex + 1];
        const nextAnswer = answers[nextQuestion?.id] || "";
        
        if (nextQuestion?.type === "text") {
          setTextAnswer(nextAnswer);
          setSelectedAnswer("");
        } else {
          setSelectedAnswer(nextAnswer);
          setTextAnswer("");
        }
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      const prevQuestion = assessmentQuestions[currentQuestionIndex - 1];
      const prevAnswer = answers[prevQuestion?.id] || "";
      
      if (prevQuestion?.type === "text") {
        setTextAnswer(prevAnswer);
        setSelectedAnswer("");
      } else {
        setSelectedAnswer(prevAnswer);
        setTextAnswer("");
      }
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    const currentAnswer = answers[currentQuestion.id] || "";
    if (currentQuestion.type === "text") {
      setTextAnswer(currentAnswer);
      setSelectedAnswer("");
    } else {
      setSelectedAnswer(currentAnswer);
      setTextAnswer("");
    }
  }, [currentQuestionIndex, currentQuestion.id, answers]);

  const currentAnswer = currentQuestion.type === "text" ? textAnswer : selectedAnswer;
  const hasAnswer = Boolean(currentAnswer.trim());

  return (
    <MobileLayout currentPage="assessment">
      <div className="min-h-full flex flex-col p-4 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary font-medium">
              Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
            </span>
            <span className="text-sm text-text-secondary font-medium">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-semibold">
                  {currentQuestionIndex + 1}
                </span>
              </div>
              <span className="text-sm text-text-muted font-medium uppercase tracking-wide">
                {currentQuestion.category}
              </span>
            </div>
            
            <h2 className="text-xl font-semibold text-text-primary leading-relaxed">
              {currentQuestion.question}
            </h2>
            
            {currentQuestion.description && (
              <p className="text-base text-text-secondary leading-relaxed">
                {currentQuestion.description}
              </p>
            )}
          </div>

          {currentQuestion.type === "multiple-choice" && currentQuestion.options ? (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`
                    w-full p-4 rounded-xl border-2 transition-all duration-200 text-left
                    flex items-center space-x-3 group
                    ${selectedAnswer === option
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-card-border hover:border-primary/30 hover:bg-surface-secondary"
                    }
                  `}
                >
                  <div className="flex-shrink-0">
                    {selectedAnswer === option ? (
                      <CheckCircle size={24} className="text-primary" weight="fill" />
                    ) : (
                      <Circle size={24} className="text-text-muted group-hover:text-primary transition-colors" />
                    )}
                  </div>
                  <span className={`
                    text-base font-medium transition-colors
                    ${selectedAnswer === option 
                      ? "text-primary" 
                      : "text-text-primary group-hover:text-primary"
                    }
                  `}>
                    {option}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-text-muted">
                <PencilSimple size={20} />
                <span className="text-sm font-medium">Write your answer</span>
              </div>
              <VoiceTextarea
                value={textAnswer}
                onChange={(e) => handleTextAnswer(e.target.value)}
                onVoiceInput={handleVoiceInput}
                onVoiceError={handleVoiceError}
                placeholder="Share your thoughts here..."
                className="min-h-[120px] text-base resize-none"
                language="hi-IN"
              />
            </div>
          )}
        </Card>

        <div className="flex-1 flex items-end">
          <div className="w-full space-y-4">
            <Button
              onClick={handleNext}
              disabled={!hasAnswer}
              className="w-full h-12 text-base font-semibold"
              size="lg"
            >
              <span>{isLastQuestion ? "Complete Assessment" : "Next Question"}</span>
              <ArrowRight size={20} className="ml-2" />
            </Button>

            <Button
              onClick={handleBack}
              variant="outline"
              className="w-full h-12 text-base font-medium"
              size="lg"
            >
              {currentQuestionIndex === 0 ? "Exit Assessment" : "Previous Question"}
            </Button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};