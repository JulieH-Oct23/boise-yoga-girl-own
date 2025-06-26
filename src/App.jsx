// src/App.jsx
import {
  Box,
  Link as ChakraLink,
  ChakraProvider,
  Heading,
  Text,
  VStack,
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

function App() {
  return (
    <ChakraProvider>
      <Router>
        {/* HEADER */}
        <Box bg="gray.800" p={4} textAlign="center">
          <Heading color="teal.200">Boise Yoga Girl</Heading>
        </Box>

        {/* MAIN LAYOUT */}
        <Box display="flex" flexDirection={["column", "row"]}>
          {/* SIDEBAR */}
          <Box
            bg="gray.700"
            width={["100%", "250px"]}
            p={4}
            borderRight={["none", "1px solid #444"]}
            minH="calc(100vh - 64px)"
            color="white"
          >
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontWeight="bold" fontSize="lg" color="teal.300">
                  Yoga Encyclopedia
                </Text>
                <ChakraLink as={RouterLink} to="/allposes">All Poses</ChakraLink>
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize="lg" color="teal.300">
                  Yoga Classes
                </Text>
                <ChakraLink as={RouterLink} to="/poweryoga">Power Yoga</ChakraLink>
                <ChakraLink as={RouterLink} to="/yinyoga">Yin Yoga</ChakraLink>
                <ChakraLink as={RouterLink} to="/restorativeyoga">Restorative Yoga</ChakraLink>
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize="lg" color="teal.300">
                  Sequence Builder
                </Text>
                <ChakraLink as={RouterLink} to="/sequencebuilder">Create New</ChakraLink>
                <ChakraLink as={RouterLink} to="/savedsequences">Saved Sequences</ChakraLink>
              </Box>
            </VStack>
          </Box>

          {/* MAIN CONTENT */}
          <Box flex="1" p={6} bg="gray.900" color="white">
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
    </ChakraProvider>
  );
}

export default App;