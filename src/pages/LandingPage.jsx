import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";

const LandingPage = () => {
  const headingColor = useColorModeValue("brand.light.headerTitleText", "brand.dark.headerTitleText");
  const textColor = useColorModeValue("brand.light.sidebarText", "brand.dark.sidebarText");

  return (
    <Box>
      <Heading mb={4} color={headingColor}>
        Welcome to Boise Yoga Girl
      </Heading>
      <Text fontSize="lg" color={textColor}>
        Use the sidebar to explore yoga poses and create custom sequences.
      </Text>
    </Box>
  );
};

export default LandingPage;