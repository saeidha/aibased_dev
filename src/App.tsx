import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./Pages/Index";
import ChatBot from "./Pages/ChatBot/ChatBot";
import NftGenerator from "./Pages/NftGenerator/NftGenerator";
import MarketPlace from "./Pages/MarketPlace/MarketPlace";
import Roadmap from "./Pages/Roadmap/Roadmap";
import PrivacyPolicy from "./Pages/Legal/PrivacyPolicy";
import TermsOfService from "./Pages/Legal/TermsOfService";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/ai-assist" element={<ChatBot />} />
        <Route path="/nft-generator" element={<NftGenerator />} />
        <Route path="/mint-pad/:nftId?" element={<MarketPlace />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </Router>
  );
};

export default App;
