import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowUpCircle, 
  CheckCircle, 
  Loader,
  Sparkles,
  RocketIcon,
  BarChart2,
  MessageSquare,
  Twitter
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  { id: 'analyze', title: 'Analyzing Market Sentiment', icon: BarChart2 },
  { id: 'deploy', title: 'Deploying Token Contract', icon: RocketIcon },
  { id: 'mint', title: 'Minting Initial Supply', icon: Sparkles },
  { id: 'tweet', title: 'Announcing on Twitter', icon: Twitter }
];

const MessageBubble = ({ message }) => {
  const isUser = message.type === 'user';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-6 py-4 ${
          isUser
            ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-600/20'
            : 'bg-gray-800 text-gray-100 border border-gray-700 shadow-lg'
        }`}
      >
        <p className="text-lg break-words">{message.content}</p>
        {message.links && message.links.map((link, index) => (
          <motion.a
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 px-4 py-2 bg-gray-700 text-violet-400 rounded-lg hover:bg-gray-600 transition-all duration-200 text-center border border-violet-500/20"
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-lg bg-gray-800/95 backdrop-blur-md rounded-xl p-4 border border-violet-500/30 shadow-xl shadow-violet-900/20 z-20"
    >
      <div className="flex justify-between">
        {STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = currentStep === step.id;
          const Icon = step.icon;
          
          return (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                <div className={`flex-1 h-1 ${index === 0 ? 'hidden' : ''} ${
                  isCompleted ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500' : 'bg-gray-600'
                }`} />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'
                      : isCurrent
                      ? 'bg-violet-500 text-white'
                      : 'bg-gray-700 text-gray-400 border border-gray-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : isCurrent ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <Loader className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </motion.div>
                <div className={`flex-1 h-1 ${index === STEPS.length - 1 ? 'hidden' : ''} ${
                  isCompleted ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500' : 'bg-gray-600'
                }`} />
              </div>
              <span className={`mt-2 text-xs font-medium text-center ${
                isCurrent ? 'text-violet-400' : isCompleted ? 'text-gray-300' : 'text-gray-500'
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

const GlowingBackground = () => {
  return (
    <>
      <div className="fixed top-20 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />
    </>
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

  useEffect(() => {
    // Welcome message
    if (messages.length === 0) {
      addMessage("Welcome to the Social Launchpad! 🚀 I can help you deploy your own token with a few simple steps. Just describe your token (e.g., Create a token with name Rocket, symbol RKT, and supply of 100000).");
    }
  }, []);

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
        addMessage("I'm sorry, but the market sentiment doesn't seem favorable right now. Maybe we should try again later.");
        return;
      }
      
      completeStep('analyze');
      addMessage("✨ Market sentiment analysis complete! The current market conditions look favorable for your token launch.");
      
      // Step 2: Deploy Contract
      setCurrentStep('deploy');
      addMessage("🔄 Deploying your token contract on the Auto EVM Taurus...");
      
      const deployResponse = await fetch('http://localhost:5001/deployContract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tokenInfoData)
      });
      const deployData = await deployResponse.json();
      completeStep('deploy');
      
      addMessage(`✅ Contract deployed successfully! Your token ${tokenInfoData.name} (${tokenInfoData.symbol}) is now live on the Taurus testnet.`);
      
      // Step 3: Mint Tokens
      setCurrentStep('mint');
      const mintAmount = Math.floor(tokenInfoData.initialSupply * 0.5);
      addMessage(`🔄 Minting ${mintAmount.toLocaleString()} tokens to ${tokenInfoData.owner.slice(0, 6)}...${tokenInfoData.owner.slice(-4)}`);
      
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
      
      addMessage(`✅ Successfully minted ${mintAmount.toLocaleString()} ${tokenInfoData.symbol} tokens! Transaction hash: https://blockscout.taurus.autonomys.xyz/tx/0x${mintData}`);

      // Step 4: Post Tweet
      setCurrentStep('tweet');
      addMessage("🔄 Announcing your token launch on Twitter...");
      
      const tweetContent = `I deployed my own token named $${tokenInfoData.symbol} and here is the contract address: ${deployData} on the taurus testnet`;
      const tweetResponse = await fetch('http://localhost:5001/postTweet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: tweetContent })
      });
      const tweetData = await tweetResponse.json();
      completeStep('tweet');
      
      addMessage("✅ Launch announcement has been posted on Twitter!");

      // Final success message
      addMessage(
        "🎉 Congratulations! Your token has been successfully launched!",
        'bot',
        [
          {
            url: `https://blockscout.taurus.autonomys.xyz/address/${deployData}`,
            text: "View Token on Explorer"
          }
        ]
      );
      
      addMessage(
        `Here's a summary of your token launch:\n\n` +
        `• Token Name: ${tokenInfoData.name}\n` +
        `• Symbol: ${tokenInfoData.symbol}\n` +
        `• Initial Supply: ${mintAmount.toLocaleString()} tokens\n` +
        `• Contract Address: ${deployData.slice(0, 8)}...${deployData.slice(-6)}\n` +
        `• Market Sentiment: Positive\n` +
        `• Twitter Announcement: Complete`
      );

    } catch (error) {
      console.error('Error:', error);
      toast.error("An error occurred during the process");
      addMessage("I'm sorry, but there was an error processing your request. Please try again.");
    } finally {
      setIsProcessing(false);
      setCurrentStep(null);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-black p-20 mt-1">
      <GlowingBackground />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-20 bg-black/90 backdrop-blur-md p-6 border-b border-gray-800"
      >
        <div className="max-w-4xl mx-auto flex items-center gap-900">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -z-10 inset-0 text-violet-500/20"
            >
              <Sparkles className="w-10 h-10" />
            </motion.div>
            <Sparkles className="w-10 h-10 text-violet-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 text-transparent bg-clip-text">
              Social Launchpad
            </h2>
            <p className="text-gray-400 mt-1">Launch any tokens based on real-time social sentiment and dynamic market conditions decided by 2 Agents Autonomys social Agent and @aixbt_agent from twitter</p>
          </div>
        </div>
      </motion.div>
      
      {/* Messages Container */}
      <div 
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
      >
        <div className="max-w-4xl mx-auto pb-20">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
            </AnimatePresence>
          </div>
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
      <div className="sticky bottom-0 border-t border-gray-800 bg-black/95 backdrop-blur-md py-4 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your token launch (e.g., Create a token with name Rocket, symbol RKT, and supply of 100000)"
              className="w-full bg-gray-800 text-white rounded-xl px-6 py-4 pr-14 focus:outline-none focus:ring-2 focus:ring-violet-500 text-lg border border-gray-700 shadow-lg transition-all duration-200"
              disabled={isProcessing}
            />
            <motion.button
              type="submit"
              disabled={isProcessing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-500 hover:text-violet-400 transition-colors disabled:opacity-50"
            >
              {isProcessing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader className="w-8 h-8" />
                </motion.div>
              ) : (
                <ArrowUpCircle className="w-8 h-8" />
              )}
            </motion.button>
          </form>
          <p className="text-xs text-gray-500 mt-2 ml-2">
            Pro tip: Include token name, symbol, and supply in your description
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialLaunchpad;