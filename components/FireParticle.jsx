"use client";
import { useEffect, useRef } from "react";

export default function FireParticles() {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const particleCount = 100;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate particles
    particles.current = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -Math.random() * 0.3 - 0.1,
    }));

    let scrollOffset = 0;
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const delta = lastScrollY - window.scrollY; // Scroll up = positive = push down
      scrollOffset += delta * 5.5; // Stronger scroll influence
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", onScroll);

    const drawParticle = (p) => {
      const gradient = ctx.createRadialGradient(
        p.x,
        p.y,
        0,
        p.x,
        p.y,
        p.radius * 2
      );
      gradient.addColorStop(0, "rgba(255, 152, 162, 0.9)");
      gradient.addColorStop(0.5, "rgba(255, 152, 162, 0.5)");
      gradient.addColorStop(1, "rgba(255, 152, 162, 0)");

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(p.x, p.y, p.radius * 0.4, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY + scrollOffset * 0.005;

        // Respawn logic
        if (p.y < 0 || p.y > canvas.height) {
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.speedX = (Math.random() - 0.5) * 0.3;
          p.speedY = -Math.random() * 0.3 - 0.1;
        }

        if (p.x < -10) p.x = canvas.width + Math.random() * 10;
        if (p.x > canvas.width + 10) p.x = -10;

        drawParticle(p);
      });

      scrollOffset *= 0.9;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
}
