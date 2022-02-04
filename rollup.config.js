import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/scripts/main.ts",
  output: {
    file: "build/js/bundle.min.js",
    format: "cjs",
  },
  plugins: [
    typescript(),
    nodeResolve({
      extensions: [".ts", ".json", ".js"],
    }),
  ],
};
