import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Lightbulb } from "lucide-react";
import { HeartData } from "@/lib/data";

function CodeCard({
  badge,
  question,
  code,
  hint,
  delay,
}: {
  badge: string;
  question: string;
  code: string;
  hint: string;
  delay: number;
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="flex-1 min-w-0 flex flex-col gap-3"
    >
      <div>
        <span className="inline-flex items-center rounded-full bg-primary text-primary-foreground text-xs font-bold px-3 py-1 mb-1.5">
          {badge}
        </span>
        <p className="text-[15px] font-semibold leading-snug">{question}</p>
      </div>
      <div className="rounded-2xl border border-border bg-[#22242e] shadow-md overflow-hidden flex-1 flex flex-col">
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
        <pre className="px-4 py-3.5 text-[13px] font-mono leading-[1.8] text-white/90 overflow-x-auto flex-1">
          <code>
            {code.split("\n").map((line, i) => {
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
      <div className="flex items-start gap-2.5 rounded-xl border border-primary/25 bg-primary/5 px-3.5 py-2.5">
        <Lightbulb className="flex-none w-4 h-4 text-primary mt-0.5" />
        <p className="text-[13px] text-foreground/80 leading-snug">{hint}</p>
      </div>
    </motion.div>
  );
}

function AnalysisSlide({
  number,
  title,
  subtitle,
  cards,
}: {
  number: number;
  title: string;
  subtitle: string;
  cards: [
    { badge: string; question: string; code: string; hint: string },
    { badge: string; question: string; code: string; hint: string },
  ];
}) {
  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <div className="mb-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-1"
        >
          Question {number} in R
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-1"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-base text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      </div>
      <div className="flex gap-6 flex-1 min-h-0 max-h-[490px]">
        <CodeCard {...cards[0]} delay={0.2} />
        <CodeCard {...cards[1]} delay={0.3} />
      </div>
    </div>
  );
}

export function RExploreSlide({ data: _data }: { data: HeartData[] }) {
  return (
    <AnalysisSlide
      number={1}
      title="Explore: What Does the Data Look Like?"
      subtitle="Walk the terrain before testing anything — base R does it in four lines."
      cards={[
        {
          badge: "Descriptive statistics",
          question: "Who is the typical patient in these 1,025 records?",
          code: [
            "summary(heart)        # every column at a glance",
            "",
            "table(heart$sex)      # 0 = female, 1 = male",
            "table(heart$target)   # 0 = no disease, 1 = disease",
            "",
            "mean(heart$age)       # average age",
            "sd(heart$age)         # spread around it",
          ].join("\n"),
          hint: "summary() is the analyst's first handshake with any dataset — read min and max first; impossible values reveal themselves immediately.",
        },
        {
          badge: "Distributions & outliers",
          question: "Is cholesterol skewed? Is that 564 mg/dl reading real?",
          code: [
            'hist(heart$chol,\n     main = "Serum Cholesterol",\n     xlab = "mg/dl")',
            "",
            "boxplot(heart$chol,\n        horizontal = TRUE)",
            "",
            "boxplot(chol ~ target,\n        data = heart)   # split by disease",
          ].join("\n"),
          hint: "The boxplot flags outliers as lone dots beyond the whiskers — decide with the codebook, not by deleting what looks odd.",
        },
      ]}
    />
  );
}

export function RCompareSlide({ data: _data }: { data: HeartData[] }) {
  return (
    <AnalysisSlide
      number={2}
      title="Compare: Do Groups Differ?"
      subtitle="Two groups call for a t-test; four chest-pain types call for ANOVA."
      cards={[
        {
          badge: "Two groups · t-test",
          question: "Is maximum heart rate lower in patients with heart disease?",
          code: [
            "aggregate(thalach ~ target,\n          data = heart, FUN = mean)",
            "",
            "t.test(thalach ~ target,\n       data = heart)",
          ].join("\n"),
          hint: "Read the p-value and the confidence interval together: the interval tells you how large the gap plausibly is, not just whether it exists.",
        },
        {
          badge: "More than two · ANOVA",
          question: "Does maximum heart rate differ across the four chest-pain types?",
          code: [
            "model <- aov(thalach ~ factor(cp),\n             data = heart)",
            "summary(model)     # overall F-test",
            "",
            "TukeyHSD(model)    # which pairs differ?",
          ].join("\n"),
          hint: "A significant F only says \u201csomething differs somewhere\u201d — Tukey's test names the exact pairs, with adjusted p-values.",
        },
      ]}
    />
  );
}

export function RAssociateSlide({ data: _data }: { data: HeartData[] }) {
  return (
    <AnalysisSlide
      number={3}
      title="Associate: What Moves Together?"
      subtitle="Chi-square for categories, Pearson's r for numbers — the variable type picks the tool."
      cards={[
        {
          badge: "Categorical · Chi-square",
          question: "Is sex associated with heart disease?",
          code: [
            "tab <- table(heart$sex,\n             heart$target)",
            "tab                 # the contingency table",
            "",
            "chisq.test(tab)",
          ].join("\n"),
          hint: "Always print the table first — the chi-square p-value says \u201cassociated\u201d, but the counts show you the direction and size.",
        },
        {
          badge: "Numeric · Pearson correlation",
          question: "As age rises, does maximum heart rate fall?",
          code: [
            "cor(heart$age, heart$thalach)",
            "",
            "cor.test(heart$age,\n         heart$thalach)   # r with CI & p-value",
            "",
            "plot(heart$age, heart$thalach,\n     xlab = \"Age\", ylab = \"Max HR\")",
          ].join("\n"),
          hint: "Never report r without its scatterplot — correlation is blind to curves, clusters, and outliers that the plot exposes instantly.",
        },
      ]}
    />
  );
}

export function REffectSlide({ data: _data }: { data: HeartData[] }) {
  return (
    <AnalysisSlide
      number={4}
      title="Measure the Effect: How Big, Adjusted for What?"
      subtitle="Regression turns \u201crelated\u201d into \u201chow many units, holding everything else constant\u201d."
      cards={[
        {
          badge: "Linear & multiple regression",
          question: "How many beats does each year of age cost, adjusting for sex, chest pain, and blood pressure?",
          code: [
            "fit <- lm(thalach ~ age + sex +\n          cp + trestbps,\n          data = heart)",
            "",
            "summary(fit)   # each coefficient =\n               # effect holding others fixed",
          ].join("\n"),
          hint: "The age coefficient is the slide's punchline: about one beat of maximum heart rate lost per year, independent of the other variables.",
        },
        {
          badge: "Logistic regression",
          question: "By how much does each unit of ST depression multiply the odds of disease?",
          code: [
            "logit <- glm(target ~ age + sex +\n             oldpeak + cp,\n             data = heart,\n             family = binomial)",
            "",
            "summary(logit)",
            "exp(coef(logit))   # odds ratios",
          ].join("\n"),
          hint: "exp() converts log-odds into odds ratios — above 1 raises risk, below 1 protects. That single line makes the output clinical.",
        },
      ]}
    />
  );
}

export function RPredictSlide({ data: _data }: { data: HeartData[] }) {
  return (
    <AnalysisSlide
      number={5}
      title="Predict & Validate: What Matters, and Can We Trust It?"
      subtitle="Rank the drivers of heart disease, then grade the model like a diagnostic test."
      cards={[
        {
          badge: "Feature importance",
          question: "Which of the 13 clinical variables carry the signal?",
          code: [
            "library(randomForest)   # install once",
            "",
            "rf <- randomForest(\n  factor(target) ~ .,\n  data = heart)",
            "",
            "varImpPlot(rf)   # ranked drivers",
          ].join("\n"),
          hint: "Expect chest-pain type, thalach, ca, and oldpeak near the top — the forest confirms what the earlier tests hinted at.",
        },
        {
          badge: "Diagnostic performance",
          question: "Out of 100 real patients, how many would the model call correctly?",
          code: [
            "library(pROC)   # install once",
            "",
            "prob <- predict(rf,             # rf from\n        type = \"prob\")[, 2]     # the left card",
            "roc_obj <- roc(heart$target, prob)",
            "auc(roc_obj); plot(roc_obj)",
            "",
            "table(Predicted = prob > 0.5,\n      Actual = heart$target)",
          ].join("\n"),
          hint: "Same model, both questions: the forest that ranked the features is the one graded here. AUC scores discrimination; the confusion table splits errors into false alarms vs missed cases — in medicine, those two are not equal.",
        },
      ]}
    />
  );
}
