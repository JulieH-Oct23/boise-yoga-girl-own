
// import { Box, Button, Heading, Text, VStack, Link as ChakraLink } from "@chakra-ui/react";
// import { Link as RouterLink } from "react-router-dom";
// import landingBackground from "../images/landingpagebackground.jpeg";

// const LandingPage = () => {
//   // Use dark-mode text colors across all content
//   const headingColor = "brand.dark.headerTitleText";
//   const textColor = "brand.dark.sidebarText";

//   return (
//     <Box
//       position="relative"
//       width="100vw"
//       minHeight="100vh"
//       backgroundImage={`url(${landingBackground})`}
//       backgroundSize="cover"
//       backgroundPosition="center"
//       backgroundRepeat="no-repeat"
//       backgroundColor="black"
//     >
//       {/* Dark overlay */}
//       <Box
//         position="absolute"
//         top={0}
//         left={0}
//         right={0}
//         bottom={0}
//         bg="blackAlpha.00"
//         zIndex={0}
//       />

//       {/* Main Content */}
//       <Box
//         position="relative"
//         zIndex={1}
//         display="flex"
//         flexDirection="column"
//         justifyContent="flex-start"
//         alignItems="center"
//         height="100%"
//         textAlign="center"
//         px={4}
//         pt={{ base: "60px", md: "120px", lg: "160px" }}
//       >
//         <Heading mb={6} color={headingColor} fontSize={{ base: "3xl", md: "4xl" }}>
//           Explore the world of yoga, select a path below to begin...
//         </Heading>

//         {/* <Text fontSize="lg" color={textColor} mb={6}>
//         </Text> */}

//         <VStack spacing={4}>
//           <ChakraLink as={RouterLink} to="/allposes">
//             <Button colorScheme="pink" size="lg" variant="solid" fontSize="18px" color={textColor}>
//               Pose Encyclopedia
//             </Button>
//           </ChakraLink>
//           <ChakraLink as={RouterLink} to="/poweryoga">
//             <Button colorScheme="pink" size="lg" variant="outline" fontSize="18px" color={textColor}>
//               Power Yoga Sequences
//             </Button>
//           </ChakraLink>
//           <ChakraLink as={RouterLink} to="/yinyoga">
//             <Button colorScheme="pink" size="lg" variant="outline" fontSize="18px" color={textColor}>
//               Yin Yoga Sequences
//             </Button>
//           </ChakraLink>
//           <ChakraLink as={RouterLink} to="/restorativeyoga">
//             <Button colorScheme="pink" size="lg" variant="outline" fontSize="18px" color={textColor}>
//               Restorative Yoga Sequences
//             </Button>
//           </ChakraLink>
//           <ChakraLink as={RouterLink} to="/sequencebuilder">
//             <Button colorScheme="pink" size="lg" variant="outline" fontSize="18px" color={textColor}>
//               Build A Personalized Sequence
//             </Button>
//           </ChakraLink>
//         </VStack>
//       </Box>
//     </Box>
//   );
// };

// export default LandingPage;

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
  // Original color logic restored
  const headingColor = useColorModeValue(
    "brand.light.headerTitleText",
    "brand.dark.headerTitleText"
  );
  const textColor = useColorModeValue(
    "brand.light.sidebarText",
    "brand.dark.sidebarText"
  );

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
          Explore the world of yoga, select a path to begin...
        </Heading>

        <Text fontSize="lg" color={textColor} mb={6}>
        </Text>

        <VStack spacing={4}>
          <ChakraLink as={RouterLink} to="/allposes">
            <Button colorScheme="pink" size="lg" variant="solid" fontSize="18px">
              Pose Encyclopedia
            </Button>
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/poweryoga">
            <Button colorScheme="pink" size="lg" variant="outline" fontSize="18px">
              Power Yoga Sequences
            </Button>
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/yinyoga">
            <Button colorScheme="pink" size="lg" variant="outline" fontSize="18px">
              Yin Yoga Sequences
            </Button>
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/restorativeyoga">
            <Button colorScheme="pink" size="lg" variant="outline" fontSize="18px">
              Restorative Yoga Sequences
            </Button>
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/sequencebuilder">
            <Button colorScheme="pink" size="lg" variant="outline" fontSize="18px">
              Build A Personalized Sequence
            </Button>
          </ChakraLink>
        </VStack>
      </Box>
    </Box>
  );
};

export default LandingPage;