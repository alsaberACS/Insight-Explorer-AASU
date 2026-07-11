import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export type SlideSection = {
  label: string;
  start: number;
  count: number;
};

export default function SlideNavigator({
  titles,
  sections,
  currentIndex,
  onJump,
  onClose,
}: {
  titles: string[];
  sections: SlideSection[];
  currentIndex: number;
  onJump: (index: number) => void;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const currentRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    (currentRef.current ?? closeRef.current)?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="absolute inset-0 z-30 bg-background/80 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-label="Slide navigator"
        className="w-full max-w-5xl max-h-full overflow-y-auto rounded-2xl border border-border bg-card shadow-xl p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">
            Jump to a slide
            <span className="ml-3 text-sm font-normal text-muted-foreground">
              {titles.length} slides
            </span>
          </h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close slide navigator"
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="columns-1 sm:columns-2 gap-x-8 [column-fill:balance]">
          {sections.map((section) => (
            <div key={section.label} className="break-inside-avoid mb-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-semibold mb-1.5">
                {section.label}
              </p>
              <div className="flex flex-col">
                {Array.from({ length: section.count }, (_, k) => {
                  const idx = section.start + k;
                  const active = idx === currentIndex;
                  return (
                    <button
                      key={idx}
                      ref={active ? currentRef : undefined}
                      onClick={() => onJump(idx)}
                      aria-current={active ? "true" : undefined}
                      className={`flex items-center gap-2.5 text-left rounded-lg px-2 py-1 transition-colors ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-primary/10 text-foreground/85"
                      }`}
                    >
                      <span
                        className={`flex-none w-7 text-right text-xs font-mono ${
                          active ? "text-primary-foreground/80" : "text-muted-foreground"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-[13px] font-medium leading-tight truncate">
                        {titles[idx]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
