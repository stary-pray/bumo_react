// This file configures a web server for testing the production build
// on your local machine.
import browserSync from "browser-sync";
import historyApiFallback from "connect-history-api-fallback";
import proxyMiddleware from "http-proxy-middleware";
import {serverApi} from "../src/config";
const proxy = proxyMiddleware('/api', {target: serverApi});

// Run Browsersync
browserSync({
  port: 3000,
  open: false,
  ui: {
    port: 3001
  },
  server: {
    baseDir: 'dist',
  },

  files: [
    'src/*.html'
  ],

  middleware: [proxy, historyApiFallback()]
});
