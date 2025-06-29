
// import {
//   Flex,
//   Heading,
//   IconButton,
//   useColorMode,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { FaMoon, FaSun } from "react-icons/fa";

// const Header = () => {
//   const { colorMode, toggleColorMode } = useColorMode();

//   const bg = useColorModeValue("brand.light.headerBg", "brand.dark.headerBg");
//   const color = useColorModeValue("brand.light.headerTitleText", "brand.dark.headerTitleText");

//   return (
//     <Flex
//       as="header"
//       align="center"
//       justify="center"
//       padding="1rem 2rem"
//       bg={bg}
//       color={color}
//       boxShadow="md"
//     >
//       <Heading
//         fontSize={["2xl", "3xl", "4xl"]}  // Responsive: mobile → tablet → desktop
//         fontWeight="extrabold"
//         color={color}
//         lineHeight="short"
//         textAlign={"center"}
//       >
//         Boise Yoga Girl
//       </Heading>

//       <IconButton
//         onClick={toggleColorMode}
//         icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
//         isRound
//         size="md"
//         colorScheme="pink"
//         aria-label="Toggle color mode"
//         marginLeft="auto"
//       />
//     </Flex>
//   );
// };

// export default Header;
// src/components/Header.jsx
import {
  Box,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("brand.light.headerBg", "brand.dark.headerBg");
  const color = useColorModeValue("brand.light.headerTitleText", "brand.dark.headerTitleText");

  return (
    <Box
      as="header"
      position="relative"
      bg={bg}
      color={color}
      boxShadow="md"
      px="2rem"
      py="1rem"
    >
      {/* Centered Heading */}
      <Flex justify="center">
        <Heading
          fontSize={["2xl", "3xl", "4xl"]}
          fontWeight="extrabold"
          color={color}
          textAlign="center"
        >
          Boise Yoga Girl
        </Heading>
      </Flex>

      {/* Toggle Button in Top Right */}
      <IconButton
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        isRound
        size="xlg"
        boxSize="4rem"
        colorScheme="pink"
        aria-label="Toggle color mode"
        position="absolute"
        top="1rem"
        right="2rem"
      />
    </Box>
  );
};

export default Header;