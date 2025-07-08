import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tempo(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2,mp3}"],
        maximumFileSizeToCacheInBytes: 5000000, // 5MB
        skipWaiting: true,
        clientsClaim: true,
      },
      includeAssets: ["yacin-gym-logo.png", "vite.svg"],
      manifest: {
        name: "Yacin Gym - نادي ياسين الرياضي",
        short_name: "YacinGym",
        description:
          "تطبيق إدارة نادي ياسين الرياضي - إدارة الأعضاء والمدفوعات والحضور",
        theme_color: "#1E293B",
        background_color: "#0F172A",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        lang: "ar",
        dir: "rtl",
        categories: ["fitness", "sports", "business"],
        icons: [
          {
            src: "yacin-gym-logo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "yacin-gym-logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        screenshots: [
          {
            src: "yacin-gym-logo.png",
            sizes: "1280x720",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: process.env.TEMPO === "true" ? true : undefined,
  },
});
