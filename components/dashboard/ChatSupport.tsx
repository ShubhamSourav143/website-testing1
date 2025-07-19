'use client';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: string;
}

interface ChatSupportProps {
  userId: string;
}

export default function ChatSupport({ userId }: ChatSupportProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // In a real app, messages would be stored in a database table
  // For this demo, we'll use localStorage to persist messages
  useEffect(() => {
    // Load messages from localStorage
    const savedMessages = localStorage.getItem(`chat_${userId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Add welcome message if no previous messages
      const welcomeMessage: Message = {
        id: crypto.randomUUID(),
        text: "Hello! Welcome to the Animal Welfare Support Chat. How can we help you today?",
        sender: 'support',
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
      localStorage.setItem(`chat_${userId}`, JSON.stringify([welcomeMessage]));
    }
  }, [userId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    localStorage.setItem(`chat_${userId}`, JSON.stringify(updatedMessages));
    setNewMessage('');
    setLoading(true);
    
    // Simulate response delay
    setTimeout(() => {
      // Generate automated response based on user message
      const responseText = generateResponse(newMessage);
      
      const supportMessage: Message = {
        id: crypto.randomUUID(),
        text: responseText,
        sender: 'support',
        timestamp: new Date().toISOString(),
      };
      
      const finalMessages = [...updatedMessages, supportMessage];
      setMessages(finalMessages);
      localStorage.setItem(`chat_${userId}`, JSON.stringify(finalMessages));
      setLoading(false);
    }, 1000);
  };

  // Simple response generator based on keywords
  const generateResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('adopt') || lowerMessage.includes('adoption')) {
      return "To adopt an animal, you can visit our Adoption page and browse available animals. Virtual adoptions are also available to support animals that need permanent care.";
    }
    
    if (lowerMessage.includes('donate') || lowerMessage.includes('donation')) {
      return "Thank you for your interest in donating! Your contributions help us provide food, shelter, and medical care to animals in need. You can make a donation through our Donate page.";
    }
    
    if (lowerMessage.includes('volunteer') || lowerMessage.includes('help')) {
      return "We always welcome volunteers! You can help with feeding, walking dogs, cleaning, or administrative tasks. Please email volunteer@kgppaws.org for more information.";
    }
    
    if (lowerMessage.includes('emergency') || lowerMessage.includes('injured')) {
      return "For animal emergencies on campus, please call our emergency hotline at 9876543210. For first aid guidance, check our First Aid Game in your dashboard.";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're welcome! We're here to help. Is there anything else you'd like to know?";
    }
    
    // Default response
    return "Thank you for your message. Our team will get back to you soon. For immediate assistance, please call our helpline at 9876543210.";
  };

  // Format timestamp to readable time
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden animate-fadeInUp">
      {/* Chat Header */}
      <div className="bg-orange-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-white rounded-full p-2 mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold">Animal Welfare Support</h3>
            <p className="text-xs text-orange-100">Online • Quick responses</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Live Chat
          </span>
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-orange-500 text-white rounded-br-none'
                    : 'bg-white border border-gray-200 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 text-right ${
                    message.sender === 'user' ? 'text-orange-100' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-xs md:max-w-md rounded-lg p-3 bg-white border border-gray-200 rounded-bl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Chat Input */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() || loading}
            className="bg-orange-500 text-white rounded-full p-2 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
      
      {/* Chat Info */}
      <div className="border-t border-gray-200 p-3 bg-gray-50 text-center">
        <p className="text-xs text-gray-500">
          Need immediate assistance? Call our helpline at <span className="font-medium">9876543210</span>
        </p>
      </div>
    </div>
  );
}