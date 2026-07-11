import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderTree, Tags, BookOpen, History, ShieldCheck, Download } from "lucide-react";
import { HeartData } from "@/lib/data";

const PRACTICES = [
  {
    icon: FolderTree,
    name: "One Project, One Structure",
    points: [
      "Raw data, cleaned data, scripts, and outputs each get their own folder.",
      "Anyone opening the project — including future you — knows where to look.",
      "In RStudio: one analysis = one Project, so paths always work.",
    ],
  },
  {
    icon: Tags,
    name: "Names That Explain Themselves",
    points: [
      "heart_clean_2026-07-11.csv beats final_FINAL_v2.csv every time.",
      "Dates in ISO format (YYYY-MM-DD) sort correctly by themselves.",
      "No spaces or special characters — scripts break on them.",
    ],
  },
  {
    icon: BookOpen,
    name: "Document with a Codebook",
    points: [
      "Every variable gets a meaning, valid codes, and units — written down.",
      "Our codebook is what exposed ca = 4 and thal = 0 as impossible.",
      "Without documentation, data outlives the memory of what it means.",
    ],
  },
  {
    icon: History,
    name: "Never Overwrite Raw Data",
    points: [
      "The original file is read-only history; cleaning happens in scripts.",
      "Re-running the script rebuilds the clean data from scratch — reproducibility.",
      "Version control (Git) tracks every change to the scripts themselves.",
    ],
  },
  {
    icon: ShieldCheck,
    name: "Protect and Control Access",
    points: [
      "Patient data is sensitive — anonymise before sharing, always.",
      "Back up with the 3-2-1 rule: 3 copies, 2 media, 1 off-site.",
      "Know who may see what: ethics approval and access rules come first.",
    ],
  },
];

const TREE = [
  { depth: 0, name: "heart-analysis/", dir: true },
  { depth: 1, name: "data/", dir: true },
  { depth: 2, name: "raw/heart.csv", dir: false, note: "never edited" },
  { depth: 2, name: "clean/heart_clean_2026-07-11.csv", dir: false },
  { depth: 1, name: "docs/heart-codebook.csv", dir: false, note: "the codebook" },
  { depth: 1, name: "scripts/01_clean.R", dir: false },
  { depth: 1, name: "scripts/02_analyse.R", dir: false },
  { depth: 1, name: "output/figures/", dir: true },
  { depth: 1, name: "README.md", dir: false, note: "what, who, when" },
];

export default function DataManagementSlide({ data: _data }: { data: HeartData[] }) {
  const [active, setActive] = useState(0);
  const p = PRACTICES[active];

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-4 flex items-end justify-between gap-6 flex-wrap">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-1"
          >
            Dealing with Data 6 of 6
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-1"
          >
            Data Management
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-base text-muted-foreground"
          >
            Analysis is a moment; data lives for years. Five habits keep it trustworthy.
          </motion.p>
        </div>
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          href={`${import.meta.env.BASE_URL}heart-codebook.csv`}
          download="heart-codebook.csv"
          className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 text-primary px-4 py-2 text-sm font-semibold hover:bg-primary/20 transition-colors"
          aria-label="Download the variable codebook"
        >
          <Download className="w-4 h-4" />
          Our codebook
        </motion.a>
      </div>

      <div className="grid grid-cols-[1fr_1.25fr] gap-5 items-start">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-2xl border border-border bg-foreground/[0.03] p-4"
        >
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2.5">
            A well-managed project
          </p>
          <div className="font-mono text-[12.5px] leading-relaxed">
            {TREE.map((node, i) => (
              <motion.div
                key={node.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.06 }}
                className="flex items-center gap-2"
                style={{ paddingLeft: `${node.depth * 18}px` }}
              >
                <span className={node.dir ? "font-bold text-primary" : "text-foreground/85"}>
                  {node.name}
                </span>
                {node.note && (
                  <span className="text-[10.5px] text-muted-foreground italic font-sans">
                    — {node.note}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col gap-1.5">
          {PRACTICES.map((practice, i) => (
            <motion.button
              key={practice.name}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + i * 0.07 }}
              onClick={() => setActive(i)}
              aria-expanded={active === i}
              className={`text-left rounded-xl border px-3.5 py-2.5 transition-all ${
                active === i
                  ? "border-primary/60 bg-primary/10"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`flex-none w-8 h-8 rounded-lg flex items-center justify-center ${
                    active === i ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                  }`}
                >
                  <practice.icon className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-sm leading-tight">{practice.name}</h3>
              </div>
              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex gap-2 text-xs leading-snug text-foreground/80 mt-1.5 first:mt-2"
                      >
                        <span
                          className="flex-none w-1.5 h-1.5 rounded-full bg-primary mt-1"
                          aria-hidden="true"
                        />
                        {pt}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
