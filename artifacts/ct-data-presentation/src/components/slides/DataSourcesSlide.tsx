import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";

const SOURCES = [
  {
    id: "files",
    name: "Files",
    tagline: "The everyday workhorses",
    color: "border-chart-2/40 bg-chart-2/10",
    chip: "bg-chart-2/15 text-chart-2",
    items: [
      { name: "CSV / Excel", note: "Tabular exchange formats — our heart.csv is one of these" },
      { name: "JSON / HTML", note: "Web APIs and scraped tables" },
      { name: "Parquet / HDF5 / pickle", note: "Efficient binary formats for larger data" }
    ],
    code: "pd.read_csv('heart.csv')"
  },
  {
    id: "relational",
    name: "Relational (SQL)",
    tagline: "Structured tables, fixed schema",
    color: "border-chart-3/40 bg-chart-3/10",
    chip: "bg-chart-3/15 text-chart-3",
    items: [
      { name: "SQLite", note: "Lightweight, embedded — runs on your phone" },
      { name: "MySQL / PostgreSQL", note: "Client-server databases behind most applications" },
      { name: "SQL queries", note: "SELECT, JOIN, GROUP BY — pandas mimics these on DataFrames" }
    ],
    code: "pd.read_sql('SELECT * FROM patients', conn)"
  },
  {
    id: "nosql",
    name: "NoSQL",
    tagline: "Flexible, fast, schema-free",
    color: "border-primary/40 bg-primary/10",
    chip: "bg-primary/15 text-primary",
    items: [
      { name: "MongoDB", note: "Document-oriented — stores JSON-like records" },
      { name: "Cassandra", note: "Column-oriented — built for big-data scale" },
      { name: "Redis", note: "Key-value, in-memory — extremely fast" }
    ],
    code: "collection.find({ 'target': 1 })"
  }
];

export default function DataSourcesSlide({ data: _data }: { data: HeartData[] }) {
  const [active, setActive] = useState<string>("files");
  const activeSource = SOURCES.find(s => s.id === active)!;

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-2"
        >
          Where Does Data Live?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground"
        >
          Data comes from the web, IoT sensors, lab experiments, surveys — and it is stored in files and databases. An analyst must be able to fetch it from all of them.
        </motion.p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-5">
        {SOURCES.map((s, i) => (
          <motion.button
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.08 }}
            onClick={() => setActive(s.id)}
            aria-pressed={active === s.id}
            className={`rounded-2xl border p-4 text-left transition-all bg-card shadow-sm hover:shadow-md ${
              active === s.id ? `${s.color} ring-2 ring-primary/30` : "border-border"
            }`}
          >
            <h3 className="text-lg font-bold">{s.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{s.tagline}</p>
          </motion.button>
        ))}
      </div>

      <div className="flex-none min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSource.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`rounded-2xl border p-6 ${activeSource.color}`}
          >
            <div className="grid grid-cols-3 gap-4 mb-5">
              {activeSource.items.map(item => (
                <div key={item.name} className="rounded-xl bg-card/70 border border-border p-4">
                  <p className="font-bold text-sm mb-1">{item.name}</p>
                  <p className="text-sm text-foreground/80 leading-snug">{item.note}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${activeSource.chip}`}>
                In pandas
              </span>
              <code className="font-mono text-sm bg-slate-900 text-emerald-300 px-4 py-2 rounded-lg">
                {activeSource.code}
              </code>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-5 text-sm font-medium text-primary text-center bg-primary/10 border border-primary/20 py-3 px-6 rounded-xl"
      >
        Whatever the source, pandas brings it into one common shape — the DataFrame — where analysis begins.
      </motion.div>
    </div>
  );
}
