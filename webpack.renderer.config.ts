import type { Configuration } from "webpack"
import path from "node:path"
import { rules } from "./webpack.rules"
import { plugins } from "./webpack.plugins"

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
})

export const rendererConfig: Configuration = {
  target: "web",
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css"],
    alias: {
      "@/applications": path.resolve(__dirname, "src/applications"),
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "src/electron"),
    },
  },
}
