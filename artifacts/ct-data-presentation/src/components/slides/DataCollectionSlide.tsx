import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardList, Activity, FileSpreadsheet, Cloud, Archive, ArrowRight } from "lucide-react";
import { HeartData } from "@/lib/data";
import RStudioPane from "@/components/RStudioPane";

const METHODS = [
  {
    icon: ClipboardList,
    name: "Surveys & Studies",
    example: "Patient questionnaires, clinical trials, census forms.",
    risk: "People misremember and skip questions — design bias creeps in early.",
  },
  {
    icon: Activity,
    name: "Sensors & Devices",
    example: "ECG machines, wearables, lab analysers streaming readings.",
    risk: "Devices drift and fail — calibration and gaps must be checked.",
  },
  {
    icon: FileSpreadsheet,
    name: "Files & Records",
    example: "Hospital spreadsheets, exported reports, administrative records.",
    risk: "Formats vary wildly; the same fact may be coded three different ways.",
  },
  {
    icon: Cloud,
    name: "APIs & the Web",
    example: "Weather services, public health APIs, scraped web tables.",
    risk: "Sources change without notice — yesterday's script breaks today.",
  },
  {
    icon: Archive,
    name: "Public Repositories",
    example: "Kaggle, UCI Machine Learning Repository, government open data.",
    risk: "Documentation may be thin — always trace the data's origin.",
  },
];

const JOURNEY = ["Cleveland Clinic patients", "UCI ML Repository", "Kaggle", "heart.csv in this room"];

const R_CODE = `# Collection ends where analysis begins:
# bringing the raw data into R
heart <- read.csv("heart.csv")

dim(heart)      # how much did we collect?
names(heart)    # which variables?
head(heart, 3)  # the first patients`;

export default function DataCollectionSlide({ data: _data }: { data: HeartData[] }) {
  const [active, setActive] = useState(0);
  const m = METHODS[active];

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-3">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-1"
        >
          Dealing with Data 1 of 6
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-1"
        >
          Data Collection
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground"
        >
          Where data is born — every later step inherits the quality decided here.
        </motion.p>
      </div>

      <div className="grid grid-cols-[380px_1fr] gap-5 items-start">
        <div className="flex flex-col gap-1.5">
          {METHODS.map((method, i) => (
            <motion.button
              key={method.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.07 }}
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
                  <method.icon className="w-4 h-4" />
                </span>
                <h3 className="font-bold text-sm leading-tight">{method.name}</h3>
              </div>
              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-foreground/80 leading-snug mt-2">{m.example}</p>
                    <p className="text-xs leading-snug mt-1.5">
                      <span className="font-bold text-destructive/90">Watch out:</span>{" "}
                      <span className="text-foreground/70">{m.risk}</span>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-1.5 flex-wrap rounded-xl border border-primary/25 bg-primary/5 px-4 py-2.5"
          >
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mr-1.5">
              Our dataset's journey
            </span>
            {JOURNEY.map((stop, i) => (
              <span key={stop} className="inline-flex items-center gap-1.5">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    i === JOURNEY.length - 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  {stop}
                </span>
                {i < JOURNEY.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-muted-foreground/60" aria-hidden="true" />
                )}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <RStudioPane initialCode={R_CODE} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
