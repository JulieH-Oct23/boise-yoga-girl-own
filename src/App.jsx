
// export default App;
import {
  Box,
  Link as ChakraLink,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  Route,
  BrowserRouter as Router,
  Link as RouterLink,
  Routes,
  useLocation,
} from "react-router-dom";

import AllPosesPage from "./pages/AllPosesPage";
import LandingPage from "./pages/LandingPage";
import PoseDetailPage from "./pages/PoseDetailPage";
import PowerYogaPage from "./pages/PowerYogaPage";
import RestorativeYogaPage from "./pages/RestorativeYogaPage";
import SequenceBuilderPage from "./pages/SequenceBuilderPage";
import YinYogaPage from "./pages/YinYogaPage";
import SequenceDetail from "./pages/SequenceDetail";
import MeditationBuilderPage from "./pages/MeditationBuilderPage";
import MeditationPage from "./pages/MeditationPage";

import { useColorMode } from "@chakra-ui/react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import { muiDarkTheme, muiLightTheme } from "./theme/theme";

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  const { colorMode } = useColorMode();
  const muiTheme = colorMode === "light" ? muiLightTheme : muiDarkTheme;

  const headerTitleColor = useColorModeValue(
    "brand.light.headerTitleText",
    "brand.dark.headerTitleText"
  );
  const sidebarBg = useColorModeValue(
    "brand.light.sidebarBg",
    "brand.dark.sidebarBg"
  );
  const mainBg = useColorModeValue("brand.light.mainBg", "brand.dark.mainBg");
  const sidebarTextColor = useColorModeValue(
    "brand.light.sidebarText",
    "brand.dark.sidebarText"
  );
  const mainTitleColor = useColorModeValue(
    "brand.light.mainTitleText",
    "brand.dark.mainTitleText"
  );

  return (
    <MUIThemeProvider theme={muiTheme}>
      {/* Fixed Header */}
      <Box position="fixed" top={0} left={0} right={0} zIndex={1000}>
        <Header />
      </Box>

      {/* Scrollable Content Area */}
      <Box
        display="flex"
        flexDirection={["column", "row"]}
        pt="64px"
        minH="100vh"
        overflowX="hidden"
        overflowY="auto"
      >
        {/* Sidebar (hidden only on landing page) */}
        {!isLandingPage && (
          <Box
            bg={sidebarBg}
            width={["100%", "250px"]}
            p={4}
            flexShrink={0}
            color={sidebarTextColor}
          >
            <VStack align="stretch" spacing={4} pt={6}>
              <Box>
                <Text fontWeight="bold" fontSize="lg" color={headerTitleColor}>
                  Yoga Encyclopedia
                </Text>
                <ChakraLink
                  as={RouterLink}
                  to="/allposes"
                  color={sidebarTextColor}
                  textDecoration="none"
                >
                  All Poses
                </ChakraLink>
              </Box>

        <Box>
  <Text fontWeight="bold" fontSize="lg" color={headerTitleColor}>
    Yoga Classes
  </Text>
  <ChakraLink
    as={RouterLink}
    to="/poweryoga"
    color={sidebarTextColor}
    textDecoration="none"
  >
    Power Yoga
  </ChakraLink>
  <ChakraLink
    as={RouterLink}
    to="/yinyoga"
    color={sidebarTextColor}
    textDecoration="none"
    display="block"
  >
    Yin Yoga
  </ChakraLink>
  <ChakraLink
    as={RouterLink}
    to="/restorativeyoga"
    color={sidebarTextColor}
    textDecoration="none"
    display="block"
  >
    Restorative Yoga
  </ChakraLink>
  <ChakraLink
    as={RouterLink}
    to="/meditations"
    color={sidebarTextColor}
    textDecoration="none"
    display="block"
  >
    Meditations
  </ChakraLink>
</Box>

              <Box>
                <Text fontWeight="bold" fontSize="lg" color={headerTitleColor}>
                  Sequence Builder
                </Text>
                <ChakraLink
                  as={RouterLink}
                  to="/sequencebuilder"
                  color={sidebarTextColor}
                  textDecoration="none"
                >
                  Create New
                </ChakraLink>
              </Box>

              <Box>
                <Text fontWeight="bold" fontSize="lg" color={headerTitleColor}>
                  Meditation Builder
                </Text>
                <ChakraLink
                  as={RouterLink}
                  to="/meditation-builder"
                  color={sidebarTextColor}
                  textDecoration="none"
                >
                  Create New
                </ChakraLink>
              </Box>
            </VStack>
          </Box>
        )}

        {/* Main Content */}
        <Box flex="1" bg={mainBg} color={mainTitleColor}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/allposes" element={<AllPosesPage />} />
            <Route path="/poweryoga" element={<PowerYogaPage />} />
            <Route path="/restorativeyoga" element={<RestorativeYogaPage />} />
            <Route path="/yinyoga" element={<YinYogaPage />} />
            <Route path="/sequencebuilder" element={<SequenceBuilderPage />} />
            <Route path="/poses/:poseId" element={<PoseDetailPage />} />
            <Route path="/sequence/:id" element={<SequenceDetail />} />
            <Route path="/meditation-builder" element={<MeditationBuilderPage />} />
            <Route path="/meditations" element={<MeditationPage />} />
          </Routes>
        </Box>
      </Box>
    </MUIThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;