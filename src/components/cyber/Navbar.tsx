import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
];

const Navbar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-4 left-1/2 z-50 -translate-x-1/2"
        >
          <div className="glass flex items-center gap-1 rounded-full px-2 py-2 font-mono text-xs">
            <div className="flex items-center gap-2 px-3">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-neon" />
              <span className="hidden sm:inline text-muted-foreground">RM_</span>
            </div>
            {links.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="rounded-full px-3 py-1.5 transition-colors hover:bg-neon hover:text-noir"
              >
                {l.label}
              </a>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
