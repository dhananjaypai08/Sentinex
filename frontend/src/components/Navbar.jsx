import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ConnectKitButton } from "connectkit";
import { Sparkles, ArrowRight, FormInputIcon, ViewIcon, RocketIcon, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/70 backdrop-blur-md shadow-lg' : 'bg-black/40 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="text-violet-500 w-6 h-6" />
            <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
              Sentinex
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            
            <Link to="/social-launchpad" className="text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors">
              <RocketIcon className="w-4 h-4" />
              <span>Social Launchpad</span>
            </Link>

            <Link to="/dashboard" className="text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors">
              <ViewIcon className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link to="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
              How It Works
            </Link>
            
            <Link to="#technology" className="text-gray-300 hover:text-white transition-colors">
              Technology
            </Link>

            <Link to="#faq" className="text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
          
          {/* Connect Button */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ConnectKitButton />
          </motion.div>
        </div>
      </div>
    </nav>
  );
};