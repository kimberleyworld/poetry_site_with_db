import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-orange-50 to-blue-100 animate-gradient-shift"></div>
      
      {/* Floating color blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl animate-float-medium"></div>
      <div className="absolute top-1/2 left-3/4 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-float-fast"></div>
      <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl animate-float-reverse"></div>
    </div>
  );
};

export default AnimatedBackground;
