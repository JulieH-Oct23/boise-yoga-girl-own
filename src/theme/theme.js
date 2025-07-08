// // src/theme/theme.js
// import { extendTheme } from "@chakra-ui/react";
// import { createTheme } from "@mui/material/styles";

// // ✅ Chakra UI Theme
// export const chakraTheme = extendTheme({
//   config: {
//     initialColorMode: "light",
//     useSystemColorMode: false,
//   },
//   colors: {
//     brand: {
//       light: {
//         surface: "#FAEDEC",
//         muted: "#A98984",
//         header: "#FAEDEC",
//         sidebarBg: "#ffffff",
//         mainBg: "#FFFFFF",
//         mainTitleText: "#332F27",
//         sidebarText: "#332F27",
//         headerTitleText: "#A18E88",
//         poseCardText: "#3B3B3B",
//         poseCardTitle: "#93685E",
//       },
//       dark: {
//         surface: "#332F27",
//         muted: "#BFA39D",
//         header: "#A18E88",
//         sidebarBg: "#332F27",
//         mainBg: "#27241D",
//         mainTitleText: "#FAFAF9",
//         sidebarText: "#E4E2D4",
//         headerTitleText: "#FAEDEC",
//         poseCardText: "#FAFAF9",
//         poseCardTitle: "#B1B381",
//       },
//     },
//   },
// });

// // ✅ MUI Themes
// export const muiLightTheme = createTheme({
//   palette: {
//     mode: "light",
//     background: {
//       default: "#FCF8F7",
//       paper: "#F1E9E7",
//     },
//     primary: {
//       main: "#BFA39D",
//     },
//     text: {
//       primary: "#3B3B3B",
//       secondary: "#776E6B",
//     },
//   },
// });

// export const muiDarkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     background: {
//       default: "#2B2B28",
//       paper: "#4A4A3D",
//     },
//     primary: {
//       main: "#B1B381",
//     },
//     text: {
//       primary: "#FAFAF9",
//       secondary: "#E4E2D4",
//     },
//   },
// });

// src/theme/theme.js
import { extendTheme } from "@chakra-ui/react";
import { createTheme } from "@mui/material/styles";

// ✅ Chakra UI Theme
export const chakraTheme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      light: {
        surface: "#FAEDEC",
        muted: "#A98984",
        header: "#FAEDEC",
        sidebarBg: "#ffffff",
        mainBg: "#FFFFFF",
        mainTitleText: "#332F27",
        sidebarText: "#332F27",
        headerTitleText: "#A18E88",
        poseCardText: "#3B3B3B",
        poseCardTitle: "#93685E",
      },
      dark: {
        surface: "#332F27",
        muted: "#BFA39D",
        header: "#A18E88",
        sidebarBg: "#332F27",
        mainBg: "#27241D",
        mainTitleText: "#FAFAF9",
        sidebarText: "#E4E2D4",
        headerTitleText: "#FAEDEC",
        poseCardText: "#FAFAF9",
        poseCardTitle: "#B1B381",
      },
    },
  },
  fonts: {
    heading: "'Montserrat', sans-serif",
    body: "'Montserrat', sans-serif",
  },
});

// ✅ MUI Themes
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