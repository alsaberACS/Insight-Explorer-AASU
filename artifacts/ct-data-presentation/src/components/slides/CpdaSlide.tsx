import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Clock, CheckCircle2, CalendarCheck } from "lucide-react";
import { HeartData } from "@/lib/data";
import cpdaHero from "@assets/Screenshot_2026-07-13_at_10.02.19_AM_1783926357008.png";
import cpdaOverview from "@assets/Screenshot_2026-07-13_at_10.02.32_AM_1783926357008.png";
import cpdaSkills from "@assets/Screenshot_2026-07-13_at_10.02.45_AM_1783926357008.png";
import cpdaExam from "@assets/Screenshot_2026-07-13_at_10.03.01_AM_1783926357008.png";

const TABS = [
  {
    id: "certificate",
    label: "The Certificate",
    image: cpdaHero,
    caption:
      "CPDA — an internationally recognized, professionally accredited certification from the Data Science Institute.",
  },
  {
    id: "overview",
    label: "Programme",
    image: cpdaOverview,
    caption:
      "A 16-week structured programme covering data collection, statistical analysis, visualization, and communication.",
  },
  {
    id: "skills",
    label: "Knowledge & Skills",
    image: cpdaSkills,
    caption:
      "Four pillars: data analytics foundation, visualization, business intelligence, and predictive analytics.",
  },
  {
    id: "exam",
    label: "Exam Structure",
    image: cpdaExam,
    caption:
      "Scenario-based exams with real business datasets — exactly the way of thinking this course trains.",
  },
];

const FACTS = [
  { icon: Award, label: "Credential", value: "CPDA" },
  { icon: Clock, label: "Exam Length", value: "120 min" },
  { icon: CheckCircle2, label: "Pass Grade", value: "70%" },
  { icon: CalendarCheck, label: "Schedule", value: "On Demand" },
];

export default function CpdaSlide({ data: _data }: { data: HeartData[] }) {
  const [active, setActive] = useState("certificate");
  const tab = TABS.find((t) => t.id === active)!;

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-1.5">
          Beyond the Course
        </p>
        <h2 className="text-3xl font-bold mb-1.5">
          Your Pathway to an International Certification
        </h2>
        <p className="text-base text-muted-foreground">
          Complete this course and you are eligible to apply for the{" "}
          <span className="font-semibold text-foreground">
            Certified Professional Data Analyst (CPDA)
          </span>{" "}
          credential.
        </p>
      </motion.div>

      <div className="grid grid-cols-[240px_1fr] gap-5 flex-1 min-h-0">
        <div className="flex flex-col gap-2.5 justify-center">
          {TABS.map((t, i) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              onClick={() => setActive(t.id)}
              aria-pressed={active === t.id}
              className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all ${
                active === t.id
                  ? "border-primary/50 bg-primary/10 text-primary ring-2 ring-primary/30 shadow-sm"
                  : "border-border bg-card text-foreground/80 hover:bg-muted hover:-translate-y-0.5"
              }`}
            >
              <span className="block text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mb-0.5">
                Step {TABS.indexOf(t) + 1}
              </span>
              {t.label}
            </motion.button>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-2 grid grid-cols-2 gap-2"
          >
            {FACTS.map((f) => (
              <div
                key={f.label}
                className="rounded-lg border border-border bg-card px-2.5 py-2 text-center"
              >
                <f.icon className="h-4 w-4 text-primary mx-auto mb-1" />
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold leading-none mb-1">
                  {f.label}
                </p>
                <p className="text-sm font-bold leading-none">{f.value}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col min-h-0"
        >
          <div className="relative flex-1 min-h-0 rounded-2xl border border-border bg-card shadow-md overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={tab.id}
                src={tab.image}
                alt={tab.label}
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 w-full h-full object-contain bg-white"
              />
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={tab.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-sm text-muted-foreground text-center mt-2.5 leading-snug"
            >
              {tab.caption}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
