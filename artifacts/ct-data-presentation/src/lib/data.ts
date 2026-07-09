export interface HeartData {
  age: number;
  sex: number;
  cp: number;
  trestbps: number;
  chol: number;
  fbs: number;
  restecg: number;
  thalach: number;
  exang: number;
  oldpeak: number;
  slope: number;
  ca: number;
  thal: number;
  target: number;
}

export async function fetchHeartData(): Promise<HeartData[]> {
  const res = await fetch(import.meta.env.BASE_URL + "heart.csv");
  const text = await res.text();
  const lines = text.split("\n").filter(Boolean);
  const headers = lines[0].split(",");
  
  const data = lines.slice(1).map(line => {
    const values = line.split(",");
    const row: any = {};
    headers.forEach((h, i) => {
      row[h.trim()] = Number(values[i]);
    });
    return row as HeartData;
  });
  
  return data;
}
