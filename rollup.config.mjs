import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "prod/index.js",
  output: {
    file: "dist/pulp.js",
    format: "es"
  },
  plugins: [
    nodeResolve()
  ]
}
