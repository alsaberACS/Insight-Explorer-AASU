import { motion } from "framer-motion";
import {
  Inbox,
  Combine,
  Server,
  Eraser,
  Shuffle,
  FolderCog,
} from "lucide-react";
import { HeartData } from "@/lib/data";

const TOPICS = [
  {
    icon: Inbox,
    title: "Data Collection",
    text: "Gathering raw material: surveys, sensors, files, APIs, and public repositories.",
  },
  {
    icon: Combine,
    title: "Data Integration",
    text: "Merging sources that were never designed to meet — keys, joins, and formats.",
  },
  {
    icon: Server,
    title: "Data Hosting",
    text: "Where data lives: files, databases, and the cloud — and who can access it.",
  },
  {
    icon: Eraser,
    title: "Data Cleaning",
    text: "Finding and fixing missing values, duplicates, and impossible codes.",
  },
  {
    icon: Shuffle,
    title: "Data Wrangling",
    text: "Reshaping, filtering, and transforming data until it fits the question.",
  },
  {
    icon: FolderCog,
    title: "Data Management",
    text: "Organising, documenting, and versioning data so analysis stays reproducible.",
  },
];

export default function GoalFourSlide({ data: _data }: { data: HeartData[] }) {
  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-6 py-2.5 mb-5"
        >
          <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center">
            4
          </span>
          <span className="text-sm uppercase tracking-[0.25em] text-primary font-semibold">
            Goal 4 of this workshop
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-4xl md:text-5xl font-bold leading-tight max-w-4xl mx-auto"
        >
          Learn to <span className="text-primary">deal with data</span> itself
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto"
        >
          Most of an analyst's time is spent before any model runs — collecting, combining,
          cleaning, and organising the data until it can be trusted.
        </motion.p>
      </div>

      <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto w-full">
        {TOPICS.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.09 }}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-1.5">
              <span className="flex-none w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <t.icon className="w-4.5 h-4.5" />
              </span>
              <h3 className="font-bold leading-tight">{t.title}</h3>
            </div>
            <p className="text-[13px] text-foreground/75 leading-snug">{t.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
