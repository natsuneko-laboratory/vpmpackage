// https://github.com/microsoft/TypeScript/issues/47663#issuecomment-1270716220

import { defineConfig } from "@natsuneko-laboratory/kiana/vite";
import type {} from "vite";

export default defineConfig({
  externals: [
    "node:fs/promises",
    "node:os",
    "node:path",
    "adm-zip",
    "fs-extra",
    "normalize-path",
  ],
});
