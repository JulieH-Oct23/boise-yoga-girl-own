import { extendTheme } from "@chakra-ui/react";

const colors = {
  light: {
    background: "#FAFAF9",
    surface: "#E4E2D4",
    primary: "#B1B381",
    accent: "#BFA39D",
    text: "#3B3B3B",
    muted: "#6E6E6E",
  },
  dark: {
    background: "#2B2B28",
    surface: "#4F4F45",
    primary: "#D2CEB4",
    accent: "#BFA39D",
    text: "#FAFAF9",
    muted: "#E4E2D4",
  },
};

const theme = extendTheme({
  colors: {
    brand: colors,
  },
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

export default theme;
