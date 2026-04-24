import { motion } from "framer-motion";

const items = [
  {
    school: "Parul University",
    degree: "B.Tech, Computer Science &amp; Engineering",
    period: "Vadodara, India",
    detail: "Specialization in cybersecurity, networking and systems.",
  },
  {
    school: "Sri Gayathri Junior College",
    degree: "Intermediate · MPC",
    period: "Andhra Pradesh, India",
    detail: "Mathematics, Physics &amp; Chemistry foundation.",
  },
];

const Education = () => {
  return (
    <section id="education" className="relative border-t border-border py-24 md:py-40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 flex items-baseline gap-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="text-neon">[06]</span>
          <span>// Training.archive</span>
        </div>
        <h2 className="font-display text-6xl md:text-8xl">EDUCATION</h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {items.map((it, i) => (
            <motion.div
              key={it.school}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative border border-border p-8 transition-all hover:border-neon"
            >
              <div className="mb-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>0{i + 1} / 0{items.length}</span>
                <span className="text-neon">{it.period}</span>
              </div>
              <h3 className="font-display text-3xl md:text-4xl">{it.school}</h3>
              <p
                className="mt-2 font-mono text-sm uppercase tracking-widest text-neon"
                dangerouslySetInnerHTML={{ __html: it.degree }}
              />
              <p
                className="mt-4 text-sm text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: it.detail }}
              />
              <div className="mt-6 h-px w-12 bg-neon transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
