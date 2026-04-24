import { motion } from "framer-motion";

const About = () => {
  const words = "Securing the Digital Frontier.".split(" ");
  return (
    <section id="about" className="relative border-t border-border py-24 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 flex items-baseline gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-neon">[02]</span>
          <span>// About</span>
        </div>
        <h2 className="font-display text-[10vw] leading-[0.9] md:text-7xl lg:text-8xl">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`mr-4 inline-block ${i === words.length - 1 ? "text-neon" : ""}`}
            >
              {w}
            </motion.span>
          ))}
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 md:col-start-2"
          >
            <p className="text-xl leading-relaxed text-foreground md:text-2xl">
              I'm a cybersecurity specialist focused on{" "}
              <span className="text-neon">Security Operations Center</span> workflows —
              triaging alerts in <span className="text-neon">Splunk</span>, hunting
              suspicious patterns across log streams, and orchestrating{" "}
              <span className="text-neon">incident response</span> when seconds matter.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              From <span className="text-foreground">Nessus VAPT</span> assessments to
              packet inspection in Wireshark, I translate raw telemetry into actionable
              defense — building the calm at the center of the storm.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-3"
          >
            <div className="space-y-6 font-mono text-xs uppercase tracking-widest">
              {[
                { k: "Focus", v: "SOC / Blue Team" },
                { k: "Stack", v: "Splunk · Nessus · Wireshark" },
                { k: "Region", v: "India / Remote" },
                { k: "Status", v: "Open to roles" },
              ].map((s) => (
                <div key={s.k} className="border-l border-neon pl-4">
                  <div className="text-muted-foreground">{s.k}</div>
                  <div className="mt-1 text-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
