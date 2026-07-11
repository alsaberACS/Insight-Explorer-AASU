import { WebR } from "webr";

export type ROutputLine = { type: "stdout" | "stderr"; text: string };
export type RRunResult = { lines: ROutputLine[]; plots: string[] };

let webRInstance: WebR | null = null;
let initPromise: Promise<WebR> | null = null;

async function initWebR(): Promise<WebR> {
  const webR = new WebR();
  await webR.init();

  const res = await fetch(import.meta.env.BASE_URL + "heart.csv");
  if (!res.ok) throw new Error("Failed to fetch heart.csv for the R session");
  const csvText = await res.text();
  await webR.FS.writeFile(
    "/home/web_user/heart.csv",
    new TextEncoder().encode(csvText),
  );
  await webR.evalRVoid('setwd("/home/web_user")');

  webRInstance = webR;
  return webR;
}

export function getWebR(): Promise<WebR> {
  if (!initPromise) {
    initPromise = initWebR().catch((err) => {
      initPromise = null;
      throw err;
    });
  }
  return initPromise;
}

export function isWebRReady(): boolean {
  return webRInstance !== null;
}

let runQueue: Promise<unknown> = Promise.resolve();

export function runR(code: string): Promise<RRunResult> {
  const next = runQueue.then(() => runRInternal(code));
  runQueue = next.catch(() => undefined);
  return next;
}

function bitmapToDataUrl(img: ImageBitmap): string | null {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}

async function runRInternal(code: string): Promise<RRunResult> {
  const webR = await getWebR();
  const shelter = await new webR.Shelter();
  try {
    const result = await shelter.captureR(code, {
      withAutoprint: true,
      captureStreams: true,
      captureConditions: true,
      captureGraphics: { width: 720, height: 460, bg: "white", pointsize: 14 },
    });
    const lines: ROutputLine[] = [];
    for (const out of result.output) {
      if (out.type === "stdout" || out.type === "stderr") {
        lines.push({ type: out.type, text: String(out.data) });
      } else if (out.type === "message" || out.type === "warning") {
        const data = out.data as { names: string[] | null; values: unknown[] };
        const idx = data.names ? data.names.indexOf("message") : -1;
        const msg = idx >= 0 ? String(data.values[idx]) : "";
        if (msg) lines.push({ type: "stderr", text: msg.replace(/\n$/, "") });
      } else if (out.type === "error") {
        const data = out.data as { names: string[] | null; values: unknown[] };
        const idx = data.names ? data.names.indexOf("message") : -1;
        const msg = idx >= 0 ? String(data.values[idx]) : "Error";
        lines.push({ type: "stderr", text: "Error: " + msg });
      }
    }
    const plots: string[] = [];
    for (const img of result.images ?? []) {
      const url = bitmapToDataUrl(img);
      if (url) plots.push(url);
      if (typeof img.close === "function") img.close();
    }
    return { lines, plots };
  } catch (err) {
    return {
      lines: [
        {
          type: "stderr",
          text: "Error: " + (err instanceof Error ? err.message : String(err)),
        },
      ],
      plots: [],
    };
  } finally {
    await shelter.purge();
  }
}
