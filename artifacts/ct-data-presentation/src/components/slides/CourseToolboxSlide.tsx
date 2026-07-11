import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";

const TOOLS = [
  {
    id: "rstudio",
    name: "RStudio",
    mono: "R",
    family: "Code-first",
    tagline: "The statistician's workbench",
    role: "Statistical concepts, statistical tests, and statistical modeling",
    details: [
      "Descriptive and inferential statistics",
      "Hypothesis testing, confidence intervals",
      "Regression and statistical modeling",
      "Publication-quality graphics (ggplot2)"
    ],
    grad: "from-sky-500/15 to-sky-500/5",
    ring: "ring-sky-500/40",
    badge: "bg-sky-500/15 text-sky-600",
    bar: "bg-sky-500"
  },
  {
    id: "python",
    name: "Python",
    mono: "Py",
    family: "Code-first",
    tagline: "The general-purpose powerhouse",
    role: "Data wrangling, automation, and machine learning at scale",
    details: [
      "pandas, NumPy, scikit-learn ecosystem",
      "Modern editors: Antigravity, Positron, Visual Studio Code",
      "From quick scripts to production pipelines",
      "The bridge to AI-assisted analysis"
    ],
    grad: "from-amber-500/15 to-amber-500/5",
    ring: "ring-amber-500/40",
    badge: "bg-amber-500/15 text-amber-600",
    bar: "bg-amber-500"
  },
  {
    id: "sql",
    name: "SQL",
    mono: "DB",
    family: "Code-first",
    tagline: "The language of data itself",
    role: "Data management and creating databases",
    details: [
      "Creating and querying relational databases",
      "SELECT, JOIN, GROUP BY — asking questions of data",
      "The skill every data role assumes",
      "Feeds clean data into R, Python, and GUI tools"
    ],
    grad: "from-violet-500/15 to-violet-500/5",
    ring: "ring-violet-500/40",
    badge: "bg-violet-500/15 text-violet-600",
    bar: "bg-violet-500"
  },
  {
    id: "jamovi",
    name: "jamovi",
    mono: "jv",
    family: "Point-and-click",
    tagline: "Statistics without the syntax",
    role: "A friendly first step — menus in front, real R underneath",
    details: [
      "Free, open-source, built on R",
      "t-tests, ANOVA, regression from menus",
      "Shows the equivalent R code as you click",
      "Ideal for students before they write code"
    ],
    grad: "from-emerald-500/15 to-emerald-500/5",
    ring: "ring-emerald-500/40",
    badge: "bg-emerald-500/15 text-emerald-600",
    bar: "bg-emerald-500"
  },
  {
    id: "jasp",
    name: "JASP",
    mono: "JA",
    family: "Point-and-click",
    tagline: "Classical and Bayesian, side by side",
    role: "Rich statistical output with both frequentist and Bayesian lenses",
    details: [
      "Free, open-source, APA-formatted tables",
      "Classical tests and their Bayesian counterparts",
      "Dynamic output — change data, results update",
      "Great for teaching evidence and uncertainty"
    ],
    grad: "from-rose-500/15 to-rose-500/5",
    ring: "ring-rose-500/40",
    badge: "bg-rose-500/15 text-rose-600",
    bar: "bg-rose-500"
  }
];

export default function CourseToolboxSlide({ data: _data }: { data: HeartData[] }) {
  const [active, setActive] = useState<string>("rstudio");
  const tool = TOOLS.find(t => t.id === active)!;

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-2">
          The Course Toolbox
        </p>
        <h2 className="text-4xl font-bold mb-2">Software, Languages & Packages</h2>
        <p className="text-lg text-muted-foreground">
          Five tools, one philosophy: start where students are, grow toward where the field is.
        </p>
      </motion.div>

      <div className="grid grid-cols-5 gap-4 mb-5">
        {TOOLS.map((t, i) => (
          <motion.button
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.08 }}
            onClick={() => setActive(t.id)}
            aria-pressed={active === t.id}
            className={`relative rounded-2xl border border-border bg-gradient-to-b ${t.grad} p-4 text-center transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
              active === t.id ? `ring-2 ${t.ring}` : ""
            }`}
          >
            <span className={`absolute top-0 left-4 right-4 h-1 rounded-b ${t.bar}`} />
            <span className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-lg font-bold font-mono mb-2 mt-1 ${t.badge}`}>
              {t.mono}
            </span>
            <h3 className="font-bold leading-tight">{t.name}</h3>
            <p className="text-[11px] text-muted-foreground mt-1 uppercase tracking-wide font-semibold">
              {t.family}
            </p>
          </motion.button>
        ))}
      </div>

      <div className="flex-none min-h-[190px] mb-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`rounded-2xl border border-border bg-gradient-to-br ${tool.grad} p-6`}
          >
            <div className="flex items-baseline gap-3 mb-1">
              <h3 className="text-2xl font-bold">{tool.name}</h3>
              <p className="text-sm italic text-muted-foreground">{tool.tagline}</p>
            </div>
            <p className="text-sm font-medium text-foreground/90 mb-4">{tool.role}</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2">
              {tool.details.map((d, i) => (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="flex items-start gap-2.5"
                >
                  <span className={`flex-none mt-1.5 w-2 h-2 rounded-full ${tool.bar}`} />
                  <p className="text-sm text-foreground/85 leading-snug">{d}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="rounded-xl border border-border bg-card p-3.5 text-center">
          <p className="text-sm">
            <span className="font-bold text-primary">Point-and-click first</span>
            <span className="text-muted-foreground"> — jamovi and JASP let students reason statistically before writing a line of code.</span>
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3.5 text-center">
          <p className="text-sm">
            <span className="font-bold text-primary">Code as they grow</span>
            <span className="text-muted-foreground"> — R, Python, and SQL carry them from coursework to real research and industry.</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
