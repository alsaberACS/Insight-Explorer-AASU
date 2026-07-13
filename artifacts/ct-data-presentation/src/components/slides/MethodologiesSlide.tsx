import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";

type Stage = { name: string; key: string; example: string };

const METHODOLOGIES: {
  id: string;
  name: string;
  fullName: string;
  description: string;
  stages: Stage[];
  type: "pipeline" | "cycle";
}[] = [
  {
    id: "kdd",
    name: "KDD",
    fullName: "Knowledge Discovery from Data",
    description: "Iterative process emphasizing pattern discovery. Example: Retailers use it for market basket analysis (milk & bread).",
    stages: [
      {
        name: "Data Cleaning",
        key: "Remove noise, errors, and inconsistent records so patterns are not distorted.",
        example: "Dropping duplicate patient rows and fixing impossible blood pressure values like 0.",
      },
      {
        name: "Data Integration",
        key: "Combine data from multiple sources into a single coherent store.",
        example: "Merging hospital lab results with clinic visit records into one table.",
      },
      {
        name: "Data Selection",
        key: "Keep only the data relevant to the question being asked.",
        example: "Selecting age, cholesterol, and chest pain type for a heart disease study.",
      },
      {
        name: "Data Transformation",
        key: "Reshape data into forms suitable for mining: normalize, aggregate, encode.",
        example: "Scaling cholesterol (126-564) to a 0-1 range so no variable dominates.",
      },
      {
        name: "Data Mining",
        key: "Apply algorithms to extract hidden patterns from the prepared data.",
        example: "Association rules revealing that exercise-induced angina co-occurs with disease.",
      },
      {
        name: "Pattern Evaluation",
        key: "Filter the discovered patterns: keep only valid, novel, useful ones.",
        example: "Keeping only rules with high support and confidence; discarding coincidences.",
      },
      {
        name: "Knowledge Presentation",
        key: "Communicate the validated knowledge with visuals and reports.",
        example: "A dashboard for cardiologists ranking the strongest risk factors.",
      },
    ],
    type: "pipeline",
  },
  {
    id: "semma",
    name: "SEMMA",
    fullName: "Sample, Explore, Modify, Model, Assess",
    description: "Developed by SAS Institute. Used heavily for building prediction models like loan approval using decision trees or random forests.",
    stages: [
      {
        name: "Sample",
        key: "Take a subset large enough to hold the signal, small enough to be fast.",
        example: "Prototyping on 200 of our 1,025 patients before running the full data.",
      },
      {
        name: "Explore",
        key: "Search visually and statistically for trends, relationships, anomalies.",
        example: "A scatter plot of age vs. maximum heart rate reveals a downward trend.",
      },
      {
        name: "Modify",
        key: "Create, select, and transform variables to sharpen the signal.",
        example: "Deriving an age-group category (under 45, 45-60, over 60) from raw age.",
      },
      {
        name: "Model",
        key: "Apply algorithms that predict or classify the outcome of interest.",
        example: "A decision tree predicting heart disease from chest pain type and thalassemia.",
      },
      {
        name: "Assess",
        key: "Judge the model's reliability and usefulness on data it has never seen.",
        example: "Comparing accuracy on a held-out 20% test set before trusting the model.",
      },
    ],
    type: "pipeline",
  },
  {
    id: "crisp",
    name: "CRISP-DM",
    fullName: "CRoss-Industry Standard Process for Data Mining",
    description: "Emphasizes business requirements and deployment. Used for recommendation engines at Spotify or YouTube.",
    stages: [
      {
        name: "Business Understanding",
        key: "Define the objective in business terms before touching any data.",
        example: "Goal: reduce readmissions of cardiac patients by finding high-risk profiles.",
      },
      {
        name: "Data Understanding",
        key: "Collect initial data, describe it, and surface quality problems early.",
        example: "Profiling all 14 variables in the heart dataset; spotting odd zero values.",
      },
      {
        name: "Data Preparation",
        key: "Build the final analysis table: clean, derive, merge, encode.",
        example: "Encoding chest pain categories as numbers and removing duplicates.",
      },
      {
        name: "Modeling",
        key: "Select techniques, apply them, and tune their parameters.",
        example: "Comparing logistic regression against a random forest on the same data.",
      },
      {
        name: "Evaluation",
        key: "Check the model against the business objective, not just accuracy.",
        example: "Is 85% accuracy safe enough to use in patient triage? What do errors cost?",
      },
      {
        name: "Deployment",
        key: "Put results into real use and monitor them over time.",
        example: "A risk-score tool integrated into the clinic's patient intake system.",
      },
    ],
    type: "cycle",
  },
  {
    id: "standard",
    name: "Standard Process",
    fullName: "Standard Process for Data Analysis",
    description: "A simplified teaching workflow (from our course text) focused on interpretable insights and storytelling for policymakers. Example: analyzing customer behavior.",
    stages: [
      {
        name: "Collecting Data",
        key: "Gather raw data from surveys, sensors, databases, or public sources.",
        example: "Downloading the Kaggle heart disease dataset (1,025 patients).",
      },
      {
        name: "Preprocessing",
        key: "Clean and structure the raw data so it is ready for analysis.",
        example: "Handling missing values and checking each variable has the right type.",
      },
      {
        name: "Analyzing & Insights",
        key: "Apply statistics and visualization to answer the actual questions.",
        example: "A t-test comparing cholesterol between patients with and without disease.",
      },
      {
        name: "Interpretation",
        key: "Translate the numbers into meaning within the real-world context.",
        example: "\"Patients with asymptomatic chest pain show the highest disease rate.\"",
      },
      {
        name: "Storytelling",
        key: "Communicate findings so decision-makers can act on them.",
        example: "A policy brief with three charts and one clear, memorable headline.",
      },
    ],
    type: "pipeline",
  },
];

export default function MethodologiesSlide({ data: _data }: { data: HeartData[] }) {
  const [activeMethod, setActiveMethod] = useState(METHODOLOGIES[0].id);
  const [stageIdx, setStageIdx] = useState(0);
  const method = METHODOLOGIES.find((m) => m.id === activeMethod)!;
  const stage = method.stages[Math.min(stageIdx, method.stages.length - 1)];

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-3">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-1"
        >
          Process Methodologies
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base text-muted-foreground"
        >
          How professionals turn raw data into knowledge. Click a stage to see what it means in practice.
        </motion.p>
      </div>

      <div className="flex gap-3 mb-3 flex-wrap">
        {METHODOLOGIES.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setActiveMethod(m.id);
              setStageIdx(0);
            }}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              activeMethod === m.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {m.name}
          </button>
        ))}
      </div>

      <div className="bg-card border border-border rounded-3xl p-5 shadow-sm flex-1 flex flex-col relative overflow-hidden min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={method.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            <div className="mb-2">
              <h3 className="text-xl font-bold text-primary mb-1">{method.fullName}</h3>
              <p className="text-foreground/80 max-w-3xl text-sm">{method.description}</p>
            </div>

            <div className="flex-1 flex items-center justify-center py-2 min-h-0">
              {method.type === "pipeline" ? (
                <div className="flex flex-wrap items-center justify-center gap-2 w-full">
                  {method.stages.map((s, i) => (
                    <div key={s.name} className="flex items-center">
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setStageIdx(i)}
                        aria-pressed={stageIdx === i}
                        className={`border px-3 py-2.5 rounded-xl text-center font-medium shadow-sm w-32 text-sm transition-all ${
                          stageIdx === i
                            ? "bg-primary/10 border-primary/50 text-primary ring-2 ring-primary/30"
                            : "bg-secondary/50 border-border hover:bg-secondary hover:-translate-y-0.5"
                        }`}
                      >
                        {s.name}
                      </motion.button>
                      {i < method.stages.length - 1 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.1 + 0.1 }}
                          className="text-muted-foreground mx-1"
                        >
                          &rarr;
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="relative w-[420px] h-[218px] mx-auto flex-none">
                  {method.stages.map((s, i) => {
                    const angle = (i / method.stages.length) * 2 * Math.PI - Math.PI / 2;
                    const x = Math.cos(angle) * 145;
                    const y = Math.sin(angle) * 82;
                    return (
                      <motion.button
                        key={s.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, x, y }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => setStageIdx(i)}
                        aria-pressed={stageIdx === i}
                        className={`absolute top-1/2 left-1/2 -ml-16 -mt-6 w-32 border px-2 py-1.5 rounded-xl text-center text-xs font-medium shadow-sm flex items-center justify-center h-12 transition-colors ${
                          stageIdx === i
                            ? "bg-primary/10 border-primary/50 text-primary ring-2 ring-primary/30"
                            : "bg-secondary/50 border-border hover:bg-secondary"
                        }`}
                      >
                        {s.name}
                      </motion.button>
                    );
                  })}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <div className="w-14 h-14 rounded-full border-4 border-dashed border-primary/30 animate-[spin_10s_linear_infinite]" />
                  </motion.div>
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${method.id}-${stage.name}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex-none rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3"
              >
                <div className="flex items-baseline gap-2.5 mb-1">
                  <span className="flex-none inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-[11px] font-bold w-5 h-5 leading-none">
                    {method.stages.indexOf(stage) + 1}
                  </span>
                  <h4 className="text-sm font-bold">{stage.name}</h4>
                </div>
                <p className="text-sm text-foreground/85 leading-snug mb-1">{stage.key}</p>
                <p className="text-sm text-muted-foreground leading-snug">
                  <span className="font-semibold text-primary">Example: </span>
                  {stage.example}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-3 text-xs md:text-sm text-muted-foreground text-center bg-secondary/30 py-2 px-6 rounded-lg">
        <strong>Synthesis:</strong> KDD emphasizes pattern discovery, SEMMA emphasizes model development, CRISP-DM emphasizes business understanding + deployment.
      </div>
    </div>
  );
}
