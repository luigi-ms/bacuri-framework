import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "prod/index.js",
  output: {
    file: "dist/psys.js",
    format: "es"
  },
  plugins: [
    nodeResolve()
  ]
}
