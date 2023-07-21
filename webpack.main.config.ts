import type { Configuration } from 'webpack';
import path from "node:path"
import { rules } from './webpack.rules';

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/electron/index.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      "@": path.resolve(__dirname, 'src'),
      "~": path.resolve(__dirname, 'src/electron'),
    },
  },
};
