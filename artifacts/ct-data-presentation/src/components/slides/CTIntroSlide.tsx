import { motion } from "framer-motion";
import { HeartData } from "@/lib/data";

const PILLARS = [
  {
    title: "Decomposition",
    desc: "Breaking down 'predict heart disease' into smaller signals (age, cholesterol, blood pressure).",
  },
  {
    title: "Pattern Recognition",
    desc: "Identifying trends: 'Do older patients with high cholesterol show higher disease rates?'",
  },
  {
    title: "Abstraction",
    desc: "Ignoring irrelevant details (e.g., patient names or height) to focus on key medical indicators.",
  },
  {
    title: "Algorithms",
    desc: "Creating step-by-step rules to classify a new patient based on observed patterns.",
  }
];

export default function CTIntroSlide({ data }: { data: HeartData[] }) {
  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          The Four Pillars
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-3xl"
        >
          How would a computer help doctors predict heart disease?
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PILLARS.map((pillar, i) => (
          <motion.div
            key={pillar.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="p-8 rounded-3xl bg-secondary/50 border border-border flex flex-col gap-4 relative overflow-hidden"
          >
            <div className="text-6xl font-bold text-foreground/5 absolute -top-4 -right-2 pointer-events-none">
              0{i + 1}
            </div>
            <h3 className="text-2xl font-bold text-primary">{pillar.title}</h3>
            <p className="text-lg text-foreground/80 leading-relaxed relative z-10">
              {pillar.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
