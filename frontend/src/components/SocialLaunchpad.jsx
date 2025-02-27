import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowUpCircle, 
  CheckCircle, 
  Loader,
  Sparkles,
  Rocket,
  BarChart2,
  MessageSquare,
  Twitter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: 'analyze', title: 'Market Analysis', icon: BarChart2 },
  { id: 'deploy', title: 'Contract Deployment', icon: Rocket },
  { id: 'mint', title: 'Token Minting', icon: Sparkles },
  { id: 'tweet', title: 'Social Announcement', icon: Twitter }
];

const MessageBubble = ({ message }) => {
  const isUser = message.type === 'user';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 ${
          isUser
            ? 'bg-indigo-600 text-white shadow-sm'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm'
        }`}
      >
        <p className="text-base break-words">{message.content}</p>
        {message.links && message.links.map((link, index) => (
          <motion.a
            key={index}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-2 px-3 py-1.5 bg-indigo-500/10 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 rounded hover:bg-indigo-500/15 dark:hover:bg-indigo-900/40 transition-all duration-200 text-center text-sm"
          >
            {link.text} →
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

const StepIndicator = ({ currentStep, completedSteps }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg p-3 shadow-lg z-20"
    >
      <div className="flex justify-between">
        {STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <div className={`flex-1 h-0.5 ${index === 0 ? 'hidden' : ''} ${
                  isCompleted ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`w-7 h-7 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-indigo-500 text-white'
                      : isCurrent
                      ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </motion.div>
                <div className={`flex-1 h-0.5 ${index === STEPS.length - 1 ? 'hidden' : ''} ${
                  isCompleted ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'
                }`} />
              </div>
              <span className={`mt-1.5 text-xs font-medium text-center ${
                isCurrent ? 'text-indigo-600 dark:text-indigo-400' : isCompleted ? 'text-gray-700 dark:text-gray-300' : 'text-gray-400 dark:text-gray-500'
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

  useEffect(() => {
    // Welcome message - only add it once
    if (messages.length === 0 && !hasAddedWelcomeMessage.current) {
      addMessage("Welcome to the Social Launchpad. I can help you deploy your token in a few simple steps. Describe your token (e.g., Create a token named Rocket with symbol RKT and supply of 100,000).");
      hasAddedWelcomeMessage.current = true;
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
      addMessage("Market sentiment analysis complete. Current market conditions look favorable for your token launch.");
      
      // Step 2: Deploy Contract
      setCurrentStep('deploy');
      addMessage("Deploying your token contract on Auto EVM Taurus...");
      
      const deployResponse = await fetch('http://localhost:5001/deployContract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tokenInfoData)
      });
      const deployData = await deployResponse.json();
      completeStep('deploy');
      
      addMessage(`Contract deployed successfully. ${tokenInfoData.name} (${tokenInfoData.symbol}) is now live on the Taurus testnet.`);
      
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
      
      addMessage(`Successfully minted ${mintAmount.toLocaleString()} ${tokenInfoData.symbol} tokens. Transaction hash: https://blockscout.taurus.autonomys.xyz/tx/0x${mintData}`);

      // Step 4: Post Tweet
      setCurrentStep('tweet');
      addMessage("Announcing your token launch on Twitter...");
      
      const tweetContent = `I deployed my own token named $${tokenInfoData.symbol} on Autonyms EVM Network (Taurus) and here is the contract address: ${deployData} on the taurus testnet`;
      const tweetResponse = await fetch('http://localhost:5001/postTweet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: tweetContent })
      });
      const tweetData = await tweetResponse.json();
      completeStep('tweet');
      
      addMessage("Launch announcement has been posted on Twitter.");

      // Final success message
      addMessage(
        "Congratulations! Your token has been successfully launched.",
        'bot',
        [
          {
            url: `https://blockscout.taurus.autonomys.xyz/address/${deployData}`,
            text: "View Token on Explorer"
          }
        ]
      );
      
      addMessage(
        `Token launch summary:\n\n` +
        `• Name: ${tokenInfoData.name}\n` +
        `• Symbol: ${tokenInfoData.symbol}\n` +
        `• Initial Supply: ${mintAmount.toLocaleString()} tokens\n` +
        `• Contract: ${deployData.slice(0, 8)}...${deployData.slice(-6)}\n` +
        `• Market Sentiment: Positive\n` +
        `• Twitter Announcement: Complete`
      );

    } catch (error) {
      console.error('Error:', error);
      addMessage("I'm sorry, but there was an error processing your request. Please try again.");
    } finally {
      setIsProcessing(false);
      setCurrentStep(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black p-20 mt-1">
      {/* Subtle background elements */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Main content */}
      <div className="container mx-auto px-4 pt-4 pb-16">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6 px-4"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100">
              Social Launchpad
            </h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-8">
            Launch tokens based on real-time social sentiment and market conditions
          </p>
        </motion.div>
        
        {/* Messages Container */}
        <div 
          ref={messageContainerRef}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 h-[calc(100vh-220px)] overflow-y-auto"
        >
          <div className="p-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Step Indicator */}
        {currentStep && (
          <StepIndicator
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        )}

        {/* Input Form */}
        <div className="mt-4">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your token (e.g., Create a token named Rocket with symbol RKT and supply of 100,000)"
              className="w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm border border-gray-200 dark:border-gray-800 shadow-sm"
              disabled={isProcessing}
            />
            <motion.button
              type="submit"
              disabled={isProcessing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors disabled:opacity-50"
            >
              {isProcessing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  <Loader className="w-5 h-5" />
                </motion.div>
              ) : (
                <ArrowUpCircle className="w-5 h-5" />
              )}
            </motion.button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 ml-2">
            Include token name, symbol, and supply in your description
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialLaunchpad;