import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Zap,
  Sparkles,
  RocketIcon,
  BarChart2,
  Shield,
  Twitter,
  Link2,
  Repeat,
  Droplet,
  Lock,
  Code,
  PieChart,
  ExternalLink,
  ChevronDown,
  Bot,
  ArrowDownCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Animated gradient background component
const AnimatedBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="fixed top-0 left-0 w-full h-full bg-black opacity-80"></div>
    <div className="fixed top-10 left-20 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"></div>
    <div className="fixed top-50 right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
    <div className="fixed bottom-20 left-40 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl"></div>
    <motion.div 
      className="fixed top-0 left-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.08 }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
    >
      <div className="w-full h-full bg-grid-pattern-dots"></div>
    </motion.div>
  </div>
);

// Feature card component
const FeatureCard = ({ icon: Icon, title, description, className = "" }) => (
  <motion.div 
    className={`bg-gray-900/60 backdrop-blur-md p-6 rounded-xl border border-gray-800 hover:border-violet-500/50 transition-all duration-300 ${className}`}
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.1)" }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-center items-center w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 mb-4">
      <Icon className="text-white w-6 h-6" />
    </div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

// Testimonial component
const Testimonial = ({ quote, author, role, avatar }) => (
  <motion.div 
    className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center text-white font-bold">
          {avatar ? <img src={avatar} alt={author} className="w-full h-full rounded-full" /> : author.charAt(0)}
        </div>
      </div>
      <div>
        <p className="italic text-gray-300 mb-4">"{quote}"</p>
        <div>
          <h4 className="font-medium text-white">{author}</h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

// FAQ Item component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-800 py-4">
      <button 
        className="flex justify-between items-center w-full text-left" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-white">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="text-gray-400 w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="py-4 text-gray-400">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Network visualization component
const NetworkVisualization = () => (
  <div className="relative h-72 w-full">
    <motion.div 
      className="absolute w-48 h-48 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      animate={{ rotate: 360 }}
      transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
    >
      {[0, 60, 120, 180, 240, 300].map((angle, index) => (
        <motion.div 
          key={index}
          className="absolute w-3 h-3 rounded-full bg-violet-500"
          style={{ 
            left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 120}px)`,
            top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 120}px)`,
          }}
          whileHover={{ scale: 1.5 }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
        />
      ))}
    </motion.div>
    
    <motion.div 
      className="absolute w-32 h-32 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center backdrop-blur-sm border border-violet-500/30"
      animate={{ boxShadow: ["0 0 20px rgba(139, 92, 246, 0.3)", "0 0 40px rgba(139, 92, 246, 0.6)", "0 0 20px rgba(139, 92, 246, 0.3)"] }}
      transition={{ duration: 3, repeat: Infinity }}
    >
      <Sparkles className="text-violet-400 w-12 h-12" />
    </motion.div>
    
    {/* Connection lines */}
    {[0, 60, 120, 180, 240, 300].map((angle, index) => (
      <motion.div 
        key={`line-${index}`}
        className="absolute h-px bg-gradient-to-r from-violet-500/0 via-violet-500/50 to-violet-500/0"
        style={{ 
          width: '120px', 
          left: `calc(50% + ${Math.cos(angle * Math.PI / 180) * 60}px)`,
          top: `calc(50% + ${Math.sin(angle * Math.PI / 180) * 60}px)`,
          transform: `rotate(${angle}deg) translateX(-50%)`,
          transformOrigin: 'left center',
        }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
      />
    ))}
  </div>
);

const Landing = () => {
  // Intersection Observer for header transparency
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <AnimatedBackground />
      
      {/* Header */}
      {/* <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md py-4 shadow-lg' : 'py-6'}`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="text-violet-500 w-8 h-8" />
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">Sentinex</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a href="social-launchpad" className="text-gray-300 hover:text-white transition-colors">Social Launchpad</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              <a href="#technology" className="text-gray-300 hover:text-white transition-colors">Technology</a>
              <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
            </nav>
            
            <motion.a 
              href="#get-started" 
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-6 py-2 rounded-full font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-violet-600/20 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Launch App
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </header> */}
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block mb-4 px-4 py-1 bg-violet-900/30 backdrop-blur-sm rounded-full border border-violet-800/50 text-violet-300 text-sm">
                  Powered by Secret AI SDK
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">Limitless DeFi</span> Agent with Sentiment Intelligence
                </h1>
                <p className="text-xl text-gray-300 mb-8 max-w-lg">
                  Analyze protocols, bridge assets, and launch tokens based on real-time social sentiment from Twitter. Your all-in-one autonomous DeFi companion.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a 
                    href="#get-started" 
                    className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-violet-600/20 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </motion.a>
                  
                  <motion.a 
                    href="#learn-more" 
                    className="px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 border border-gray-700 hover:border-violet-500 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                    <ArrowDownCircle className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
            
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10"
              >
                <div className="bg-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shadow-2xl shadow-violet-900/20">
                  <NetworkVisualization />
                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">Secure Network</h3>
                      <p className="text-gray-400">Autonomous AI Agent Framework</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-green-500"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-blue-500"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                      />
                      <motion.div 
                        className="w-3 h-3 rounded-full bg-violet-500"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <motion.div 
                  className="absolute -top-8 -right-8 bg-gray-900/60 backdrop-blur-md p-4 rounded-lg border border-gray-800 shadow-lg z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="flex items-center gap-3">
                    <Twitter className="text-blue-400 w-6 h-6" />
                    <div>
                      <p className="text-sm text-gray-300">Sentiment Analysis</p>
                      <p className="text-green-400 text-xs">Positive (+78%)</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-10 -left-10 bg-gray-900/60 backdrop-blur-md p-4 rounded-lg border border-gray-800 shadow-lg z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <div className="flex items-center gap-3">
                    <RocketIcon className="text-fuchsia-400 w-5 h-5" />
                    <div>
                      <p className="text-sm text-gray-300">Token Launch</p>
                      <p className="text-xs text-gray-400">Taurus Testnet</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-gray-900/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">100+</h3>
              <p className="text-gray-400 mt-2">Fragmented Protocols</p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-900/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">500K+</h3>
              <p className="text-gray-400 mt-2">@aixbt agent quality posts for finding alpha</p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-900/40 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">9.8/10</h3>
              <p className="text-gray-400 mt-2">Quality of twitter posts</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">Next-Level DeFi</span> Features
              </h2>
              <p className="text-xl text-gray-400">
                Sentinex combines advanced AI capabilities with blockchain technology to create a seamless DeFi experience
              </p>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            
            <FeatureCard 
              icon={Link2} 
              title="Analysis and Cross-Chain Bridge" 
              description="Deep analysis of DeFi protocols including risk assessment, yield opportunities, and liquidity metrics. Two agent architecture helps bridging ethereum assets to taurus"
            />
            
            <FeatureCard 
              icon={Droplet} 
              title="Smart Faucet" 
              description="Intelligent token distribution system that adapts to user needs and network conditions. Current taurus faucet only drips fixed amount of tAi3 "
            />
            
            <FeatureCard 
              icon={RocketIcon} 
              title="Automated Token Launch" 
              description="Launch tokens on Taurus testnet with custom parameters based on market conditions. Real-time analysis of Twitter sentiment via aixbt_agent to make data-driven decisions."
            />
            
            <FeatureCard 
              icon={Code} 
              title="Secret AI SDK" 
              description="Leverages the secure AI SDK for confidential computation and protected data handling."
            />
            
            <FeatureCard 
              icon={Bot} 
              title="AI Agent Framework" 
              description="Powered by Autonomys' agent framework for seamless integration and autonomous operation."
            />

            <FeatureCard 
              icon={Shield} 
              title="Secure Network" 
              description="Built on Autonomys' secure infrastructure with merkle proofs verification while bridging."
              className="md:col-span-2 lg:col-span-1"
            />

            
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">How Sentinex</span> Works
              </h2>
              <p className="text-xl text-gray-400">
                A seamless process from social sentiment analysis to token launch
              </p>
            </motion.div>
          </div>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-600/80 to-fuchsia-600/80 transform -translate-x-1/2 hidden md:block"></div>
            
            {/* Steps */}
            <div className="space-y-24 relative">
              {/* Step 1 */}
              <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                <motion.div 
                  className="mb-8 md:mb-0 md:text-right"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold mb-4">Social Sentiment Analysis</h3>
                  <p className="text-gray-400 max-w-lg md:ml-auto">
                    Sentinex connects to Twitter via the aixbt_agent to collect and analyze real-time market sentiment and trends in the DeFi space.
                  </p>
                </motion.div>
                
                <div className="relative">
                  <motion.div 
                    className="absolute left-1/2 -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-violet-600 z-20 flex items-center justify-center border-4 border-black hidden md:flex"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    1
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-900/60 backdrop-blur-md p-6 rounded-xl border border-gray-800 md:ml-8"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <Twitter className="text-blue-400 w-8 h-8" />
                      <div className="bg-gray-800 h-2 flex-1 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-green-500 to-green-400"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "78%" }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                      <span className="text-green-400">78%</span>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Social sentiment analysis shows positive outlook for DeFi tokens with high community engagement around new launches.
                    </p>
                  </motion.div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                <div className="mb-8 md:mb-0 md:order-2">
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">Protocol Analysis</h3>
                    <p className="text-gray-400 max-w-lg">
                      Our AI engine analyzes on-chain metrics, TVL, trading volumes, and other key indicators to identify optimal token parameters.
                    </p>
                  </motion.div>
                </div>
                
                <div className="relative md:order-1">
                  <motion.div 
                    className="absolute left-1/2 -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-violet-600 z-20 flex items-center justify-center border-4 border-black hidden md:flex"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    2
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-900/60 backdrop-blur-md p-6 rounded-xl border border-gray-800 md:mr-8"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <p className="text-xs text-gray-400">Total Value Locked</p>
                        <p className="text-xl font-bold text-white">$1.8B</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <p className="text-xs text-gray-400">Daily Volume</p>
                        <p className="text-xl font-bold text-white">$324M</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <p className="text-xs text-gray-400">Avg APY</p>
                        <p className="text-xl font-bold text-green-400">12.4%</p>
                      </div>
                      <div className="bg-gray-800 p-3 rounded-lg">
                        <p className="text-xs text-gray-400">Risk Score</p>
                        <p className="text-xl font-bold text-yellow-400">Medium</p>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm">
                      Deep protocol analysis helps determine optimal tokenomics and launch timing.
                    </p>
                  </motion.div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                <motion.div 
                  className="mb-8 md:mb-0 md:text-right"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold mb-4">Token Deployment</h3>
                  <p className="text-gray-400 max-w-lg md:ml-auto">
                    Sentinex automatically deploys your token on the Autonomys Taurus testnet with optimized parameters based on collected data.
                  </p>
                </motion.div>
                
                <div className="relative">
                  <motion.div 
                    className="absolute left-1/2 -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-violet-600 z-20 flex items-center justify-center border-4 border-black hidden md:flex"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    3
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-900/60 backdrop-blur-md p-6 rounded-xl border border-gray-800 md:ml-8"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className="flex-1">
                        <Code className="text-violet-400 w-8 h-8 mb-2" />
                        <p className="text-sm text-gray-300">Smart Contract</p>
                        <p className="text-xs text-gray-400">Taurus Testnet</p>
                      </div>
                      <CheckCircle className="text-green-400 w-8 h-8" />
                    </div>
                    <div className="bg-gray-800 p-3 rounded-lg text-xs font-mono text-gray-300 overflow-x-auto">
                      <p>Token: 0x78f2...93e4</p>
                      <p>Supply: 1,000,000 SNX</p>
                      <p>Tax: 2% (Marketing)</p>
                      <p>Status: Deployed</p>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
                <div className="mb-8 md:mb-0 md:order-2">
                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-2xl font-bold mb-4">Supply Distribution</h3>
                    <p className="text-gray-400 max-w-lg">
                      Smart supply distribution automatically mints and distributes tokens based on your predefined allocation parameters.
                    </p>
                  </motion.div>
                </div>
                
                <div className="relative md:order-1">
                  <motion.div 
                    className="absolute left-1/2 -translate-x-1/2 -top-4 w-8 h-8 rounded-full bg-violet-600 z-20 flex items-center justify-center border-4 border-black hidden md:flex"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    4
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gray-900/60 backdrop-blur-md p-6 rounded-xl border border-gray-800 md:mr-8"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <PieChart className="text-violet-400 w-8 h-8 mb-4" />
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Community</span>
                          <span className="text-violet-400">50%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-violet-500"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "50%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Team</span>
                          <span className="text-fuchsia-400">20%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-fuchsia-500"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "20%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.1 }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Marketing</span>
                          <span className="text-blue-400">15%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-blue-500"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "15%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">Liquidity</span>
                          <span className="text-green-400">15%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-green-500"
                            initial={{ width: "0%" }}
                            whileInView={{ width: "15%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">Secure AI</span> Technology
              </h2>
              <p className="text-xl text-gray-400">
                Powered by the Autonomys Secret AI SDK for confidential computation and secure data handling
              </p>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div 
                className="bg-gray-900/60 backdrop-blur-md p-8 rounded-xl border border-gray-800 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <Lock className="text-violet-400 w-12 h-12 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Secret AI SDK Integration</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0 mt-1" />
                      <p className="text-gray-300">Encrypted data processing ensures your strategy remains confidential</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0 mt-1" />
                      <p className="text-gray-300">Secure API integration with Twitter for sentiment analysis</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0 mt-1" />
                      <p className="text-gray-300">Multi-layer encryption for wallet connections and smart contract interactions</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0 mt-1" />
                      <p className="text-gray-300">Private key management with hardware-level security</p>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
            
            <div className="space-y-6">
              <motion.div 
                className="bg-gray-900/60 backdrop-blur-md p-6 rounded-xl border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-violet-900/50 p-3 rounded-lg">
                    <Bot className="text-violet-400 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Autonomous Agent Framework</h4>
                    <p className="text-gray-400">Built on Autonomys' agent framework allowing secure, autonomous operation with minimal user intervention.</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gray-900/60 backdrop-blur-md p-6 rounded-xl border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-fuchsia-900/50 p-3 rounded-lg">
                    <Twitter className="text-fuchsia-400 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Twitter Sentiment Engine</h4>
                    <p className="text-gray-400">aixbt_agent integration for real-time analysis of market sentiment from Twitter feeds and trending topics.</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-gray-900/60 backdrop-blur-md p-6 rounded-xl border border-gray-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-900/50 p-3 rounded-lg">
                    <Zap className="text-blue-400 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Taurus Testnet Integration</h4>
                    <p className="text-gray-400">Seamless deployment on the Autonomys Taurus testnet with automated contract verification and security checks.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">What Users</span> Are Saying
              </h2>
              <p className="text-xl text-gray-400">
                Discover how Sentinex is transforming DeFi experiences
              </p>
            </motion.div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial 
              quote="The social sentiment analysis is incredibly accurate. I've been able to make more informed decisions about my token launches based on real data."
              author="Alex Johnson"
              role="DeFi Protocol Developer"
            />
            
            <Testimonial 
              quote="The token distribution feature saved me hours of manual work. Everything was handled automatically with perfect execution."
              author="Sarah Williams"
              role="Project Manager"
            />
            
            <Testimonial 
              quote="I was impressed by how secure the platform feels. The Secret AI SDK integration gives me confidence that my data and strategies remain private."
              author="Michael Chen"
              role="Crypto Investor"
            />
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">Frequently Asked</span> Questions
              </h2>
              <p className="text-xl text-gray-400">
                Everything you need to know about Sentinex
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="max-w-3xl mx-auto bg-gray-900/60 backdrop-blur-md rounded-xl border border-gray-800 p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <FAQItem 
              question="How does the social sentiment analysis work?" 
              answer="Sentinex connects to Twitter via our aixbt_agent and analyzes posts, hashtags, and engagement metrics related to DeFi topics. Our AI models process this data to determine overall sentiment, trending topics, and potential market movements." 
            />
            
            <FAQItem 
              question="Is the platform secure?" 
              answer="Absolutely. Sentinex is built on Autonomys' secure infrastructure and leverages the Secret AI SDK for confidential computation. All data is encrypted, and private keys never leave your device." 
            />
            
            <FAQItem 
              question="Which blockchains are supported?" 
              answer="Currently, Sentinex supports token deployment on the Autonomys Taurus testnet. Additional blockchain integrations are planned for future releases including Ethereum, Binance Smart Chain, and Solana." 
            />
            
            <FAQItem 
              question="How customizable are the token parameters?" 
              answer="Highly customizable. You can set supply distributions, tax parameters, trading limits, anti-bot measures, and more. Our AI will also suggest optimal parameters based on market conditions and your project goals." 
            />
            
            <FAQItem 
              question="What is the Secret AI SDK?" 
              answer="The Secret AI SDK is Autonomys' framework for confidential computation and secure data handling. It enables Sentinex to process sensitive information and execute strategies while maintaining privacy and security." 
            />
          </motion.div>
        </div>
      </section>
      
      {/* CTA */}
      <section id="get-started" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black to-violet-900/20"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gray-900/70 backdrop-blur-lg rounded-2xl border border-violet-500/30 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-fuchsia-500/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">Ready to Transform</span> Your DeFi Experience?
                  </h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Join Sentinex today and leverage the power of AI-driven sentiment analysis and automated token deployment.
                  </p>
                </motion.div>
              </div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.a 
                  href="/social-launchpad" 
                  className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-violet-600/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Launch Token
                  <ArrowRight className="w-5 h-5" />
                </motion.a>
                
                <motion.a 
                  href="/defi-chat" 
                  className="px-8 py-4 rounded-lg font-medium flex items-center justify-center gap-2 border border-gray-700 hover:border-violet-500 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Secret Defi Agent Assistant
                  <ExternalLink className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-violet-500 w-6 h-6" />
                <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-500 bg-clip-text text-transparent">Sentinex</span>
              </div>
              <p className="text-gray-400 mb-4">
                The ultimate DeFi agent with sentiment intelligence.
              </p>
              <div className="flex gap-4">
                <a href="https://x.com/dhananj10181396" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://github.com/dhananjaypai08" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.374 0 0 5.374 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.626-5.374-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/dhananjay-pai/" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="/social-launchpad" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#technology" className="text-gray-400 hover:text-white transition-colors">Technology</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Sentinex. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;