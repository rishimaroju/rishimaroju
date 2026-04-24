import { motion } from "framer-motion";
import { Activity, Shield, Eye, Network, Bug, Lock, AlertTriangle, Database, Terminal, Crosshair } from "lucide-react";

const tools = [
  { name: "Splunk", level: 90, icon: Activity },
  { name: "Wireshark", level: 85, icon: Network },
  { name: "Metasploit", level: 75, icon: Crosshair },
  { name: "Nessus", level: 80, icon: Bug },
  { name: "Burp Suite", level: 70, icon: Eye },
  { name: "Nmap", level: 88, icon: Terminal },
];

const competencies = [
  { name: "Incident Response", icon: AlertTriangle },
  { name: "IAM", icon: Lock },
  { name: "VAPT", icon: Bug },
  { name: "Threat Hunting", icon: Crosshair },
  { name: "SIEM Operations", icon: Activity },
  { name: "Log Analysis", icon: Database },
  { name: "Network Security", icon: Network },
  { name: "Blue Team", icon: Shield },
];

const Skills = () => {
  return (
    <section id="skills" className="relative border-t border-border py-24 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 flex items-baseline gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-neon">[05]</span>
          <span>// SOC.dashboard</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-6xl md:text-8xl">ARSENAL</h2>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neon">
            <span className="pulse-dot h-2 w-2 rounded-full bg-neon" />
            LIVE STATUS · ALL SYSTEMS NOMINAL
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          {/* Tools panel */}
          <div className="glass relative p-6 md:p-8 lg:col-span-7">
            <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>// security_tools.exe</span>
              <span className="text-neon">06 modules loaded</span>
            </div>
            <div className="grid gap-5">
              {tools.map((t, i) => {
                const Icon = t.icon;
                return (
                  <motion.div
                    key={t.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-neon" />
                        <span className="font-mono text-sm uppercase tracking-widest">{t.name}</span>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">{t.level}%</span>
                    </div>
                    <div className="relative h-1 w-full overflow-hidden bg-border">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${t.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.05, ease: "easeOut" }}
                        className="h-full bg-neon"
                        style={{ boxShadow: "0 0 12px hsl(var(--neon))" }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Competencies panel */}
          <div className="glass relative p-6 md:p-8 lg:col-span-5">
            <div className="mb-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>// core_competencies</span>
              <span className="text-cyan">08 active</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {competencies.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    className="group relative flex items-center gap-3 border border-border p-3 transition-all hover:border-neon hover:bg-neon/5"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-neon transition-transform group-hover:scale-110" />
                    <span className="font-mono text-[11px] uppercase tracking-widest">{c.name}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Mini metrics */}
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-6">
              {[
                { v: "12+", l: "Tools" },
                { v: "100+", l: "Alerts triaged" },
                { v: "24/7", l: "Mindset" },
              ].map((m) => (
                <div key={m.l} className="text-center">
                  <div className="font-display text-3xl text-neon glow-neon">{m.v}</div>
                  <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
