import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { User, Calendar, Clock, Eye, ArrowLeft, ArrowRight, Edit, Trash2 } from 'lucide-react';
import ApiService from '../services/api';

const Single = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const [articleData, relatedData] = await Promise.all([
        ApiService.getArticleById(id),
        ApiService.getRelatedArticles(id)
      ]);

      setArticle(articleData);
      setRelatedPosts(relatedData || []);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await ApiService.deletePost(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post. Please try again.');
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-12 w-12 border-4 border-gray-900 border-t-transparent"></div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">Article Not Found</h2>
          <Link to="/" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 font-medium transition-colors inline-block">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Journal
        </Link>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 pb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-8 leading-tight">
            {article.title}
          </h1>
          <div className="flex flex-wrap justify-center items-center text-gray-600 space-x-6 mb-8">
            <span className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {article.author}
            </span>
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {article.date}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {article.readTime}
            </span>
            <span className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              {article.views} views
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <Link
              to={`/edit/${id}`}
              className="inline-flex items-center bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 font-medium transition-colors uppercase tracking-wide"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Post
            </Link>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-2 font-medium transition-colors uppercase tracking-wide"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Post
            </button>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 mb-16">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-96 md:h-[500px] object-cover"
        />
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4">
        <div className="prose prose-lg max-w-none">
          {Array.isArray(article.content) ? 
            article.content.map((para, idx) => (
              <p key={idx} className="text-lg text-gray-700 mb-8 leading-relaxed">
                {para}
              </p>
            )) :
            <div className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
              {article.content}
            </div>
          }
        </div>
      </article>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Delete Post</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                disabled={deleteLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteLoading}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 font-medium transition-colors disabled:bg-red-400"
              >
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gray-50 mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.slice(0, 3).map(post => (
                <Link key={post.id} to={`/artikel/${post.id}`} className="group">
                  <article className="bg-white p-6 hover:shadow-lg transition-shadow">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover mb-4 group-hover:opacity-90 transition-opacity"
                    />
                    <h3 className="text-xl font-medium text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {Array.isArray(post.content) ? post.content[0]?.substring(0, 100) + '...' : post.content?.substring(0, 100) + '...'}
                    </p>
                    <div className="flex items-center text-gray-900 font-medium group-hover:text-gray-600 transition-colors">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8">
            Get the latest articles and insights delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-1 px-6 py-4 border border-gray-300 focus:outline-none focus:border-gray-900"
            />
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 font-medium transition-colors uppercase tracking-wide">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Single;