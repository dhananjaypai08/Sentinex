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
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Define step data
const STEPS = [
  { id: 'analyze', title: 'Analysis', icon: BarChart2 },
  { id: 'deploy', title: 'Deployment', icon: Code },
  { id: 'mint', title: 'Minting', icon: Sparkles },
  { id: 'tweet', title: 'Publishing', icon: Twitter }
];

// Utility to generate a deterministic gradient based on message content
const generateGradient = (content, isUser) => {
  if (isUser) {
    return 'from-[#0A2540] to-[#1A365D]';
  }
  
  // For system messages based on content to give visual variety
  if (content.includes("error") || content.includes("sorry")) {
    return 'from-[#2D3748] to-[#1A202C]';
  } else if (content.includes("✅") || content.includes("success")) {
    return 'from-[#1C2434] to-[#0F172A]';
  } else if (content.includes("🚀") || content.includes("deploy")) {
    return 'from-[#162637] to-[#0F172A]';
  } else {
    return 'from-[#1E293B] to-[#0F172A]';
  }
};

// Message bubble component with better enterprise styling
const MessageBubble = ({ message }) => {
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
        className={`max-w-[85%] rounded-md px-4 py-3 border ${
          isUser
            ? `bg-gradient-to-br ${gradientClasses} text-gray-100 border-[#2D4A77]/30`
            : `bg-gradient-to-br ${gradientClasses} text-gray-100 border-gray-700/30`
        }`}
      >
        <p className="text-sm font-medium leading-relaxed">{message.content}</p>
        {message.links && message.links.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-700/40">
            {message.links.map((link, index) => (
              <motion.a
                key={index}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between mt-1 px-3 py-2 bg-[#0D1A2D] text-blue-400 rounded hover:bg-[#12243D] transition-all duration-150 text-xs font-medium group"
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

// Professional step indicator with better visual feedback
const StepIndicator = ({ currentStep, completedSteps }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-lg bg-[#0A1624]/95 backdrop-blur-lg rounded-lg border border-gray-800/60 shadow-xl z-20"
    >
      <div className="flex justify-between px-3 py-3">
        {STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className="flex items-center w-full">
                <div className={`h-[2px] w-12 ${index === 0 ? 'opacity-0' : ''} ${
                  isCompleted ? 'bg-blue-500/80' : 'bg-gray-800/80'
                }`} />
                <div
                  className={`w-7 h-7 rounded-md flex items-center justify-center ${
                    isCompleted
                      ? 'bg-blue-600/20 border border-blue-500/70 text-blue-400'
                      : isCurrent
                      ? 'bg-[#152136] border border-blue-500/30 text-blue-400'
                      : 'bg-[#0F1A2A] border border-gray-700/50 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-3.5 h-3.5" />
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader className="w-3.5 h-3.5" />
                    </motion.div>
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className={`h-[2px] w-12 ${index === STEPS.length - 1 ? 'opacity-0' : ''} ${
                  isCompleted ? 'bg-blue-500/80' : 'bg-gray-800/80'
                }`} />
              </div>
              <span className={`mt-2 text-[10px] uppercase tracking-wider font-semibold ${
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

const SocialLaunchpad = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const hasAddedWelcomeMessage = useRef(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Welcome message - only add it once
    if (messages.length === 0 && !hasAddedWelcomeMessage.current) {
      addMessage("Welcome to the Social Launchpad. I can help you deploy your token in a few simple steps. Describe your token (e.g., Create a token named Rocket with symbol RKT and supply of 100,000).");
      hasAddedWelcomeMessage.current = true;
    }
    
    // Focus input on initial load
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Ensure the step indicator has enough space at the bottom
  useEffect(() => {
    if (currentStep && messageContainerRef.current) {
      messageContainerRef.current.style.paddingBottom = '120px';
    } else if (messageContainerRef.current) {
      messageContainerRef.current.style.paddingBottom = '24px';
    }
  }, [currentStep]);

  const completeStep = (stepId) => {
    setCompletedSteps(prev => [...prev, stepId]);
  };

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

    try {
      // Step 1: Sentiment Analysis
      setCurrentStep('analyze');
      const sentimentResponse = await fetch('http://localhost:5001/sentimentAnalysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt })
      });
      const sentimentData = await sentimentResponse.json();

      const tokenInfo = await fetch('http://localhost:5001/launchpadChat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt })
      });
      const tokenInfoData = await tokenInfo.json();
      
      if (!sentimentData.sentiment) {
        addMessage("I'm sorry, but the market sentiment doesn't seem favorable right now. Consider trying again later.");
        return;
      }
      
      completeStep('analyze');
      addMessage("✅ Market sentiment analysis complete. Current market conditions look favorable for your token launch.");
      
      // Step 2: Deploy Contract
      setCurrentStep('deploy');
      addMessage("Deploying your token contract on Sepolia. Smart contract compilation in progress...");
      
      // Add short delay to simulate real network activity
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const deployResponse = await fetch('http://localhost:5001/deployContract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tokenInfoData)
      });
      const deployData = await deployResponse.json();
      completeStep('deploy');
      
      addMessage(`✅ Contract deployed successfully. ${tokenInfoData.name} (${tokenInfoData.symbol}) is now live on the sepolia.`);
      
      // Step 3: Mint Tokens
      setCurrentStep('mint');
      const mintAmount = Math.floor(tokenInfoData.initialSupply * 0.5);
      addMessage(`Minting ${mintAmount.toLocaleString()} tokens to ${tokenInfoData.owner.slice(0, 6)}...${tokenInfoData.owner.slice(-4)}`);
      
      const mintResponse = await fetch('http://localhost:5001/mintTokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractAddress: deployData,
          to: tokenInfoData.owner,
          amount: mintAmount
        })
      });
      const mintData = await mintResponse.json();
      completeStep('mint');
      
      addMessage(`✅ Successfully minted ${mintAmount.toLocaleString()} ${tokenInfoData.symbol} tokens. Transaction hash: 0x${mintData.slice(0, 10)}...${mintData.slice(-6)}`);

      // Step 4: Post Tweet
      setCurrentStep('tweet');
      addMessage("Publishing launch announcement to social platforms...");
      
      const tweetContent = `I deployed my own token named $${tokenInfoData.symbol} on Sepolia and here is the contract address: ${deployData}`;
      const tweetResponse = await fetch('http://localhost:5001/postTweet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: tweetContent })
      });
      const tweetData = await tweetResponse.json();
      completeStep('tweet');
      
      addMessage("✅ Launch announcement has been published to social channels.");

      // Final success message
      addMessage(
        "Token launch complete. You can now view your token on blockchain explorers and share it with your community.",
        'bot',
        [
          {
            url: `https://sepolia.etherscan.io/address/${deployData}`,
            text: "View on Blockchain Explorer"
          }
        ]
      );
      
      addMessage(
        `Token Summary\n\n` +
        `• Name: ${tokenInfoData.name}\n` +
        `• Symbol: ${tokenInfoData.symbol}\n` +
        `• Initial Supply: ${mintAmount.toLocaleString()} tokens\n` +
        `• Contract: ${deployData.slice(0, 8)}...${deployData.slice(-6)}\n` +
        `• Market Sentiment: Positive\n` +
        `• Social Visibility: High`
      );

    } catch (error) {
      console.error('Error:', error);
      addMessage("An error occurred while processing your request. Please check your connection and try again.");
    } finally {
      setIsProcessing(false);
      setCurrentStep(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black p-20 mt-1">
      {/* Main container */}
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0C1524] border-b border-gray-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow-lg shadow-blue-900/20">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-100">Social Launchpad</h2>
              <p className="text-xs text-gray-400">Enterprise Token Deployment Suite</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-gray-400">Network: Sepolia</span>
          </div>
        </div>
        
        {/* Message container */}
        <div 
          ref={messageContainerRef}
          className="flex-1 overflow-y-auto bg-[#0A121F] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-[#0A121F]"
        >
          <div className="p-4 md:p-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} className="h-1" />
          </div>
        </div>
        
        {/* Input area */}
        <div className="border-t border-gray-800/50 bg-[#0C1524] p-4">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your token (e.g., Create a token named Rocket with symbol RKT and supply of 100,000)"
                className="w-full bg-[#0F1A2A] border border-gray-700/50 text-gray-100 rounded px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder-gray-500"
                disabled={isProcessing}
              />
              <button
                type="submit"
                disabled={isProcessing}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
              >
                {isProcessing ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="flex justify-between items-center mt-3 px-1">
              <p className="text-xs text-gray-500">
                Include token name, symbol, and supply in your description
              </p>
              {isProcessing && (
                <span className="text-xs font-medium text-blue-400 animate-pulse">
                  Processing request...
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
      
      {/* Step Indicator */}
      {currentStep && (
        <StepIndicator
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      )}
    </div>
  );
};

export default SocialLaunchpad;