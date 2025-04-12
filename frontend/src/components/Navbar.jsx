import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { ConnectKitButton } from "connectkit";
import { Button } from './ui/Button';
import { Sparkles, ArrowRight, FormInputIcon, ViewIcon, RocketIcon, Rocket, BrainCircuitIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { SecretNetworkClient, MsgExecuteContract } from "secretjs";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedColorGradient, setConnectedColorGradient] = useState("bg-gradient-to-r from-violet-500 to-fuchsia-500");
  const [connectMessage, setConnectMessage] = useState("Connect Wallet");
  const [address, setAddress] = useState(null);
  const [secretjs, setSecretjs] = useState(null);

  const contractAddress = "secret1qcc2q9agpnfmxze6snujpv4thl5mpxhuvxgggd";
  const contractCodeHash = "0a64345081cfe303fbb73250d31e0346e4ef60739fda2b1851356bf8c31361d6";
  const CHAIN_ID = "pulsar-3";
  const url = "https://pulsar.lcd.secretnodes.com";
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConnectWallet = async() => {
    if(isConnected){
      console.log("Already connected");
      return;
    }
    if (!window.keplr) {
      alert("Please install Keplr Wallet extension.");
      return;
    }
    try{
      await window.keplr.enable(CHAIN_ID);
      const keplrOfflineSigner = window.keplr.getOfflineSigner(CHAIN_ID);
      const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();
      console.log("Connected address:", myAddress);
      const secretjs = new SecretNetworkClient({
        url,
        chainId: CHAIN_ID,
        wallet: keplrOfflineSigner,
        walletAddress: myAddress,
        encryptionUtils: window.keplr.getEnigmaUtils(CHAIN_ID),
      });
      console.log("Secret Network Client:", secretjs);
      setIsConnected(true);
      setConnectMessage("Connected");
      setConnectedColorGradient("bg-gradient-to-r from-violet-200 to-grey-200");
      setAddress(myAddress);
      setSecretjs(secretjs);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }

  }


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

            <Link to="/defi-chat" className="text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors">
              <BrainCircuitIcon className="w-4 h-4" />
              <span>Defi Chat</span>
            </Link>
            
          </div>
          
          {/* Connect Button */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* <ConnectKitButton /> */}
            <Button className={`${connectedColorGradient} hover:bg-gradient-to-l text-white`} onClick={handleConnectWallet}>
              {connectMessage}
            </Button>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};