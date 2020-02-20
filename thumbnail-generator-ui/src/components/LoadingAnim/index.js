import React from 'react';
import Lottie from 'lottie-react-web';
import working from '../../assets/working.json';
import './index.css';

function LoadingCard() {
  return (
    <div className="animation">
      <Lottie options={{animationData: working}} />
    </div>
  );
}

export default LoadingCard