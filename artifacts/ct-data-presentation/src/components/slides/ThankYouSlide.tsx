import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, QrCode, ZoomIn, X, ClipboardCheck, Globe } from "lucide-react";
import { HeartData } from "@/lib/data";
import instructorPhoto from "@assets/AhmadPic_1783852171406.png";
import evaluationQr from "@assets/CCE_Evaluation_QR_Computational_Thinking_and_Data_Analysis_1783852164133.png";
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

export default function ThankYouSlide({ data: _data }: { data: HeartData[] }) {
  const [qrOpen, setQrOpen] = useState(false);

  return (
    <div className="relative w-full max-w-6xl mx-auto h-full flex items-center gap-12">
      <div className="pointer-events-none absolute -top-24 -left-32 w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 right-10 w-[360px] h-[360px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative flex-1 min-w-0">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-3"
        >
          Computational Thinking & Data Analysis
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl font-bold leading-[1.08] tracking-tight"
        >
          Thank you
          <br />
          <span className="text-primary">for listening.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-lg text-muted-foreground mt-5 max-w-xl leading-relaxed"
        >
          Your questions, ideas, and perspectives are what turn a workshop into a
          conversation — and a dataset into a story.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4 mt-8"
        >
          <img
            src={instructorPhoto}
            alt="Dr. Ahmad R. Alsaber"
            className="w-16 h-16 rounded-full object-cover object-top border-2 border-primary/40 bg-primary/10"
          />
          <div>
            <p className="text-base font-bold">Ahmad R. Alsaber, Ph.D.</p>
            <p className="text-sm text-muted-foreground">
              American University of Kuwait
            </p>
            <p className="flex items-center gap-1.5 text-xs font-medium text-primary mt-0.5">
              <Globe className="w-3 h-3" />
              alsaber.acs-kw.com
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 text-sm text-muted-foreground mt-6"
        >
          <Heart className="w-4 h-4 text-primary" />
          Built around 1,025 real patient records — because data analysis is best
          learned by doing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="mt-6"
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-2.5">
            In partnership with
          </p>
          <div className="flex items-center gap-2.5">
            {PARTNERS.map((p, i) => (
              <motion.div
                key={p.alt}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.07 }}
                className="h-11 rounded-lg border border-border/60 bg-white shadow-sm px-3 py-1.5 flex items-center"
              >
                <img src={p.src} alt={p.alt} className="h-full w-auto max-w-[96px] object-contain" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative flex-none w-[380px]"
      >
        <div className="rounded-3xl border border-primary/30 bg-card shadow-xl p-7 text-center">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/25 px-4 py-1.5 text-sm font-bold text-primary">
            <ClipboardCheck className="w-4 h-4" />
            One last thing
          </p>
          <h3 className="text-2xl font-bold mt-4 leading-snug">
            Help us shape the course
          </h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Scan the code to complete the workshop evaluation — two minutes of your
            feedback guides what we build next.
          </p>
          <button
            onClick={() => setQrOpen(true)}
            aria-label="Enlarge evaluation QR code"
            className="group relative mt-5 inline-block rounded-2xl border border-border bg-white p-3 shadow-md transition-shadow hover:shadow-lg"
          >
            <img
              src={evaluationQr}
              alt="QR code for the workshop evaluation"
              className="w-[190px] h-[190px]"
            />
            <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/0 opacity-0 transition-opacity group-hover:bg-black/35 group-hover:opacity-100">
              <ZoomIn className="w-7 h-7 text-white" />
            </span>
          </button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground mt-3">
            <QrCode className="w-3.5 h-3.5 text-primary" />
            Click the code to enlarge it for the room
          </p>
        </div>
      </motion.div>

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
                src={evaluationQr}
                alt="QR code for the workshop evaluation, enlarged"
                className="w-[400px] h-[400px]"
              />
              <p className="flex items-center gap-2 text-base font-bold text-slate-800 mt-2">
                <ClipboardCheck className="w-5 h-5 text-primary" />
                Scan to complete the workshop evaluation
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
