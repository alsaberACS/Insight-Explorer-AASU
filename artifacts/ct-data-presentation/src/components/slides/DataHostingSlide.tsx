import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Database, Warehouse, Radio } from "lucide-react";
import { HeartData } from "@/lib/data";

const OPTIONS = [
  {
    icon: FileText,
    name: "Flat Files",
    tag: "CSV, Excel",
    what: "A single self-contained file — the simplest possible home for data.",
    example: "Our heart.csv: 1,025 rows travel anywhere as one small file.",
    fits: "Small projects, teaching, sharing a snapshot with colleagues.",
    limit: "No access control, no simultaneous editing, easy to lose track of versions.",
    r: 'heart <- read.csv("heart.csv")',
  },
  {
    icon: Database,
    name: "Relational Databases",
    tag: "SQL",
    what: "Tables with enforced structure, keys, and transactions on a server.",
    example: "A hospital records system: admissions, labs, and prescriptions linked by patient id.",
    fits: "Operational systems, many users reading and writing at once.",
    limit: "Needs administration; analysts must extract data via SQL queries.",
    r: 'con <- DBI::dbConnect(...)\nheart <- DBI::dbGetQuery(con,\n  "SELECT * FROM patients")',
  },
  {
    icon: Warehouse,
    name: "Warehouses & Lakes",
    tag: "Cloud",
    what: "Institution-scale storage optimised for analysis over huge histories.",
    example: "A national health registry combining decades of records for research.",
    fits: "Organisation-wide analytics, dashboards, machine learning at scale.",
    limit: "Cost and governance — someone must own quality and documentation.",
    r: 'heart <- arrow::read_parquet(\n  "s3://registry/heart/2026/")',
  },
  {
    icon: Radio,
    name: "APIs & Live Feeds",
    tag: "Streaming",
    what: "Data served on request or in real time — you fetch, not store.",
    example: "A wearable's heart-rate API delivering this minute's readings.",
    fits: "Always-current data, dashboards, monitoring.",
    limit: "You depend on someone else's uptime, limits, and format changes.",
    r: 'resp <- httr2::req_perform(\n  httr2::request(api_url))',
  },
];

export default function DataHostingSlide({ data: _data }: { data: HeartData[] }) {
  const [active, setActive] = useState(0);
  const o = OPTIONS[active];

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-1"
        >
          Dealing with Data 3 of 6
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-1"
        >
          Data Hosting
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground"
        >
          Where data lives determines who can reach it, how fresh it is, and how far it scales.
        </motion.p>
      </div>

      <div className="relative mb-4">
        <div
          className="absolute left-0 right-0 top-1/2 h-0.5 bg-gradient-to-r from-primary/15 via-primary/40 to-primary/15 -translate-y-1/2"
          aria-hidden="true"
        />
        <div className="relative grid grid-cols-4 gap-4">
          {OPTIONS.map((opt, i) => (
            <motion.button
              key={opt.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`rounded-2xl border p-4 text-center transition-all ${
                active === i
                  ? "border-primary/60 bg-primary/10 shadow-sm"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <span
                className={`mx-auto mb-2 w-10 h-10 rounded-xl flex items-center justify-center ${
                  active === i ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                }`}
              >
                <opt.icon className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-sm leading-tight">{opt.name}</h3>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mt-0.5">
                {opt.tag}
              </p>
            </motion.button>
          ))}
        </div>
        <div className="flex justify-between mt-1.5 px-1 text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
          <span>One laptop</span>
          <span>Whole organisation</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={o.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-[1.4fr_1fr] gap-4 items-stretch"
        >
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <p className="text-sm text-foreground/90 mb-2.5">
              <span className="font-bold text-primary">{o.name}: </span>
              {o.what}
            </p>
            <div className="grid grid-cols-3 gap-3 text-[12.5px] leading-snug">
              <div>
                <p className="font-bold text-foreground/80 mb-0.5">Example</p>
                <p className="text-foreground/70">{o.example}</p>
              </div>
              <div>
                <p className="font-bold text-foreground/80 mb-0.5">Best fit</p>
                <p className="text-foreground/70">{o.fits}</p>
              </div>
              <div>
                <p className="font-bold text-foreground/80 mb-0.5">Trade-off</p>
                <p className="text-foreground/70">{o.limit}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-foreground/[0.03] p-4">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
              Reaching it from R <span className="normal-case font-normal">(illustrative)</span>
            </p>
            <pre className="text-[12px] font-mono leading-relaxed text-foreground/90 whitespace-pre-wrap">
              {o.r}
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
