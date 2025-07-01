import { createTheme } from "@mui/material/styles";

export const muiLightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FCF8F7",
      paper: "#F1E9E7",
    },
    primary: {
      main: "#BFA39D",
    },
    text: {
      primary: "#3B3B3B",
      secondary: "#776E6B",
    },
  },
});

export const muiDarkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#2B2B28",
      paper: "#4A4A3D",
    },
    primary: {
      main: "#B1B381",
    },
    text: {
      primary: "#FAFAF9",
      secondary: "#E4E2D4",
    },
  },
});

