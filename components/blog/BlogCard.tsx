'use client';
import Link from 'next/link';
import { Calendar, User, Eye, ArrowRight, Clock, MessageCircle, Share2 } from 'lucide-react';

interface BlogCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  author: string;
  date: string;
  views: number;
}

export default function BlogCard({ id, title, description, image, tags, author, date, views }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-200">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          {tags.slice(0, 1).map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
            <Share2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2 text-xs text-gray-500">
          <User className="w-3 h-3" />
          <span>{author}</span>
          <span>•</span>
          <Clock className="w-3 h-3" />
          <span>{new Date(date).toLocaleDateString()}</span>
        </div>
        
        <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              <span>{views.toLocaleString()}</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-3 h-3 mr-1" />
              <span>{Math.floor(Math.random() * 20) + 1}</span>
            </div>
          </div>
          
          <Link
            href={`/blog/${id}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group transition-colors duration-300"
          >
            Read more
            <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </article>
  );
}
