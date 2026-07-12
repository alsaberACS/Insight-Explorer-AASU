import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FolderPlus, MousePointerClick, FileText, Database, Check } from "lucide-react";
import { HeartData } from "@/lib/data";
import step1Img from "@assets/open_D_-_step_1_1783841316474.png";
import step2Img from "@assets/open_D_-_step_2_1783841316474.png";
import step3Img from "@assets/open_D_-_step_3_1783841316474.png";

const STEPS = [
  {
    icon: Download,
    title: "Download the data",
    text: "Get heart.csv and its codebook from Kaggle.",
  },
  {
    icon: FolderPlus,
    title: "Create the project folder",
    text: "One folder on the Desktop holds everything.",
  },
  {
    icon: MousePointerClick,
    title: "Point RStudio at it",
    text: "Turn that folder into an RStudio Project.",
  },
];

const WIZARD_SHOTS = [
  {
    src: step1Img,
    label: "File → New Project…",
    caption: "In RStudio, open the File menu and choose New Project…",
  },
  {
    src: step2Img,
    label: "Existing Directory",
    caption: "Pick Existing Directory — the folder already exists on your Desktop.",
  },
  {
    src: step3Img,
    label: "Browse → Create Project",
    caption: "Browse to Desktop/heart_project and click Create Project.",
  },
];

export default function ProjectSetupSlide({ data: _data }: { data: HeartData[] }) {
  const [step, setStep] = useState(0);
  const [shot, setShot] = useState(0);

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-1"
        >
          Goal 6 · Hands-On
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-1"
        >
          Before the Code: Set Up Your Project
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground"
        >
          A tidy project folder is the first professional habit — three steps, once, forever.
        </motion.p>
      </div>

      <div className="flex gap-6 flex-1 min-h-0 max-h-[480px]">
        <div className="w-[320px] flex-none flex flex-col gap-3">
          {STEPS.map((s, i) => (
            <motion.button
              key={s.title}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              onClick={() => setStep(i)}
              className={
                "text-left rounded-2xl border p-4 transition-all " +
                (i === step
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border bg-card hover:border-primary/40")
              }
            >
              <div className="flex items-center gap-3 mb-1">
                <span
                  className={
                    "flex-none w-9 h-9 rounded-xl flex items-center justify-center " +
                    (i < step
                      ? "bg-primary text-primary-foreground"
                      : i === step
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground")
                  }
                >
                  {i < step ? <Check className="w-4.5 h-4.5" /> : <s.icon className="w-4.5 h-4.5" />}
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold">
                    Step {i + 1}
                  </p>
                  <h3 className="font-bold leading-tight">{s.title}</h3>
                </div>
              </div>
              <p className="text-[13px] text-foreground/70 leading-snug pl-12">{s.text}</p>
            </motion.button>
          ))}
        </div>

        <div className="flex-1 min-w-0 rounded-2xl border border-border bg-card shadow-sm p-5 flex flex-col">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="s0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex-1 flex flex-col justify-center gap-4"
              >
                <div className="flex items-center gap-4 rounded-xl border border-primary/25 bg-primary/5 p-4">
                  <span className="flex-none w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold">heart.csv — the dataset</h4>
                    <p className="text-sm text-foreground/75">
                      Kaggle: &ldquo;Heart Disease Dataset&rdquo; — 1,025 patient records, 14
                      clinical variables.
                    </p>
                  </div>
                  <a
                    href={`${import.meta.env.BASE_URL}heart.csv`}
                    download="heart.csv"
                    className="flex-none inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold px-3.5 py-2 hover:bg-primary/90 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-primary/25 bg-primary/5 p-4">
                  <span className="flex-none w-11 h-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold">The codebook — the dictionary</h4>
                    <p className="text-sm text-foreground/75">
                      Describes every column: what <em>cp</em>, <em>thalach</em>, and <em>ca</em>{" "}
                      mean, their units, and their valid codes. Data without a codebook is just
                      numbers.
                    </p>
                  </div>
                  <a
                    href={`${import.meta.env.BASE_URL}codebook.txt`}
                    download="codebook.txt"
                    className="flex-none inline-flex items-center gap-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold px-3.5 py-2 hover:bg-primary/90 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                </div>
                <p className="text-sm text-muted-foreground italic text-center">
                  Rule one of data analysis: never work with a dataset you cannot decode.
                </p>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex-1 flex flex-col justify-center items-center gap-5"
              >
                <div className="rounded-xl border border-border bg-background px-6 py-5 font-mono text-sm shadow-sm">
                  <p className="text-muted-foreground mb-2">Desktop/</p>
                  <p className="pl-5 text-primary font-semibold mb-2">heart_project/</p>
                  <p className="pl-10 text-foreground/80">heart.csv</p>
                  <p className="pl-10 text-foreground/80">codebook.txt</p>
                </div>
                <div className="text-center max-w-md">
                  <h4 className="font-bold mb-1.5">One folder, everything inside</h4>
                  <p className="text-sm text-foreground/75 leading-relaxed">
                    Right-click the Desktop → New Folder → name it{" "}
                    <span className="font-mono text-primary">heart_project</span>. Move the
                    downloaded data and codebook into it. This folder becomes the project&apos;s
                    single source of truth — scripts, data, and outputs all live here.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex-1 flex flex-col min-h-0"
              >
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  {WIZARD_SHOTS.map((w, i) => (
                    <button
                      key={w.label}
                      onClick={() => setShot(i)}
                      className={
                        "text-xs font-semibold rounded-full px-3.5 py-1.5 border transition-colors " +
                        (i === shot
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground/70 border-border hover:border-primary/40")
                      }
                    >
                      {i + 1}. {w.label}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={shot}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 min-h-0 flex flex-col"
                  >
                    <div className="flex-1 min-h-0 rounded-xl border border-border bg-[#22242e] p-2 flex items-center justify-center overflow-hidden">
                      <img
                        src={WIZARD_SHOTS[shot].src}
                        alt={WIZARD_SHOTS[shot].label}
                        className="max-h-full max-w-full object-contain rounded-lg"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground text-center mt-2.5">
                      {WIZARD_SHOTS[shot].caption}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
