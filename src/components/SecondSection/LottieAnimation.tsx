import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';

interface LottieAnimationProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

const LottieAnimation = forwardRef<{ play: () => void; stop: () => void }, LottieAnimationProps>(({ src, className, style, ...props }, ref) => {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  
  useImperativeHandle(ref, () => ({
    play: () => {
      if (lottieRef.current && lottieRef.current.play) {
        lottieRef.current.play();
      }
    },
    stop: () => {
      if (lottieRef.current && lottieRef.current.stop) {
        lottieRef.current.stop();
      }
    },
  }));
  
  useEffect(() => {
    fetch(src)
      .then((res) => res.json())
      .then(setAnimationData)
      .catch((error) => {
        console.error('Failed to load Lottie animation:', error);
      });
  }, [src]);
  
  if (!animationData) return null;
  return <Lottie lottieRef={lottieRef} animationData={animationData as object} className={className} style={style} {...props} />;
});

LottieAnimation.displayName = 'LottieAnimation';

export default LottieAnimation;
