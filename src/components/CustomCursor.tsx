import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on non-touch desktop screens
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let animId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setMousePos({ x: targetX, y: targetY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.onclick !== null ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('clickable');

        setIsPointer(isClickable);
      }
    };

    // Smooth fluid trailing lerp loop
    const loop = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      setTrailPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    loop();

    const handleMouseDown = () => setIsHovered(true);
    const handleMouseUp = () => setIsHovered(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dynamic Lusion Fluid Ring Light */}
      <div
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 blur-lg opacity-40 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 transition-opacity duration-300"
        style={{
          transform: `translate3d(${trailPos.x - 32}px, ${trailPos.y - 32}px, 0)`,
        }}
      />

      {/* Main Cursor Glowing Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-3.5 h-3.5 bg-cyan-300 rounded-full pointer-events-none z-[9999] shadow-[0_0_15px_rgba(56,189,248,0.9)]"
        animate={{
          x: mousePos.x - 7,
          y: mousePos.y - 7,
          scale: isHovered ? 0.6 : isPointer ? 1.6 : 1,
        }}
        transition={{ type: 'spring', stiffness: 900, damping: 35, mass: 0.08 }}
      />

      {/* Outer Lusion Kinetic Motion Precision Circle */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-cyan-400/60 rounded-full pointer-events-none z-[9998] shadow-[0_0_25px_rgba(56,189,248,0.4)] bg-cyan-500/5 backdrop-blur-[1px]"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
          scale: isHovered ? 1.9 : isPointer ? 2.4 : 1,
          borderColor: isPointer ? '#38bdf8' : 'rgba(56, 189, 248, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22, mass: 0.15 }}
      />
    </>
  );
}
