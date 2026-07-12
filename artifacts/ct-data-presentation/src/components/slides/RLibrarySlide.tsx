import { useState } from "react";
import { motion } from "framer-motion";
import { Package, DownloadCloud, BookOpen, Copy, Check } from "lucide-react";
import { HeartData } from "@/lib/data";

const R_CODE =
  'install.packages("psych")   # once per computer\nlibrary(psych)              # each session\ndescribe(heart)             # rich summary of every column';

const OUTPUT_ROWS = [
  { var: "age", n: "1025", mean: "54.43", sd: "9.07", min: "29", max: "77" },
  { var: "trestbps", n: "1025", mean: "131.61", sd: "17.52", min: "94", max: "200" },
  { var: "chol", n: "1025", mean: "246.00", sd: "51.59", min: "126", max: "564" },
  { var: "thalach", n: "1025", mean: "149.11", sd: "23.01", min: "71", max: "202" },
];

export default function RLibrarySlide({ data: _data }: { data: HeartData[] }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(R_CODE);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = R_CODE;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          Dealing with R Libraries
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground"
        >
          Base R is the engine — libraries are the toolkits the community built on top of it.
        </motion.p>
      </div>

      <div className="flex gap-6 flex-1 min-h-0 max-h-[480px]">
        <div className="w-[400px] flex-none flex flex-col gap-4 justify-center">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-primary/30 bg-primary/10 p-5"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="flex-none w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                <Package className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-lg">What is a library?</h3>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">
              A library (or <em>package</em>) is a bundle of ready-made functions written by the R
              community — over 20,000 of them, free. Instead of writing a summary routine from
              scratch, you install a package once and borrow decades of statistical craftsmanship
              with one line.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/5 p-4"
          >
            <span className="flex-none w-9 h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
              <DownloadCloud className="w-4.5 h-4.5" />
            </span>
            <p className="text-sm text-foreground/80 leading-snug">
              <span className="font-mono text-primary font-semibold">install.packages()</span>{" "}
              downloads a library to your computer — like installing an app. You do this{" "}
              <span className="font-semibold">once</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-start gap-3 rounded-xl border border-primary/25 bg-primary/5 p-4"
          >
            <span className="flex-none w-9 h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
              <BookOpen className="w-4.5 h-4.5" />
            </span>
            <p className="text-sm text-foreground/80 leading-snug">
              <span className="font-mono text-primary font-semibold">library()</span> opens it —
              like launching the app. You do this{" "}
              <span className="font-semibold">at the start of every session</span>.
            </p>
          </motion.div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col gap-4 justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-border bg-[#22242e] shadow-md overflow-hidden"
          >
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-white/50 font-mono">
                Example: the psych library
              </span>
              <button
                onClick={copyCode}
                className={
                  "ml-auto inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors " +
                  (copied
                    ? "bg-teal-500/20 text-teal-300"
                    : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white")
                }
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="px-5 py-4 text-[14px] font-mono leading-relaxed text-white/90">
              <code>
                <span className="text-sky-300">install.packages</span>
                <span className="text-white/60">(</span>
                <span className="text-amber-300">&quot;psych&quot;</span>
                <span className="text-white/60">)</span>
                <span className="text-white/40">   # once per computer</span>
                {"\n"}
                <span className="text-sky-300">library</span>
                <span className="text-white/60">(</span>
                <span className="text-teal-300">psych</span>
                <span className="text-white/60">)</span>
                <span className="text-white/40">              # each session</span>
                {"\n"}
                <span className="text-sky-300">describe</span>
                <span className="text-white/60">(</span>
                <span className="text-teal-300">heart</span>
                <span className="text-white/60">)</span>
                <span className="text-white/40">             # rich summary of every column</span>
              </code>
            </pre>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
          >
            <div className="px-4 py-2.5 border-b border-border flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">
                What describe(heart) returns
              </p>
              <p className="text-xs text-muted-foreground">excerpt — 4 of 14 variables</p>
            </div>
            <table className="w-full text-sm font-mono">
              <thead>
                <tr className="text-muted-foreground text-xs border-b border-border">
                  <th className="text-left px-4 py-2 font-semibold">variable</th>
                  <th className="text-right px-4 py-2 font-semibold">n</th>
                  <th className="text-right px-4 py-2 font-semibold">mean</th>
                  <th className="text-right px-4 py-2 font-semibold">sd</th>
                  <th className="text-right px-4 py-2 font-semibold">min</th>
                  <th className="text-right px-4 py-2 font-semibold">max</th>
                </tr>
              </thead>
              <tbody>
                {OUTPUT_ROWS.map((r) => (
                  <tr key={r.var} className="border-b border-border/50 last:border-0">
                    <td className="px-4 py-1.5 text-primary font-semibold">{r.var}</td>
                    <td className="px-4 py-1.5 text-right text-foreground/80">{r.n}</td>
                    <td className="px-4 py-1.5 text-right text-foreground/80">{r.mean}</td>
                    <td className="px-4 py-1.5 text-right text-foreground/80">{r.sd}</td>
                    <td className="px-4 py-1.5 text-right text-foreground/80">{r.min}</td>
                    <td className="px-4 py-1.5 text-right text-foreground/80">{r.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-4 py-2.5 text-xs text-muted-foreground border-t border-border">
              One line replaces fourteen separate mean(), sd(), and range() calls — that is what
              libraries buy you.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
