
import React from 'react';

type AdSlotProps = {
  id: string;
  width?: string;
  height?: string;
  format?: 'rectangle' | 'leaderboard' | 'skyscraper' | 'banner';
  className?: string;
}

const AdSlot = ({ id, width, height, format = 'rectangle', className = '' }: AdSlotProps) => {
  // Determine dimensions based on format
  let dimensions = {
    width: width || '300px',
    height: height || '250px'
  };
  
  switch(format) {
    case 'leaderboard':
      dimensions = { width: '728px', height: '90px' };
      break;
    case 'skyscraper':
      dimensions = { width: '160px', height: '600px' };
      break;
    case 'banner':
      dimensions = { width: '468px', height: '60px' };
      break;
    default:
      // Use rectangle default or custom provided dimensions
      break;
  }
  
  return (
    <div 
      id={`ad-slot-${id}`}
      className={`ad-container border border-dashed border-gray-200 flex items-center justify-center mx-auto ${className}`}
      style={{ 
        width: dimensions.width, 
        height: dimensions.height,
        maxWidth: '100%'
      }}
    >
      <div className="text-sm text-gray-400">
        Advertisement Space
        <span className="block text-xs">{dimensions.width} x {dimensions.height}</span>
      </div>
    </div>
  );
};

export default AdSlot;
