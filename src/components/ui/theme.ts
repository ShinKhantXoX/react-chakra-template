import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#f5faff" },
          100: { value: "#ebf8ff" },
          500: { value: "#3182ce" },
          700: { value: "#2b6cb0" },
          900: { value: "#1a365d" },
        },
      },
    },
    semanticTokens: {
      colors: {
        pageBg: {
          value: { _light: "#EEEEEE", _dark: "#1a202c" }, // subtle neutral
        },
        surfaceBg: {
          value: { _light: "#EEEEEE", _dark: "#2d3748" }, // used for cards/sidebar
        },
        fg: {
          value: { _light: "#4A70A9", _dark: "#f7fafc" },
        },
        primary: {
          value: { _light: "#8FABD4", _dark: "#63b3ed" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
