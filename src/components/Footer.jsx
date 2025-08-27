import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Twitter, Instagram, Linkedin, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white flex items-center justify-center">
                <PenTool className="h-6 w-6 text-gray-900" />
              </div>
              <span className="text-2xl font-light tracking-wide">JOURNAL</span>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Exploring ideas, sharing stories, and connecting minds through thoughtful writing and meaningful conversations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-lg font-medium mb-6 uppercase tracking-wide">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-gray-400 hover:text-white transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link to="/create" className="text-gray-400 hover:text-white transition-colors">
                  Write
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <h3 className="text-lg font-medium mb-6 uppercase tracking-wide">Categories</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/category/technology" className="text-gray-400 hover:text-white transition-colors">
                  Technology
                </Link>
              </li>
              <li>
                <Link to="/category/lifestyle" className="text-gray-400 hover:text-white transition-colors">
                  Lifestyle
                </Link>
              </li>
              <li>
                <Link to="/category/business" className="text-gray-400 hover:text-white transition-colors">
                  Business
                </Link>
              </li>
              <li>
                <Link to="/category/culture" className="text-gray-400 hover:text-white transition-colors">
                  Culture
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="text-lg font-medium mb-6 uppercase tracking-wide">Newsletter</h3>
            <p className="text-gray-400 mb-6">
              Get weekly insights and stories delivered to your inbox.
            </p>
            <form className="space-y-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-gray-500"
              />
              <button 
                type="submit"
                className="w-full bg-white hover:bg-gray-100 text-gray-900 px-4 py-3 font-medium transition-colors flex items-center justify-center"
              >
                Subscribe <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-8 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              © 2024 Journal. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;