import {
  Box,
  Link as ChakraLink,
  Heading,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Route,
  BrowserRouter as Router,
  Link as RouterLink,
  Routes,
} from "react-router-dom";

import AllPosesPage from "./pages/AllPosesPage";
import LandingPage from "./pages/LandingPage";
import PowerYogaPage from "./pages/PowerYogaPage";
import RestorativeYogaPage from "./pages/RestorativeYogaPage";
import SavedSequencesPage from "./pages/SavedSequencesPages";
import SequenceBuilderPage from "./pages/SequenceBuilderPage";
import YinYogaPage from "./pages/YinYogaPage";

import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import ColorModeToggle from "./components/ColorModeToggle";
import { muiDarkTheme, muiLightTheme } from "./theme/muiTheme";

function App() {
  const { colorMode } = useColorMode();
  const muiTheme = colorMode === "light" ? muiLightTheme : muiDarkTheme;

  const headerBg = useColorModeValue("brand.light.surface", "brand.dark.surface");
  const sidebarBg = useColorModeValue("brand.light.surface", "brand.dark.surface");
  const mainBg = useColorModeValue("brand.light.background", "brand.dark.background");
  const textColor = useColorModeValue("brand.light.text", "brand.dark.text");
  const accent = useColorModeValue("brand.light.primary", "brand.dark.primary");

  return (
    <MUIThemeProvider theme={muiTheme}>
      <Router>
        {/* HEADER */}
        <Box
          bg={headerBg}
          px={6}
          py={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderBottom="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
        >
          <Heading color={accent} fontSize="2xl">
            Boise Yoga Girl
          </Heading>
          <ColorModeToggle />
        </Box>

        {/* MAIN LAYOUT */}
        <Box display="flex" flexDirection={["column", "row"]}>
          {/* SIDEBAR */}
          <Box
            bg={sidebarBg}
            width={["100%", "250px"]}
            p={4}
            borderRight={["none", "1px solid #ccc"]}
            minH="calc(100vh - 64px)"
            color={textColor}
          >
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontWeight="bold" fontSize="lg" color={accent}>
                  Yoga Encyclopedia
                </Text>
                <ChakraLink as={RouterLink} to="/allposes">All Poses</ChakraLink>
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize="lg" color={accent}>
                  Yoga Classes
                </Text>
                <ChakraLink as={RouterLink} to="/poweryoga">Power Yoga</ChakraLink>
                <ChakraLink as={RouterLink} to="/yinyoga">Yin Yoga</ChakraLink>
                <ChakraLink as={RouterLink} to="/restorativeyoga">Restorative Yoga</ChakraLink>
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize="lg" color={accent}>
                  Sequence Builder
                </Text>
                <ChakraLink as={RouterLink} to="/sequencebuilder">Create New</ChakraLink>
                <ChakraLink as={RouterLink} to="/savedsequences">Saved Sequences</ChakraLink>
              </Box>
            </VStack>
          </Box>

          {/* MAIN CONTENT */}
          <Box flex="1" p={6} bg={mainBg} color={textColor}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/allposes" element={<AllPosesPage />} />
              <Route path="/poweryoga" element={<PowerYogaPage />} />
              <Route path="/restorativeyoga" element={<RestorativeYogaPage />} />
              <Route path="/yinyoga" element={<YinYogaPage />} />
              <Route path="/sequencebuilder" element={<SequenceBuilderPage />} />
              <Route path="/savedsequences" element={<SavedSequencesPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </MUIThemeProvider>
  );
}

export default App;