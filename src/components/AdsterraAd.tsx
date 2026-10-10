
import React, { useEffect, useRef } from 'react';

interface AdsterraAdProps {
  unitId: 'leaderboard' | 'rectangle' | 'skyscraper';
}

const AdsterraAd: React.FC<AdsterraAdProps> = ({ unitId }) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const units = {
      leaderboard: {
        key: '51cd458a7327856abfbff5e0cc4c1f48',
        width: 728,
        height: 90
      },
      rectangle: {
        key: '88444f4484ca606988ee4f54bb7db44b',
        width: 300,
        height: 250
      },
      skyscraper: {
        key: 'b0f6c2e26dccbefa938e07e7f6f38f69',
        width: 160,
        height: 600
      }
    };

    const unit = units[unitId];
    if (!unit || !adRef.current) return;

    // Clear previous content
    adRef.current.innerHTML = '';

    // Create script for options
    const optionsScript = document.createElement('script');
    optionsScript.innerHTML = `atOptions = { 'key' : '${unit.key}', 'format' : 'iframe', 'height' : ${unit.height}, 'width' : ${unit.width}, 'params' : {} };`;
    
    // Create script for invocation
    const invokeScript = document.createElement('script');
    invokeScript.src = `https://www.highrevenueformat.com/${unit.key}/invoke.js`;
    invokeScript.async = true;

    adRef.current.appendChild(optionsScript);
    adRef.current.appendChild(invokeScript);
  }, [unitId]);

  return (
    <div 
      ref={adRef} 
      className="flex justify-center my-8 overflow-hidden" 
      style={{ minHeight: '20px' }}
    />
  );
};

export default AdsterraAd;
