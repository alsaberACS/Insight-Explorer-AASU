import { motion } from "framer-motion";
import { FileInput, Eye } from "lucide-react";
import { HeartData } from "@/lib/data";
import rstudioImg from "@assets/Screenshot_2026-07-12_at_10.55.00_AM_1783842984248.png";

export default function ReadDataSlide({ data: _data }: { data: HeartData[] }) {
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
          Open the Data in RStudio
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground"
        >
          Two lines of R turn a file on disk into a dataset you can question.
        </motion.p>
      </div>

      <div className="flex gap-6 flex-1 min-h-0 max-h-[480px]">
        <div className="w-[400px] flex-none flex flex-col gap-4 justify-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border bg-[#22242e] shadow-md overflow-hidden"
          >
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-white/50 font-mono">Console</span>
            </div>
            <pre className="px-5 py-4 text-[15px] font-mono leading-relaxed text-white/90">
              <code>
                <span className="text-teal-300">heart</span>{" "}
                <span className="text-white/60">&lt;-</span>{" "}
                <span className="text-sky-300">read.csv</span>
                <span className="text-white/60">(</span>
                <span className="text-amber-300">&quot;heart.csv&quot;</span>
                <span className="text-white/60">)</span>
                {"\n"}
                <span className="text-sky-300">head</span>
                <span className="text-white/60">(</span>
                <span className="text-teal-300">heart</span>
                <span className="text-white/60">)</span>
              </code>
            </pre>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/5 p-4"
          >
            <span className="flex-none w-9 h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
              <FileInput className="w-4.5 h-4.5" />
            </span>
            <p className="text-sm text-foreground/80 leading-snug">
              <span className="font-mono text-primary font-semibold">read.csv()</span> loads the
              file into a data frame named <span className="font-mono">heart</span>. Because the
              project folder is the working directory, the file name alone is enough — no long
              paths.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/5 p-4"
          >
            <span className="flex-none w-9 h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
              <Eye className="w-4.5 h-4.5" />
            </span>
            <p className="text-sm text-foreground/80 leading-snug">
              <span className="font-mono text-primary font-semibold">head()</span> prints the
              first six rows — the fastest sanity check that the data arrived intact, with the
              14 columns you expect.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 min-w-0 flex flex-col"
        >
          <div className="flex-1 min-h-0 rounded-2xl border border-border bg-[#22242e] p-2 shadow-sm flex items-center justify-center overflow-hidden">
            <img
              src={rstudioImg}
              alt="RStudio with the heart data project open, running read.csv on heart.csv"
              className="max-h-full max-w-full object-contain rounded-lg"
            />
          </div>
          <p className="text-sm text-muted-foreground text-center mt-2.5">
            RStudio inside the <span className="font-mono">heart data</span> project — the Files
            pane (bottom right) shows heart.csv and codebook.txt ready to load.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
