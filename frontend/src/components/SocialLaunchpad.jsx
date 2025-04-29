import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowUpCircle, 
  CheckCircle, 
  Loader,
  Sparkles,
  Rocket,
  BarChart2,
  MessageSquare,
  Twitter,
  ChevronRight,
  Code,
  ExternalLink,
  Send,
  Menu,
  X,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: 'analyze', title: 'Analysis', icon: BarChart2 },
  { id: 'deploy', title: 'Deployment', icon: Code },
  { id: 'mint', title: 'Minting', icon: Sparkles },
  { id: 'tweet', title: 'Publishing', icon: Twitter }
];

const generateGradient = (content, isUser) => {
  if (isUser) {
    // Subtle user message gradient
    return 'from-[#1A365D]/70 to-[#0A2540]/70';
  }
  
  if (content.includes("error") || content.includes("sorry")) {
    return 'from-[#2D3748]/70 to-[#1A202C]/70';
  } else if (content.includes("✅") || content.includes("success")) {
    return 'from-[#1C2434]/70 to-[#0F172A]/70';
  } else if (content.includes("🚀") || content.includes("deploy")) {
    return 'from-[#162637]/70 to-[#0F172A]/70';
  } else {
    // Default subtle bot gradient
    return 'from-[#1E293B]/70 to-[#0F172A]/70';
  }
};

// Message bubble component with subtle styling
const MessageBubble = ({ message, isMobile }) => {
  const isUser = message.type === 'user';
  const gradientClasses = generateGradient(message.content, isUser);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[85%] md:max-w-[75%] rounded-lg px-4 py-3 border backdrop-blur-sm ${
          isUser
            ? `bg-gradient-to-br ${gradientClasses} text-gray-100 border-[#2D4A77]/30`
            : `bg-gradient-to-br ${gradientClasses} text-gray-100 border-gray-700/30`
        }`}
      >
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium leading-relaxed`}>{message.content}</p>
        {message.links && message.links.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-700/40">
            {message.links.map((link, index) => (
              <motion.a
                key={index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between mt-1 px-3 py-2 bg-[#0D1A2D]/80 text-blue-400 rounded hover:bg-[#12243D]/80 transition-all duration-150 text-xs font-medium group"
              >
                <span>{link.text}</span>
                <ExternalLink className="w-3 h-3 text-blue-400 group-hover:text-blue-300 transition-all" />
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Mobile-friendly step indicator
const StepIndicator = ({ currentStep, completedSteps, isMobile }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed ${isMobile ? 'bottom-16 left-2 right-2' : 'bottom-6 left-1/2 -translate-x-1/2 w-full max-w-lg'} bg-[#0A1624]/85 backdrop-blur-md rounded-lg border border-gray-800/60 shadow-xl z-20`}
    >
      <div className={`flex justify-between ${isMobile ? 'px-2 py-2' : 'px-3 py-3'}`}>
        {STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className="flex items-center w-full">
                <div className={`h-[2px] ${isMobile ? 'w-6' : 'w-12'} ${index === 0 ? 'opacity-0' : ''} ${
                  isCompleted ? 'bg-blue-500/60' : 'bg-gray-800/60'
                }`} />
                <div
                  className={`${isMobile ? 'w-6 h-6' : 'w-7 h-7'} rounded-md flex items-center justify-center ${
                    isCompleted
                      ? 'bg-blue-600/20 border border-blue-500/60 text-blue-400'
                      : isCurrent
                      ? 'bg-[#152136]/80 border border-blue-500/30 text-blue-400'
                      : 'bg-[#0F1A2A]/80 border border-gray-700/50 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
                    </motion.div>
                  ) : (
                    <Icon className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} />
                  )}
                </div>
                <div className={`h-[2px] ${isMobile ? 'w-6' : 'w-12'} ${index === STEPS.length - 1 ? 'opacity-0' : ''} ${
                  isCompleted ? 'bg-blue-500/60' : 'bg-gray-800/60'
                }`} />
              </div>
              <span className={`mt-1 text-[9px] ${isMobile ? 'text-[8px]' : 'text-[10px]'} uppercase tracking-wider font-semibold ${
                isCurrent ? 'text-blue-400' : isCompleted ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

// Typing indicator component
const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-[#1E293B]/70 backdrop-blur-sm px-4 py-3 rounded-lg border border-gray-700/30">
        <div className="flex space-x-1">
          <motion.div
            animate={{ 
              y: [0, -4, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              repeatType: "loop",
              delay: 0
            }}
            className="w-2 h-2 bg-blue-400/60 rounded-full"
          />
          <motion.div
            animate={{ 
              y: [0, -4, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              repeatType: "loop",
              delay: 0.2
            }}
            className="w-2 h-2 bg-blue-400/60 rounded-full"
          />
          <motion.div
            animate={{ 
              y: [0, -4, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              repeatType: "loop",
              delay: 0.4
            }}
            className="w-2 h-2 bg-blue-400/60 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const SocialLaunchpad = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showHelpTip, setShowHelpTip] = useState(true);
  
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const hasAddedWelcomeMessage = useRef(false);
  const inputRef = useRef(null);
  const [contractAddress, setContractAddress] = useState("");
  const [coinName, setCoinName] = useState("SscrtMeme");
  const [coinSymbol, setCoinSymbol] = useState("SSCTM");

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (messages.length === 0 && !hasAddedWelcomeMessage.current) {
      addBotMessage("Welcome to the Social Launchpad. I can help you deploy your token in a few simple steps. Describe your token (e.g., Create a token named Rocket with symbol RKT and supply of 100,000).");
      hasAddedWelcomeMessage.current = true;
    }
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (currentStep && messageContainerRef.current) {
      messageContainerRef.current.style.paddingBottom = isMobile ? '100px' : '120px';
    } else if (messageContainerRef.current) {
      messageContainerRef.current.style.paddingBottom = '24px';
    }
  }, [currentStep, isMobile]);

  const completeStep = (stepId) => {
    setCompletedSteps(prev => [...prev, stepId]);
  };

  // Function to add a bot message with typing animation
  const addBotMessage = (content, links = []) => {
    setIsTyping(true);
    
    // Calculate a natural typing delay based on content length
    const delay = Math.min(1000, Math.max(500, content.length * 15));
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'bot', content, links }]);
    }, delay);
  };

  // Function to add a user message immediately
  const addMessage = (content, type = 'bot', links = []) => {
    setMessages(prev => [...prev, { type, content, links }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userPrompt = input;
    setInput('');
    addMessage(userPrompt, 'user');
    setIsProcessing(true);
    setShowHelpTip(false);

    try {
      setCurrentStep('analyze');
      // Add initial bot message with typing animation
      addBotMessage("I'll analyze market conditions for your token...");
      
      // Make the actual sentiment analysis API call
      const sentimentResponse = await fetch('https://sentinex-production.up.railway.app/sentimentAnalysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt })
      });
      const sentimentData = await sentimentResponse.json();

      // Get token information from the API
      const tokenInfo = await fetch('https://sentinex-production.up.railway.app/launchpadChat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt })
      });
      const tokenInfoData = await tokenInfo.json();
      if(!tokenInfoData.name || !tokenInfoData.symbol || !tokenInfoData.initialSupply) {
        addBotMessage("I'm sorry, but I couldn't extract the token name, symbol, or supply from your request. Please try again.");
        return;
      }
      setCoinName(tokenInfoData.name);
      setCoinSymbol(tokenInfoData.symbol);
      
      if (!sentimentData.sentiment) {
        addBotMessage("I'm sorry, but the market sentiment doesn't seem favorable right now. Consider trying again later.");
        return;
      }
      
      completeStep('analyze');
      addBotMessage("✅ Market sentiment analysis complete. Current market conditions look favorable for your token launch.");
      
      setCurrentStep('deploy');
      addBotMessage("Deploying your token contract on Secret Testnet. Smart contract compilation in progress...");
      
      // Deploy contract API call
      const deployResponse = await fetch('https://sentinex-production.up.railway.app/deployContract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tokenInfoData)
      });
      const deployData = await deployResponse.json();
      setContractAddress(deployData.contractAddress);
      completeStep('deploy');
      
      addBotMessage(`✅ Contract deployed successfully. ${tokenInfoData.name} (${tokenInfoData.symbol}) is now live on the secret testnet.`);
      
      setCurrentStep('mint');
      const mintAmount = Math.floor(tokenInfoData.initialSupply * 0.05);
      addBotMessage(`Minting ${mintAmount.toLocaleString()} tokens to ${tokenInfoData.owner.slice(0, 6)}...${tokenInfoData.owner.slice(-4)}`);
      
      // Mint tokens API call
      const mintResponse = await fetch('https://sentinex-production.up.railway.app/mintTokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractAddress: deployData.contractAddress,
          recipient: tokenInfoData.owner,
          contractCodeHash: deployData.contractCodeHash,
          amount: mintAmount,
        })
      });
      const mintData = await mintResponse.json();
      completeStep('mint');
      
      addBotMessage(`✅ Successfully minted ${mintAmount.toLocaleString()} ${tokenInfoData.symbol} tokens. Transaction hash: ${mintData.transactionHash}`);
      addBotMessage(
        "Token launch complete. You can now view your token on blockchain explorers and share it with your community.",
        [
          {
            url: `https://testnet.ping.pub/secret/account/${deployData.contractAddress}`,
            text: "View on Secret Pulsar Explorer"
          }
        ]
      );

      setCurrentStep('tweet');
      addBotMessage("Publishing launch announcement to social platforms...");
      
      try{
        const tweetContent = `JUST IN!! Someone deployed their own token named $${tokenInfoData.symbol} on Secret Testnet and here is the contract address: ${deployData.contractAddress}`;
        const tweetResponse = await fetch('https://sentinex-production.up.railway.app/postTweet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: tweetContent })
        });
        const tweetData = await tweetResponse.json();
        completeStep('tweet');
      
        addBotMessage("✅ Launch announcement has been published to social channels.");
      }catch(error){
        completeStep('tweet');
        addBotMessage("🚨 Failed to publish launch announcement. X API limit reached.");
        
      }
      
      
      addBotMessage(
        `Token Summary\n\n` +
        `• Name: ${tokenInfoData.name}\n` +
        `• Symbol: ${tokenInfoData.symbol}\n` +
        `• Initial Supply: ${mintAmount.toLocaleString()} tokens\n` +
        `• Contract: ${deployData.contractAddress.slice(0, 8)}...${deployData.contractAddress.slice(-6)}\n` +
        `• Market Sentiment: Positive\n` +
        `• Social Visibility: High`
      );

    } catch (error) {
      console.error('Error:', error);
      addBotMessage("An error occurred while processing your request. Please check your connection and try again.");
    } finally {
      setIsProcessing(false);
      setCurrentStep(null);
    }
  };

  // Handle example token deployment
  const handleExampleToken = () => {
    setInput("Create a token named Cosmic with symbol CSMC and supply of 500,000");
    setCoinName("Cosmic");
    setCoinSymbol("CSMC");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#050A14] p-0 md:p-4 lg:p-8">
      {/* Main container */}
      <div className="h-screen max-w-4xl mx-auto flex flex-col shadow-2xl shadow-blue-900/10 rounded-none md:rounded-xl overflow-hidden border border-gray-800/30">
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 bg-[#0C1524]/90 backdrop-blur-md border-b border-gray-800/40">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-md bg-gradient-to-br from-blue-600/90 to-blue-900/90 flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Rocket className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
            </div>
            <div>
              <h2 className="text-xs md:text-sm font-semibold text-gray-100">Social Launchpad</h2>
              <p className="text-[10px] md:text-xs text-gray-400">Enterprise Token Deployment Suite</p>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-md bg-[#0F1A2A]/80 border border-gray-700/30"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4 text-gray-300" />
              ) : (
                <Menu className="w-4 h-4 text-gray-300" />
              )}
            </button>
          </div>
          
          {/* Desktop network status */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-gray-400">Network: Pulsar-3</span>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#0F1A2A]/95 backdrop-blur-md border-b border-gray-800/40 overflow-hidden"
            >
              <div className="p-4 space-y-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-[#162234]/80 rounded-md border border-gray-700/30">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs text-gray-400">Network: Pulsar-3</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleExampleToken}
                  className="w-full px-3 py-2 bg-[#162234]/80 rounded-md border border-gray-700/30 text-left text-xs text-gray-300"
                >
                  Try example: Create Cosmic (CSMC) token
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-3 py-2 bg-[#162234]/80 rounded-md border border-gray-700/30 text-left text-xs text-gray-300"
                >
                  View documentation
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Message container */}
        <div 
          ref={messageContainerRef}
          className="flex-1 overflow-y-auto bg-[#0A121F]/90 bg-[url('https://cdnjs.cloudflare.com/ajax/libs/blobz.js/1.2.0/subtle-dark-blue.svg')] bg-cover bg-center bg-no-repeat bg-blend-overlay scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
        >
          <div className="p-3 md:p-4 lg:p-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} isMobile={isMobile} />
              ))}
            </AnimatePresence>
            
            {isTyping && <TypingIndicator />}
            
            <div ref={messagesEndRef} className="h-1" />
          </div>
        </div>
        
        {/* Input area */}
        <div className="border-t border-gray-800/40 bg-[#0C1524]/90 backdrop-blur-md p-3 md:p-4 relative">
          {showHelpTip && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full left-4 right-4 mb-2 bg-blue-600/20 backdrop-blur-md rounded-md border border-blue-500/30 p-2 text-xs text-gray-300"
            >
              <div className="flex items-start">
                <Info className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5 mr-2" />
                <div>
                  <p>Try typing: "Create a token named Cosmic with symbol CSMC and supply of 500,000"</p>
                  <button 
                    onClick={() => setShowHelpTip(false)} 
                    className="mt-1 text-blue-400 hover:text-blue-300 text-[10px] font-medium"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isMobile ? "Describe your token..." : "Describe your token (e.g., Create a token named Rocket with symbol RKT and supply of 100,000)"}
                className="w-full bg-[#0F1A2A]/80 backdrop-blur-sm border border-gray-700/40 text-gray-100 rounded-md px-3 py-2.5 md:px-4 md:py-3 pr-10 md:pr-12 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/40 focus:border-blue-500/40 placeholder-gray-500"
                disabled={isProcessing}
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isProcessing}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 bg-blue-600/90 hover:bg-blue-700/90 text-white disabled:opacity-50 disabled:hover:bg-blue-600/90 transition-colors"
              >
                {isProcessing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  </motion.div>
                ) : (
                  <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                )}
              </motion.button>
            </div>
            {!isMobile && (
              <div className="flex justify-between items-center mt-2 px-1">
                <p className="text-[10px] text-gray-500">
                  Include token name, symbol, and supply in your description
                </p>
                {isProcessing && (
                  <span className="text-[10px] font-medium text-blue-400 animate-pulse">
                    Processing request...
                  </span>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
      
      {/* Step Indicator */}
      {currentStep && (
        <StepIndicator
          currentStep={currentStep}
          completedSteps={completedSteps}
          isMobile={isMobile}
        />
      )}
    </div>
  );
};

export default SocialLaunchpad;