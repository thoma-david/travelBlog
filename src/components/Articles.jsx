import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, Eye, Plus } from 'lucide-react';
import ApiService from '../services/api';

const Articles = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const allPosts = await ApiService.getAllArticles();
      setPosts(allPosts || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-12 w-12 border-4 border-gray-900 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <div className="text-center flex-1">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                All Articles
              </h1>
              <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
            </div>
            <Link
              to="/create"
              className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 font-medium transition-colors uppercase tracking-wide"
            >
              <Plus className="h-4 w-4 mr-2" />
              Write Post
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-2xl font-light text-gray-600 mb-4">No articles yet</h2>
              <p className="text-gray-500 mb-8">Be the first to write something amazing!</p>
              <Link
                to="/create"
                className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 font-medium transition-colors uppercase tracking-wide"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First Post
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {posts.map((post) => (
                <Link key={post.id} to={`/artikel/${post.id}`} className="group">
                  <article className="bg-white">
                    <div className="relative overflow-hidden mb-6">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {post.views}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-light text-gray-900 group-hover:text-gray-600 transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {Array.isArray(post.content) ? post.content[0]?.substring(0, 150) + '...' : post.content?.substring(0, 150) + '...'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </span>
                        <span className="text-gray-900 font-medium group-hover:text-gray-600 transition-colors">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Articles;
