'use client';
import BlogCard from './BlogCard';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlogGrid({ blogs }) {
  if (!blogs.length) {
    return (
      <div className="text-center text-gray-500 p-16 animate-fadeIn">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <p>No stories found. Try adjusting your search or filters.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <AnimatePresence mode="wait">
        {blogs.map((blog, idx) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.4, 
              delay: idx * 0.05,
              ease: "easeOut"
            }}
          >
            <BlogCard {...blog} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
