"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import type { Group } from "three";

function Starfield() {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Subtle rotation for cinematic feel
      groupRef.current.rotation.y -= delta * 0.02;
      groupRef.current.rotation.x -= delta * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars 
        radius={50} 
        depth={50} 
        count={3000} 
        factor={3} 
        saturation={0} 
        fade 
        speed={1} 
      />
    </group>
  );
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  twinkleSpeed: number;
  angle: number;
  distance: number;
  angularSpeed: number;
}

function Canvas2DStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const initStars = (w: number, h: number) => {
      // Scale count with screen size (fewer stars on mobile, more on desktop)
      const count = Math.min(250, Math.max(80, Math.floor((w * h) / 5000)));
      const cx = w / 2;
      const cy = h / 2;
      const tempStars: Star[] = [];
      const maxRadius = Math.sqrt(cx * cx + cy * cy);

      for (let i = 0; i < count; i++) {
        const distance = Math.random() * maxRadius;
        const angle = Math.random() * Math.PI * 2;
        const size = Math.random() * 1.5 + 0.3;
        const baseAlpha = Math.random() * 0.7 + 0.15;
        tempStars.push({
          x: cx + distance * Math.cos(angle),
          y: cy + distance * Math.sin(angle),
          size,
          alpha: baseAlpha,
          baseAlpha,
          twinkleSpeed: Math.random() * 1.5 + 0.5,
          angle,
          distance,
          // Extremely slow rotation around the center
          angularSpeed: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1) * 0.15,
        });
      }
      stars = tempStars;
    };

    initStars(width, height);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars(width, height);
    };

    window.addEventListener("resize", handleResize);

    let lastTime = performance.now();

    const draw = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        // Update angle and position (rotation around center)
        star.angle += star.angularSpeed * dt;
        star.x = cx + star.distance * Math.cos(star.angle);
        star.y = cy + star.distance * Math.sin(star.angle);

        // Twinkle effect: slowly fade alpha up and down
        star.alpha = Math.max(
          0.05,
          Math.min(0.9, star.baseAlpha + Math.sin(now * 0.001 * star.twinkleSpeed) * 0.2)
        );

        // Render star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame((now) => {
      lastTime = now;
      draw(now);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function ParticleBackground() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const rAF = requestAnimationFrame(() => {
      setMounted(true);
      setHasWebGL(checkWebGLSupport());
    });
    return () => cancelAnimationFrame(rAF);
  }, []);

  if (!mounted) {
    return <div className="pointer-events-none absolute inset-0 z-0 opacity-60" />;
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
      {hasWebGL ? (
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Starfield />
        </Canvas>
      ) : (
        <Canvas2DStarfield />
      )}
    </div>
  );
}

