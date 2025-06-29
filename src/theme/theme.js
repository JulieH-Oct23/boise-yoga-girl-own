import { extendTheme } from "@chakra-ui/react";
import { createTheme as createMuiTheme } from "@mui/material/styles";

const chakraTheme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    heading: `'Quicksand', sans-serif`,
    body: `'Quicksand', sans-serif`,
  },
  colors: {
    brand: {
      light: {
        headerBg: "#FDEFE8",
        sidebarBg: "#FFFFFF",
        mainBg: "#FFFFFF",
        headerTitleText: "#94626D",
        sidebarText: "#97834E",
        mainTitleText: "#FDEFE8",
        buttonBg: "#94626D",
        buttonText: "#FDEFE8",
        poseCardTitle: "#97834E",
        poseCardText: "#27241C",
        muted: "#EAD4C3",
        surface: "#FDEFE8",
        text: "#332F27",
      },
      dark: {
        headerBg: "#FDEFE8", // updated lighter pink
        sidebarBg: "#332F27",
        mainBg: "#332F27",
        headerTitleText: "#97834E",
        sidebarText: "#FDEFE8",
        mainTitleText: "#FDEFE8",
        buttonBg: "#94695E",
        buttonText: "#FDEFE8",
        poseCardTitle: "#97834E",
        poseCardText: "#97834E",
        muted: "#EAD4C3",
        surface: "#FDEFE8",
        text: "#97834E",
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
