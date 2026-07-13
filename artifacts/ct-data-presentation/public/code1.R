library(tidyverse)

# Step 1 read the data
df1 <- read_csv("df1.csv")
glimpse(df1)

# Step 2 read the Codebook
codebook <- read_csv("code1.csv")
codebook

# Step 3 attach codebook definitions to df1 as column labels
labels <- codebook$meaning[match(names(df1), codebook$variable)]
units <- codebook$codes_units[match(names(df1), codebook$variable)]

for (i in seq_along(df1)) {
  attr(df1[[i]], "label") <- labels[i]
  attr(df1[[i]], "codes_units") <- units[i]
}

# Confirm each column now carries its definition
tibble(
  variable = names(df1),
  label = labels,
  codes_units = units
)

# Step 4 describe sex
df1 |>
  count(sex) |>
  mutate(
    label = if_else(sex == 0, "Female", "Male"),
    proportion = n / sum(n)
  )

# Step 5 define the answer codes as labeled factors
df1_lab <- df1 |>
  mutate(
    sex     = factor(sex, levels = c(0, 1),
                     labels = c("F", "M")),
    cp      = factor(cp, levels = c(0, 1, 2, 3),
                     labels = c("Typical angina", "Atypical angina",
                                "Non-anginal pain", "Asymptomatic")),
    fbs     = factor(fbs, levels = c(0, 1),
                     labels = c("No", "Yes")),
    restecg = factor(restecg, levels = c(0, 1, 2),
                     labels = c("Normal", "ST-T wave abnormality",
                                "LV hypertrophy")),
    exang   = factor(exang, levels = c(0, 1),
                     labels = c("No", "Yes")),
    slope   = factor(slope, levels = c(0, 1, 2),
                     labels = c("Upsloping", "Flat", "Downsloping")),
    # 4 is an invalid code -> becomes NA
    ca      = factor(ca, levels = c(0, 1, 2, 3)),
    # 0 is an invalid code -> becomes NA
    thal    = factor(thal, levels = c(1, 2, 3),
                     labels = c("Normal", "Fixed defect",
                                "Reversible defect")),
    target  = factor(target, levels = c(0, 1),
                     labels = c("No disease", "Disease"))
  )

glimpse(df1_lab)

# Step 6 demographic descriptives (age and sex only)

# Age: continuous summary
df1_lab |>
  summarise(
    n = sum(!is.na(age)),
    mean = mean(age),
    sd = sd(age),
    median = median(age),
    min = min(age),
    max = max(age)
  )

# Sex: frequency and proportion
df1_lab |>
  count(sex) |>
  mutate(proportion = n / sum(n))

# Step 7 APA-formatted demographics table with gtsummary
library(gtsummary)

demo_table <- df1_lab |>
  select(age, sex, target) |>
  tbl_summary(
    label = list(age ~ "Age (years)", sex ~ "Sex", target ~ "Heart Disease"),
    statistic = list(
      all_continuous() ~ "{mean} ({sd})",
      all_categorical() ~ "{n} ({p}%)"
    ),
    digits = all_continuous() ~ 1
  ) |>
  modify_header(label ~ "**Characteristic**", stat_0 ~ "**N = {N}**") |>
  add_stat_label() |>
  modify_caption("**Table 1.** *Participant Demographic Characteristics*")

demo_table

# Step 8 export the formatted table to Word
demo_table |>
  as_flex_table() |>
  flextable::save_as_docx(path = "demographics_table.docx")

# Step 9 check for duplicates
# Note: df1 has no patient ID column, so check for fully duplicated rows
tibble(
  total_rows = nrow(df1),
  duplicate_rows = sum(duplicated(df1)),
  unique_rows = nrow(distinct(df1))
)

# Step 10 rebuild demographics table on deduplicated data
df1_dedup <- distinct(df1_lab)

demo_table_dedup <- df1_dedup |>
  select(age, sex, target) |>
  tbl_summary(
    label = list(age ~ "Age (years)", sex ~ "Sex", target ~ "Heart Disease"),
    statistic = list(
      all_continuous() ~ "{mean} ({sd})",
      all_categorical() ~ "{n} ({p}%)"
    ),
    digits = all_continuous() ~ 1
  ) |>
  modify_header(label ~ "**Characteristic**", stat_0 ~ "**N = {N}**") |>
  add_stat_label() |>
  modify_caption("**Table 1.** *Participant Demographic Characteristics (Unique Records)*")

demo_table_dedup

# Step 11 cross-tabulate all variables by Heart Disease (target)
table_by_hd <- df1_dedup |>
  tbl_summary(
    by = target,
    statistic = list(
      all_continuous() ~ "{mean} ({sd})",
      all_categorical() ~ "{n} ({p}%)"
    ),
    digits = all_continuous() ~ 1
  ) |>
  add_p(
    test = all_continuous() ~ "t.test"
  ) |>
  add_overall() |>
  modify_header(label ~ "**Characteristic**") |>
  modify_spanning_header(all_stat_cols() ~ "**Heart Disease**") |>
  modify_caption("**Table 2.** *Characteristics by Heart Disease Status*")

table_by_hd

# Step 12 logistic regression: Heart Disease ~ age + chol + cp
hd_model <- glm(
  target ~ age + chol + cp,
  data = df1_dedup,
  family = binomial
)

summary(hd_model)

# Odds ratios with 95% CIs
tbl_regression(hd_model, exponentiate = TRUE) |>
  add_glance_source_note() |>
  modify_caption("**Table 3.** *Logistic Regression Predicting Heart Disease*")

# Step 13 forest plot of odds ratios
broom::tidy(hd_model, exponentiate = TRUE, conf.int = TRUE) |>
  filter(term != "(Intercept)") |>
  ggplot(aes(x = estimate, y = fct_rev(term))) +
  geom_vline(xintercept = 1, linetype = "dashed", color = "grey50") +
  geom_pointrange(aes(xmin = conf.low, xmax = conf.high)) +
  scale_x_log10() +
  labs(
    title = "Odds Ratios for Heart Disease",
    x = "Odds ratio (95% CI, log scale)",
    y = NULL
  )

table_by_hd |>
  as_flex_table() |>
  flextable::save_as_docx(path = "table_by_hd2.docx")

# Step 14 categorize age into WHO age groups
df1_dedup <- df1_dedup |>
  mutate(
    age_group = cut(
      age,
      breaks = c(-Inf, 44, 59, 74, 89, Inf),
      labels = c("Young (<45)", "Middle-aged (45-59)",
                 "Elderly (60-74)", "Old (75-89)", "Very old (90+)")
    )
  )

df1 <- df1 |>
  mutate(
    age_group = cut(
      age,
      breaks = c(-Inf, 44, 59, 74, 89, Inf),
      labels = c("Young (<45)", "Middle-aged (45-59)",
                 "Elderly (60-74)", "Old (75-89)", "Very old (90+)")
    )
  )

df1_lab <- df1_lab |>
  mutate(
    age_group = cut(
      age,
      breaks = c(-Inf, 44, 59, 74, 89, Inf),
      labels = c("Young (<45)", "Middle-aged (45-59)",
                 "Elderly (60-74)", "Old (75-89)", "Very old (90+)")
    )
  )

df1_dedup |> count(age_group)

# Step 15 association between Heart Disease and age category
# Drop the empty "Very old (90+)" level first
df1_dedup <- df1_dedup |>
  mutate(age_group = fct_drop(age_group))

# Contingency table
tab <- table(df1_dedup$age_group, df1_dedup$target)
tab

# Check expected counts (chi-squared assumption)
chisq.test(tab)$expected

# Sparse cells present -> Fisher's exact test as primary
fisher.test(tab)

# Effect size: Cramer's V
chi <- suppressWarnings(chisq.test(tab, correct = FALSE))
sqrt(as.numeric(chi$statistic) / (sum(tab) * (min(dim(tab)) - 1)))

# Step 16 visualise disease prevalence across age groups
ggplot(df1_dedup, aes(x = age_group, fill = target)) +
  geom_bar(position = "fill") +
  scale_y_continuous(labels = scales::percent) +
  labs(
    title = "Heart Disease Prevalence by WHO Age Group",
    x = NULL,
    y = "Percent of group",
    fill = "Heart disease"
  )

# Step 17 journal-style figure: prevalence with 95% CIs
prev <- df1_dedup |>
  group_by(age_group) |>
  summarise(n = n(), disease = sum(target == "Disease"), .groups = "drop") |>
  mutate(
    prop = disease / n,
    ci = map2(disease, n, ~ suppressWarnings(prop.test(.x, .y)$conf.int)),
    lower = map_dbl(ci, 1),
    upper = map_dbl(ci, 2)
  )

ggplot(prev, aes(x = age_group, y = prop)) +
  geom_col(fill = "grey70", colour = "black", width = 0.65) +
  geom_errorbar(aes(ymin = lower, ymax = upper), width = 0.2) +
  geom_text(aes(label = paste0("n = ", n)), y = 0.02, size = 3.2) +
  scale_y_continuous(labels = scales::percent, expand = expansion(mult = c(0, 0.05))) +
  labs(
    x = "WHO age group",
    y = "Heart disease prevalence (95% CI)"
  ) +
  theme_classic(base_size = 12) +
  theme(axis.text.x = element_text(colour = "black"),
        axis.text.y = element_text(colour = "black"))


#Collapse the sparse Old band into Elderly and redraw.
