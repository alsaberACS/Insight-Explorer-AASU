import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, DownloadCloud, LifeBuoy, Copy, Check } from "lucide-react";
import { HeartData } from "@/lib/data";

const R_CODE = [
  'help(package = "psych")   # everything the library contains',
  "?describe                 # manual page for one function",
  '??"heart rate"            # search all installed help pages',
  'vignette(package = "psych")  # long-form guides & tutorials',
  "example(describe)         # run a function's own demo",
].join("\n");

const DISCOVER_WAYS = [
  {
    title: "CRAN Task Views",
    text: "cran.r-project.org/web/views — experts curate the best packages by topic: Machine Learning, Epidemiology, Time Series…",
  },
  {
    title: "Community & tutorials",
    text: "r-bloggers.com, Stack Overflow, and Kaggle notebooks show which packages real analysts reach for.",
  },
  {
    title: "Papers & colleagues",
    text: "Methods sections of published studies name their packages — the fastest route to field-standard tools.",
  },
];

const INSTALL_WAYS = [
  {
    code: 'install.packages("psych")',
    text: "The console way — works everywhere.",
  },
  {
    code: "Tools → Install Packages…",
    text: "The RStudio menu way — point, type a name, click Install.",
  },
  {
    code: 'install.packages(c("psych", "ggplot2"))',
    text: "Several at once — pass a vector of names.",
  },
];

export default function RLibraryDiscoverSlide({ data: _data }: { data: HeartData[] }) {
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
          Finding the Right Library
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground"
        >
          Discover it, install it, then interrogate it — R documents itself.
        </motion.p>
      </div>

      <div className="flex gap-5 flex-1 min-h-0 max-h-[485px]">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="w-[300px] flex-none rounded-2xl border border-border bg-card shadow-sm p-4 flex flex-col"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex-none w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
              <Compass className="w-4.5 h-4.5" />
            </span>
            <h3 className="font-bold">Discover</h3>
          </div>
          <div className="flex flex-col gap-3">
            {DISCOVER_WAYS.map((w) => (
              <div key={w.title} className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                <h4 className="text-sm font-bold text-primary mb-0.5">{w.title}</h4>
                <p className="text-[13px] text-foreground/75 leading-snug">{w.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-[300px] flex-none rounded-2xl border border-border bg-card shadow-sm p-4 flex flex-col"
        >
          <div className="flex items-center gap-2.5 mb-3">
            <span className="flex-none w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
              <DownloadCloud className="w-4.5 h-4.5" />
            </span>
            <h3 className="font-bold">Install</h3>
          </div>
          <div className="flex flex-col gap-3">
            {INSTALL_WAYS.map((w) => (
              <div key={w.code} className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                <p className="font-mono text-[12.5px] text-primary font-semibold mb-1 break-words">
                  {w.code}
                </p>
                <p className="text-[13px] text-foreground/75 leading-snug">{w.text}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="flex-1 min-w-0 flex flex-col gap-4 justify-center"
        >
          <div className="rounded-2xl border border-border bg-[#22242e] shadow-md overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-xs text-white/50 font-mono flex items-center gap-1.5">
                <LifeBuoy className="w-3.5 h-3.5" />
                Explore what a library can do
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
            <pre className="px-5 py-4 text-[13.5px] font-mono leading-[1.9] text-white/90">
              <code>
                <span className="text-sky-300">help</span>
                <span className="text-white/60">(package = </span>
                <span className="text-amber-300">&quot;psych&quot;</span>
                <span className="text-white/60">)</span>
                <span className="text-white/40">   # everything it contains</span>
                {"\n"}
                <span className="text-sky-300">?describe</span>
                <span className="text-white/40">                 # manual for one function</span>
                {"\n"}
                <span className="text-sky-300">??</span>
                <span className="text-amber-300">&quot;heart rate&quot;</span>
                <span className="text-white/40">            # search all help pages</span>
                {"\n"}
                <span className="text-sky-300">vignette</span>
                <span className="text-white/60">(package = </span>
                <span className="text-amber-300">&quot;psych&quot;</span>
                <span className="text-white/60">)</span>
                <span className="text-white/40"> # long-form guides</span>
                {"\n"}
                <span className="text-sky-300">example</span>
                <span className="text-white/60">(</span>
                <span className="text-teal-300">describe</span>
                <span className="text-white/60">)</span>
                <span className="text-white/40">         # run its own demo</span>
              </code>
            </pre>
          </div>

          <div className="rounded-xl border border-primary/25 bg-primary/5 p-4">
            <p className="text-sm text-foreground/80 leading-relaxed">
              <span className="font-semibold text-primary">Habit to teach:</span> one{" "}
              <span className="font-mono">?</span> opens a function&apos;s manual, two{" "}
              <span className="font-mono">??</span> search everything installed. Students who
              learn to read help pages stop needing the instructor.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
