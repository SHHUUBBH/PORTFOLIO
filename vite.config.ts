import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers (all major browsers released in 2020+)
    target: "es2020",
    // Suppress source maps in production to keep Netlify deploy lean
    sourcemap: false,
    // Raise chunk size warning threshold (the single-bundle architecture is intentional)
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Split large vendor libraries into separate cacheable chunks
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-gsap": ["gsap"],
          "vendor-lenis": ["lenis"],
          "vendor-radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tabs",
          ],
        },
      },
    },
  },
}));
