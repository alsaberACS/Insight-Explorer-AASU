import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useHeartData } from "@/hooks/use-heart-data";
import SlideNavigator, { SlideSection } from "@/components/SlideNavigator";

import TitleSlide from "@/components/slides/TitleSlide";
import GoalOneSlide from "@/components/slides/GoalOneSlide";
import WorkshopPurposeSlide from "@/components/slides/WorkshopPurposeSlide";
import CLOsSlide from "@/components/slides/CLOsSlide";
import CourseToolboxSlide from "@/components/slides/CourseToolboxSlide";
import DefinitionsSlide from "@/components/slides/DefinitionsSlide";
import DataEcosystemSlide from "@/components/slides/DataEcosystemSlide";
import GoalTwoSlide from "@/components/slides/GoalTwoSlide";
import MethodologiesSlide from "@/components/slides/MethodologiesSlide";
import MethodologiesExamplesSlide from "@/components/slides/MethodologiesExamplesSlide";
import CTIntroSlide from "@/components/slides/CTIntroSlide";
import CTMethodologySlide from "@/components/slides/CTMethodologySlide";
import GoalThreeSlide from "@/components/slides/GoalThreeSlide";
import InstallRStudioSlide from "@/components/slides/InstallRStudioSlide";
import RStudioEnvSlide from "@/components/slides/RStudioEnvSlide";
import AlgorithmicThinkingSlide from "@/components/slides/AlgorithmicThinkingSlide";
import CTHandsOnSlide from "@/components/slides/CTHandsOnSlide";
import GoalFourSlide from "@/components/slides/GoalFourSlide";
import VariableTypesSlide from "@/components/slides/VariableTypesSlide";
import DataCollectionSlide from "@/components/slides/DataCollectionSlide";
import DataIntegrationSlide from "@/components/slides/DataIntegrationSlide";
import DataHostingSlide from "@/components/slides/DataHostingSlide";
import DataCleaningLabSlide from "@/components/slides/DataCleaningLabSlide";
import DataWranglingSlide from "@/components/slides/DataWranglingSlide";
import DataManagementSlide from "@/components/slides/DataManagementSlide";
import GoalFiveSlide from "@/components/slides/GoalFiveSlide";
import EDAIntroSlide from "@/components/slides/EDAIntroSlide";
import LocationSlide from "@/components/slides/LocationSlide";
import DispersionSlide from "@/components/slides/DispersionSlide";
import DataTableSlide from "@/components/slides/DataTableSlide";
import RSetupSlide from "@/components/slides/RSetupSlide";
import VizGuessSlide from "@/components/slides/VizGuessSlide";
import VizDashboardSlide from "@/components/slides/VizDashboardSlide";
import GoalSixSlide from "@/components/slides/GoalSixSlide";
import ProjectSetupSlide from "@/components/slides/ProjectSetupSlide";
import ReadDataSlide from "@/components/slides/ReadDataSlide";
import RLibrarySlide from "@/components/slides/RLibrarySlide";
import RLibraryDiscoverSlide from "@/components/slides/RLibraryDiscoverSlide";
import AnalystQuestionsSlide from "@/components/slides/AnalystQuestionsSlide";
import StatTestsSlide from "@/components/slides/StatTestsSlide";
import {
  RExploreSlide,
  RCompareSlide,
  RAssociateSlide,
  REffectSlide,
  RPredictSlide,
} from "@/components/slides/RAnalysisSlides";
import RStudioHandsOnSlide from "@/components/slides/RStudioHandsOnSlide";
import ClosingSlide from "@/components/slides/ClosingSlide";

const SLIDE_DEFS: { component: (props: { data: import("@/lib/data").HeartData[] }) => React.JSX.Element; title: string }[] = [
  { component: TitleSlide, title: "Welcome" },
  { component: GoalOneSlide, title: "Goal 1 — Overview" },
  { component: WorkshopPurposeSlide, title: "Workshop Purpose" },
  { component: CLOsSlide, title: "Course Learning Outcomes" },
  { component: CourseToolboxSlide, title: "Software, Languages & Packages" },
  { component: DefinitionsSlide, title: "Key Definitions" },
  { component: DataEcosystemSlide, title: "The Data Ecosystem" },
  { component: GoalTwoSlide, title: "Goal 2 — Overview" },
  { component: MethodologiesSlide, title: "Analysis Methodologies" },
  { component: MethodologiesExamplesSlide, title: "Methodologies in Action" },
  { component: CTIntroSlide, title: "Computational Thinking" },
  { component: CTMethodologySlide, title: "CT as a Methodology" },
  { component: GoalThreeSlide, title: "Goal 3 — Overview" },
  { component: InstallRStudioSlide, title: "Install R & RStudio" },
  { component: RStudioEnvSlide, title: "The RStudio Environment" },
  { component: AlgorithmicThinkingSlide, title: "Algorithmic Thinking" },
  { component: CTHandsOnSlide, title: "The Four Pillars, Live in R" },
  { component: GoalFourSlide, title: "Goal 4 — Overview" },
  { component: VariableTypesSlide, title: "Variables & Their Types" },
  { component: DataCollectionSlide, title: "Data Collection" },
  { component: DataIntegrationSlide, title: "Data Integration" },
  { component: DataHostingSlide, title: "Data Hosting" },
  { component: DataCleaningLabSlide, title: "Data Cleaning" },
  { component: DataWranglingSlide, title: "Data Wrangling" },
  { component: DataManagementSlide, title: "Data Management" },
  { component: GoalFiveSlide, title: "Goal 5 — Overview" },
  { component: EDAIntroSlide, title: "Exploratory Data Analysis" },
  { component: LocationSlide, title: "Measures of Location" },
  { component: DispersionSlide, title: "Measures of Dispersion" },
  { component: DataTableSlide, title: "The Data Table" },
  { component: RSetupSlide, title: "Defining the Data" },
  { component: VizGuessSlide, title: "Guess the Chart" },
  { component: VizDashboardSlide, title: "Interactive Dashboards" },
  { component: GoalSixSlide, title: "Goal 6 — Overview" },
  { component: ProjectSetupSlide, title: "Set Up Your Project" },
  { component: ReadDataSlide, title: "Open the Data in RStudio" },
  { component: RLibrarySlide, title: "Dealing with R Libraries" },
  { component: RLibraryDiscoverSlide, title: "Finding the Right Library" },
  { component: AnalystQuestionsSlide, title: "Think Like a Data Analyst" },
  { component: StatTestsSlide, title: "The Statistical Test Toolbox" },
  { component: RExploreSlide, title: "Q1 in R: Explore the Data" },
  { component: RCompareSlide, title: "Q2 in R: Compare Groups" },
  { component: RAssociateSlide, title: "Q3 in R: Association" },
  { component: REffectSlide, title: "Q4 in R: Measure Effects" },
  { component: RPredictSlide, title: "Q5 in R: Predict & Validate" },
  { component: RStudioHandsOnSlide, title: "RStudio Lab: Heart Disease" },
  { component: ClosingSlide, title: "Closing" },
];

const SLIDES = SLIDE_DEFS.map((s) => s.component);
const SLIDE_TITLES = SLIDE_DEFS.map((s) => s.title);

const SECTIONS: SlideSection[] = [
  { label: "Getting Started", start: 0, count: 1 },
  { label: "Goal 1 · Course Foundations", start: 1, count: 6 },
  { label: "Goal 2 · Methodologies", start: 7, count: 5 },
  { label: "Goal 3 · Computational Thinking & R", start: 12, count: 5 },
  { label: "Goal 4 · Dealing with Data", start: 17, count: 8 },
  { label: "Goal 5 · EDA & Visualization", start: 25, count: 8 },
  { label: "Goal 6 · Hands-On with RStudio", start: 33, count: 13 },
  { label: "Wrap-Up", start: 46, count: 1 },
];

const STAGE_W = 1280;
const STAGE_H = 720;
const FOOTER_H = 64;

function useStageScale() {
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);
  const scale = Math.min(size.w / STAGE_W, (size.h - FOOTER_H) / STAGE_H);
  return { scale, width: size.w };
}

export default function Presentation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const { data, loading, error } = useHeartData();
  const { scale, width } = useStageScale();
  const useStage = width < 1024 && scale < 0.98;

  useEffect(() => {
    if (navOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inTextField =
        !!target &&
        (target.closest("input, textarea, select, [contenteditable]") || target.isContentEditable);
      const inInteractive =
        !!target && !!target.closest("button, a, [role='button']");
      if (inTextField) {
        return;
      }
      const isArrow = e.key === "ArrowRight" || e.key === "ArrowLeft";
      if (inInteractive && !isArrow) {
        return;
      }
      if (e.key === "ArrowRight" || (e.key === " " && !inInteractive)) {
        setCurrentIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navOpen]);

  useEffect(() => {
    if (navOpen) return;
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let fromTextField = false;

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      startX = t.clientX;
      startY = t.clientY;
      startTime = Date.now();
      const target = e.target as HTMLElement | null;
      fromTextField = !!target && !!target.closest("input, textarea, select, [contenteditable]");
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (fromTextField) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      const elapsed = Date.now() - startTime;
      if (elapsed < 800 && Math.abs(dx) > 55 && Math.abs(dx) > 1.5 * Math.abs(dy)) {
        if (dx < 0) {
          setCurrentIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
        } else {
          setCurrentIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [navOpen]);

  if (loading) {
    return (
      <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background text-foreground">
        <div className="animate-pulse text-2xl font-display">Loading dataset...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[100dvh] w-full flex items-center justify-center bg-background text-destructive">
        <div className="text-xl">Error loading dataset: {error}</div>
      </div>
    );
  }

  const CurrentSlide = SLIDES[currentIndex];
  const progress = ((currentIndex + 1) / SLIDES.length) * 100;

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col overflow-hidden select-none relative">
      <main className="flex-1 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={
              useStage
                ? "absolute inset-0 flex items-center justify-center overflow-hidden"
                : "absolute inset-0 flex items-center justify-center p-8 md:p-16"
            }
          >
            {useStage ? (
              <div
                className="flex-none flex items-center justify-center p-16"
                style={{
                  width: STAGE_W,
                  height: STAGE_H,
                  transform: `scale(${scale})`,
                  transformOrigin: "center center",
                }}
              >
                {data && <CurrentSlide data={data} />}
              </div>
            ) : (
              data && <CurrentSlide data={data} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {navOpen && (
          <SlideNavigator
            titles={SLIDE_TITLES}
            sections={SECTIONS}
            currentIndex={currentIndex}
            onJump={(idx) => {
              setCurrentIndex(idx);
              setNavOpen(false);
            }}
            onClose={() => setNavOpen(false)}
          />
        )}
      </AnimatePresence>

      <footer className="h-16 border-t border-border/40 bg-card/50 backdrop-blur flex items-center justify-between px-6 z-10 relative">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setNavOpen((v) => !v)}
            aria-label="Open slide navigator"
            aria-expanded={navOpen}
            className="flex items-center gap-2 rounded-full border border-border/50 px-3 h-10 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LayoutGrid className="h-4 w-4" />
            {currentIndex + 1} / {SLIDES.length}
          </button>
          <div className="w-48 hidden sm:block">
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentIndex === 0}
            className="rounded-full h-10 w-10 border-border/50 hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, SLIDES.length - 1))}
            disabled={currentIndex === SLIDES.length - 1}
            className="rounded-full h-10 w-10 border-border/50 hover:bg-muted"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
