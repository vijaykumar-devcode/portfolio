import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

export function ScrambleText({ text, className = "" }: { text: string, className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(true);

  useEffect(() => {
    let iteration = 0;
    let interval: ReturnType<typeof setInterval>;

    const startAnimation = () => {
      interval = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsScrambling(false);
        }

        iteration += 1 / 4; // Reveal 1 character every 4 ticks
      }, 50); // Increased interval from 30ms to 50ms for slower scramble
    };

    startAnimation();
    
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className} onMouseEnter={() => {
        // Optional: scramble again on hover
        if(!isScrambling) {
            // setIsScrambling(true);
            // This can be annoying, let's keep it just on load for a premium feel
        }
    }}>
      {displayText}
    </span>
  );
}

export function TextReveal({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) {
  const words = text.split(" ");
  
  return (
    <div className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.0, // Increased duration from 0.6 to 1.0 for a slower, smoother slide
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.15, // Increased stagger from 0.05 to 0.15 for more deliberate pacing
            }}
            className="inline-block"
          >
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay + i * 0.2, // Staggered continuous wave
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          </motion.span>
        </span>
      ))}
    </div>
  );
}
