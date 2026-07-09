import { motion } from "framer-motion";
import { HeartData } from "@/lib/data";

interface SlideProps {
  data: HeartData[];
}

export default function TitleSlide({ data }: SlideProps) {
  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center gap-12">
      <div className="space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
        >
          Data Science Fundamentals
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-8xl font-bold tracking-tight text-foreground leading-tight"
        >
          Computational<br/>
          Thinking &<br/>
          <span className="text-primary">Data Analysis</span>
        </motion.h1>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
      >
        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-chart-1/10 flex items-center justify-center mb-6">
            <div className="h-6 w-6 rounded bg-chart-1" />
          </div>
          <h3 className="text-xl font-bold mb-3">Computational Thinking</h3>
          <p className="text-muted-foreground leading-relaxed">
            Analyzing problems and breaking them down into manageable components using logical and algorithmic thinking.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center mb-6">
            <div className="h-6 w-6 rounded-full bg-chart-3" />
          </div>
          <h3 className="text-xl font-bold mb-3">Data Collection</h3>
          <p className="text-muted-foreground leading-relaxed">
            Using modern tools to organize information, clean datasets, and identify meaningful patterns reliably.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-chart-4/10 flex items-center justify-center mb-6">
            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-chart-4" />
          </div>
          <h3 className="text-xl font-bold mb-3">Data Visualization</h3>
          <p className="text-muted-foreground leading-relaxed">
            Creating interactive dashboards to present findings visually and support evidence-based decision-making.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
