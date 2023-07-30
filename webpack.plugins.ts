import type IForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
const Dotenv = require("dotenv-webpack")

// eslint-disable-next-line @typescript-eslint/no-var-requires
const ForkTsCheckerWebpackPlugin: typeof IForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

export const plugins = [
  new Dotenv(),
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
]
