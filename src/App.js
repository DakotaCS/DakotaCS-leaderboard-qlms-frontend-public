import React, { useState } from 'react';
import Leaderboard from './components/Leaderboard.js';
import RefreshButton from './components/RefreshButton.js';
import './App.css'; 

const App = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const category1Id = 1; 
  const category2Id = 2;
  const category3Id = 3;
  const category4Id = 4;
  const category5Id = 5;

  const handleRefreshAll = () => {
    // Toggle refreshTrigger to trigger refresh in all leaderboard components
    setRefreshTrigger((prev) => !prev);
  };
  return (
    <div className="app-container">
      <h1 className="app-header">BeamNG.Drive Leaderboards</h1>
      <RefreshButton className="app-refresh-button" onClick={handleRefreshAll} />
      <Leaderboard refreshTrigger={refreshTrigger} categoryId={category1Id} />
      <Leaderboard refreshTrigger={refreshTrigger} categoryId={category2Id} />
      <Leaderboard refreshTrigger={refreshTrigger} categoryId={category3Id} />
      <Leaderboard refreshTrigger={refreshTrigger} categoryId={category4Id} />
      <Leaderboard refreshTrigger={refreshTrigger} categoryId={category5Id} />
      {/* Add more instances of Leaderboard components here as needed */}
    </div>
  );
};
export default App;
