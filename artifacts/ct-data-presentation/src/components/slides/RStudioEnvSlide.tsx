import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { HeartData } from "@/lib/data";
import rstudioShot from "@assets/Screenshot_2026-07-11_at_1.30.56_PM_1783765860678.png";

type Region = {
  id: string;
  n: number;
  name: string;
  tagline: string;
  points: string[];
  box: { left: string; top: string; width: string; height: string };
};

const REGIONS: Region[] = [
  {
    id: "console",
    n: 1,
    name: "Console",
    tagline: "Where R actually runs",
    points: [
      "Type a command at the > prompt, press Enter, R answers immediately.",
      "The startup text shows which R version is running (here R 4.6.0).",
      "Tabs beside it: Terminal (system shell) and Background Jobs (long tasks).",
      "When you open a script, the Source editor appears above this pane.",
    ],
    box: { left: "23.4%", top: "6.6%", width: "46.6%", height: "91.5%" },
  },
  {
    id: "environment",
    n: 2,
    name: "Environment & History",
    tagline: "Everything in R's memory",
    points: [
      "Every object you create — data frames, vectors, models — is listed here.",
      "After heart <- read.csv(\"heart.csv\") you would see heart: 1025 obs. of 14 variables.",
      "History keeps every command you have run — recall any of them with one click.",
      "The broom icon clears the workspace; the memory badge shows RAM in use.",
    ],
    box: { left: "70.4%", top: "6.6%", width: "29.2%", height: "34.5%" },
  },
  {
    id: "files",
    n: 3,
    name: "Files, Plots, Packages & Help",
    tagline: "Your project's supporting cast",
    points: [
      "Files: browse the working directory — where read.csv() looks for data.",
      "Plots: every chart you make appears here, with export buttons.",
      "Packages: install and load extensions like ggplot2 or dplyr with a checkbox.",
      "Help: type ?mean in the console and the documentation opens here.",
    ],
    box: { left: "70.4%", top: "41.5%", width: "29.2%", height: "56.6%" },
  },
  {
    id: "assistant",
    n: 4,
    name: "Posit Assistant",
    tagline: "The new AI pane (2026)",
    points: [
      "A data-science AI agent built into RStudio — ask questions in plain language.",
      "It can read, analyze, and modify your data, and even write and run code.",
      "Sandbox mode isolates its code execution for safety.",
      "Caution for the classroom: AI output must always be verified — a teaching moment in itself.",
    ],
    box: { left: "0.4%", top: "6.6%", width: "22.6%", height: "91.5%" },
  },
  {
    id: "toolbar",
    n: 5,
    name: "Toolbar & Projects",
    tagline: "Navigation and organisation",
    points: [
      "Menus and shortcuts: new script, open file, go to function.",
      "Top-right: the Project selector — projects keep each analysis self-contained.",
      "A project remembers its own working directory, files, and history.",
      "Rule of thumb for students: one course assignment = one RStudio project.",
    ],
    box: { left: "0%", top: "0%", width: "100%", height: "6.3%" },
  },
];

export default function RStudioEnvSlide({ data: _data }: { data: HeartData[] }) {
  const [activeId, setActiveId] = useState<string>("console");
  const [zoomed, setZoomed] = useState(false);
  const active = REGIONS.find((r) => r.id === activeId)!;

  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomed(false);
        e.stopImmediatePropagation();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowRight" || e.key === " ") {
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener("keydown", onKey, { capture: true });
    return () => window.removeEventListener("keydown", onKey, { capture: true });
  }, [zoomed]);

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-1.5"
        >
          Our First Tool
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-1.5"
        >
          The RStudio Environment
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground"
        >
          Click a numbered area of the screenshot — or a name on the right — to tour each pane.
        </motion.p>
      </div>

      <div className="grid grid-cols-[1.5fr_1fr] gap-5 items-start">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative rounded-2xl border border-border shadow-md overflow-hidden select-none"
        >
          <img src={rstudioShot} alt="The RStudio IDE with its main panes" className="block w-full" />
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveId(r.id)}
              aria-pressed={activeId === r.id}
              aria-label={r.name}
              style={r.box}
              className={`absolute rounded-md transition-all ${
                activeId === r.id
                  ? "ring-4 ring-primary ring-inset bg-primary/10"
                  : "hover:bg-primary/10 hover:ring-2 hover:ring-primary/50 hover:ring-inset"
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shadow ${
                  activeId === r.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-primary border border-primary/40"
                }`}
              >
                {r.n}
              </span>
            </button>
          ))}
          <button
            onClick={() => setZoomed(true)}
            aria-label="Enlarge screenshot"
            className="absolute bottom-2 right-2 z-10 flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur border border-border shadow px-3 py-1.5 text-xs font-semibold text-foreground/80 hover:text-primary hover:border-primary/50 transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Enlarge
          </button>
        </motion.div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-1.5 mb-1">
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveId(r.id)}
                aria-pressed={activeId === r.id}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-full border transition-colors ${
                  activeId === r.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground/75 border-border hover:border-primary/50"
                }`}
              >
                {r.n}. {r.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-primary/30 bg-primary/5 p-4"
            >
              <div className="flex items-center gap-2.5 mb-1">
                <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {active.n}
                </span>
                <h3 className="text-lg font-bold leading-tight">{active.name}</h3>
              </div>
              <p className="text-sm text-primary font-semibold mb-2.5">{active.tagline}</p>
              <ul className="flex flex-col gap-2">
                {active.points.map((p, i) => (
                  <motion.li
                    key={p}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex gap-2 text-[13px] leading-snug text-foreground/85"
                  >
                    <span className="flex-none w-1.5 h-1.5 rounded-full bg-primary mt-1.5" aria-hidden="true" />
                    {p}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {zoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6"
              onClick={() => setZoomed(false)}
            >
              <motion.div
                initial={{ scale: 0.94 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.94 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-[1200px] max-h-[85vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={rstudioShot}
                    alt="The RStudio IDE with its main panes, enlarged"
                    className="block max-h-[82vh] w-auto max-w-full"
                  />
                  {REGIONS.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setActiveId(r.id)}
                      aria-pressed={activeId === r.id}
                      aria-label={r.name}
                      style={r.box}
                      className={`absolute rounded-md transition-all ${
                        activeId === r.id
                          ? "ring-4 ring-primary ring-inset bg-primary/10"
                          : "hover:bg-primary/10 hover:ring-2 hover:ring-primary/50 hover:ring-inset"
                      }`}
                    >
                      <span
                        className={`absolute top-1.5 left-1.5 w-7 h-7 rounded-full text-sm font-bold flex items-center justify-center shadow ${
                          activeId === r.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-card text-primary border border-primary/40"
                        }`}
                      >
                        {r.n}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setZoomed(false)}
                  aria-label="Close enlarged screenshot"
                  className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-card border border-border shadow-lg flex items-center justify-center text-foreground/80 hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
              <p className="mt-4 text-sm text-white/80 font-medium" onClick={(e) => e.stopPropagation()}>
                {active.n}. {active.name} — {active.tagline}
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
