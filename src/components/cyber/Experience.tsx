import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const timeline = [
  {
    id: "techdefence",
    role: "SOC Analyst Intern",
    org: "TechDefence Labs",
    period: "2024 — 2024",
    summary: "Tier-1 monitoring, triage and vulnerability assessment.",
    bullets: [
      "Monitored real-time security events in Splunk SIEM, triaging alerts and escalating verified incidents.",
      "Performed Nessus VAPT scans across internal infrastructure; documented findings and remediation paths.",
      "Conducted log analysis across endpoints, firewalls and network appliances to surface IOCs.",
      "Authored incident timelines and playbooks for recurring alert categories.",
      "Collaborated with the response team to validate, contain and document live threats.",
    ],
  },
];

const Experience = () => {
  const [active, setActive] = useState<string | null>("techdefence");
  return (
    <section id="experience" className="relative border-t border-border py-24 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 flex items-baseline gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-neon">[03]</span>
          <span>// Experience.log</span>
        </div>
        <h2 className="font-display text-6xl md:text-8xl">FIELD OPS</h2>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="relative pl-8">
              <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
              {timeline.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(active === t.id ? null : t.id)}
                  className="group relative mb-8 block w-full text-left"
                >
                  <span
                    className={`absolute -left-[26px] top-2 h-3 w-3 rounded-full border-2 transition-all ${
                      active === t.id
                        ? "border-neon bg-neon"
                        : "border-border bg-noir group-hover:border-neon"
                    }`}
                    style={active === t.id ? { boxShadow: "0 0 16px hsl(var(--neon))" } : {}}
                  />
                  <div className="font-mono text-[10px] uppercase tracking-widest text-neon">
                    {t.period}
                  </div>
                  <div className="mt-1 font-display text-3xl md:text-4xl">{t.role}</div>
                  <div className="font-mono text-sm text-muted-foreground">{t.org}</div>
                  <div className="mt-2 text-sm text-muted-foreground">{t.summary}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              {timeline
                .filter((t) => t.id === active)
                .map((t) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="glass relative p-6 md:p-10"
                  >
                    <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      <span>// session/{t.id}</span>
                      <span className="text-neon">● ACTIVE</span>
                    </div>
                    <ul className="space-y-4">
                      {t.bullets.map((b, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="flex gap-4 text-sm leading-relaxed text-foreground md:text-base"
                        >
                          <span className="mt-1 font-mono text-xs text-neon">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{b}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
