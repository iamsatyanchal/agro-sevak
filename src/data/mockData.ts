export interface Question {
  id: string;
  type: "multiple-choice" | "text" | "scale";
  question: string;
  description?: string;
  options?: string[];
  category: "personality" | "interests" | "skills" | "values";
}

export const assessmentQuestions: Question[] = [
  {
    id: "q1",
    type: "multiple-choice",
    question: "What energizes you most?",
    description: "Choose the option that resonates with you most",
    options: [
      "Working with people and building relationships",
      "Solving complex problems and analyzing data",
      "Creating and designing new things",
      "Leading teams and driving change"
    ],
    category: "personality"
  },
  {
    id: "q2",
    type: "multiple-choice",
    question: "In group projects, you naturally tend to:",
    options: [
      "Take charge and organize the team",
      "Focus on research and technical details",
      "Generate creative ideas and solutions",
      "Ensure everyone is heard and included"
    ],
    category: "personality"
  },
  {
    id: "q3",
    type: "text",
    question: "Describe a moment when you felt most accomplished in your studies or work.",
    description: "Share a specific example that made you feel proud",
    category: "values"
  },
  {
    id: "q4",
    type: "multiple-choice",
    question: "Which work environment appeals to you most?",
    options: [
      "Fast-paced startup with constant innovation",
      "Structured corporate environment with clear processes",
      "Remote work with flexible schedule",
      "Collaborative workspace with diverse teams"
    ],
    category: "values"
  },
  {
    id: "q5",
    type: "multiple-choice",
    question: "What subjects or topics do you find yourself naturally drawn to?",
    options: [
      "Technology and digital innovation",
      "Human behavior and psychology",
      "Business and entrepreneurship",
      "Arts and creative expression",
      "Science and research"
    ],
    category: "interests"
  },
  {
    id: "q6",
    type: "text",
    question: "If you could solve one problem in the world, what would it be and why?",
    description: "Think about issues that genuinely motivate you",
    category: "values"
  },
  {
    id: "q7",
    type: "multiple-choice",
    question: "Which skill would you most like to develop further?",
    options: [
      "Communication and presentation",
      "Technical and analytical skills",
      "Creative and design thinking",
      "Leadership and management"
    ],
    category: "skills"
  }
];

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  skills: string[];
  averageSalary: string;
  jobGrowth: string;
  matchPercentage: number;
}

export const mockCareerPaths: CareerPath[] = [
  {
    id: "ux-designer",
    title: "UX/UI Designer",
    description: "Design user-centered digital experiences that solve real problems",
    skills: ["Design Thinking", "Prototyping", "User Research", "Visual Design"],
    averageSalary: "$75,000 - $120,000",
    jobGrowth: "+13% (faster than average)",
    matchPercentage: 92
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Extract insights from data to drive business decisions",
    skills: ["Python", "Statistics", "Machine Learning", "Data Visualization"],
    averageSalary: "$95,000 - $165,000",
    jobGrowth: "+22% (much faster than average)",
    matchPercentage: 88
  },
  {
    id: "product-manager",
    title: "Product Manager",
    description: "Guide product strategy and coordinate cross-functional teams",
    skills: ["Strategy", "Communication", "Analytics", "Project Management"],
    averageSalary: "$100,000 - $180,000",
    jobGrowth: "+19% (much faster than average)",
    matchPercentage: 85
  }
];

export interface LearningResource {
  id: string;
  title: string;
  type: "course" | "article" | "video" | "book";
  duration: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  provider: string;
  url: string;
}

export const mockLearningResources: LearningResource[] = [
  {
    id: "design-basics",
    title: "Introduction to UX Design",
    type: "course",
    duration: "4 weeks",
    difficulty: "beginner",
    provider: "Coursera",
    url: "#"
  },
  {
    id: "python-data",
    title: "Python for Data Analysis",
    type: "course",
    duration: "6 weeks",
    difficulty: "intermediate",
    provider: "edX",
    url: "#"
  },
  {
    id: "product-strategy",
    title: "Product Management Fundamentals",
    type: "article",
    duration: "15 min read",
    difficulty: "beginner",
    provider: "Medium",
    url: "#"
  }
];