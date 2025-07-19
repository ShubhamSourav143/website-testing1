'use client';
import { useState, useEffect } from "react";
import BlogTopBar from "@/components/blog/BlogTopBar";
import TrendingChips from "@/components/blog/TrendingChips";
import BlogGrid from "@/components/blog/BlogGrid";
import { BLOGS } from "./blogs-data";
import { PlusCircle, Heart, Users, Calendar, TrendingUp, Clock, Eye } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('');
  const [sortBy, setSortBy] = useState('Latest');
  const [page, setPage] = useState(1);
  const blogsPerPage = 12;

  // Filtering and sorting
  let filteredBlogs = BLOGS.filter(b =>
    (search === '' || b.title.toLowerCase().includes(search.toLowerCase())) &&
    (activeTag === '' || b.tags.includes(activeTag))
  );
  
  if (sortBy === 'Latest') filteredBlogs = filteredBlogs.sort((a, b) => b.date.localeCompare(a.date));
  if (sortBy === 'Oldest') filteredBlogs = filteredBlogs.sort((a, b) => a.date.localeCompare(b.date));
  if (sortBy === 'Most Viewed') filteredBlogs = filteredBlogs.sort((a, b) => b.views - a.views);

  // Pagination
  const pageCount = Math.ceil(filteredBlogs.length / blogsPerPage);
  const pagedBlogs = filteredBlogs.slice((page - 1) * blogsPerPage, page * blogsPerPage);

  // Reset to page 1 on search/filter change
  useEffect(() => { setPage(1); }, [search, activeTag, sortBy]);

  // Get featured stories (top 3 most viewed)
  const featuredStories = BLOGS.sort((a, b) => b.views - a.views).slice(0, 3);
  const trendingStories = BLOGS.filter(b => b.views > 800).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* MSN-style Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Animal Welfare Stories</h1>
                <p className="text-gray-600 mt-1">Latest news, rescue stories, and updates from IIT Kharagpur</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-500">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Updated {new Date().toLocaleDateString()}
                </div>
                <Link
                  href="/blog/new"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Write Story
                </Link>
              </div>
            </div>
            
            {/* MSN-style Navigation Tabs */}
            <div className="flex space-x-8 border-b border-gray-200">
              <button className="pb-3 border-b-2 border-blue-600 text-blue-600 font-medium">
                All Stories
              </button>
              <button className="pb-3 text-gray-600 hover:text-gray-900 font-medium">
                Rescue Stories
              </button>
              <button className="pb-3 text-gray-600 hover:text-gray-900 font-medium">
                Medical Care
              </button>
              <button className="pb-3 text-gray-600 hover:text-gray-900 font-medium">
                Success Stories
              </button>
              <button className="pb-3 text-gray-600 hover:text-gray-900 font-medium">
                Behind the Scenes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* MSN-style Featured Section */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-5 h-5 text-red-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Featured Stories</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Featured Story */}
            <div className="lg:col-span-2">
              <div className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">
                <img 
                  src={featuredStories[0]?.image} 
                  alt={featuredStories[0]?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-red-600 text-xs font-medium rounded">FEATURED</span>
                    <span className="text-xs opacity-75">{featuredStories[0]?.author}</span>
                    <span className="text-xs opacity-75">•</span>
                    <span className="text-xs opacity-75">{new Date(featuredStories[0]?.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 line-clamp-2">{featuredStories[0]?.title}</h3>
                  <p className="text-sm opacity-90 line-clamp-2">{featuredStories[0]?.description}</p>
                  <div className="flex items-center mt-3 text-xs opacity-75">
                    <Eye className="w-3 h-3 mr-1" />
                    {featuredStories[0]?.views} views
                  </div>
                </div>
              </div>
            </div>

            {/* Side Featured Stories */}
            <div className="space-y-4">
              {featuredStories.slice(1, 3).map((story, idx) => (
                <div key={story.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex">
                    <img 
                      src={story.image} 
                      alt={story.title}
                      className="w-24 h-24 object-cover flex-shrink-0"
                    />
                    <div className="p-4 flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        {story.tags.slice(0, 1).map(tag => (
                          <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="font-semibold text-sm line-clamp-2 mb-1">{story.title}</h4>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{story.author}</span>
                        <span className="mx-1">•</span>
                        <span>{new Date(story.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-orange-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Trending Now</h2>
            </div>
            <Link href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View all trending →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingStories.map((story, idx) => (
              <div key={story.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <img 
                  src={story.image} 
                  alt={story.title}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                      TRENDING
                    </span>
                  </div>
                  <h4 className="font-semibold text-sm line-clamp-2 mb-2">{story.title}</h4>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{story.author}</span>
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      {story.views}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <BlogTopBar
          search={search}
          setSearch={setSearch}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Category Chips */}
        <div className="my-6">
          <TrendingChips activeTag={activeTag} setActiveTag={setActiveTag} />
        </div>

        {/* All Stories Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">All Stories</h2>
            <div className="text-sm text-gray-500">
              {filteredBlogs.length} stories found
            </div>
          </div>
          
          <BlogGrid blogs={pagedBlogs} />
          
          {/* Pagination */}
          {pageCount > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, pageCount) }).map((_, idx) => {
                const pageNum = page <= 3 ? idx + 1 : page - 2 + idx;
                if (pageNum > pageCount) return null;
                return (
                  <button
                    key={pageNum}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      page === pageNum 
                        ? "bg-blue-600 text-white" 
                        : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(Math.min(pageCount, page + 1))}
                disabled={page === pageCount}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Impact Stats */}
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Our Impact in Numbers</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">460+</div>
              <div className="text-sm text-gray-600">Dogs Sterilized</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">3,000+</div>
              <div className="text-sm text-gray-600">Vaccinations Given</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">320</div>
              <div className="text-sm text-gray-600">Daily Feeding</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-600">Emergency Response</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
