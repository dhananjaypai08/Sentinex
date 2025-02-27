import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Web3Provider } from "./components/Web3Provider";
import { Landing } from './components/Landing';
import { Navbar } from './components/Navbar';
import ProtocolDashboard from './components/ProtocolDashboard';
import DeFiChatTerminal from './components/DeFiChatTerminal';
import SocialLaunchpad from './components/SocialLaunchpad';

const App = () => {
  return (
    <Web3Provider>
      <Router>
        <div className="min-h-screen bg-background text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<ProtocolDashboard />} />
            <Route path="/chat" element={<DeFiChatTerminal />} />
            <Route path="/social-launchpad" element={<SocialLaunchpad />} />
          </Routes>
        </div>
      </Router>
    </Web3Provider>
  );
};

export default App;