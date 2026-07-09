import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HeartData } from "@/lib/data";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export default function VizDashboardSlide({ data }: { data: HeartData[] }) {
  const [variable, setVariable] = useState<"sex" | "fbs" | "exang">("sex");

  const chartData = useMemo(() => {
    let groups: Record<string, { total: number, disease: number }> = {};
    
    if (variable === "sex") {
      groups = {
        "Female": { total: 0, disease: 0 },
        "Male": { total: 0, disease: 0 }
      };
      data.forEach(d => {
        const key = d.sex === 1 ? "Male" : "Female";
        groups[key].total++;
        if (d.target === 1) groups[key].disease++;
      });
    } else if (variable === "fbs") {
      groups = {
        "Normal Blood Sugar": { total: 0, disease: 0 },
        "High Blood Sugar": { total: 0, disease: 0 }
      };
      data.forEach(d => {
        const key = d.fbs === 1 ? "High Blood Sugar" : "Normal Blood Sugar";
        groups[key].total++;
        if (d.target === 1) groups[key].disease++;
      });
    } else if (variable === "exang") {
      groups = {
        "No Exercise Angina": { total: 0, disease: 0 },
        "Has Exercise Angina": { total: 0, disease: 0 }
      };
      data.forEach(d => {
        const key = d.exang === 1 ? "Has Exercise Angina" : "No Exercise Angina";
        groups[key].total++;
        if (d.target === 1) groups[key].disease++;
      });
    }

    return Object.entries(groups).map(([name, counts]) => ({
      name,
      value: counts.disease, // Charting the raw count of diseased patients in that category
      total: counts.total
    }));
  }, [data, variable]);

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Interactive Dashboards</h2>
        <p className="text-xl text-muted-foreground">Dashboards let us ask questions and get instant visual answers.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-1 flex flex-col gap-4"
        >
          <h3 className="font-bold text-lg mb-2 uppercase tracking-wider text-muted-foreground">Slice Data By</h3>
          
          <button 
            onClick={() => setVariable("sex")}
            className={`p-4 rounded-xl text-left font-semibold transition-colors ${variable === "sex" ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-muted"}`}
          >
            Biological Sex
          </button>
          <button 
            onClick={() => setVariable("fbs")}
            className={`p-4 rounded-xl text-left font-semibold transition-colors ${variable === "fbs" ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-muted"}`}
          >
            Fasting Blood Sugar
          </button>
          <button 
            onClick={() => setVariable("exang")}
            className={`p-4 rounded-xl text-left font-semibold transition-colors ${variable === "exang" ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-muted"}`}
          >
            Exercise Angina
          </button>
        </motion.div>

        <motion.div 
          key={variable}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="col-span-3 bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center min-h-[400px]"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Disease Count by {variable.toUpperCase()}</h3>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number, name: string, props: any) => [
                    `${value} patients (${Math.round((value / props.payload.total) * 100)}% of group)`, 
                    name
                  ]}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
