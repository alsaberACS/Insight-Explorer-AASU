---
name: webR in-browser R sessions
description: Lessons for running live R code in the browser via webR in presentation/teaching apps
---

- webR (npm `webr`) runs real R in WebAssembly; first init downloads ~20MB from the webr.r-wasm.org CDN and can take up to ~90s — show a boot spinner and warn "first run only".
- Provide data by fetching the CSV and writing it into the virtual FS at `/home/web_user/` before executing; set `setwd("/home/web_user")`.
- **Why serialization matters:** all panes share one global webR instance — concurrent `captureR` calls interleave unpredictably. Guard with a global promise queue plus a ref-based lock in the component.
- `Shelter.purge()` is async; it must be awaited in `finally` or R objects leak across runs and WASM memory grows.
- Prefer base R (e.g. `!duplicated()`) over dplyr in runnable snippets — installing wasm packages at runtime is slow and fragile.
