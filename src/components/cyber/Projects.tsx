import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    no: "01",
    title: "LINESCAL8",
    subtitle: "Threat detection &amp; alerting pipeline",
    tags: ["SIEM", "Python", "Detection Engineering"],
    desc: "A modular detection pipeline that ingests heterogeneous log streams, normalizes events and fires correlated alerts on suspicious behavioral patterns.",
    accent: "from-neon/30 to-transparent",
  },
  {
    no: "02",
    title: "PLANT SEED IR",
    subtitle: "Image recognition system",
    tags: ["CNN", "TensorFlow", "Computer Vision"],
    desc: "A convolutional neural network that classifies plant seeds from photographs, deployed with a lightweight inference layer for field use.",
    accent: "from-cyan/30 to-transparent",
  },
  {
    no: "03",
    title: "SOC PLAYBOOKS",
    subtitle: "Incident response runbooks",
    tags: ["IR", "Splunk", "Documentation"],
    desc: "A library of step-by-step containment, eradication and recovery procedures mapped to MITRE ATT&CK techniques.",
    accent: "from-neon/20 to-transparent",
  },
];

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  // disable on mobile
  useEffect(() => {}, []);

  return (
    <section id="projects" className="relative border-t border-border">
      <div className="container mx-auto px-6 pt-24 md:px-12 md:pt-40">
        <div className="mb-12 flex items-baseline gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-neon">[04]</span>
          <span>// Selected.work</span>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-6xl md:text-8xl">
            CASE <span className="text-neon">FILES</span>
          </h2>
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            ↓ scroll · drag horizontally
          </div>
        </div>
      </div>

      {/* Desktop horizontal scroll */}
      <div ref={containerRef} className="relative mt-16 hidden h-[180vh] md:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div ref={trackRef} style={{ x }} className="flex gap-8 pl-12">
            {projects.map((p) => (
              <article
                key={p.no}
                className="relative h-[70vh] w-[80vw] max-w-[900px] shrink-0 overflow-hidden border border-border bg-card"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />
                <div className="grid-bg absolute inset-0 opacity-40" />
                <div className="relative flex h-full flex-col justify-between p-8 md:p-12">
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-neon">
                      Project / {p.no}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {p.tags.join(" · ")}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-[10vw] leading-[0.9] md:text-[6vw]">
                      {p.title}
                    </h3>
                    <p className="mt-3 font-mono text-sm uppercase tracking-widest text-muted-foreground">
                      {p.subtitle.replace("&amp;", "&")}
                    </p>
                    <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground md:text-lg">
                      {p.desc}
                    </p>
                  </div>
                </div>
                {/* Corner brackets */}
                {["top-0 left-0 border-t-2 border-l-2", "top-0 right-0 border-t-2 border-r-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c, i) => (
                  <span key={i} className={`absolute ${c} h-6 w-6 border-neon`} />
                ))}
              </article>
            ))}
            <div className="w-[20vw] shrink-0" />
          </motion.div>
        </div>
      </div>

      {/* Mobile stacked */}
      <div className="container mx-auto mt-12 grid gap-6 px-6 pb-24 md:hidden">
        {projects.map((p) => (
          <article key={p.no} className="relative overflow-hidden border border-border bg-card p-6">
            <div className={`absolute inset-0 bg-gradient-to-br ${p.accent}`} />
            <div className="relative">
              <span className="font-mono text-xs text-neon">/{p.no}</span>
              <h3 className="mt-2 font-display text-4xl">{p.title}</h3>
              <p className="mt-1 font-mono text-xs uppercase text-muted-foreground">
                {p.subtitle.replace("&amp;", "&")}
              </p>
              <p className="mt-4 text-sm text-foreground">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2 font-mono text-[10px] uppercase">
                {p.tags.map((t) => (
                  <span key={t} className="border border-neon/40 px-2 py-1 text-neon">{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;
