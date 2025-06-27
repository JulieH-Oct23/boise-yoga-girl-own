import { extendTheme } from "@chakra-ui/react";
import { createTheme as createMuiTheme } from "@mui/material/styles";

const chakraTheme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      light: {
        headerBg: "#F6DBCA",
        sidebarBg: "#FDEFE8",
        mainBg: "#DFD3C5",
        headerTitleText: "#97834E",
        sidebarText: "#94695E",
        mainTitleText: "#FDEFE8",
        buttonBg: "#94695E",
        buttonText: "#FDEFE8",
        poseCardTitle: "#97834E",
        poseCardText: "#27241C",
        muted: "#EAD4C3",
        surface: "#F6DBCA",
        text: "#332F27",
      },
      dark: {
        headerBg: "#F6DBCA", // updated lighter pink
        sidebarBg: "#332F27",
        mainBg: "#26231D",
        headerTitleText: "#97834E",
        sidebarText: "#FDEFE8",
        mainTitleText: "#FDEFE8",
        buttonBg: "#94695E",
        buttonText: "#FDEFE8",
        poseCardTitle: "#97834E",
        poseCardText: "#FDEFE8",
        muted: "#EAD4C3",
        surface: "#F6DBCA",
        text: "#332F27",
      },
    },
  },
});

const muiLightTheme = createMuiTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FDEFE8",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#94695E",
      contrastText: "#FDEFE8",
    },
    text: {
      primary: "#332F27",
      secondary: "#97834E",
    },
  },
});

const muiDarkTheme = createMuiTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#26231D",
      paper: "#332F27",
    },
    primary: {
      main: "#94695E",
      contrastText: "#FDEFE8",
    },
    text: {
      primary: "#FDEFE8",
      secondary: "#97834E",
    },
  },
});

export { chakraTheme, muiDarkTheme, muiLightTheme };
