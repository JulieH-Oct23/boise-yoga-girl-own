// src/components/Header.jsx
import {
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
    <Flex
      as="header"
      align="center"
      justify="space-between"
      padding="1rem 2rem"
      bg={bg}
      color={color}
      boxShadow="md"
    >
      <Heading size="lg">Boise Yoga Girl</Heading>

      <IconButton
        onClick={toggleColorMode}
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        isRound
        size="md"
        colorScheme="pink"
        aria-label="Toggle color mode"
      />
    </Flex>
  );
};

export default Header;