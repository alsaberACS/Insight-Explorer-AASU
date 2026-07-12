import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, Copy, Check, Target } from "lucide-react";
import { HeartData } from "@/lib/data";

const TESTS = [
  {
    name: "One-sample t-test",
    when: "Compare the mean of one numeric variable against a known or hypothesized value.",
    example:
      "Is the average cholesterol of our patients different from the population reference of 200 mg/dl?",
    code: "t.test(heart$chol, mu = 200)",
  },
  {
    name: "Two-sample t-test",
    when: "Compare the means of one numeric variable between two independent groups.",
    example: "Do patients with and without heart disease differ in maximum heart rate?",
    code: "t.test(thalach ~ target,\n       data = heart)",
  },
  {
    name: "ANOVA",
    when: "Compare the means of one numeric variable across three or more groups.",
    example: "Does maximum heart rate differ across the four chest-pain types?",
    code: "model <- aov(thalach ~ factor(cp),\n             data = heart)\nsummary(model)\nTukeyHSD(model)   # which pairs?",
  },
  {
    name: "Chi-square",
    when: "Test whether two categorical variables are associated (independence of a contingency table).",
    example: "Is sex associated with the presence of heart disease?",
    code: "tab <- table(heart$sex,\n             heart$target)\nchisq.test(tab)",
  },
  {
    name: "Pearson correlation",
    when: "Measure the strength of a straight-line relationship between two numeric variables (normally distributed).",
    example: "As age rises, does maximum heart rate fall linearly?",
    code: 'cor.test(heart$age,\n         heart$thalach,\n         method = "pearson")',
  },
  {
    name: "Spearman correlation",
    when: "Rank-based correlation — for skewed data, ordinal scales, or curved but monotonic relationships.",
    example: "Does ST depression (oldpeak, right-skewed) rise with the number of blocked vessels (ca)?",
    code: 'cor.test(heart$oldpeak,\n         heart$ca,\n         method = "spearman")',
  },
  {
    name: "Multiple regression",
    when: "Model a numeric outcome from several predictors at once — each coefficient is an adjusted effect.",
    example: "How much heart rate does each year of age cost, holding sex, chest pain, and blood pressure fixed?",
    code: "fit <- lm(thalach ~ age + sex +\n          cp + trestbps,\n          data = heart)\nsummary(fit)",
  },
  {
    name: "Logistic regression",
    when: "Model a yes/no outcome; coefficients become odds ratios after exponentiating.",
    example: "Which factors multiply the odds of heart disease, and by how much?",
    code: "logit <- glm(target ~ age + sex +\n             oldpeak + cp,\n             data = heart,\n             family = binomial)\nexp(coef(logit))   # odds ratios",
  },
  {
    name: "Non-parametric cousins",
    when: "When data are skewed or ordinal and t-test/ANOVA assumptions fail — swap in the rank-based versions.",
    example: "Compare oldpeak (skewed) between disease groups, or across chest-pain types.",
    code: "wilcox.test(oldpeak ~ target,\n            data = heart)   # 2 groups\n\nkruskal.test(oldpeak ~ factor(cp),\n             data = heart)  # 3+ groups",
  },
];

export default function StatTestsSlide({ data: _data }: { data: HeartData[] }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const test = TESTS[active];

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(test.code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = test.code;
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
          The Statistical Test Toolbox
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground"
        >
          Nine tools, one rule: the question and the variable types pick the test — never the
          other way round.
        </motion.p>
      </div>

      <div className="flex gap-6 flex-1 min-h-0 max-h-[475px]">
        <div className="w-[380px] flex-none grid grid-cols-2 gap-2.5 content-center">
          {TESTS.map((t, i) => (
            <motion.button
              key={t.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.05 }}
              onClick={() => {
                setActive(i);
                setCopied(false);
              }}
              className={
                "text-left rounded-xl border px-3.5 py-2.5 transition-all " +
                (i === active
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border bg-card hover:border-primary/40")
              }
            >
              <p
                className={
                  "text-[13px] font-bold leading-tight " +
                  (i === active ? "text-primary" : "text-foreground/85")
                }
              >
                {t.name}
              </p>
            </motion.button>
          ))}
        </div>

        <div className="flex-1 min-w-0 rounded-2xl border border-border bg-card shadow-sm p-5 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col gap-3 min-h-0"
            >
              <div className="flex items-center gap-3">
                <span className="flex-none w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                  <FlaskConical className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold">{test.name}</h3>
              </div>

              <div className="rounded-xl border border-primary/25 bg-primary/5 p-3.5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold mb-1">
                  When to use it
                </p>
                <p className="text-sm text-foreground/85 leading-snug">{test.when}</p>
              </div>

              <div className="flex items-start gap-2.5 px-1">
                <Target className="flex-none w-4 h-4 text-primary mt-0.5" />
                <p className="text-[13.5px] text-foreground/75 italic leading-snug">
                  {test.example}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-[#22242e] shadow-md overflow-hidden flex-1 min-h-0 flex flex-col">
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 text-xs text-white/50 font-mono">R</span>
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
                <pre className="px-4 py-3 text-[13.5px] font-mono leading-[1.75] text-white/90 overflow-auto flex-1">
                  <code>
                    {test.code.split("\n").map((line, i) => {
                      const hashIdx = line.indexOf("#");
                      if (hashIdx === -1) {
                        return (
                          <span key={i}>
                            {line}
                            {"\n"}
                          </span>
                        );
                      }
                      return (
                        <span key={i}>
                          {line.slice(0, hashIdx)}
                          <span className="text-white/40">{line.slice(hashIdx)}</span>
                          {"\n"}
                        </span>
                      );
                    })}
                  </code>
                </pre>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
