import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpCircle, 
  Loader,
  BarChart2,
  Sparkles,
  ExternalLink,
  AlertTriangle,
  Trash2,
  ArrowRightCircle,
  DollarSign,
  Briefcase,
  ArrowBigLeftDashIcon
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Custom components to render markdown with styling
const MarkdownComponents = {
  h1: props => <h1 className="text-2xl font-bold my-4 text-gray-800 dark:text-gray-100" {...props} />,
  h2: props => <h2 className="text-xl font-semibold my-3 text-gray-800 dark:text-gray-100" {...props} />,
  h3: props => <h3 className="text-lg font-medium my-2 text-gray-800 dark:text-gray-200" {...props} />,
  p: props => <p className="my-2 text-gray-700 dark:text-gray-300" {...props} />,
  ul: props => <ul className="list-disc pl-6 my-2 text-gray-700 dark:text-gray-300" {...props} />,
  ol: props => <ol className="list-decimal pl-6 my-2 text-gray-700 dark:text-gray-300" {...props} />,
  li: props => <li className="my-1" {...props} />,
  a: props => <a className="text-indigo-600 dark:text-indigo-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
  code: props => <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-300" {...props} />,
  pre: props => <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg my-4 overflow-x-auto text-sm font-mono text-gray-800 dark:text-gray-300" {...props} />,
};

// Loading steps with icons that will be shown during different operations
const LOADING_STEPS = {
  'initial': { text: "Initializing DeFi optimizer...", icon: Loader },
  'analyzing': { text: "Analyzing DeFi protocols...", icon: BarChart2 },
  'bridging': { text: "Processing bridge transaction...", icon: ArrowBigLeftDashIcon },
  'calculating': { text: "Calculating optimal strategies...", icon: Sparkles },
  'finalizing': { text: "Preparing your personalized insights...", icon: DollarSign },
};

// Chatbot actions tied to different icons for visual identification
const ACTION_ICONS = {
  'analyze': BarChart2,
  'bridge': ArrowBigLeftDashIcon,
  'balance': DollarSign,
  'wallet': Briefcase,
  'error': AlertTriangle,
  'default': Sparkles
};

// Format ETH balance with proper decimals
const formatBalance = (balance) => {
  return typeof balance === 'number' ? balance.toFixed(4) : '0.0000';
};

// Fun messages to display with balances
const BALANCE_MESSAGES = [
  "Your crypto treasure chest contains:",
  "Your portfolio is looking stellar:",
  "Current holdings in your wallet:",
  "Here's what you're HODLing:",
  "Your digital assets at a glance:",
];

// Protocol response component for displaying DeFi analysis
const ProtocolResponse = ({ protocol }) => {
  if (!protocol || typeof protocol !== 'object') return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center space-x-3">
        <h3 className="text-lg font-medium bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          {protocol.protocol_name}
        </h3>
        {protocol.protocol_link && (
          <a
            href={protocol.protocol_link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1"
          >
            <span>View Protocol</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      <p className="text-gray-600 dark:text-gray-300 text-sm">{protocol.protocol_description}</p>

      {protocol.protocol_steps && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">Steps to Follow:</h4>
          <div className="space-y-2">
            {protocol.protocol_steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs mr-3 mt-0.5">
                    {step.step_number}
                  </span>
                  <div className="space-y-1 flex-1">
                    <p className="text-gray-700 dark:text-gray-200 text-sm">{step.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      {step.estimated_time && (
                        <span className="text-gray-500 dark:text-gray-400">
                          ⏱️ Est. Time: {step.estimated_time}
                        </span>
                      )}
                      {step.potential_fees && (
                        <span className="text-gray-500 dark:text-gray-400">
                          💰 Est. Fees: {step.potential_fees}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        {protocol["slippage insights"] && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700"
          >
            <h4 className="text-gray-700 dark:text-gray-200 text-sm font-medium mb-1">Slippage Insights</h4>
            <p className="text-gray-600 dark:text-gray-300 text-xs">{protocol["slippage insights"]}</p>
            <p className="text-indigo-500 dark:text-indigo-400 text-xs mt-1">
              Estimated Slippage: {protocol.estimated_slippage}
            </p>
          </motion.div>
        )}
        
        {protocol.overall_benefit && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700"
          >
            <h4 className="text-gray-700 dark:text-gray-200 text-sm font-medium mb-1">Overall Benefit</h4>
            <p className="text-gray-600 dark:text-gray-300 text-xs">{protocol.overall_benefit}</p>
          </motion.div>
        )}
      </div>

      {protocol.risks && protocol.risks.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-red-50 dark:bg-red-900/10 rounded-lg p-3 border border-red-100 dark:border-red-800/20"
        >
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-red-500 dark:text-red-400" />
            <h4 className="text-gray-700 dark:text-gray-200 text-sm font-medium">Risk Factors</h4>
          </div>
          <ul className="list-disc list-inside space-y-1">
            {protocol.risks.map((risk, index) => (
              <li key={index} className="text-gray-600 dark:text-gray-300 text-xs">{risk}</li>
            ))}
          </ul>
        </motion.div>
      )}

      {protocol.alternative_protocols && protocol.alternative_protocols.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h4 className="text-gray-700 dark:text-gray-200 text-sm font-medium mb-2">Alternative Protocols</h4>
          <div className="flex flex-wrap gap-2">
            {protocol.alternative_protocols.map((alt, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs text-gray-600 dark:text-gray-300"
              >
                {alt}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Message bubble component for displaying chat messages
const MessageBubble = ({ message }) => {
  const isUser = message.type === 'user';
  const isProtocol = !isUser && message.content && typeof message.content === 'object' && message.content.protocol_name;
  const isBalance = message.isBalance;
  const isError = message.isError;
  
  // Determine which icon to show
  let ActionIcon = ACTION_ICONS.default;
  if (message.action) {
    ActionIcon = ACTION_ICONS[message.action] || ACTION_ICONS.default;
  } else if (isError) {
    ActionIcon = ACTION_ICONS.error;
  } else if (isBalance) {
    ActionIcon = ACTION_ICONS.balance;
  }

  // Handle link rendering
  const renderLinks = () => {
    if (!message.links || message.links.length === 0) return null;
    
    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {message.links.map((link, index) => {
          const isEtherscan = typeof link === 'string' && link.includes('etherscan');
          const isAutonomys = typeof link === 'string' && link.includes('autonomys');
          
          const linkText = isEtherscan ? "View on Etherscan" :
                          isAutonomys ? "View on Autonomys Explorer" :
                          typeof link === 'object' && link.text ? link.text : "View Transaction";
          
          const linkUrl = typeof link === 'object' && link.url ? link.url : link;
          
          return (
            <motion.a
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full text-xs hover:bg-indigo-500/20 dark:hover:bg-indigo-500/30 transition-all duration-200"
            >
              <span>{linkText}</span>
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          );
        })}
      </div>
    );
  };

  // Render content based on message type
  const renderContent = () => {
    if (isUser) {
      return <p className="text-sm">{message.content}</p>;
    }

    if (isBalance) {
      return (
        <div className="space-y-2">
          <p className="text-sm font-medium">{message.content}</p>
          <div className="flex items-center space-x-3">
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {formatBalance(message.balance)} ETH
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">≈ ${(message.balance * 3500).toFixed(2)}</span>
          </div>
        </div>
      );
    }

    if (isProtocol) {
      return <ProtocolResponse protocol={message.content} />;
    }

    // Regular text or markdown content
    return (
      <div className="prose prose-sm dark:prose-invert max-w-none">
        {typeof message.content === 'string' ? (
          <ReactMarkdown components={MarkdownComponents}>{message.content}</ReactMarkdown>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-sm">Unable to display message content</p>
        )}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      {!isUser && (
        <div className="mr-2 mt-1">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isError ? 'bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400' :
            isBalance ? 'bg-green-100 dark:bg-green-900/20 text-green-500 dark:text-green-400' :
            'bg-indigo-100 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400'
          }`}>
            <ActionIcon className="w-4 h-4" />
          </div>
        </div>
      )}
      
      <div className={`max-w-[80%] rounded-lg ${
        isUser
          ? 'bg-indigo-600 text-white shadow-sm'
          : isError
          ? 'bg-red-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-red-100 dark:border-red-700/30'
          : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700'
      }`}>
        <div className="px-4 py-3">
          {renderContent()}
          {renderLinks()}
        </div>
      </div>
    </motion.div>
  );
};

// Main DeFi Optimizer component
const DefiChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('initial');
  const messagesEndRef = useRef(null);
  const [welcomeAdded, setWelcomeAdded] = useState(false);

  // Add welcome message on component mount
  useEffect(() => {
    if (!welcomeAdded) {
      setMessages([
        {
          type: 'bot',
          content: "Welcome to the world of Limitless Defi and Audits! I can help you analyze protocols, audit contracts, bridge tokens, and more. What would you like to do today?",
          action: 'default'
        }
      ]);
      setWelcomeAdded(true);
    }
  }, [welcomeAdded]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Clear all messages
  const clearChat = () => {
    setMessages([
      {
        type: 'bot',
        content: "Chat cleared. What would you like to do next?",
        action: 'default'
      }
    ]);
    setInput('');
  };

  // Add a message to the chat
  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  // Handle errors and add error message
  const handleError = (error) => {
    console.error('Error:', error);
    addMessage({
      type: 'bot',
      content: "Sorry, I encountered an error processing your request. Please try again.",
      isError: true
    });
    setIsLoading(false);
  };

  // Update loading status with appropriate message and icon
  const updateLoadingStatus = (status) => {
    setLoadingStatus(status);
  };

  // Process bridge response
  const processBridgeResponse = (data) => {
    if (data.AutoEVMURL && data.SepoliaURL) {
      addMessage({
        type: 'bot',
        content: "Bridge transaction completed successfully! I've transferred tokens between Sepolia and Auto EVM networks.",
        links: [data.AutoEVMURL, data.SepoliaURL],
        action: 'bridge'
      });
    } else {
      addMessage({
        type: 'bot',
        content: "The bridge transaction was initiated, but I couldn't retrieve all confirmation links.",
        isError: true
      });
    }
  };

  // Process balance response
  const processBalanceResponse = (data) => {
    const numericResult = parseFloat(data);
    if (!isNaN(numericResult) && data.toString().match(/^\d*\.?\d*$/)) {
      const randomMessage = BALANCE_MESSAGES[Math.floor(Math.random() * BALANCE_MESSAGES.length)];
      addMessage({
        type: 'bot',
        content: randomMessage,
        isBalance: true,
        balance: numericResult,
        action: 'balance'
      });
    } else {
      addMessage({
        type: 'bot',
        content: data,
        action: 'wallet'
      });
    }
  };

  // Process protocol analysis response
  const processAnalysisResponse = (data) => {
    if (data && typeof data === 'object') {
      // Check if it's a protocol object
      if (data.protocol_name) {
        addMessage({
          type: 'bot',
          content: data,
          action: 'analyze'
        });
      } else {
        // Handle other structured responses
        addMessage({
          type: 'bot',
          content: `Analysis complete:\n\n${JSON.stringify(data, null, 2)}`,
          action: 'analyze'
        });
      }
    } else {
      // Handle text response
      addMessage({
        type: 'bot',
        content: data,
        action: 'analyze'
      });
    }
  };

  // Process API response
  const processApiResponse = (data) => {
    // First check if it's a bridge response
    if (data.AutoEVMURL && data.SepoliaURL) {
      processBridgeResponse(data);
      return;
    }
    
    // Check if it's a pure number or balance response
    if (typeof data === 'string' && data.match(/^\d*\.?\d*$/)) {
      processBalanceResponse(data);
      return;
    }
    
    // Check if it's an analysis object
    if (data.status === 'success' && data.result) {
      // Check if result is an object (protocol analysis)
      if (typeof data.result === 'object' && data.result.protocol_name) {
        processAnalysisResponse(data.result);
      } 
      // Check if result has transaction URL
      else if (data.tx_url) {
        addMessage({
          type: 'bot',
          content: data.result,
          links: [data.tx_url],
          action: 'default'
        });
      } 
      // Handle text/markdown response
      else {
        try {
          // Try parsing if it might be a stringified object
          const parsedResult = typeof data.result === 'string' && data.result.startsWith('{') 
            ? JSON.parse(data.result) 
            : data.result;
            
          if (typeof parsedResult === 'object' && parsedResult.protocol_name) {
            processAnalysisResponse(parsedResult);
          } else {
            addMessage({
              type: 'bot',
              content: parsedResult,
              action: 'default'
            });
          }
        } catch (e) {
          // If parsing fails, treat as regular text
          addMessage({
            type: 'bot',
            content: data.result,
            action: 'default'
          });
        }
      }
    } 
    // Direct response object (from certain endpoints)
    else if (typeof data === 'object' && data.protocol_name) {
      processAnalysisResponse(data);
    }
    // Handle error responses
    else if (data.status === 'error' || (typeof data === 'string' && data.toLowerCase().includes('error'))) {
      addMessage({
        type: 'bot',
        content: typeof data === 'string' ? data : data.message || "An error occurred with your request.",
        isError: true
      });
    } 
    // Plain text fallback
    else {
      addMessage({
        type: 'bot',
        content: typeof data === 'string' ? data : JSON.stringify(data, null, 2),
        action: 'default'
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { type: 'user', content: input };
    addMessage(userMessage);
    setInput('');
    setIsLoading(true);
    updateLoadingStatus('initial');

    try {
      // First request to determine intent
      updateLoadingStatus('analyzing');
      
      const response = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Process the response
      processApiResponse(data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get current loading step content
  const getCurrentLoadingStep = () => {
    const step = LOADING_STEPS[loadingStatus];
    const Icon = step ? step.icon : Loader;
    const text = step ? step.text : "Processing your request...";
    
    return { Icon, text };
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] p-20 mt-1 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      {/* Subtle background elements */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 flex justify-between items-center"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <h1 className="text-xl font-medium text-gray-800 dark:text-gray-100">
              Limitless Defi and Audits
            </h1>
          </div>
          
          {messages.length > 1 && (
            <motion.button
              onClick={clearChat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Chat</span>
            </motion.button>
          )}
        </motion.div>

        {/* Chat Container */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 h-[calc(100vh-180px)] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4">
            <AnimatePresence>
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
            </AnimatePresence>
            
            {/* Loading indicator */}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start mb-4"
              >
                <div className="flex items-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="mr-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    >
                      {(() => {
                        const { Icon } = getCurrentLoadingStep();
                        return <Icon className="w-5 h-5 text-indigo-500" />;
                      })()}
                    </motion.div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {getCurrentLoadingStep().text}
                  </span>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about DeFi protocols, bridges, wallet management..."
                className="w-full bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm border border-gray-200 dark:border-gray-700"
                disabled={isLoading}
              />
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors disabled:opacity-50"
              >
                {isLoading ? (
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
            <div className="flex justify-between items-center mt-2 px-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Try asking about protocols, bridging assets, or checking balances
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setInput("What DeFi protocols can I use for yield farming?");
                }}
                className="text-xs text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
              >
                <span>Example</span>
                <ArrowRightCircle className="w-3 h-3" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefiChat;