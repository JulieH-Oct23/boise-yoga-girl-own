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

const bg = useColorModeValue("brand.light.header", "brand.dark.header");
  const text = useColorModeValue(
    "brand.light.headerTitleText",
    "brand.dark.headerTitleText"
  );

  return (
    <Box
      as="header"
      bg={bg}
      color={text}
      boxShadow="md"
      px="2rem"
      py="1rem"
      position="relative"
      zIndex="1000"
    >
      <Flex justify="center" align="center">
        <Heading
          fontSize={["2xl", "3xl", "4xl"]}
          fontWeight="extrabold"
          textAlign="center"
        >
          Boise Yoga Girl
        </Heading>
      </Flex>

      <IconButton
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        isRound
        size="lg"
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