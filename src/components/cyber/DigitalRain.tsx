import { useEffect, useRef } from "react";

const DigitalRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const chars = "アァイィウエオカキクケコサシスセソタチツテトナニヌネノ01010110ABCDEF#$%&*+=<>{}[]/\\".split("");
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = Array(columns).fill(1);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    let last = 0;
    const draw = (t: number) => {
      if (t - last > 55) {
        last = t;
        ctx.fillStyle = "rgba(5, 5, 5, 0.08)";
        ctx.fillRect(0, 0, width, height);
        ctx.font = `${fontSize}px JetBrains Mono`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // head bright
          ctx.fillStyle = Math.random() > 0.975 ? "rgba(0, 255, 200, 0.95)" : "rgba(20, 255, 130, 0.55)";
          ctx.fillText(text, x, y);

          if (y > height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full opacity-40"
      aria-hidden
    />
  );
};

export default DigitalRain;
