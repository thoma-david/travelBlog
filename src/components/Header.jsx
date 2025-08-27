import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, PenTool } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-900 flex items-center justify-center">
              <PenTool className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-light text-gray-900 tracking-wide">JOURNAL</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm uppercase tracking-wide">
              Home
            </Link>
            <Link to="/articles" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm uppercase tracking-wide">
              Articles
            </Link>
            <Link to="/create" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm uppercase tracking-wide">
              Write
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm uppercase tracking-wide">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm uppercase tracking-wide">
              Contact
            </Link>
          </nav>

          {/* Desktop Search & CTA */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-gray-900 transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <div className="w-px h-6 bg-gray-300"></div>
            <Link 
              to="/subscribe" 
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 text-sm font-medium transition-colors uppercase tracking-wide"
            >
              Subscribe
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <nav className="py-6 space-y-6">
              <Link 
                to="/" 
                className="block text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/articles" 
                className="block text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </Link>
              <Link 
                to="/create" 
                className="block text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Write
              </Link>
              <Link 
                to="/about" 
                className="block text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className="block text-gray-600 hover:text-gray-900 font-medium transition-colors text-sm uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-100">
                <Link 
                  to="/subscribe"
                  className="block w-full bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 text-sm font-medium transition-colors text-center uppercase tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Subscribe
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

