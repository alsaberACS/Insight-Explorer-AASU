import { useState } from "react";
import { motion } from "framer-motion";
import { HeartData } from "@/lib/data";

const LAYERS = [
  {
    label: "Compute Foundation",
    libs: [
      { name: "NumPy", desc: "Numerical Python: multidimensional arrays, matrices, fast math." },
      { name: "SciPy", desc: "Scientific, mathematical, and engineering operations." },
    ],
  },
  {
    label: "Data Handling",
    libs: [
      { name: "pandas", desc: "Data exploration & manipulation: tabular DataFrames and Series." },
    ],
  },
  {
    label: "Machine Learning",
    libs: [
      { name: "scikit-learn", desc: "Regression, classification, clustering, anomaly detection." },
    ],
  },
  {
    label: "Visualization",
    libs: [
      { name: "Matplotlib", desc: "Core plotting library: 2D/3D plots; base for others." },
      { name: "Seaborn", desc: "Built on Matplotlib: high-level, organized statistical plots." },
      { name: "Plotly", desc: "High-quality interactive charts: scatter, bar, heatmaps, boxplots." },
    ],
  },
];

export default function PythonEcosystemSlide({ data: _data }: { data: HeartData[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-5">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          Why Python for Data Analysis?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground max-w-4xl"
        >
          Data analysis means inspecting, preprocessing, exploring, describing, and visualizing
          data to discover decision-making information &mdash; and Python&apos;s ecosystem makes
          each step practical.
        </motion.p>
      </div>

      <div className="flex flex-col gap-3 flex-1 min-h-0 justify-center">
        {LAYERS.map((layer, li) => (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + li * 0.12 }}
            className="flex items-stretch gap-3"
          >
            <div className="w-36 shrink-0 flex items-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">
                {layer.label}
              </span>
            </div>
            <div className="flex-1 grid gap-3" style={{ gridTemplateColumns: `repeat(${layer.libs.length}, minmax(0, 1fr))` }}>
              {layer.libs.map((lib) => {
                const isActive = active === lib.name;
                return (
                  <button
                    key={lib.name}
                    onClick={() => setActive(isActive ? null : lib.name)}
                    className={`text-left rounded-2xl border px-4 py-3 transition-all ${
                      isActive
                        ? "bg-card border-primary shadow-md ring-1 ring-primary/20"
                        : "bg-secondary/30 border-border hover:border-primary/50 hover:bg-secondary/50"
                    }`}
                  >
                    <div className={`font-mono font-bold text-sm md:text-base ${isActive ? "text-primary" : ""}`}>
                      {lib.name}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-0.5 leading-snug">
                      {lib.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-4 text-xs md:text-sm text-muted-foreground text-center bg-secondary/30 py-2.5 px-6 rounded-lg"
      >
        <strong className="text-foreground/80">Working environment:</strong> IPython shell and
        Jupyter Notebook / JupyterLab (Anaconda suite) &mdash; the analyst&apos;s IDE of choice.
      </motion.div>
    </div>
  );
}
