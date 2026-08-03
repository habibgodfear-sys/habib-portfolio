import React, { useState, useRef } from 'react';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
  tiltMaxAngle?: number;
  scale?: number;
  id?: string;
}

export default function Tilt3DCard({
  children,
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave,
  tiltMaxAngle = 12,
  scale = 1.02,
  id
}: Tilt3DCardProps) {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center of card (-1 to 1)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    // Rotate X is inverted relative to mouse Y movement
    const rotateX = -yPct * tiltMaxAngle * 2;
    const rotateY = xPct * tiltMaxAngle * 2;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s ease-out',
    });

    setGlarePos({
      x: (mouseX / width) * 100,
      y: (mouseY / height) * 100,
      opacity: 0.25,
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out',
    });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
    if (onMouseLeave) onMouseLeave(e);
  };

  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onMouseEnter) onMouseEnter(e);
  };

  return (
    <div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseEnter={handleCardMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleCardMouseLeave}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
      }}
      className={`relative transform-gpu transition-all duration-200 ${className}`}
    >
      {/* Specular 3D Glare Light Effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.35) 0%, rgba(59, 130, 246, 0.1) 45%, transparent 80%)`,
          opacity: glarePos.opacity,
        }}
      />
      {children}
    </div>
  );
}
