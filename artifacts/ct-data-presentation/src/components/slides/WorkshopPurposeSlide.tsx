import { motion } from "framer-motion";
import { Target, Users, Lightbulb, GraduationCap } from "lucide-react";
import { HeartData } from "@/lib/data";

const PILLARS = [
  {
    icon: Users,
    title: "Who",
    text: "Faculty from across disciplines — every field now produces and consumes data."
  },
  {
    icon: Lightbulb,
    title: "How",
    text: "A guided tour of the field: concepts, methodologies, tools, and live analysis."
  },
  {
    icon: Target,
    title: "Outcome",
    text: "A shortlist of suitable topics and learning outcomes, shaped by your feedback."
  }
];

export default function WorkshopPurposeSlide({ data: _data }: { data: HeartData[] }) {
  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-3">
          Why We Are Here
        </p>
        <h2 className="text-4xl md:text-5xl font-bold leading-tight max-w-4xl mx-auto">
          Designing a university course in{" "}
          <span className="text-primary">understanding data analysis</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
        className="relative rounded-2xl border border-primary/25 bg-primary/5 p-8 mb-10 max-w-4xl mx-auto"
      >
        <div className="absolute -top-5 left-8 w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md">
          <GraduationCap className="w-5 h-5" />
        </div>
        <p className="text-xl md:text-2xl leading-relaxed text-foreground/90 font-medium">
          This workshop's mission: together, identify the{" "}
          <span className="text-primary font-bold">suitable topics</span> for establishing a
          university course that gives students a genuine{" "}
          <span className="text-primary font-bold">understanding of data analysis</span> —
          not just the mechanics, but the thinking behind it.
        </p>
      </motion.div>

      <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 + i * 0.12 }}
            className="rounded-2xl border border-border bg-card shadow-sm p-6 text-center"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
              <p.icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold mb-1.5">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-snug">{p.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-center text-sm text-muted-foreground mt-8"
      >
        A draft of the course's learning outcomes follows — treat it as a starting point for discussion.
      </motion.p>
    </div>
  );
}
