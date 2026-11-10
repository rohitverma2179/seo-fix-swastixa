"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface GlimmerWrapProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  glintCount?: number;
  speed?: number;
  glintColor?: string;
  flareColor?: string;
  maxSize?: number;
  flareSize?: number;
  flashFrequency?: number;
  enableParallax?: boolean;
}

interface Glint {
  x: number;
  y: number;
  z: number;
  baseSize: number;
  baseAlpha: number;
  colorRgb: string;
  isFlashing: boolean;
  flashProgress: number;
  flashSpeed: number;
  nextFlashTime: number;
  flareScale: number;
  angle: number;
}

export function GlimmerWrap({
  children,
  className,
  glintCount = 200,
  speed = 0.55,
  glintColor = "#ffffff",
  flareColor = "#ffffff",
  maxSize = 2.8,
  flareSize = 46,
  flashFrequency = 0.025,
  enableParallax = true,
  ...props
}: GlimmerWrapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let maxZ = 1000;
    const fov = 320;

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;

      maxZ = Math.max(width, height, 900);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    // Visibility observer to pause animation when off-screen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isVisibleRef.current = entries[0].isIntersecting;
        }
      },
      { threshold: 0.02 }
    );
    intersectionObserver.observe(container);

    const onVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Color palettes for stars/glints: crisp diamond white, subtle cool violet/cyan, subtle warm amber
    const colors = [
      "255, 255, 255", // pure white
      "255, 255, 255",
      "255, 255, 255",
      "225, 235, 255", // cool icy diamond
      "235, 225, 255", // subtle lavender
      "255, 242, 215", // warm golden amber
    ];

    // Initialize Glints
    const glints: Glint[] = [];
    const spreadW = Math.max(width * 1.6, 1600);
    const spreadH = Math.max(height * 1.6, 1200);

    for (let i = 0; i < glintCount; i++) {
      glints.push({
        x: (Math.random() - 0.5) * spreadW,
        y: (Math.random() - 0.5) * spreadH,
        z: Math.random() * maxZ + 1,
        baseSize: Math.random() * (maxSize - 0.8) + 0.8,
        baseAlpha: Math.random() * 0.45 + 0.55, // 0.55 - 1.0 for crisp luminescence
        colorRgb: colors[Math.floor(Math.random() * colors.length)],
        isFlashing: false,
        flashProgress: 0,
        flashSpeed: Math.random() * 0.018 + 0.012,
        nextFlashTime: Math.random() * 6000 + 800,
        flareScale: Math.random() * 0.6 + 0.8,
        angle: (Math.random() - 0.5) * 0.25,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableParallax || !container) return;
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / (rect.width || 1) - 0.5;
      const relY = (e.clientY - rect.top) / (rect.height || 1) - 0.5;
      mouseRef.current.targetX = relX * 50;
      mouseRef.current.targetY = relY * 50;
    };

    if (enableParallax) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    // Helper to draw a tapered 4-point lens flare ray
    const drawRay = (
      context: CanvasRenderingContext2D,
      length: number,
      thickness: number,
      opacity: number,
      rgb: string
    ) => {
      context.save();
      context.globalAlpha = opacity;

      const grad = context.createLinearGradient(-length, 0, length, 0);
      grad.addColorStop(0, `rgba(${rgb}, 0)`);
      grad.addColorStop(0.25, `rgba(${rgb}, 0.7)`);
      grad.addColorStop(0.5, `rgba(255, 255, 255, 1)`);
      grad.addColorStop(0.75, `rgba(${rgb}, 0.7)`);
      grad.addColorStop(1, `rgba(${rgb}, 0)`);

      context.fillStyle = grad;
      context.beginPath();
      context.moveTo(-length, 0);
      context.quadraticCurveTo(0, -thickness, length, 0);
      context.quadraticCurveTo(0, thickness, -length, 0);
      context.closePath();
      context.fill();
      context.restore();
    };

    let lastTime = performance.now();

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);

      if (!isVisibleRef.current || width === 0 || height === 0) return;

      const delta = Math.min((time - lastTime) / 16.667, 2.5);
      lastTime = time;

      // Parallax damping
      mouseRef.current.x +=
        (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y +=
        (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2 + mouseRef.current.x;
      const cy = height / 2 + mouseRef.current.y;

      for (let i = 0; i < glints.length; i++) {
        const glint = glints[i];

        // Move forward along z axis towards viewer
        glint.z -= speed * 1.5 * delta;

        // Subtle gentle cosmic drift
        glint.x += Math.sin(time * 0.0004 + i) * 0.18 * delta;
        glint.y += Math.cos(time * 0.0005 + i * 1.3) * 0.14 * delta;

        // Recycle if passed near plane
        if (glint.z <= 12) {
          glint.z = maxZ;
          glint.x = (Math.random() - 0.5) * (width * 1.6);
          glint.y = (Math.random() - 0.5) * (height * 1.6);
          glint.isFlashing = false;
          glint.flashProgress = 0;
          glint.nextFlashTime = time + Math.random() * 6000 + 1200;
        }

        // Perspective projection
        const scale = fov / (fov + glint.z);
        const sx = cx + glint.x * scale;
        const sy = cy + glint.y * scale;

        // Skip if outside viewport with margin
        if (sx < -60 || sx > width + 60 || sy < -60 || sy > height + 60) {
          continue;
        }

        // Depth fog / alpha falloff
        const depthAlpha = Math.min(1, Math.max(0.15, 1 - glint.z / maxZ));
        let alpha = glint.baseAlpha * depthAlpha;
        const currentSize = Math.max(0.7, glint.baseSize * scale * 2.2);

        // Flash / Catch the light lifecycle
        if (!glint.isFlashing && time >= glint.nextFlashTime) {
          if (Math.random() < flashFrequency * 8) {
            glint.isFlashing = true;
            glint.flashProgress = 0;
          } else {
            glint.nextFlashTime = time + Math.random() * 4500 + 1500;
          }
        }

        let flashIntensity = 0;
        if (glint.isFlashing) {
          glint.flashProgress += glint.flashSpeed * delta;
          if (glint.flashProgress >= 1) {
            glint.isFlashing = false;
            glint.flashProgress = 0;
            glint.nextFlashTime = time + Math.random() * 7000 + 2500;
          } else {
            // Smooth sine flare curve
            flashIntensity = Math.sin(glint.flashProgress * Math.PI);
            alpha = Math.min(1, alpha + flashIntensity * 0.9);
          }
        }

        // 1. Draw glowing background glint dot
        ctx.beginPath();
        ctx.arc(sx, sy, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${glint.colorRgb}, ${alpha})`;
        ctx.shadowColor = `rgba(${glint.colorRgb}, ${alpha * 0.9})`;
        ctx.shadowBlur = glint.isFlashing ? 14 : 5;
        ctx.fill();
        ctx.shadowBlur = 0;

        // 2. Draw 4-point cross star flare when flashing
        if (flashIntensity > 0.04) {
          ctx.save();
          ctx.translate(sx, sy);
          ctx.rotate(glint.angle);

          const curFlareSize =
            flareSize * glint.flareScale * (0.65 + scale * 0.75);
          const flareAlpha = Math.min(1, flashIntensity * 0.98);

          // Horizontal primary ray
          drawRay(
            ctx,
            curFlareSize,
            Math.max(1.4, curFlareSize * 0.045),
            flareAlpha,
            glint.colorRgb
          );

          // Vertical primary ray
          drawRay(
            ctx,
            curFlareSize * 0.88,
            Math.max(1.4, curFlareSize * 0.045),
            flareAlpha,
            glint.colorRgb
          );

          // Diagonal subtle micro-spikes (45 degrees)
          ctx.rotate(Math.PI / 4);
          drawRay(
            ctx,
            curFlareSize * 0.36,
            Math.max(0.9, curFlareSize * 0.03),
            flareAlpha * 0.55,
            glint.colorRgb
          );
          ctx.rotate(Math.PI / 2);
          drawRay(
            ctx,
            curFlareSize * 0.36,
            Math.max(0.9, curFlareSize * 0.03),
            flareAlpha * 0.55,
            glint.colorRgb
          );

          // Central brilliant core burst
          const coreRadius = Math.max(5, curFlareSize * 0.18);
          const coreGrad = ctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            coreRadius
          );
          coreGrad.addColorStop(0, `rgba(255, 255, 255, ${flareAlpha})`);
          coreGrad.addColorStop(
            0.35,
            `rgba(${glint.colorRgb}, ${flareAlpha * 0.8})`
          );
          coreGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

          ctx.beginPath();
          ctx.arc(0, 0, coreRadius, 0, Math.PI * 2);
          ctx.fillStyle = coreGrad;
          ctx.fill();

          ctx.restore();
        }
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (enableParallax) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [
    glintCount,
    speed,
    glintColor,
    flareColor,
    maxSize,
    flareSize,
    flashFrequency,
    enableParallax,
  ]);

  const isPositioned = className?.includes("absolute") || className?.includes("fixed");

  return (
    <div
      ref={containerRef}
      className={cn(
        isPositioned ? "" : "relative",
        "overflow-hidden",
        className
      )}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

export default GlimmerWrap;
