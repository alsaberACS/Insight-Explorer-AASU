import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileSpreadsheet } from "lucide-react";
import { HeartData } from "@/lib/data";

type JoinType = "inner" | "left" | "right" | "full";

const PATIENTS = [
  { id: 101, age: 63 },
  { id: 102, age: 45 },
  { id: 103, age: 58 },
  { id: 104, age: 71 },
];

const LABS = [
  { id: 102, chol: 210 },
  { id: 103, chol: 289 },
  { id: 105, chol: 244 },
];

const JOINS: Record<
  JoinType,
  { name: string; r: string; keeps: string; ids: number[] }
> = {
  inner: {
    name: "Inner join",
    r: 'merge(patients, labs, by = "id")',
    keeps: "Only patients that appear in BOTH tables.",
    ids: [102, 103],
  },
  left: {
    name: "Left join",
    r: 'merge(patients, labs, by = "id", all.x = TRUE)',
    keeps: "Every patient — lab values missing (NA) where no test exists.",
    ids: [101, 102, 103, 104],
  },
  right: {
    name: "Right join",
    r: 'merge(patients, labs, by = "id", all.y = TRUE)',
    keeps: "Every lab test — even one whose patient record is missing.",
    ids: [102, 103, 105],
  },
  full: {
    name: "Full join",
    r: 'merge(patients, labs, by = "id", all = TRUE)',
    keeps: "Everything from both tables, gaps filled with NA.",
    ids: [101, 102, 103, 104, 105],
  },
};

const ORDER: JoinType[] = ["inner", "left", "right", "full"];

function Cell({ value, missing }: { value: string | number | null; missing?: boolean }) {
  return (
    <td
      className={`px-3 py-1.5 text-xs border-t border-border ${
        missing ? "text-destructive/80 font-semibold italic" : "text-foreground/85"
      }`}
    >
      {value === null ? "NA" : value}
    </td>
  );
}

export default function DataIntegrationSlide({ data: _data }: { data: HeartData[] }) {
  const [join, setJoin] = useState<JoinType>("inner");
  const j = JOINS[join];

  const rows = j.ids.map((id) => {
    const p = PATIENTS.find((x) => x.id === id) ?? null;
    const l = LABS.find((x) => x.id === id) ?? null;
    return { id, age: p ? p.age : null, chol: l ? l.chol : null };
  });

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-3">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-1"
        >
          Dealing with Data 2 of 6
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-1"
        >
          Data Integration
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground"
        >
          Real analyses combine tables that were never designed to meet — a shared key makes the
          match. Try each join:
        </motion.p>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {ORDER.map((t) => (
          <button
            key={t}
            onClick={() => setJoin(t)}
            aria-pressed={join === t}
            className={`text-sm font-semibold px-4 py-1.5 rounded-full border transition-colors ${
              join === t
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground/75 border-border hover:border-primary/50"
            }`}
          >
            {JOINS[t].name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_1.15fr] gap-5 items-start">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-chart-2/40 overflow-hidden"
          >
            <p className="text-xs font-bold px-3 py-2 bg-chart-2/15 text-chart-2">
              patients — from the ward
            </p>
            <table className="w-full">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  <th className="px-3 py-1.5">id</th>
                  <th className="px-3 py-1.5">age</th>
                </tr>
              </thead>
              <tbody>
                {PATIENTS.map((p) => (
                  <tr key={p.id} className={j.ids.includes(p.id) ? "" : "opacity-30"}>
                    <Cell value={p.id} />
                    <Cell value={p.age} />
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-chart-4/40 overflow-hidden"
          >
            <p className="text-xs font-bold px-3 py-2 bg-chart-4/15 text-chart-4">
              labs — from the laboratory
            </p>
            <table className="w-full">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  <th className="px-3 py-1.5">id</th>
                  <th className="px-3 py-1.5">chol</th>
                </tr>
              </thead>
              <tbody>
                {LABS.map((l) => (
                  <tr key={l.id} className={j.ids.includes(l.id) ? "" : "opacity-30"}>
                    <Cell value={l.id} />
                    <Cell value={l.chol} />
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="col-span-2 rounded-xl border border-primary/25 bg-primary/5 px-4 py-3"
          >
            <p className="text-sm text-foreground/85 leading-snug">
              <span className="font-bold text-primary">{j.name}:</span> {j.keeps}
            </p>
            <code className="block mt-2 text-[12px] font-mono text-foreground/80 bg-foreground/[0.04] border border-border rounded-lg px-3 py-1.5">
              {j.r}
            </code>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={join}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border-2 border-primary/50 overflow-hidden shadow-sm"
          >
            <p className="text-xs font-bold px-3 py-2 bg-primary text-primary-foreground">
              result — one integrated table ({rows.length} rows)
            </p>
            <table className="w-full">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  <th className="px-3 py-1.5">id</th>
                  <th className="px-3 py-1.5">age</th>
                  <th className="px-3 py-1.5">chol</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Cell value={r.id} />
                    <Cell value={r.age} missing={r.age === null} />
                    <Cell value={r.chol} missing={r.chol === null} />
                  </motion.tr>
                ))}
              </tbody>
            </table>
            <p className="text-[11px] text-muted-foreground px-3 py-2 border-t border-border">
              <span className="text-destructive/80 font-semibold italic">NA</span> marks
              information one source never had — integration makes gaps visible, not invented.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 rounded-xl border border-primary/30 bg-primary/5 px-4 py-2.5 flex items-center gap-4"
      >
        <p className="text-sm text-foreground/85 leading-snug flex-1 min-w-0">
          <span className="font-bold text-primary">Try it yourself:</span> two real store
          datasets, 895 stores each, split across two files — join them by{" "}
          <code className="font-mono text-[12px] bg-foreground/[0.06] border border-border rounded px-1 py-0.5">
            Store ID
          </code>{" "}
          to link sales with store size.
        </p>
        <div className="flex-none flex items-center gap-2">
          <a
            href={`${import.meta.env.BASE_URL}stores1.csv`}
            download="Stores1.csv"
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-card text-primary font-semibold text-[13px] px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Stores1.csv
            <Download className="w-3.5 h-3.5" />
          </a>
          <a
            href={`${import.meta.env.BASE_URL}stores2.csv`}
            download="Stores2.csv"
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 bg-card text-primary font-semibold text-[13px] px-3 py-1.5 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Stores2.csv
            <Download className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
