import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Homepage';
import ExpandedGameCard from './pages/ExpandedGameCard';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<LoginPage />} /> {/* Default Home */}
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="LoginPage/HomePage" element={<HomePage />} />
          <Route path="/HomePage/ExpandedGameCard" element={<ExpandedGameCard />} />

          {/* Add more routes here as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
