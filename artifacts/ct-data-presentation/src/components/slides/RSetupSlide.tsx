import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import RStudioPane from "@/components/RStudioPane";

const R_LOAD_CODE = `# ------------------------------------------------------------
# Heart Disease Dataset (Kaggle: johnsmith88/heart-disease-dataset)
# Step 1: Load the data
# ------------------------------------------------------------
heart <- read.csv("heart.csv")

str(heart)     # 1,025 obs. of 14 variables
head(heart)    # peek at the first rows`;

const R_CODES_CODE = `# ------------------------------------------------------------
# Step 2: Define the codes (turn numeric codes into labelled factors)
# ------------------------------------------------------------
heart <- read.csv("heart.csv")

heart$sex     <- factor(heart$sex,     levels = c(0, 1),
                        labels = c("Female", "Male"))

heart$cp      <- factor(heart$cp,      levels = c(0, 1, 2, 3),
                        labels = c("Typical angina", "Atypical angina",
                                   "Non-anginal pain", "Asymptomatic"))

heart$fbs     <- factor(heart$fbs,     levels = c(0, 1),
                        labels = c("<= 120 mg/dl", "> 120 mg/dl"))

heart$restecg <- factor(heart$restecg, levels = c(0, 1, 2),
                        labels = c("Normal", "ST-T abnormality",
                                   "LV hypertrophy"))

heart$exang   <- factor(heart$exang,   levels = c(0, 1),
                        labels = c("No", "Yes"))

heart$slope   <- factor(heart$slope,   levels = c(0, 1, 2),
                        labels = c("Upsloping", "Flat", "Downsloping"))

heart$thal    <- factor(heart$thal,    levels = c(1, 2, 3),
                        labels = c("Normal", "Fixed defect",
                                   "Reversible defect"))

heart$target  <- factor(heart$target,  levels = c(0, 1),
                        labels = c("No disease", "Disease"))

summary(heart)   # labelled summary of every variable`;

const R_CLEAN_CODE = `# ------------------------------------------------------------
# Step 3: Clean before analysing (what we discovered earlier)
# ------------------------------------------------------------
heart <- read.csv("heart.csv")

nrow(heart)                              # 1,025 raw records

heart_clean <- heart[!duplicated(heart), ]
nrow(heart_clean)                        # 302 after dropping duplicates

heart_clean <- heart_clean[heart_clean$ca != 4, ]
nrow(heart_clean)                        # 298 after removing invalid ca = 4

heart_clean <- heart_clean[heart_clean$thal != 0, ]
nrow(heart_clean)                        # 296 analysis-ready records`;

const R_ANALYSIS_CODE = `# ------------------------------------------------------------
# Step 4: First statistical analysis on the cleaned data
# ------------------------------------------------------------
heart <- read.csv("heart.csv")
heart_clean <- heart[!duplicated(heart), ]
heart_clean <- heart_clean[heart_clean$ca != 4 & heart_clean$thal != 0, ]
heart_clean$target <- factor(heart_clean$target, levels = c(0, 1),
                             labels = c("No disease", "Disease"))
heart_clean$sex    <- factor(heart_clean$sex,    levels = c(0, 1),
                             labels = c("Female", "Male"))

# Descriptives: age by diagnosis
tapply(heart_clean$age, heart_clean$target, summary)

# t-test: is max heart rate different between groups?
t.test(thalach ~ target, data = heart_clean)

# Chi-square: is sex associated with heart disease?
table(heart_clean$sex, heart_clean$target)
chisq.test(table(heart_clean$sex, heart_clean$target))`;

const CODEBOOK: { name: string; meaning: string; codes: string }[] = [
  { name: "age", meaning: "Age in years", codes: "29 - 77 (continuous)" },
  { name: "sex", meaning: "Biological sex", codes: "0 = Female, 1 = Male" },
  { name: "cp", meaning: "Chest pain type", codes: "0-3 (typical -> asymptomatic)" },
  { name: "trestbps", meaning: "Resting blood pressure", codes: "mm Hg (continuous)" },
  { name: "chol", meaning: "Serum cholesterol", codes: "mg/dl (continuous)" },
  { name: "fbs", meaning: "Fasting blood sugar > 120", codes: "0 = No, 1 = Yes" },
  { name: "restecg", meaning: "Resting ECG result", codes: "0 = Normal, 1 = ST-T, 2 = LVH" },
  { name: "thalach", meaning: "Max heart rate achieved", codes: "bpm (continuous)" },
  { name: "exang", meaning: "Exercise-induced angina", codes: "0 = No, 1 = Yes" },
  { name: "oldpeak", meaning: "ST depression (exercise)", codes: "0.0 - 6.2 (continuous)" },
  { name: "slope", meaning: "Slope of peak ST segment", codes: "0 = Up, 1 = Flat, 2 = Down" },
  { name: "ca", meaning: "Major vessels coloured", codes: "0 - 3 (4 is invalid)" },
  { name: "thal", meaning: "Thalassemia test", codes: "1 = Normal, 2 = Fixed, 3 = Reversible" },
  { name: "target", meaning: "Diagnosis", codes: "0 = No disease, 1 = Disease" },
];

const STEPS: { key: string; label: string; code?: string }[] = [
  { key: "codebook", label: "1. The Codebook" },
  { key: "load", label: "2. Load in R", code: R_LOAD_CODE },
  { key: "codes", label: "3. Define the Codes", code: R_CODES_CODE },
  { key: "clean", label: "4. Clean", code: R_CLEAN_CODE },
  { key: "analyse", label: "5. Analyse", code: R_ANALYSIS_CODE },
];

export default function RSetupSlide({ data }: { data: HeartData[] }) {
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-2">
          Statistical Analysis in R
        </p>
        <h2 className="text-4xl md:text-5xl font-bold mb-2">Defining the Data</h2>
        <p className="text-lg text-muted-foreground">
          A live RStudio-style session — the {data.length} real records are loaded, and every
          script actually runs.
        </p>
      </motion.div>

      <div className="flex items-center justify-center gap-2 mb-5 flex-wrap">
        {STEPS.map((s, i) => (
          <Button
            key={s.key}
            variant={i === step ? "default" : "outline"}
            size="sm"
            onClick={() => setStep(i)}
            className="rounded-full px-4"
          >
            {s.label}
          </Button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="flex-none"
        >
          {current.key === "codebook" ? (
            <div className="rounded-2xl border border-border bg-card shadow-sm overflow-auto max-h-[48vh]">
              <table className="w-full text-sm text-left">
                <thead className="sticky top-0 bg-muted/80 backdrop-blur">
                  <tr>
                    <th className="px-4 py-2.5 font-semibold font-mono">Variable</th>
                    <th className="px-4 py-2.5 font-semibold">Meaning</th>
                    <th className="px-4 py-2.5 font-semibold">Codes / Units</th>
                  </tr>
                </thead>
                <tbody>
                  {CODEBOOK.map((row, i) => (
                    <motion.tr
                      key={row.name}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="border-t border-border/50"
                    >
                      <td className="px-4 py-2 font-mono text-primary font-semibold">{row.name}</td>
                      <td className="px-4 py-2">{row.meaning}</td>
                      <td className="px-4 py-2 text-muted-foreground">{row.codes}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <RStudioPane initialCode={current.code!} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
