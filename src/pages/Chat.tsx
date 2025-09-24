import { useState } from "react";
import { MobileLayout } from "../components/layout/MobileLayout";
import { InputField } from "../components/ui/InputField";
import { User, Bot, Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi! I'm your career guidance AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your question! Based on your career interests, I'd recommend exploring our assessment to get personalized guidance. Would you like me to help you get started?",
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <MobileLayout currentPage="chat">
      <div className="flex flex-col h-full relative">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                ${message.sender === "user" 
                  ? "bg-primary" 
                  : "bg-surface-secondary border border-border"
                }
              `}>
                {message.sender === "user" ? (
                  <User size={16} className="text-primary-foreground" />
                ) : (
                  <Bot size={16} className="text-text-secondary" />
                )}
              </div>
              
              <div className={`
                max-w-[80%] rounded-lg px-3 py-2 text-sm
                ${message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface border border-border text-text-primary"
                }
              `}>
                <p className="leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area - Fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 py-4 border-t border-border-light bg-surface">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <InputField
                value={inputText}
                onChange={setInputText}
                placeholder="Ask about your career..."
                onVoiceInput={() => console.log("Voice input")}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className={`
                p-3 rounded-lg transition-colors flex-shrink-0
                ${inputText.trim()
                  ? "bg-primary text-primary-foreground hover:bg-primary-hover"
                  : "bg-secondary text-text-muted cursor-not-allowed"
                }
              `}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};