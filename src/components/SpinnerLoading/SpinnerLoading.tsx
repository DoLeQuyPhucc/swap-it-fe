import React from 'react';

const Spinner = ({ size = 'md', color = 'primary', className = '' }: { size: 'sm' | 'md' | 'lg' | 'xl', color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'white', className?: string }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colors = {
    primary: 'border-amber-500',
    secondary: 'border-gray-500',
    success: 'border-green-500',
    danger: 'border-red-500',
    warning: 'border-yellow-500',
    white: 'border-white'
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`
          ${sizes[size]}
          border-4
          border-t-transparent
          ${colors[color]}
          rounded-full
          animate-spin
          ${className}
        `}
      />
    </div>
  );
};

// Spinning dots variant
const SpinningDots = ({ size = 'md', color = 'primary', className = '' }: { size: 'sm' | 'md' | 'lg' | 'xl', color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'white', className?: string }) => {
  const sizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  };

  const colors = {
    primary: 'bg-amber-500',
    secondary: 'bg-gray-500',
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-yellow-500',
    white: 'bg-white'
  };

  return (
    <div className="flex space-x-2 justify-center items-center">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`
            ${sizes[size]}
            ${colors[color]}
            rounded-full
            animate-pulse
          `}
          style={{
            animationDelay: `${index * 0.15}s`
          }}
        />
      ))}
    </div>
  );
};

// Loading bar variant
const LoadingBar = ({ color = 'primary', className = '' }: { color: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'white', className?: string }) => {
  const colors = {
    primary: 'bg-amber-500',
    secondary: 'bg-gray-500',
    success: 'bg-green-500',
    danger: 'bg-red-500',
    warning: 'bg-yellow-500',
    white: 'bg-white'
  };

  return (
    <div className="w-full h-1 bg-gray-200 rounded overflow-hidden">
      <div 
        className={`h-full ${colors[color]} animate-loading-bar`}
      />
    </div>
  );
};

// Example usage component
const LoadingExample = () => {
  return (
    <div className="space-y-8 p-4">
      {/* Basic spinner examples */}
      <div className="space-y-4">
        <h3 className="font-medium">Basic Spinner</h3>
        <div className="flex space-x-4">
          <Spinner size="sm" color="primary" />
          <Spinner size="md" color="primary" />
          <Spinner size="lg" color="success" />
          <Spinner size="xl" color="danger" />
        </div>
      </div>

      {/* Spinning dots examples */}
      <div className="space-y-4">
        <h3 className="font-medium">Spinning Dots</h3>
        <div className="flex space-x-4">
          <SpinningDots size="sm" color="primary" />
          <SpinningDots size="md" color="success" />
          <SpinningDots size="lg" color="warning" />
          <SpinningDots size="xl" color="danger" />
        </div>
      </div>

      {/* Loading bar example */}
      <div className="space-y-4">
        <h3 className="font-medium">Loading Bar</h3>
        <div className="space-y-2">
          <LoadingBar color="primary" />
          <LoadingBar color="success" />
          <LoadingBar color="danger" />
        </div>
      </div>
    </div>
  );
};

// Add loading bar animation to tailwind config
const style = document.createElement('style');
style.textContent = `
  @keyframes loading-bar {
    0% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
  }
  .animate-loading-bar {
    animation: loading-bar 1.5s infinite;
  }
`;
document.head.appendChild(style);

export { Spinner, SpinningDots, LoadingBar };
export default LoadingExample;