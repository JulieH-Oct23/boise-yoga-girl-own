// src/components/ColorModeToggle.jsx
import { Box, Switch, useColorMode } from "@chakra-ui/react";

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Switch
        isChecked={colorMode === "dark"}
        onChange={toggleColorMode}
        size="md"
        colorScheme="pink"
        aria-label="Toggle color mode"
      />
    </Box>
  );
};

export default ColorModeToggle;