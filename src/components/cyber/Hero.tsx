import { motion } from "framer-motion";
import portrait from "@/assets/rishikumar.jpg";
import WireframeGlobe from "./WireframeGlobe";

const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-30" />
      <div className="absolute inset-0 scanline" />

      {/* Centered globe — connects nodes across the world */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div className="aspect-square h-[110vh] max-h-[1100px] w-auto opacity-80">
          <WireframeGlobe />
        </div>
        <div className="absolute inset-0 bg-radial-fade" />
      </div>

      {/* Top status bar */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:px-12 md:text-xs">
        <div className="flex items-center gap-2">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-neon" />
          <span>SOC // ONLINE</span>
        </div>
        <div className="hidden md:block">N 23.0225° / E 72.5714° — AHMEDABAD</div>
        <div className="text-neon">v.2026.04</div>
      </div>

      <div className="container relative z-10 mx-auto grid min-h-[calc(100vh-60px)] grid-cols-1 items-center gap-8 px-6 py-12 lg:grid-cols-12 lg:gap-6 lg:px-12">
        {/* LEFT: typography */}
        <div className="lg:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 flex items-center gap-3 font-mono text-xs text-neon"
          >
            <span className="h-px w-10 bg-neon" />
            CYBERSECURITY · SOC · INCIDENT RESPONSE
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-[15vw] leading-[0.85] tracking-tight md:text-[12vw] lg:text-[10vw]"
          >
            <span
              data-text="RISHIKUMAR"
              className="glitch block cursor-pointer hover:glow-neon"
            >
              RISHIKUMAR
            </span>
            <span
              data-text="MAROJU."
              className="glitch block cursor-pointer text-neon hover:text-cyan"
            >
              MAROJU<span className="text-foreground">.</span>
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 grid gap-6 md:grid-cols-2 md:gap-12"
          >
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              Securing the digital frontier through{" "}
              <span className="text-foreground">SOC operations</span>,{" "}
              <span className="text-foreground">Splunk SIEM</span>, threat hunting and{" "}
              <span className="text-foreground">incident response</span>.
            </p>
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-neon">[01]</span> Currently
              </div>
              <div className="text-foreground">
                Building defensive playbooks &amp; hunting anomalies in noisy logs.
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-3 overflow-hidden border border-neon bg-neon px-6 py-3 font-mono text-xs uppercase tracking-widest text-noir transition-all hover:bg-transparent hover:text-neon"
              style={{ boxShadow: "var(--shadow-neon)" }}
            >
              <span>$ ./view_projects</span>
              <span className="blink">_</span>
            </a>
            <a
              href="#terminal"
              className="inline-flex items-center gap-3 border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:border-neon hover:text-neon"
            >
              Open Terminal →
            </a>
          </motion.div>
        </div>

        {/* RIGHT: portrait + globe */}
        <div className="relative lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative mx-auto aspect-square w-full max-w-sm"
          >
            <div className="absolute -inset-2 rounded-sm border border-neon/40" />
            <div className="absolute -inset-4 rounded-sm border border-neon/10" />
            <div className="relative h-full w-full overflow-hidden">
              <img
                src={portrait}
                alt="Rishikumar Maroju, Cybersecurity Specialist"
                className="h-full w-full object-cover grayscale contrast-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-30 scanline" />
              {/* corner ticks */}
              {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((c, i) => (
                <span key={i} className={`absolute ${c} h-4 w-4 border-neon`} style={{
                  borderTopWidth: c.includes("top") ? 2 : 0,
                  borderBottomWidth: c.includes("bottom") ? 2 : 0,
                  borderLeftWidth: c.includes("left") ? 2 : 0,
                  borderRightWidth: c.includes("right") ? 2 : 0,
                }} />
              ))}
              {/* ID label */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-neon">
                <span>ID://RM-0X07</span>
                <span className="blink">●REC</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-y border-border bg-noir/80 py-3">
        <div className="marquee flex whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em]">
          {Array(2).fill(0).map((_, k) => (
            <div key={k} className="flex shrink-0 items-center">
              {["Threat Hunting", "Splunk SIEM", "Nessus VAPT", "Wireshark", "Metasploit", "IAM", "Incident Response", "Log Analysis", "SOC Analyst"].map((t) => (
                <span key={t} className="mx-8 flex items-center gap-8">
                  <span className="text-neon">◇</span> {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
