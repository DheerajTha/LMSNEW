import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-gray-50 bg-opacity-90 z-50 flex flex-col items-center justify-center space-y-8">
      {/* 3D Cube Container */}
      <div className="relative w-24 h-24 perspective-1000">
        {/* Rotating Cube */}
        <div className="relative w-full h-full transform-style-preserve-3d animate-spin-3d">
          {/* Front Face */}
          <div className="absolute w-full h-full bg-purple-500/70 border-2 border-purple-600 transform-translate-z-12 rounded-lg"></div>
          {/* Back Face */}
          <div className="absolute w-full h-full bg-indigo-500/70 border-2 border-indigo-600 transform-rotate-y-180 transform-translate-z-12 rounded-lg"></div>
          {/* Right Face */}
          <div className="absolute w-full h-full bg-pink-500/70 border-2 border-pink-600 transform-rotate-y-90 transform-translate-z-12 rounded-lg"></div>
          {/* Left Face */}
          <div className="absolute w-full h-full bg-blue-500/70 border-2 border-blue-600 transform-rotate-y-270 transform-translate-z-12 rounded-lg"></div>
          {/* Top Face */}
          <div className="absolute w-full h-full bg-teal-500/70 border-2 border-teal-600 transform-rotate-x-90 transform-translate-z-12 rounded-lg"></div>
          {/* Bottom Face */}
          <div className="absolute w-full h-full bg-amber-500/70 border-2 border-amber-600 transform-rotate-x-270 transform-translate-z-12 rounded-lg"></div>
        </div>
      </div>

      {/* Morphing Blob with Text */}
      <div className="relative flex items-center justify-center">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full animate-morph opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Please Wait</h3>
              <p className="text-gray-600">Preparing your content...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 animate-progress"></div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .transform-translate-z-12 {
          transform: translateZ(12px);
        }
        .transform-rotate-y-180 {
          transform: rotateY(180deg);
        }
        .transform-rotate-y-90 {
          transform: rotateY(90deg);
        }
        .transform-rotate-y-270 {
          transform: rotateY(270deg);
        }
        .transform-rotate-x-90 {
          transform: rotateX(90deg);
        }
        .transform-rotate-x-270 {
          transform: rotateX(270deg);
        }
        @keyframes spin-3d {
          from { transform: rotateY(0deg) rotateX(15deg) rotateZ(0deg); }
          to { transform: rotateY(360deg) rotateX(15deg) rotateZ(0deg); }
        }
        .animate-spin-3d {
          animation: spin-3d 6s linear infinite;
        }
        @keyframes morph {
          0%, 100% { border-radius: 40% 60% 70% 30% / 40% 40% 60% 50%; }
          34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
          67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
        }
        .animate-morph {
          animation: morph 8s infinite ease-in-out;
        }
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 100%; }
          100% { width: 0%; margin-left: 100%; }
        }
        .animate-progress {
          animation: progress 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};


export default Loading;
