import React from 'react'
import { ChevronDown, Menu, Search, ArrowRight, TrendingUp, Building, Home, ShoppingBag, Hotel, Truck, Leaf } from 'lucide-react';

const Navbar = () => {
  return (

           <header className="bg-white shadow-sm sticky top-0 z-50">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between items-center h-16">
                 <div className="flex items-center">
                   <h1 className="text-2xl font-bold text-gray-900">
                     <span className="text-blue-600">Immobilien</span>Blog
                   </h1>
                   <span className="ml-2 text-sm text-gray-500 hidden sm:block">Deutschland</span>
                 </div>
                 
                 <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Hauptnavigation">
                   <a href="/" className="text-gray-900 font-medium hover:text-blue-600 transition-colors">Home</a>
                   <a href="/kategorien" className="text-gray-700 hover:text-blue-600 transition-colors">Kategorien</a>
                   <a href="/marktberichte" className="text-gray-700 hover:text-blue-600 transition-colors">Marktberichte</a>
                   <a href="/tools" className="text-gray-700 hover:text-blue-600 transition-colors">Tools</a>
                   <a href="/ueber-uns" className="text-gray-700 hover:text-blue-600 transition-colors">Über uns</a>
                   <a href="/kontakt" className="text-gray-700 hover:text-blue-600 transition-colors">Kontakt</a>
                 </nav>
                 
                 <div className="flex items-center space-x-4">
                   <div className="relative hidden sm:block">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                     <input 
                       type="search"
                       placeholder="Blog durchsuchen..."
                       className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                       aria-label="Blog durchsuchen"
                     />
                   </div>
                   <Search className="h-5 w-5 text-gray-600 sm:hidden cursor-pointer" />
                 </div>
               </div>
             </div>
           </header>
  )
}

export default Navbar