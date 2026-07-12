import { motion } from "framer-motion";
import { HeartData } from "@/lib/data";
import bookCover from "@assets/Screenshot_2026-07-09_at_9.48.38_PM_1783622946840.png";
import aukLogo from "@assets/auk-logo_1783852445171.jpeg";
import cceLogo from "@assets/CCE-AUK_New_Logo_2025_1783852445171.jpeg";
import kfasLogo from "@assets/KFAS_Logo_new_1754250510135_1783852445171.png";
import boubyanLogo from "@assets/BoubyanBankLogo_(1).svg_1783852445171.png";
import aasuLogo from "@assets/logorightcolor_1783852445171.png";

const PARTNERS = [
  { src: cceLogo, alt: "Continuing & Community Education, AUK" },
  { src: aukLogo, alt: "American University of Kuwait" },
  { src: kfasLogo, alt: "Kuwait Foundation for the Advancement of Sciences" },
  { src: boubyanLogo, alt: "Boubyan Bank" },
  { src: aasuLogo, alt: "Abdullah Al Salem University" },
];

interface SlideProps {
  data: HeartData[];
}

export default function TitleSlide({ data }: SlideProps) {
  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center gap-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
          >
            Data Science Fundamentals
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-tight"
          >
            Computational<br/>
            Thinking &<br/>
            <span className="text-primary">Data Analysis</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-1 border-l-4 border-primary/60 pl-4"
          >
            <p className="text-lg md:text-xl font-semibold text-foreground">
              Instructor: Ahmad R Alsaber <span className="text-muted-foreground font-normal">|</span> Ph.D. in Data Science
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              Director &ndash; Institutional Research &amp; Effectiveness, American University of Kuwait (AUK)
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-3 shrink-0"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">
            Recommended Book
          </div>
          <img
            src={bookCover}
            alt="Python Data Analysis, Fourth Edition, by Avinash Navlani and Cornellius Yudha Wijaya"
            className="w-40 md:w-44 rounded-lg shadow-xl border border-border/50 rotate-1 hover:rotate-0 transition-transform"
          />
          <div className="text-sm text-muted-foreground text-center max-w-[15rem] leading-snug">
            Python Data Analysis (4th ed.)<br/>
            Navlani & Wijaya, Packt
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-1"
      >
        <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-chart-1/10 flex items-center justify-center mb-3">
            <div className="h-6 w-6 rounded bg-chart-1" />
          </div>
          <h3 className="text-lg font-bold mb-1.5">Computational Thinking</h3>
          <p className="text-sm text-muted-foreground leading-snug">
            Analyzing problems and breaking them down into manageable components using logical and algorithmic thinking.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center mb-3">
            <div className="h-6 w-6 rounded-full bg-chart-3" />
          </div>
          <h3 className="text-lg font-bold mb-1.5">Data Collection</h3>
          <p className="text-sm text-muted-foreground leading-snug">
            Using modern tools to organize information, clean datasets, and identify meaningful patterns reliably.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-card border border-border shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-chart-4/10 flex items-center justify-center mb-3">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-chart-4" />
          </div>
          <h3 className="text-lg font-bold mb-1.5">Data Visualization</h3>
          <p className="text-sm text-muted-foreground leading-snug">
            Creating interactive dashboards to present findings visually and support evidence-based decision-making.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex items-center justify-center gap-4"
      >
        <p className="flex-none text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-semibold">
          In partnership with
        </p>
        <div className="h-8 w-px bg-border flex-none" />
        <div className="flex items-center gap-3">
          {PARTNERS.map((p, i) => (
            <motion.div
              key={p.alt}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 + i * 0.08 }}
              className="h-14 rounded-xl border border-border/60 bg-white shadow-sm px-4 py-2 flex items-center"
            >
              <img src={p.src} alt={p.alt} className="h-full w-auto max-w-[130px] object-contain" />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
