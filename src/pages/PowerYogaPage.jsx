import { Box, Heading, Text, useColorModeValue, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PowerYogaPage = () => {
  const headingColor = useColorModeValue("brand.light.mainTitleText", "brand.dark.mainTitleText");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
  const navigate = useNavigate();

  const powerSequences = [
    {
      id: "sunrise-strength",
      name: "Sunrise Strength",
      focus: "Core & Stability",
      difficulty: "Intermediate",
      poseIds: ["66abc12345...", "66abc23456...", "66abc34567..."], // replace with actual MongoDB pose _id values
    },
    {
      id: "warrior-flow",
      name: "Warrior Flow",
      focus: "Legs & Balance",
      difficulty: "Advanced",
      poseIds: ["66abc99999...", "66abc88888...", "66abc77777..."],
    },
  ];

  return (
    <Box p={6}>
      <Heading mb={4} color={headingColor}>
        Power Yoga
      </Heading>
      <Text fontSize="lg" color={textColor} mb={6}>
        This page features dynamic, strength-building yoga flows to energize your practice.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {powerSequences.map((seq) => (
          <SequenceCard
            key={seq.id}
            name={seq.name}
            focus={seq.focus}
            difficulty={seq.difficulty}
            onClick={() => navigate(`/power-sequence/${seq.id}`)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default PowerYogaPage;