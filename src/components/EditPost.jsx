import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import ApiService from '../services/api';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    cover: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const post = await ApiService.getArticleById(id);
      setFormData({
        title: post.title || '',
        content: Array.isArray(post.content) ? post.content.join('\n\n') : post.content || '',
        cover: post.image === 'https://via.placeholder.com/800x400' ? '' : post.image || ''
      });
    } catch (error) {
      console.error('Error fetching post:', error);
      setErrors({ fetch: 'Failed to load post' });
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await ApiService.updatePost(id, formData);
      navigate(`/artikel/${id}`);
    } catch (error) {
      console.error('Error updating post:', error);
      setErrors({ submit: 'Failed to update post. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin h-12 w-12 border-4 border-gray-900 border-t-transparent"></div>
      </div>
    );
  }

  if (errors.fetch) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">Post Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 font-medium transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(`/artikel/${id}`)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Post
          </button>
          <h1 className="text-3xl font-light text-gray-900">Edit Post</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gray-900 text-lg`}
              placeholder="Enter post title"
            />
            {errors.title && <p className="mt-2 text-sm text-red-600">{errors.title}</p>}
          </div>

          {/* Cover Image URL */}
          <div>
            <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Cover Image URL (Optional)
            </label>
            <input
              type="url"
              id="cover"
              name="cover"
              value={formData.cover}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={15}
              className={`w-full px-4 py-3 border ${errors.content ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-gray-900 resize-none`}
              placeholder="Write your post content here..."
            />
            {errors.content && <p className="mt-2 text-sm text-red-600">{errors.content}</p>}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-4 bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white px-8 py-3 font-medium transition-colors uppercase tracking-wide"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
