export default function manifest() {
  return {
    name: "LMB Technology",
    short_name: "LMB",
    description: "Software studio. Free AI image detector with crop tool.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E0E10",
    theme_color: "#0E0E10",
    icons: [
      { src: "/icon-180.png", sizes: "180x180", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
