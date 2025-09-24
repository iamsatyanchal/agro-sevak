import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MobileLayout } from "../components/layout/MobileLayout";
import { InputField } from "../components/ui/InputField";
import VoiceButton from "../components/ui/VoiceButton";
import { 
  ArrowLeft, 
  Microphone, 
  Camera, 
  PaperPlaneRight,
  Clock,
  CheckCircle,
  Plant,
  User
} from "@phosphor-icons/react";
import { useAgriculturalChat } from "../hooks/useAgriculturalChat";

export const AgriculturalChat = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { messages, isLoading, sendMessage } = useAgriculturalChat();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check if there's a query parameter
    const initialQuery = searchParams.get('query');
    if (initialQuery) {
      setInputText(initialQuery);
      // Auto-send the query
      setTimeout(() => {
        handleSendMessage(initialQuery);
      }, 500);
    }
  }, [searchParams]);

  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;
    
    await sendMessage(text);
    setInputText("");
  };

  const handleVoiceInput = (transcript: string) => {
    if (transcript.trim()) {
      // Auto-send after a brief delay to allow user to see the text
      setTimeout(() => {
        handleSendMessage(transcript);
        setInputText("");
      }, 500);
    }
  };

  const handleVoiceError = (error: string) => {
    console.error("Voice input error:", error);
    // You could show a toast notification here
  };

  const handleImageUpload = () => {
    navigate("/diagnosis");
  };

  return (
    <MobileLayout currentPage="chat">
      <div className="flex flex-col">
        {/* Header
        <div className="bg-surface border-b border-card-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft size={24} className="text-text-primary" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Plant size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-text-primary">Agricultural AI Assistant</h1>
              <p className="text-text-secondary text-sm">Get farming advice</p>
            </div>
          </div>
        </div> */}

        {/* Messages Container - takes remaining space */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plant size={32} className="text-primary" />
              </div>
              <h3 className="font-medium text-text-primary mb-2">Welcome to Agricultural Assistant</h3>
              <p className="text-text-secondary text-sm">
                Ask any farming question. I'm here to help you.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.isUser 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary text-white'
              }`}>
                {message.isUser ? <User size={16} /> : <Plant size={16} />}
              </div> */}
              
              <div className={`${message.isUser ? 'items-end max-w-[80%]' : 'items-start'} flex flex-col`}>
                <div className={`${
                  message.isUser
                    ? 'bg-primary text-white px-2 py-2 rounded-[0.75rem_0.75rem_0rem_0.75rem]'
                    : 'text-text-secondary bg-surface border border-card-border  rounded-lg px-4 py-2'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.text}
                  </div>
                </div>
                {/* <div className="flex items-center gap-1 mt-1 text-xs text-text-secondary">
                  <Clock size={12} />
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div> */}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
            
              <div className="bg-surface">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-text-secondary text-sm ml-2">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
<div className="fixed bottom-0 w-full z-[99] bg-surface border-t px-4 py-4 scale-105 ml-[-1px] flex-shrink-0">
  <div className="flex items-center gap-3">
   
    <div className="relative flex-1">
      <InputField
        value={inputText}
        onChange={setInputText}
        placeholder="Type your message..."
        onVoiceInput={handleVoiceInput}
        onVoiceError={handleVoiceError}
        onEnter={() => handleSendMessage()}
        language="auto"
        className="bg-surface-secondary text-sm "
      />
    </div>

    {/* <button
      onClick={handleImageUpload}
      
      className="bg-primary text-primary-foreground hover:bg-primary-hover p-2 rounded-lg bg-surface-secondary text-text-secondary/90 hover:text-text-primary flex-shrink-0"
    >
      <Camera weight="duotone" size={20} />
    </button> */}

  </div>
</div>



      </div>
    </MobileLayout>
  );
};