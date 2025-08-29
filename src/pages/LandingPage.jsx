import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import landingBackground from "../images/landingpagebackground.jpeg";

const LandingPage = () => {
  const headingColor = useColorModeValue(
    "brand.light.headerTitleText",
    "brand.dark.headerTitleText"
  );
  const textColor = useColorModeValue(
    "brand.light.sidebarText",
    "brand.dark.sidebarText"
  );

  const menuButtonStyle = {
    bg: "#FAEDEC",
    color: "#A18E88",
    borderRadius: "md",
    size: "sm",
    fontSize: "18px",
    fontWeight: "semibold",
    px: 4, // horizontal padding (left + right)
    py: 1, // vertical padding (top + bottom)
    _hover: { bg: "#f5dbdb" },
  };

  return (
    <Box
      position="relative"
      width="100vw"
      minHeight="100vh"
      backgroundImage={`url(${landingBackground})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundColor="black"
    >
      {/* Light overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.100"
        zIndex={0}
      />

      {/* Main Content */}
      <Box
        position="relative"
        zIndex={1}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        height="100%"
        textAlign="center"
        px={4}
        pt={{ base: "60px", md: "120px", lg: "160px" }}
      >
        <Heading mb={6} color={headingColor} fontSize={{ base: "3xl", md: "4xl" }}>
          Explore the world of yoga...
        </Heading>

        <Text fontSize="lg" color={textColor} mb={6}></Text>

        <VStack spacing={4}>
          <ChakraLink as={RouterLink} to="/allposes">
            <Button {...menuButtonStyle}>Pose Encyclopedia</Button>
          </ChakraLink>
           <ChakraLink as={RouterLink} to="/meditations">
            <Button {...menuButtonStyle}>Meditations</Button>
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/poweryoga">
            <Button {...menuButtonStyle}>Power Yoga Sequences</Button>
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/hathayoga">
            <Button {...menuButtonStyle}>Hatha Yoga Sequences</Button>
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/yinyoga">
            <Button {...menuButtonStyle}>Yin Yoga Sequences</Button>
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/restorativeyoga">
            <Button {...menuButtonStyle}>Restorative Yoga Sequences</Button>
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/sequencebuilder">
            <Button {...menuButtonStyle}>Build A Personalized Sequence</Button>
          </ChakraLink>
        </VStack>
      </Box>
    </Box>
  );
};

export default LandingPage;