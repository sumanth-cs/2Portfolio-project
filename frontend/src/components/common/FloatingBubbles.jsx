// frontend/src/components/common/FloatingBubbles.jsx
import { useEffect, useRef } from 'react';

const FloatingBubbles = () => {
  const containerRef = useRef(null);
  const bubblesRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Move each bubble at different speeds for parallax effect
      bubblesRef.current.forEach((bubble, index) => {
        const speed = 0.2 + (index * 0.05); // Different speeds for each bubble
        bubble.style.transform = `translateY(${scrollY * speed}px)`;
      });
    };

    // Initialize bubble positions
    const initBubbles = () => {
      bubblesRef.current.forEach(bubble => {
        // Random initial positions
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        bubble.style.left = `${xPos}%`;
        bubble.style.top = `${yPos}%`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    initBubbles();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bubble configurations
  const bubbles = [
    { size: 'w-64 h-64', color: 'bg-blue-400/10', animation: 'animate-float1' },
    { size: 'w-48 h-48', color: 'bg-purple-400/10', animation: 'animate-float2' },
    { size: 'w-56 h-56', color: 'bg-pink-400/10', animation: 'animate-float3' },
    { size: 'w-72 h-72', color: 'bg-indigo-400/10', animation: 'animate-float4' },
    { size: 'w-40 h-40', color: 'bg-teal-400/10', animation: 'animate-float5' },
  ];

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {bubbles.map((bubble, index) => (
        <div
          key={index}
          ref={el => bubblesRef.current[index] = el}
          className={`absolute rounded-full ${bubble.size} ${bubble.color} blur-[100px] ${bubble.animation}`}
        />
      ))}
    </div>
  );
};

export default FloatingBubbles;