import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton, useColorMode } from "@chakra-ui/react";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      position="sticky"
      top={0}
      zIndex={10}
      w="100%"
      align="center"
      justify="space-between"
      px={6}
      py={4}
      bg={colorMode === "light" ? "brand.light.background" : "brand.dark.background"}
      borderBottom="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
    >
      <Box fontWeight="bold" fontSize="xl" color={colorMode === "light" ? "brand.light.text" : "brand.dark.text"}>
        Boise Yoga Girl
      </Box>

      <IconButton
        aria-label="Toggle color mode"
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        variant="ghost"
        size="md"
        color={colorMode === "light" ? "brand.light.text" : "brand.dark.text"}
      />
    </Flex>
  );
};

export default Header;