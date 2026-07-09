import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";

const EXAMPLES = [
  {
    id: "numpy",
    label: "NumPy array",
    code: [
      "import numpy as np",
      "a = np.arange(1,11)",
      "print(a)",
    ],
    note: "arange(start, stop, step) stops one before stop.",
    output: "array",
  },
  {
    id: "dataframe",
    label: "pandas DataFrame",
    code: [
      "import pandas as pd",
      "data = {'Name': ['Vijay', 'Sundar', 'Satyam', 'Indira'],",
      "        'Age': [23, 45, 46, 52]}",
      "df = pd.DataFrame(data)",
      "df.head()",
    ],
    note: "Dictionary keys become columns; list values become rows.",
    output: "table",
  },
  {
    id: "series",
    label: "pandas Series",
    code: [
      "dict1 = {0: 'Ajay', 1: 'Jay', 2: 'Vijay'}",
      "series = pd.Series(dict1)",
      "series",
    ],
    note: "A Series is a one-dimensional, labeled sequence — one column of a DataFrame.",
    output: "series",
  },
];

const DF_ROWS = [
  ["0", "Vijay", "23"],
  ["1", "Sundar", "45"],
  ["2", "Satyam", "46"],
  ["3", "Indira", "52"],
];

function OutputBlock({ type }: { type: string }) {
  if (type === "array") {
    return (
      <pre className="font-mono text-sm text-emerald-300">[ 1  2  3  4  5  6  7  8  9 10]</pre>
    );
  }
  if (type === "table") {
    return (
      <table className="font-mono text-sm text-left border-collapse">
        <thead>
          <tr className="text-zinc-400">
            <th className="pr-6 font-normal"></th>
            <th className="pr-6 font-semibold">Name</th>
            <th className="font-semibold">Age</th>
          </tr>
        </thead>
        <tbody className="text-emerald-300">
          {DF_ROWS.map((r) => (
            <tr key={r[0]}>
              <td className="pr-6 text-zinc-500">{r[0]}</td>
              <td className="pr-6">{r[1]}</td>
              <td>{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <pre className="font-mono text-sm text-emerald-300">{`0     Ajay
1      Jay
2    Vijay
dtype: object`}</pre>
  );
}

export default function PythonFirstStepsSlide({ data: _data }: { data: HeartData[] }) {
  const [activeId, setActiveId] = useState(EXAMPLES[0].id);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const example = EXAMPLES.find((e) => e.id === activeId)!;
  const isRevealed = !!revealed[example.id];

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-5">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          First Steps: NumPy &amp; pandas
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground"
        >
          Predict the output before revealing it &mdash; straight from the course text.
        </motion.p>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        {EXAMPLES.map((e) => (
          <button
            key={e.id}
            onClick={() => setActiveId(e.id)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              activeId === e.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {e.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-[#1e1e2e]">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#181825] border-b border-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
          <span className="ml-3 text-xs text-zinc-400 font-mono">Jupyter Notebook &mdash; In [1]</span>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={example.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="p-5 select-text"
          >
            <pre className="font-mono text-sm leading-relaxed text-zinc-100 whitespace-pre-wrap">
              {example.code.join("\n")}
            </pre>

            <div className="mt-4 pt-4 border-t border-white/10 min-h-[110px]">
              {!isRevealed ? (
                <button
                  onClick={() => setRevealed((p) => ({ ...p, [example.id]: true }))}
                  className="px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Reveal output
                </button>
              ) : (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="text-xs text-zinc-500 font-mono mb-2">Out [1]:</div>
                  <OutputBlock type={example.output} />
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-xs md:text-sm text-muted-foreground text-center bg-secondary/30 py-2.5 px-6 rounded-lg"
      >
        {example.note}
      </motion.p>
    </div>
  );
}
