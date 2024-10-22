import React from 'react';

const RefreshButton = ({ onClick, className }) => {
  const handleRefreshClick = () => {
    if (typeof onClick === 'function') {
      onClick();
    }
  };

  return (
    <button className={className} onClick={handleRefreshClick}>
      Refresh Leaderboards
    </button>
  );
};

export default RefreshButton;
