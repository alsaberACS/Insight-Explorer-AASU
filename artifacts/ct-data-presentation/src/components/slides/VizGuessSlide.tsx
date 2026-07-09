import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HeartData } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function VizGuessSlide({ data }: { data: HeartData[] }) {
  const [revealed, setRevealed] = useState(false);
  const [guess, setGuess] = useState<string | null>(null);

  const OPTIONS = [
    { id: "age", label: "Age" },
    { id: "chol", label: "Cholesterol" },
    { id: "cp", label: "Chest Pain Type" },
  ];

  // Calculate actual correlations or simple disease rates for options
  const chartData = useMemo(() => {
    // For Chest Pain Type (cp)
    const cpCounts = [0, 0, 0, 0];
    const cpDisease = [0, 0, 0, 0];
    data.forEach(d => {
      cpCounts[d.cp]++;
      if (d.target === 1) cpDisease[d.cp]++;
    });

    return [
      { name: "CP Type 0", rate: Math.round((cpDisease[0] / cpCounts[0]) * 100) },
      { name: "CP Type 1", rate: Math.round((cpDisease[1] / cpCounts[1]) * 100) },
      { name: "CP Type 2", rate: Math.round((cpDisease[2] / cpCounts[2]) * 100) },
      { name: "CP Type 3", rate: Math.round((cpDisease[3] / cpCounts[3]) * 100) },
    ];
  }, [data]);

  return (
    <div className="w-full max-w-5xl mx-auto h-full flex flex-col justify-center">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Which factor correlates most with heart disease?
        </motion.h2>
        <p className="text-xl text-muted-foreground">Make your prediction.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {OPTIONS.map((opt, i) => (
          <motion.button
            key={opt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => !revealed && setGuess(opt.id)}
            className={`p-6 rounded-2xl border-2 text-xl font-bold transition-colors ${
              guess === opt.id && !revealed ? 'bg-primary text-primary-foreground border-primary' : 
              revealed && opt.id === "cp" ? 'bg-primary text-primary-foreground border-primary' :
              revealed && guess === opt.id ? 'bg-destructive/20 text-destructive border-destructive/30' :
              'bg-card border-border hover:border-primary/50'
            }`}
          >
            {opt.label}
          </motion.button>
        ))}
      </div>

      {!revealed && guess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center"
        >
          <button
            onClick={() => setRevealed(true)}
            className="px-8 py-3 bg-foreground text-background rounded-full text-lg font-bold hover:scale-105 transition-transform"
          >
            Let the Data Answer
          </button>
        </motion.div>
      )}

      {revealed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-3xl p-8 shadow-sm"
        >
          <h3 className="text-2xl font-bold text-center mb-6">Disease Rate by Chest Pain Type</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={14} tickLine={false} axisLine={false} />
                <YAxis unit="%" stroke="hsl(var(--muted-foreground))" fontSize={14} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="rate" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index > 0 ? 'hsl(var(--destructive))' : 'hsl(var(--primary))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center mt-6 text-lg text-muted-foreground">
            Any chest pain beyond type 0 shows a <span className="font-bold text-foreground">massive</span> spike in disease probability.
          </p>
        </motion.div>
      )}
    </div>
  );
}
