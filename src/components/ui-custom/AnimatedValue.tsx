
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedValueProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

const AnimatedValue: React.FC<AnimatedValueProps> = ({
  value,
  prefix = '',
  suffix = '',
  duration = 1000,
  className,
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const previousValueRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Store the previous value
    previousValueRef.current = displayValue;
    
    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    // Animation function
    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      
      // Calculate the current value
      const currentValue = previousValueRef.current + (value - previousValueRef.current) * eased;
      
      // Update state with the current value
      setDisplayValue(currentValue);
      
      // Continue animation if not finished
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure final value is exactly the target value
        setDisplayValue(value);
        startTimeRef.current = null;
        animationRef.current = null;
      }
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration]);
  
  // Format the display value
  const formattedValue = displayValue.toLocaleString('en-IN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  
  return (
    <span className={cn("transition-colors", className)}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

export default AnimatedValue;
