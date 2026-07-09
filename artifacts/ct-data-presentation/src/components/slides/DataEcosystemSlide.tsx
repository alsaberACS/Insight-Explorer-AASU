import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";

const ROLES = [
  {
    id: "analyst",
    title: "Data Analyst",
    discipline: "Data Analysis",
    description: "Focuses on optimizing operations, profits, and effectiveness by turning data into actionable insights.",
    tasks: "Answers business questions with reports, dashboards, and EDA (Exploratory Data Analysis).",
    skills: [
      "EDA",
      "Relational Databases / SQL (Postgres, MySQL)",
      "Visualization & BI Tools (Tableau, Power BI, QlikView)",
      "Spreadsheets (Excel / Google Sheets)",
      "Storytelling & Presentation"
    ],
    color: "bg-chart-1"
  },
  {
    id: "scientist",
    title: "Data Scientist",
    discipline: "Data Science",
    description: "Applies advanced modeling techniques to solve complex, open-ended problems and predict future outcomes.",
    tasks: "Builds predictive and statistical models for open-ended problems. The \"jack of all trades\".",
    skills: [
      "Mathematics & Statistics",
      "Machine Learning",
      "Programming (Python / R)",
      "Big Data (Hadoop, Spark, Flink)",
      "Deep Learning (TensorFlow, PyTorch)"
    ],
    color: "bg-chart-3"
  },
  {
    id: "engineer",
    title: "Data Engineer",
    discipline: "Data Engineering",
    description: "Architects the infrastructure required to support data generation, storage, and retrieval at scale.",
    tasks: "Builds and maintains robust data pipelines and scalable platforms.",
    skills: [
      "SQL & Relational DBs",
      "NoSQL (MongoDB, DynamoDB, Redis)",
      "Programming (Python, Scala, Java)",
      "Data Orchestration",
      "ETL / ELT Automation"
    ],
    color: "bg-chart-4"
  }
];

export default function DataEcosystemSlide({ data }: { data: HeartData[] }) {
  const [activeRole, setActiveRole] = useState<string | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-3"
        >
          The People: Job Roles & Skills
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto"
        >
          How these disciplines translate into daily work and required expertise.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ROLES.map((role, i) => {
          const isActive = activeRole === role.id;
          return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              onClick={() => setActiveRole(isActive ? null : role.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveRole(isActive ? null : role.id);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              className={`p-5 rounded-3xl border transition-all cursor-pointer relative overflow-hidden flex flex-col min-h-[320px] ${
                isActive 
                  ? "bg-card border-primary shadow-lg ring-1 ring-primary/20" 
                  : "bg-secondary/30 border-border hover:border-primary/50 hover:bg-secondary/50"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${role.color}`} />
                  <div className="text-sm uppercase tracking-wider font-semibold text-muted-foreground">
                    {role.discipline}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{role.title}</h3>
                <p className="text-foreground/80 text-sm leading-relaxed mb-4">
                  {role.description}
                </p>
                
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium text-primary mt-auto pt-4 flex items-center"
                    >
                      Click to reveal skills & tasks &rarr;
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 border-t border-border mt-auto"
                  >
                    <div className="mb-3">
                      <span className="font-semibold text-sm block mb-1">Focus:</span>
                      <p className="text-sm text-muted-foreground">{role.tasks}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-sm block mb-2">Key Skills:</span>
                      <ul className="flex flex-wrap gap-2">
                        {role.skills.map(skill => (
                          <li key={skill} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
