'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import { chatWithOpenRouter, AVAILABLE_MODELS, Message } from '@/lib/openrouter';
import { 
  Send, 
  Paperclip, 
  Mic, 
  RotateCcw, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  Share2,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

export default function ChatArea() {
  const { apiKey, selectedModel, setSelectedModel, currentChatId } = useChat();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (currentChatId) {
      const fetchMessages = async () => {
        try {
          const res = await fetch(`/api/chats/${currentChatId}/messages`);
          if (res.ok) {
            const data = await res.json();
            setMessages(data.map((m: any) => ({ role: m.role, content: m.content })));
          }
        } catch (e) {
          console.error("Failed to fetch messages", e);
        }
      };
      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [currentChatId]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (!apiKey) {
      alert("Please enter your OpenRouter API Key in Settings first.");
      return;
    }

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const assistantMessage: Message = { role: 'assistant', content: '' };
      setMessages([...newMessages, assistantMessage]);

      let fullResponse = '';
      await chatWithOpenRouter(
        newMessages,
        selectedModel,
        apiKey,
        (text) => {
          fullResponse = text;
          setMessages([...newMessages, { role: 'assistant', content: fullResponse }]);
        }
      );
    } catch (error: any) {
      console.error(error);
      setMessages([...newMessages, { role: 'assistant', content: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-screen relative overflow-hidden bg-[#050505]">
      {/* Top Header */}
      <header className="h-16 glass border-b border-white/10 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <div className="md:hidden w-8 h-8 glass rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blue-500" />
          </div>
          <div className="relative">
            <select 
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-1.5 pr-10 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500/50 hover:bg-white/10 transition-all"
            >
              {AVAILABLE_MODELS.map(model => (
                <option key={model.id} value={model.id} className="bg-[#050505]">
                  {model.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages Scroll Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth pb-32">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-8 animate-bounce">
              <Sparkles className="text-white w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bold mb-4">How can I help you today?</h2>
            <p className="text-gray-400 text-lg mb-8">
              AI Nexus is your powerful companion for creativity, productivity, and problem-solving. Choose a model and start chatting.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {["Write a creative story about a space traveler", "Explain quantum computing in simple terms", "Help me debug a React useEffect issue", "Generate a 7-day workout plan"].map((suggestion, i) => (
                <button 
                  key={i}
                  onClick={() => setInput(suggestion)}
                  className="glass p-4 rounded-xl text-left hover:bg-white/10 transition-all border border-white/5 group"
                >
                  <p className="text-sm text-gray-400 group-hover:text-white transition-colors">{suggestion}</p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={index}
              className={cn(
                "flex flex-col gap-2 max-w-4xl mx-auto",
                message.role === 'user' ? "items-end" : "items-start"
              )}
            >
              <div className="flex items-center gap-2 mb-1 px-1">
                {message.role === 'assistant' && (
                  <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                )}
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {message.role === 'user' ? 'You' : 'AI Nexus'}
                </span>
                <span className="text-[10px] text-gray-600">{format(new Date(), 'HH:mm')}</span>
              </div>
              
              <div className={cn(
                "p-4 rounded-2xl max-w-full relative group",
                message.role === 'user' 
                  ? "bg-blue-600 text-white rounded-tr-none" 
                  : "glass rounded-tl-none border border-white/10"
              )}>
                <div className="prose prose-invert max-w-none text-sm leading-relaxed">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({node, inline, className, children, ...props}: any) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                          <SyntaxHighlighter
                            {...props}
                            style={atomDark}
                            language={match[1]}
                            PreTag="div"
                            className="rounded-lg !my-4 !bg-black/50 border border-white/10"
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code {...props} className={cn("bg-black/30 px-1 rounded", className)}>
                            {children}
                          </code>
                        )
                      }
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>
                
                {message.role === 'assistant' && (
                   <div className="flex items-center gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-md transition-all">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-md transition-all">
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-md transition-all">
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                   </div>
                )}
              </div>
            </motion.div>
          ))
        )}
        {isLoading && (
          <div className="flex flex-col gap-2 max-w-4xl mx-auto items-start">
             <div className="flex items-center gap-2 mb-1 px-1">
                <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white animate-spin-slow" />
                </div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">AI Nexus Thinking...</span>
             </div>
             <div className="glass p-4 rounded-2xl rounded-tl-none border border-white/10 flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]" />
             </div>
          </div>
        )}
      </div>

      {/* Floating Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
        <div className="max-w-4xl mx-auto pointer-events-auto">
          <div className="glass-card relative p-2 shadow-2xl glow-blue">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything..."
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 py-3 px-4 resize-none max-h-40 min-h-[50px] outline-none"
              rows={1}
            />
            <div className="flex items-center justify-between px-2 pb-2">
              <div className="flex items-center gap-1">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                  <Mic className="w-5 h-5" />
                </button>
                <div className="h-6 w-[1px] bg-white/10 mx-2" />
                <span className="text-[10px] text-gray-500 font-mono">{input.length} characters</span>
              </div>
              
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className={cn(
                  "p-2.5 rounded-xl transition-all duration-300",
                  input.trim() && !isLoading 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20 hover:scale-105" 
                    : "bg-white/5 text-gray-600 cursor-not-allowed"
                )}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
          <p className="text-[10px] text-center text-gray-600 mt-3">
            AI Nexus can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
}