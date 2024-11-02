import typescript from "@rollup/plugin-typescript";
// import babel from "@rollup/plugin-babel";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts", // Entry point for your package
  output: [
    {
      file: "dist/index.js", // Output file for CommonJS format
      format: "cjs", // CommonJS format
      exports: "named",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js", // Output file for ES Module format
      format: "esm", // ES Module format
      sourcemap: true,
    },
  ],
  plugins: [
    nodeResolve(), // Allows Rollup to resolve node_modules
    typescript({ tsconfig: "./tsconfig.json" }), // Compiles TypeScript
    resolve(), // Resolves node_modules imports
    commonjs(), // Converts CommonJS modules to ES6

    // babel({
    //   exclude: "node_modules/**", // Exclude transpiling node_modules
    //   babelHelpers: "bundled",
    // }),

    // terser(),
  ],
  external: ["react", "react-dom"], // Exclude peer dependencies
};
