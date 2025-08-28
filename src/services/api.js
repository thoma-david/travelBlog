
//CHANGE THIS HERE------------------------------------------------------
const API_BASE_URL = 'https://79133e4a5083.ngrok-free.app';
//------------------------------------------------------------------------


class ApiService {
  // Generic fetch method
  async fetchData(endpoint, options = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  // Map backend data to frontend format
  mapPostData(post) {
    return {
      id: post.id,
      title: post.title || 'Untitled',
      content: Array.isArray(post.content) ? post.content : [post.content || ''],
      author: post.author || 'Anonymous',
      date: post.date || post.created_at || new Date().toISOString().split('T')[0],
      readTime: this.calculateReadTime(post.content),
      views: post.views || '0',
      category: post.category || 'General',
      tags: post.tags || [],
      image: post.cover || 'https://via.placeholder.com/800x400',
      featured: post.featured || false
    };
  }

  // Calculate read time
  calculateReadTime(content) {
    const text = Array.isArray(content) ? content.join(' ') : content || '';
    const wordCount = text.split(' ').length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  }

  // API methods
  async getAllArticles() {
    const posts = await this.fetchData('/posts');
    return posts.map(post => this.mapPostData(post));
  }

  async getArticleById(id) {
    const post = await this.fetchData(`/posts/${id}`);
    return this.mapPostData(post);
  }

  async getFeaturedArticles() {
    const posts = await this.fetchData('/posts');
    return posts.map(post => this.mapPostData(post)).filter(post => post.featured);
  }

  async getRecentArticles(limit = 10) {
    const posts = await this.fetchData('/posts');
    return posts
      .map(post => this.mapPostData(post))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  }

  async getCategories() {
    const posts = await this.fetchData('/posts');
    const categoryCount = {};
    
    posts.forEach(post => {
      const category = post.category || 'General';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    return Object.entries(categoryCount).map(([name, count], index) => ({
      id: index + 1,
      name,
      count
    }));
  }

  async getRelatedArticles(id, limit = 5) {
    const posts = await this.fetchData('/posts');
    const mappedPosts = posts.map(post => this.mapPostData(post));
    const otherPosts = mappedPosts.filter(post => post.id !== parseInt(id));
    return otherPosts.slice(0, limit);
  }

  async getPopularArticles(limit = 5) {
    const posts = await this.fetchData('/posts');
    return posts
      .map(post => this.mapPostData(post))
      .sort((a, b) => parseInt(b.views) - parseInt(a.views))
      .slice(0, limit);
  }

  // CRUD Operations
  async createPost(postData) {
    return this.fetchData('/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
      },
      body: JSON.stringify(postData)
    });
  }

  async updatePost(id, postData) {
    return this.fetchData(`/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
      },
      body: JSON.stringify(postData)
    });
  }

  async deletePost(id) {
    return this.fetchData(`/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
      }
    });
  }
}

export default new ApiService();