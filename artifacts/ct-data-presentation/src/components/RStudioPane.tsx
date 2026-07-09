import { useEffect, useRef, useState } from "react";
import { Loader2, Play } from "lucide-react";
import { runR, isWebRReady, getWebR, ROutputLine } from "@/lib/webr-runner";

const R_KEYWORDS =
  /\b(function|if|else|for|while|repeat|return|break|next|TRUE|FALSE|NULL|NA|Inf|NaN|library|require|in)\b/g;

function highlightR(code: string): string {
  const esc = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const lines = esc.split("\n").map((line) => {
    const commentIdx = findCommentStart(line);
    let codePart = line;
    let commentPart = "";
    if (commentIdx >= 0) {
      codePart = line.slice(0, commentIdx);
      commentPart = `<span class="text-[#5e6d03] italic">${line.slice(commentIdx)}</span>`;
    }
    codePart = codePart
      .replace(/("[^"]*")/g, '<span class="text-[#036a07]">$1</span>')
      .replace(
        /\b(\d+\.?\d*)\b(?![^<]*>)/g,
        '<span class="text-[#0c5460]">$1</span>',
      )
      .replace(R_KEYWORDS, '<span class="text-[#0087bd] font-semibold">$1</span>')
      .replace(
        /(&lt;-|%&gt;%)/g,
        '<span class="text-[#8959a8]">$1</span>',
      )
      .replace(
        /\b([a-zA-Z_][a-zA-Z0-9._]*)\s*\(/g,
        '<span class="text-[#4d4d8f]">$1</span>(',
      );
    return codePart + commentPart;
  });
  return lines.join("\n");
}

function findCommentStart(line: string): number {
  let inString = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') inString = !inString;
    if (ch === "#" && !inString) return i;
  }
  return -1;
}

export default function RStudioPane({
  initialCode,
  autoHeight,
}: {
  initialCode: string;
  autoHeight?: string;
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<ROutputLine[] | null>(null);
  const [running, setRunning] = useState(false);
  const [booting, setBooting] = useState(false);
  const consoleRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const runLockRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    setCode(initialCode);
    setOutput(null);
  }, [initialCode]);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [output, running, booting]);

  const syncScroll = () => {
    if (highlightRef.current && textareaRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleRun = async () => {
    if (runLockRef.current) return;
    runLockRef.current = true;
    setRunning(true);
    try {
      if (!isWebRReady()) {
        if (mountedRef.current) setBooting(true);
        try {
          await getWebR();
        } catch (err) {
          if (mountedRef.current) {
            setOutput([
              {
                type: "stderr",
                text:
                  "Failed to start R: " +
                  (err instanceof Error ? err.message : String(err)),
              },
            ]);
          }
          return;
        } finally {
          if (mountedRef.current) setBooting(false);
        }
      }
      const lines = await runR(code);
      if (mountedRef.current) setOutput(lines);
    } finally {
      runLockRef.current = false;
      if (mountedRef.current) setRunning(false);
    }
  };

  const height = autoHeight ?? "52vh";

  return (
    <div
      className="rounded-xl overflow-hidden border border-[#c9d3dd] shadow-lg bg-white text-left flex flex-col select-text"
      style={{ height }}
    >
      <div className="flex items-center justify-between bg-[#3c5a76] px-3 py-1.5 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e96e64]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f4bf4f]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#61c554]" />
          </div>
          <span className="text-xs text-white/80 font-medium ml-2">
            RStudio — heart_analysis.R
          </span>
        </div>
        <span className="text-[10px] text-white/50">R 4.x (WebAssembly)</span>
      </div>

      <div className="flex flex-1 min-h-0">
        <div className="flex-1 flex flex-col min-w-0 border-r border-[#c9d3dd]">
          <div className="flex items-center justify-between bg-[#eef2f6] border-b border-[#c9d3dd] px-3 py-1 shrink-0">
            <span className="text-[11px] font-semibold text-[#3c5a76] border-b-2 border-[#3c5a76] pb-0.5">
              heart_analysis.R
            </span>
            <button
              onClick={handleRun}
              disabled={running}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2e7d32] hover:bg-[#dde6ee] rounded px-2 py-0.5 disabled:opacity-50 transition-colors"
            >
              {running ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Play className="h-3 w-3 fill-[#2e7d32]" />
              )}
              Run
            </button>
          </div>
          <div className="relative flex-1 min-h-0 bg-white">
            <pre
              ref={highlightRef}
              aria-hidden
              className="absolute inset-0 p-3 m-0 overflow-auto font-mono text-[12px] leading-[1.5] whitespace-pre pointer-events-none text-[#1a1a1a]"
              dangerouslySetInnerHTML={{ __html: highlightR(code) + "\n" }}
            />
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={syncScroll}
              onKeyDown={(e) => {
                e.stopPropagation();
                if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                  e.preventDefault();
                  handleRun();
                }
              }}
              spellCheck={false}
              className="absolute inset-0 p-3 w-full h-full resize-none font-mono text-[12px] leading-[1.5] whitespace-pre overflow-auto bg-transparent text-transparent caret-[#1a1a1a] outline-none"
            />
          </div>
        </div>

        <div className="w-[44%] flex flex-col min-w-0 bg-white">
          <div className="bg-[#eef2f6] border-b border-[#c9d3dd] px-3 py-1 shrink-0">
            <span className="text-[11px] font-semibold text-[#3c5a76] border-b-2 border-[#3c5a76] pb-0.5">
              Console
            </span>
          </div>
          <div
            ref={consoleRef}
            className="flex-1 min-h-0 overflow-auto p-3 font-mono text-[12px] leading-[1.5]"
          >
            {booting && (
              <div className="flex items-center gap-2 text-[#3c5a76]">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Starting R session and loading heart.csv... (first run only)
              </div>
            )}
            {!booting && running && (
              <div className="flex items-center gap-2 text-[#3c5a76]">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Running...
              </div>
            )}
            {!running && output === null && (
              <div className="text-[#8a9bac]">
                {"> "}Press Run (or Ctrl+Enter) to execute the script. The real
                heart.csv is already in the working directory.
              </div>
            )}
            {!running &&
              output !== null &&
              (output.length === 0 ? (
                <div className="text-[#8a9bac]">
                  (script ran with no printed output)
                </div>
              ) : (
                output.map((line, i) => (
                  <pre
                    key={i}
                    className={
                      "m-0 whitespace-pre-wrap " +
                      (line.type === "stderr"
                        ? "text-[#c0392b]"
                        : "text-[#1a3a5c]")
                    }
                  >
                    {line.text}
                  </pre>
                ))
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
