import { motion } from "framer-motion";
import { Compass, Crosshair, MoveHorizontal, BarChart3 } from "lucide-react";
import { HeartData } from "@/lib/data";

const TOPICS = [
  {
    icon: Compass,
    title: "Exploratory Data Analysis",
    text: "Interrogate the data before any model — every dataset has a story to surface.",
  },
  {
    icon: Crosshair,
    title: "Measures of Location",
    text: "Mean, median, and mode — where the centre of the data really sits.",
  },
  {
    icon: MoveHorizontal,
    title: "Measures of Dispersion",
    text: "Range, variance, and standard deviation — how far the data spreads.",
  },
  {
    icon: BarChart3,
    title: "Visualization",
    text: "The right chart reveals in seconds what a table hides in rows.",
  },
];

export default function GoalFiveSlide({ data: _data }: { data: HeartData[] }) {
  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 mb-5"
        >
          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">
            5
          </span>
          <span className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">
            Goal 5 of this workshop
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-4xl md:text-5xl font-bold leading-tight max-w-4xl mx-auto"
        >
          <span className="text-primary">Explore and visualize</span> the data
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto"
        >
          Clean data is only the beginning — now we summarise it with numbers and let charts do
          the talking.
        </motion.p>
      </div>

      <div className="grid grid-cols-4 gap-4 max-w-5xl mx-auto w-full">
        {TOPICS.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.09 }}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <span className="flex-none w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2.5">
              <t.icon className="w-4.5 h-4.5" />
            </span>
            <h3 className="font-bold leading-tight mb-1.5">{t.title}</h3>
            <p className="text-[13px] text-foreground/75 leading-snug">{t.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
