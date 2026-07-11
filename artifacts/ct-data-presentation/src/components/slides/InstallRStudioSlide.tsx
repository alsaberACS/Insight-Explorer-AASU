import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ExternalLink, Globe, MonitorDown, ListTree, CheckCircle2 } from "lucide-react";
import { HeartData } from "@/lib/data";
import guideShot from "@assets/step1_1783773728971.png";
import positShot from "@assets/step_2_1783773728971.png";
import downloadsShot from "@assets/step_3_1783773728971.png";

type Step = {
  id: string;
  n: number;
  icon: typeof Globe;
  name: string;
  tagline: string;
  points: string[];
  link: { label: string; href: string };
  image: string | null;
  imageAlt: string;
};

const STEPS: Step[] = [
  {
    id: "r",
    n: 1,
    icon: Globe,
    name: "Install R first",
    tagline: "The language itself, from CRAN",
    points: [
      "Go to cran.r-project.org and click the link for your operating system.",
      "Choose \u201cinstall R for the first time\u201d and save the installer.",
      "Run it — the default settings are fine.",
      "No admin rights on your laptop? Ask IT for full permissions on the R directories, or you won't be able to install packages.",
    ],
    link: { label: "cran.r-project.org", href: "https://cran.r-project.org/" },
    image: null,
    imageAlt: "",
  },
  {
    id: "rstudio",
    n: 2,
    icon: MonitorDown,
    name: "Install RStudio Desktop",
    tagline: "The front end where you actually work",
    points: [
      "Wait until the R installer has finished — order matters.",
      "Go to Posit's RStudio download page; it recommends the right file for your system automatically.",
      "Click Download RStudio and run the installer with default settings.",
      "RStudio is free and open source — the desktop edition is all the course needs.",
    ],
    link: { label: "posit.co/download/rstudio-desktop", href: "https://posit.co/download/rstudio-desktop/" },
    image: positShot,
    imageAlt: "Posit's RStudio IDE download page",
  },
  {
    id: "platforms",
    n: 3,
    icon: ListTree,
    name: "Pick your platform",
    tagline: "Direct downloads for every system",
    points: [
      "The user guide lists direct download links for RStudio Desktop 2026.06.0.",
      "Windows: the .exe installer. macOS 13+: the .dmg image.",
      "Linux: .deb for Ubuntu/Debian, .rpm for RHEL/Fedora.",
      "If the recommended download fails, come back to this table and pick your exact system.",
    ],
    link: { label: "docs.posit.co/ide/user — Direct Downloads", href: "https://docs.posit.co/ide/user/#rstudio-ide-oss-downloads" },
    image: downloadsShot,
    imageAlt: "RStudio direct download links for every platform",
  },
  {
    id: "verify",
    n: 4,
    icon: CheckCircle2,
    name: "Check it works",
    tagline: "One test plot proves the whole setup",
    points: [
      "Open RStudio and paste the test code into the Console, next to the > sign.",
      "Hit Enter: it installs ggplot2 and draws a scatter plot of the mtcars data.",
      "A plot appears in the Plots pane on the right? You are fully installed.",
      "The RStudio User Guide (\u201cGet Started\u201d) is the reference for going further.",
    ],
    link: { label: "docs.posit.co/ide/user — Get Started", href: "https://docs.posit.co/ide/user/" },
    image: guideShot,
    imageAlt: "The RStudio User Guide, Get Started page",
  },
];

const TEST_CODE = `install.packages("ggplot2")
library(ggplot2)
p <- ggplot(mtcars, aes(wt, mpg))
p + geom_point(aes(size = qsec,
      colour = factor(cyl)))`;

export default function InstallRStudioSlide({ data: _data }: { data: HeartData[] }) {
  const [activeId, setActiveId] = useState<string>("r");
  const [zoomed, setZoomed] = useState(false);
  const enlargeBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const active = STEPS.find((s) => s.id === activeId)!;

  useEffect(() => {
    if (!zoomed) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomed(false);
        e.stopImmediatePropagation();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === " ") {
        e.stopImmediatePropagation();
      } else if (e.key === "Tab") {
        e.preventDefault();
        closeBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => {
      window.removeEventListener("keydown", onKey, { capture: true });
      enlargeBtnRef.current?.focus();
    };
  }, [zoomed]);

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-1.5"
        >
          Before the Hands-On
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-1.5"
        >
          Installing R & RStudio
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground"
        >
          Two installs, in this order: first the R language, then the RStudio workbench on top of it.
        </motion.p>
      </div>

      <div className="grid grid-cols-[300px_1fr] gap-5 items-start">
        <div className="flex flex-col gap-2">
          {STEPS.map((s, i) => (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => setActiveId(s.id)}
              aria-pressed={activeId === s.id}
              className={`text-left rounded-2xl border p-3.5 transition-all ${
                activeId === s.id
                  ? "border-primary/60 bg-primary/10 shadow-sm"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex-none w-9 h-9 rounded-xl flex items-center justify-center ${
                    activeId === s.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <s.icon className="w-4.5 h-4.5" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Step {s.n}
                  </p>
                  <h3 className="font-bold leading-tight text-[15px]">{s.name}</h3>
                </div>
              </div>
            </motion.button>
          ))}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-[11px] text-muted-foreground leading-snug px-1 mt-1"
          >
            Adapted from G. Popovic, "Install R and RStudio" (Colorado State University workshop
            materials).
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
              <div>
                <h3 className="text-xl font-bold leading-tight">
                  <span className="text-primary mr-2">{active.n}.</span>
                  {active.name}
                </h3>
                <p className="text-sm text-primary font-semibold mt-0.5">{active.tagline}</p>
              </div>
              <a
                href={active.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 text-primary px-3.5 py-1.5 text-xs font-semibold hover:bg-primary/20 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {active.link.label}
              </a>
            </div>

            <div className={`grid gap-4 ${active.id === "r" ? "grid-cols-1" : "grid-cols-[1fr_1.1fr]"}`}>
              <ul className="flex flex-col gap-2.5">
                {active.points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex gap-2 text-sm leading-snug text-foreground/85"
                  >
                    <span className="flex-none w-1.5 h-1.5 rounded-full bg-primary mt-1.5" aria-hidden="true" />
                    {p}
                  </motion.li>
                ))}
                {active.id === "verify" && (
                  <motion.pre
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="mt-1 rounded-xl bg-foreground/[0.04] border border-border p-3 text-[11.5px] leading-relaxed font-mono text-foreground/90 overflow-x-auto"
                  >
                    {TEST_CODE}
                  </motion.pre>
                )}
              </ul>

              {active.image ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  className="relative rounded-xl border border-border shadow-sm overflow-hidden self-start"
                >
                  <img src={active.image} alt={active.imageAlt} className="block w-full max-h-[320px] object-contain" />
                  <button
                    ref={enlargeBtnRef}
                    onClick={() => setZoomed(true)}
                    aria-label="Enlarge screenshot"
                    className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur border border-border shadow px-3 py-1.5 text-xs font-semibold text-foreground/80 hover:text-primary hover:border-primary/50 transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    Enlarge
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-xl border border-primary/25 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 px-5 py-3.5 text-sm text-foreground/90"
                >
                  <span className="font-bold text-primary">Order matters:</span> R is the engine,
                  RStudio is the cockpit. Install the engine first — RStudio will find it
                  automatically.
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {createPortal(
        <AnimatePresence>
          {zoomed && active.image && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6"
              onClick={() => setZoomed(false)}
              role="dialog"
              aria-modal="true"
              aria-label={`Step ${active.n}: ${active.name} — enlarged screenshot`}
            >
              <motion.div
                initial={{ scale: 0.94 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.94 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-[1200px] max-h-[85vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={active.image}
                    alt={`${active.imageAlt}, enlarged`}
                    className="block max-h-[82vh] w-auto max-w-full"
                  />
                </div>
                <button
                  ref={closeBtnRef}
                  onClick={() => setZoomed(false)}
                  aria-label="Close enlarged screenshot"
                  className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground/80 hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
              <p className="mt-4 text-sm text-white/80 font-medium" onClick={(e) => e.stopPropagation()}>
                Step {active.n}. {active.name} — {active.tagline}
                <span className="text-white/50 ml-3">Click outside or press Esc to close</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
