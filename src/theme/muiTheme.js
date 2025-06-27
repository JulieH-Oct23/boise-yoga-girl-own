import { createTheme } from "@mui/material/styles";

export const muiLightTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#B1B381" },
    secondary: { main: "#BFA39D" },
    background: { default: "#FAFAF9", paper: "#E4E2D4" },
    text: { primary: "#3B3B3B", secondary: "#6E6E6E" },
  },
});

export const muiDarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#D2CEB4" },
    secondary: { main: "#BFA39D" },
    background: { default: "#2B2B28", paper: "#4F4F45" },
    text: { primary: "#FAFAF9", secondary: "#E4E2D4" },
  },
});
