import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Klero",
        short_name: "Klero",
        description: "Assistant doux pour s’organiser, communiquer et se réguler.",
        theme_color: "#7c5cff",
        background_color: "#f7f5ff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/logo_klero.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/logo_klero.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
