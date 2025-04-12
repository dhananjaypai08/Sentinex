import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Web3Provider } from "./components/Web3Provider";
import { Navbar } from './components/Navbar';
import ProtocolDashboard from './components/ProtocolDashboard';
import DeFiChatTerminal from './components/DeFiChatTerminal';
import SocialLaunchpad from './components/SocialLaunchpad';
import Landing from './components/Landing';
import DefiChat from './components/DefiChat';

const App = () => {
  return (
      <Router>
        <div className="min-h-screen bg-background text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<ProtocolDashboard />} />
            <Route path="/chat" element={<DeFiChatTerminal />} />
            <Route path="/social-launchpad" element={<SocialLaunchpad />} />
            <Route path="/defi-chat" element={<DefiChat />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;