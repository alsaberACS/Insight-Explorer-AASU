import { useState, useEffect } from "react";
import { fetchHeartData, HeartData } from "../lib/data";

export function useHeartData() {
  const [data, setData] = useState<HeartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHeartData()
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
