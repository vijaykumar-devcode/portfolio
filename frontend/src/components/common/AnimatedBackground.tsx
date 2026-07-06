import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export function AnimatedBackground() {
  // Generate random stars only once on mount
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      
      // Calculate distances from the center in viewport units
      // Stars start somewhat close to the center and travel far outwards
      const startDistance = Math.random() * 20; 
      const endDistance = startDistance + 50 + Math.random() * 50; 

      return {
        id: i,
        startX: Math.cos(angle) * startDistance,
        startY: Math.sin(angle) * startDistance,
        endX: Math.cos(angle) * endDistance,
        endY: Math.sin(angle) * endDistance,
        size: Math.random() * 2 + 1, // 1px to 3px base size
        duration: Math.random() * 5 + 3, // 3s to 8s travel time
        delay: Math.random() * 5, // random start offset
      };
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background transition-colors duration-300">
      
      {/* ✨ Twinkling Stars Layer */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-text left-1/2 top-1/2" // Anchor all stars to the center
          style={{
            width: star.size,
            height: star.size,
            boxShadow: '0 0 4px currentColor',
          }}
          initial={{
            x: `${star.startX}vw`,
            y: `${star.startY}vh`,
            opacity: 0,
            scale: 0.1,
          }}
          animate={{
            x: [`${star.startX}vw`, `${star.endX}vw`],
            y: [`${star.startY}vh`, `${star.endY}vh`],
            opacity: [0, 0.6, 0], // Fades in, then fades out as it passes the screen
            scale: [0.1, 2.5], // Scales up significantly to simulate coming closer
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeIn", // Starts slow and accelerates towards the viewer
          }}
        />
      ))}

      {/* 
        Expert UI/UX touch: Mesh gradient / Aurora effect 
        Using Framer Motion to create slow, continuous drifting of large blurred blobs.
      */}
      <motion.div
        animate={{
          x: [0, 100, 0, -50, 0],
          y: [0, 50, -50, 50, 0],
          scale: [1, 1.1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[10%] left-[20%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-primary/10 blur-[100px]"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 50, -50, 0],
          y: [0, -50, 100, -50, 0],
          scale: [1, 0.9, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[40%] right-[10%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full bg-purple-500/10 blur-[100px]"
      />

      <motion.div
        animate={{
          x: [0, 50, -100, 50, 0],
          y: [0, 100, -50, 100, 0],
          scale: [1, 1.2, 0.8, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[10%] left-[30%] w-[45vw] h-[45vw] max-w-[700px] max-h-[700px] rounded-full bg-blue-500/10 blur-[120px]"
      />
    </div>
  );
}
