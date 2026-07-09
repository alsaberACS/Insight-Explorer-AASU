import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { HeartData } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DataTableSlide({ data }: { data: HeartData[] }) {
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("");
  const pageSize = 10;

  const filteredData = useMemo(() => {
    if (!filter) return data;
    const lower = filter.toLowerCase();
    return data.filter(row => 
      Object.values(row).some(val => String(val).toLowerCase().includes(lower))
    );
  }, [data, filter]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const currentData = filteredData.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="w-full max-w-6xl mx-auto h-full flex flex-col pt-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold mb-2"
          >
            Explore the Dataset
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground"
          >
            Raw patient records before any cleaning.
          </motion.p>
        </div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-72"
        >
          <Input 
            placeholder="Filter values..." 
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(0);
            }}
            className="bg-card"
          />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 min-h-0 bg-card border border-border rounded-xl shadow-sm overflow-hidden flex flex-col"
      >
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader className="bg-muted/50 sticky top-0 z-10">
              <TableRow>
                <TableHead>Age</TableHead>
                <TableHead>Sex</TableHead>
                <TableHead>CP</TableHead>
                <TableHead>TrestBps</TableHead>
                <TableHead>Chol</TableHead>
                <TableHead>FBS</TableHead>
                <TableHead>RestECG</TableHead>
                <TableHead>Thalach</TableHead>
                <TableHead>ExAng</TableHead>
                <TableHead>OldPeak</TableHead>
                <TableHead>Slope</TableHead>
                <TableHead>CA</TableHead>
                <TableHead>Thal</TableHead>
                <TableHead>Target</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((row, i) => (
                <TableRow key={i}>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.sex}</TableCell>
                  <TableCell>{row.cp}</TableCell>
                  <TableCell>{row.trestbps}</TableCell>
                  <TableCell className={row.chol > 400 ? "text-destructive font-bold" : ""}>{row.chol}</TableCell>
                  <TableCell>{row.fbs}</TableCell>
                  <TableCell>{row.restecg}</TableCell>
                  <TableCell>{row.thalach}</TableCell>
                  <TableCell>{row.exang}</TableCell>
                  <TableCell>{row.oldpeak}</TableCell>
                  <TableCell>{row.slope}</TableCell>
                  <TableCell className={row.ca === 4 ? "text-destructive font-bold" : ""}>{row.ca}</TableCell>
                  <TableCell className={row.thal === 0 ? "text-destructive font-bold" : ""}>{row.thal}</TableCell>
                  <TableCell className="font-bold">{row.target}</TableCell>
                </TableRow>
              ))}
              {currentData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={14} className="h-24 text-center text-muted-foreground">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <div className="border-t border-border p-4 flex items-center justify-between bg-muted/20">
          <div className="text-sm text-muted-foreground">
            Showing {filteredData.length > 0 ? page * pageSize + 1 : 0} to {Math.min((page + 1) * pageSize, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1 || totalPages === 0}>
              Next
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
