import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";
import { Button } from "@/components/ui/button";

const DEFINITIONS = [
  {
    id: "analysis",
    title: "Data Analysis",
    description: "The process of exploring and investigating data to discover hidden facts and patterns that serve business and policy decisions.",
    details: "Query & collect data, explore/understand it, visualize findings, prepare dashboards & reports, present as a story for decision-making. A sub-field of data science.",
    color: "border-chart-1 text-chart-1"
  },
  {
    id: "science",
    title: "Data Science",
    description: "A multidisciplinary field combining domain expertise, computer science, and statistics.",
    details: "An umbrella term covering analytics, machine learning, data mining, NLP, computer vision, and data engineering; goes beyond exploratory analysis to build prediction models (fraud detection, disease prediction, recommendations).",
    color: "border-chart-3 text-chart-3"
  },
  {
    id: "engineering",
    title: "Data Engineering",
    description: "Providing the correct data, in the required format, to the right people.",
    details: "Ingesting, processing, organizing, storing data; automated pipelines, ETL/ELT, data warehouses, data marts, data lakes/lakehouses.",
    color: "border-chart-4 text-chart-4"
  }
];

export default function DefinitionsSlide({ data }: { data: HeartData[] }) {
  const [revealedCount, setRevealedCount] = useState(0);

  const revealNext = () => setRevealedCount(prev => Math.min(prev + 1, DEFINITIONS.length));
  const revealAll = () => setRevealedCount(DEFINITIONS.length);

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-2"
          >
            What is Data Analysis?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Defining the disciplines
          </motion.p>
        </div>
        <div className="flex gap-2">
          {revealedCount < DEFINITIONS.length && (
            <>
              <Button variant="outline" onClick={revealNext}>Reveal Next</Button>
              <Button variant="ghost" onClick={revealAll}>Reveal All</Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {DEFINITIONS.map((def, i) => (
          <div key={def.id} className="relative h-full">
            <AnimatePresence>
              {i < revealedCount ? (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`h-full p-6 rounded-3xl border bg-card shadow-sm flex flex-col`}
                >
                  <h3 className={`text-2xl font-bold mb-3 ${def.color.split(' ')[1]}`}>{def.title}</h3>
                  <p className="font-medium text-foreground mb-3">{def.description}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{def.details}</p>
                </motion.div>
              ) : (
                <div className="h-full p-6 rounded-3xl border border-dashed border-border/50 bg-secondary/10 flex items-center justify-center">
                  <span className="text-muted-foreground/50 font-medium">Definition hidden</span>
                </div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: revealedCount === DEFINITIONS.length ? 1 : 0 }}
        className="w-full max-w-3xl mx-auto"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-full flex items-stretch justify-center h-24 gap-4">
             <div className="flex-1 border-2 border-chart-3/30 bg-chart-3/5 rounded-xl flex items-center justify-center relative">
               <span className="absolute top-2 left-3 text-xs font-bold text-chart-3 uppercase">Data Science</span>
               <div className="w-3/4 h-12 bg-chart-1/10 border border-chart-1/30 rounded-lg flex items-center justify-center mt-4">
                 <span className="text-sm font-semibold text-chart-1">Data Analysis</span>
               </div>
             </div>
          </div>
          <div className="w-full h-12 border-2 border-chart-4/30 bg-chart-4/5 rounded-xl flex items-center justify-center">
            <span className="text-sm font-bold text-chart-4 uppercase">Data Engineering (Foundation)</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
