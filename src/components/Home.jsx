import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, Eye, Plus } from 'lucide-react';
import ApiService from '../services/api';

const Home = () => {
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

  const featuredPost = posts[0];
  const recentPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section with Featured Post */}
      {featuredPost ? (
        <section className="relative h-screen bg-gray-900">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{backgroundImage: `url('${featuredPost.image}')`}}
          ></div>
          <div className="relative h-full flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-4 text-center text-white">
              <h1 className="text-5xl md:text-7xl font-light mb-8 tracking-tight">
                JOURNAL
              </h1>
              <div className="max-w-2xl mx-auto">
                <Link to={`/artikel/${featuredPost.id}`}>
                  <h2 className="text-2xl md:text-4xl font-light mb-6 hover:text-gray-300 transition-colors">
                    {featuredPost.title}
                  </h2>
                </Link>
                <div className="flex justify-center items-center space-x-6 text-gray-300 mb-8">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {featuredPost.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to={`/artikel/${featuredPost.id}`}
                    className="inline-flex items-center bg-white text-gray-900 px-8 py-3 font-medium hover:bg-gray-100 transition-colors uppercase tracking-wide"
                  >
                    Read Article <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link 
                    to="/create"
                    className="inline-flex items-center border-2 border-white text-white px-8 py-3 font-medium hover:bg-white hover:text-gray-900 transition-colors uppercase tracking-wide"
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Write Article
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        // Empty state when no posts exist
        <section className="relative h-screen bg-gray-100 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-light mb-8 tracking-tight text-gray-900">
              Travel Blog
            </h1>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-light mb-6 text-gray-600">
                Welcome to your Travel blog
              </h2>
              <p className="text-lg text-gray-500 mb-8">
                Start sharing your thoughts and stories about the world, with the world
              </p>
              <Link 
                to="/create"
                className="inline-flex items-center bg-gray-900 text-white px-8 py-4 font-medium hover:bg-gray-800 transition-colors uppercase tracking-wide"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Your First Post
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <div className="text-center flex-1">
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Latest Articles
              </h2>
              <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
            </div>
            <Link
              to="/create"
              className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 font-medium transition-colors uppercase tracking-wide"
            >
              <Plus className="h-4 w-4 mr-2" />
              Write Article
            </Link>
          </div>

          {recentPosts.length === 0 && featuredPost ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-light text-gray-600 mb-4">Ready to write more?</h3>
              <p className="text-gray-500 mb-8">You have one article. Keep the momentum going!</p>
              <Link
                to="/create"
                className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 font-medium transition-colors uppercase tracking-wide"
              >
                <Plus className="h-4 w-4 mr-2" />
                Write Another Article
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {recentPosts.map((post) => (
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

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Subscribe to get our latest articles and insights delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-0">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 border border-gray-300 focus:outline-none focus:border-gray-900 text-gray-900"
            />
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 font-medium transition-colors uppercase tracking-wide">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            No spam, unsubscribe anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;