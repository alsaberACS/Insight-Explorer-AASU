import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useHeartData } from "@/hooks/use-heart-data";

import TitleSlide from "@/components/slides/TitleSlide";
import WorkshopPurposeSlide from "@/components/slides/WorkshopPurposeSlide";
import CLOsSlide from "@/components/slides/CLOsSlide";
import CourseToolboxSlide from "@/components/slides/CourseToolboxSlide";
import DefinitionsSlide from "@/components/slides/DefinitionsSlide";
import DataEcosystemSlide from "@/components/slides/DataEcosystemSlide";
import MethodologiesSlide from "@/components/slides/MethodologiesSlide";
import MethodologiesExamplesSlide from "@/components/slides/MethodologiesExamplesSlide";
import CTIntroSlide from "@/components/slides/CTIntroSlide";
import CTMethodologySlide from "@/components/slides/CTMethodologySlide";
import AlgorithmicThinkingSlide from "@/components/slides/AlgorithmicThinkingSlide";
import CTHandsOnSlide from "@/components/slides/CTHandsOnSlide";
import MethodologiesQuizSlide from "@/components/slides/MethodologiesQuizSlide";
import VariableTypesSlide from "@/components/slides/VariableTypesSlide";
import DataSourcesSlide from "@/components/slides/DataSourcesSlide";
import EDAIntroSlide from "@/components/slides/EDAIntroSlide";
import LocationSlide from "@/components/slides/LocationSlide";
import DispersionSlide from "@/components/slides/DispersionSlide";
import PythonEcosystemSlide from "@/components/slides/PythonEcosystemSlide";
import PythonFirstStepsSlide from "@/components/slides/PythonFirstStepsSlide";
import PythonCleaningSlide from "@/components/slides/PythonCleaningSlide";
import DataIntroSlide from "@/components/slides/DataIntroSlide";
import DataCleaningSlide from "@/components/slides/DataCleaningSlide";
import DataTableSlide from "@/components/slides/DataTableSlide";
import RSetupSlide from "@/components/slides/RSetupSlide";
import VizGuessSlide from "@/components/slides/VizGuessSlide";
import VizDashboardSlide from "@/components/slides/VizDashboardSlide";
import ClosingSlide from "@/components/slides/ClosingSlide";

const SLIDES = [
  TitleSlide,
  WorkshopPurposeSlide,
  CLOsSlide,
  CourseToolboxSlide,
  DefinitionsSlide,
  DataEcosystemSlide,
  MethodologiesSlide,
  MethodologiesExamplesSlide,
  CTIntroSlide,
  CTMethodologySlide,
  AlgorithmicThinkingSlide,
  CTHandsOnSlide,
  MethodologiesQuizSlide,
  VariableTypesSlide,
  DataSourcesSlide,
  EDAIntroSlide,
  LocationSlide,
  DispersionSlide,
  PythonEcosystemSlide,
  PythonFirstStepsSlide,
  PythonCleaningSlide,
  DataIntroSlide,
  DataCleaningSlide,
  DataTableSlide,
  RSetupSlide,
  VizGuessSlide,
  VizDashboardSlide,
  ClosingSlide,
];

export default function Presentation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, loading, error } = useHeartData();

  useEffect(() => {
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
  }, []);

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
            className="absolute inset-0 flex items-center justify-center p-8 md:p-16"
          >
            {data && <CurrentSlide data={data} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="h-16 border-t border-border/40 bg-card/50 backdrop-blur flex items-center justify-between px-6 z-10 relative">
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium text-muted-foreground w-12 text-center">
            {currentIndex + 1} / {SLIDES.length}
          </div>
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
