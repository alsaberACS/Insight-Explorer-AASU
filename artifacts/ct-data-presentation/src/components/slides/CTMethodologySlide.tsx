import { motion } from "framer-motion";
import { HeartData } from "@/lib/data";

const KDD = "bg-chart-1/15 text-chart-1";
const SEMMA = "bg-chart-3/15 text-chart-3";
const CRISP = "bg-chart-4/15 text-chart-4";
const STD = "bg-primary/15 text-primary";

const ROWS = [
  {
    pillar: "Decomposition",
    how: "Framing the problem and carving it into manageable pieces",
    phases: [
      { label: "Business Understanding", cls: CRISP },
      { label: "Data Selection", cls: KDD },
      { label: "Sample", cls: SEMMA },
      { label: "Collecting Data", cls: STD },
    ],
  },
  {
    pillar: "Pattern Recognition",
    how: "Searching the data for regularities, trends, and associations",
    phases: [
      { label: "Data Mining", cls: KDD },
      { label: "Explore", cls: SEMMA },
      { label: "Data Understanding", cls: CRISP },
      { label: "Analyzing & Insights", cls: STD },
    ],
  },
  {
    pillar: "Abstraction",
    how: "Keeping the signal, discarding the noise, generalising the essentials",
    phases: [
      { label: "Data Transformation", cls: KDD },
      { label: "Modify", cls: SEMMA },
      { label: "Data Preparation", cls: CRISP },
      { label: "Preprocessing", cls: STD },
    ],
  },
  {
    pillar: "Algorithm Design",
    how: "Turning insight into precise, repeatable, testable procedures",
    phases: [
      { label: "Modeling", cls: CRISP },
      { label: "Model", cls: SEMMA },
      { label: "Assess", cls: SEMMA },
      { label: "Pattern Evaluation", cls: KDD },
      { label: "Interpretation", cls: STD },
    ],
  },
];

const LEGEND = [
  { name: "KDD", cls: KDD },
  { name: "SEMMA", cls: SEMMA },
  { name: "CRISP-DM", cls: CRISP },
  { name: "Standard Process", cls: STD },
];

export default function CTMethodologySlide({ data: _data }: { data: HeartData[] }) {
  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-5">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          Thinking Meets Process
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-4xl"
        >
          Computational thinking is <span className="font-semibold text-foreground">how you think</span>;
          a methodology is <span className="font-semibold text-foreground">how you work</span>. Each
          pillar powers specific phases of the methodologies we just saw.
        </motion.p>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {LEGEND.map((l, i) => (
          <motion.span
            key={l.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 + i * 0.05 }}
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${l.cls}`}
          >
            {l.name}
          </motion.span>
        ))}
      </div>

      <div className="flex flex-col gap-3 mb-5">
        {ROWS.map((row, i) => (
          <motion.div
            key={row.pillar}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.12 }}
            className="grid grid-cols-[220px_1fr] gap-4 items-center rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div>
              <h3 className="font-bold text-primary leading-tight">{row.pillar}</h3>
              <p className="text-xs text-muted-foreground leading-snug mt-1">{row.how}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {row.phases.map((p) => (
                <span
                  key={p.label}
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-full ${p.cls}`}
                >
                  {p.label}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-sm font-medium text-primary text-center bg-primary/10 border border-primary/20 py-3 px-6 rounded-xl"
      >
        A methodology tells you which phase you are in — computational thinking tells you what
        to do inside that phase.
      </motion.div>
    </div>
  );
}
