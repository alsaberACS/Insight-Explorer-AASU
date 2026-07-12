import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, Quote, FileText, QrCode, ZoomIn, X } from "lucide-react";
import { HeartData } from "@/lib/data";
import instructorPhoto from "@assets/AhmadPic_1783851304239.png";
import cvQrCode from "@assets/Alsaber_CV_1783851372621.png";
import aukLogo from "@assets/auk-logo_1783852445171.jpeg";
import cceLogo from "@assets/CCE-AUK_New_Logo_2025_1783852445171.jpeg";
import kfasLogo from "@assets/KFAS_Logo_new_1754250510135_1783852445171.png";
import boubyanLogo from "@assets/BoubyanBankLogo_(1).svg_1783852445171.png";
import aasuLogo from "@assets/logorightcolor_1783852445171.png";

const PARTNERS = [
  { src: cceLogo, alt: "Continuing & Community Education, AUK", tier: "sm" },
  { src: aukLogo, alt: "American University of Kuwait", tier: "sm" },
  { src: kfasLogo, alt: "Kuwait Foundation for the Advancement of Sciences", tier: "sm" },
  { src: boubyanLogo, alt: "Boubyan Bank", tier: "md" },
  { src: aasuLogo, alt: "Abdullah Al Salem University", tier: "lg" },
] as const;

const TIER_TILE: Record<"sm" | "md" | "lg", string> = {
  sm: "h-8 px-2 py-1",
  md: "h-10 px-2.5 py-1",
  lg: "h-12 px-3 py-1.5",
};

const TIER_IMG: Record<"sm" | "md" | "lg", string> = {
  sm: "max-w-[72px]",
  md: "max-w-[92px]",
  lg: "max-w-[116px]",
};

const STATS = [
  { value: "15+", label: "Years of Experience" },
  { value: "113", label: "Publications" },
  { value: "752", label: "Citations" },
  { value: "16", label: "H-Index" },
];

const AREAS = ["Statistics", "Data Science", "Applied Research", "Healthcare Analytics"];

const EDUCATION = [
  {
    degree: "Ph.D. — Statistics & Data Science",
    place: "University of Strathclyde, Glasgow, UK · 2022",
  },
  {
    degree: "M.Sc. — Statistics",
    place: "Kuwait University · 2007",
  },
  {
    degree: "B.Sc. — Mathematics",
    place: "Kuwait University · 2002",
  },
];

export default function InstructorSlide({ data: _data }: { data: HeartData[] }) {
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <div className="relative w-full max-w-6xl mx-auto h-full flex items-center gap-10">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex-none w-[340px] flex flex-col items-center"
      >
        <div className="relative">
          <div className="absolute inset-x-6 bottom-0 top-10 rounded-[2.5rem] bg-gradient-to-b from-primary/25 via-primary/10 to-transparent" />
          <img
            src={instructorPhoto}
            alt="Dr. Ahmad R. Alsaber"
            className="relative w-[300px] h-[340px] object-contain object-bottom drop-shadow-xl"
          />
        </div>
        <motion.a
          href="https://alsaber.acs-kw.com"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative -mt-2 flex items-center gap-3.5 rounded-2xl border border-primary/30 bg-card shadow-lg px-4 py-3 transition-colors hover:border-primary hover:bg-primary/5"
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQrOpen(true);
            }}
            aria-label="Enlarge QR code"
            className="group relative flex-none rounded-lg border border-border bg-white p-1 transition-shadow hover:shadow-md"
          >
            <img
              src={cvQrCode}
              alt="QR code linking to full CV"
              className="w-[78px] h-[78px]"
            />
            <span className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/0 opacity-0 transition-opacity group-hover:bg-black/35 group-hover:opacity-100">
              <ZoomIn className="w-5 h-5 text-white" />
            </span>
          </button>
          <div>
            <p className="flex items-center gap-1.5 text-sm font-bold text-primary">
              <QrCode className="w-4 h-4" />
              Scan for full CV
            </p>
            <p className="text-xs text-muted-foreground mt-1 leading-snug">
              Publications, grants, and
              <br />
              academic profiles
            </p>
            <p className="text-[11px] font-medium text-primary/80 mt-1">alsaber.acs-kw.com</p>
          </div>
        </motion.a>
      </motion.div>

      <div className="flex-1 min-w-0">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-2"
        >
          Your Instructor
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold leading-tight"
        >
          Ahmad R. Alsaber, <span className="text-primary">Ph.D.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base text-muted-foreground mt-1.5"
        >
          Statistician & Data Scientist · Director — Institutional Research & Effectiveness,
          College of Business and Economics, American University of Kuwait
        </motion.p>

        <div className="grid grid-cols-4 gap-3 mt-5">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.08 }}
              className="rounded-2xl border border-border bg-card px-3 py-3 text-center shadow-sm"
            >
              <p className="text-2xl font-bold text-primary">{s.value}</p>
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground mt-0.5">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-[1.15fr_1fr] gap-4 mt-4">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <p className="flex items-center gap-2 text-sm font-bold mb-2.5">
              <GraduationCap className="w-4 h-4 text-primary" />
              Education
            </p>
            <div className="space-y-2">
              {EDUCATION.map((e) => (
                <div key={e.degree} className="flex gap-2.5">
                  <span className="mt-[7px] w-1.5 h-1.5 flex-none rounded-full bg-primary" />
                  <div>
                    <p className="text-[13px] font-semibold leading-tight">{e.degree}</p>
                    <p className="text-xs text-muted-foreground">{e.place}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-4"
          >
            <div className="rounded-2xl border border-border bg-card p-4 shadow-sm flex-1">
              <p className="flex items-center gap-2 text-sm font-bold mb-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Research Areas
              </p>
              <div className="flex flex-wrap gap-1.5">
                {AREAS.map((a) => (
                  <span
                    key={a}
                    className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-primary/10 border border-primary/25 p-4">
              <p className="flex items-start gap-2 text-[13px] leading-snug text-foreground/85">
                <Quote className="w-4 h-4 flex-none text-primary mt-0.5" />
                Expert in R, Python, SPSS & STATA — turning multivariate analysis, machine
                learning, and predictive modeling into decisions that matter.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="flex items-center gap-2 text-xs text-muted-foreground mt-3.5"
        >
          <FileText className="w-3.5 h-3.5 text-primary" />
          Research aligned with institutional strategy, national priorities, and the UN
          Sustainable Development Goals
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="flex items-center gap-3 mt-3.5 pt-3.5 border-t border-border/60"
        >
          <p className="flex-none text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            In partnership with
          </p>
          <div className="flex items-center gap-2">
            {PARTNERS.map((p, i) => (
              <motion.div
                key={p.alt}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.06 }}
                className={`rounded-lg border border-border/60 bg-white shadow-sm flex items-center ${TIER_TILE[p.tier]}`}
              >
                <img src={p.src} alt={p.alt} className={`h-full w-auto object-contain ${TIER_IMG[p.tier]}`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {qrOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setQrOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-3xl bg-white shadow-2xl p-8 flex flex-col items-center"
            >
              <button
                onClick={() => setQrOpen(false)}
                aria-label="Close enlarged QR code"
                className="absolute top-3 right-3 rounded-full border border-slate-200 bg-white p-1.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={cvQrCode}
                alt="QR code linking to full CV, enlarged"
                className="w-[380px] h-[380px]"
              />
              <p className="flex items-center gap-2 text-base font-bold text-slate-800 mt-2">
                <QrCode className="w-5 h-5 text-primary" />
                Scan to open the full CV
              </p>
              <p className="text-sm text-slate-500 mt-1">alsaber.acs-kw.com</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
