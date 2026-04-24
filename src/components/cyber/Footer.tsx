const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-noir py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="font-mono text-xs uppercase tracking-widest text-neon">// END_OF_FILE</div>
            <h3 className="mt-4 font-display text-5xl leading-[0.95] md:text-7xl">
              LET'S BUILD A <br />
              <span className="text-neon">QUIETER</span> NETWORK.
            </h3>
            <a
              href="mailto:rishi.onduty@gmail.com"
              className="mt-8 inline-flex items-center gap-3 border border-neon bg-neon px-6 py-3 font-mono text-xs uppercase tracking-widest text-noir transition-all hover:bg-transparent hover:text-neon"
              style={{ boxShadow: "var(--shadow-neon)" }}
            >
              rishi.onduty@gmail.com →
            </a>
          </div>
          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-6 font-mono text-xs uppercase tracking-widest">
              <div>
                <div className="mb-3 text-muted-foreground">Navigate</div>
                {["About", "Experience", "Projects", "Skills"].map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase()}`}
                    className="block py-1 transition-colors hover:text-neon"
                  >
                    {l} ↗
                  </a>
                ))}
              </div>
              <div>
                <div className="mb-3 text-muted-foreground">Channels</div>
                <a className="block py-1 hover:text-neon" href="mailto:rishi.onduty@gmail.com">Email ↗</a>
                <a className="block py-1 hover:text-neon" href="https://www.linkedin.com/in/marojurishi/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                <a className="block py-1 hover:text-neon" href="#" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground md:flex-row md:items-center">
          <span>© 2026 Rishikumar Maroju · All systems secured</span>
          <span className="flex items-center gap-2">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-neon" />
            UPTIME 99.99% · BUILT WITH LOVABLE
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
