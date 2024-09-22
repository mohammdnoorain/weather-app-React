import React, { useEffect, useState } from 'react';

const PullToRefresh = ({ onRefresh, city }) => {
  const [startY, setStartY] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isPulling) return;
    const currentY = e.touches[0].clientY;
    if (currentY > startY + 50) {
      onRefresh({ value: `${city.lat} ${city.lon}`, label: city.name });
      setIsPulling(false);
    }
  };

  const handleTouchEnd = () => {
    setIsPulling(false);
  };

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPulling]);

  return <div>{isPulling && <span>Pull to refresh...</span>}</div>;
};

export default PullToRefresh;

