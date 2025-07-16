import { Box, Heading, Text, useColorModeValue, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SequenceCard from "../components/SequenceCard";

const RestorativeYogaPage = () => {
  const headingColor = useColorModeValue("brand.light.mainTitleText", "brand.dark.mainTitleText");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
  const navigate = useNavigate();

  const restorativeSequences = [
    {
      id: "evening-unwind",
      name: "Evening Unwind",
      focus: "Deep Relaxation",
      difficulty: "Beginner",
      poseIds: ["66rest12345...", "66rest23456...", "66rest34567..."], // replace with actual _id values
    },
    {
      id: "nervous-system-reset",
      name: "Nervous System Reset",
      focus: "Healing & Recovery",
      difficulty: "All Levels",
      poseIds: ["66rest99999...", "66rest88888...", "66rest77777..."],
    },
  ];

  return (
    <Box p={6}>
      <Heading mb={4} color={headingColor}>
        Restorative Yoga
      </Heading>
      <Text fontSize="lg" color={textColor} mb={6}>
        This page features relaxing, supported poses to promote deep rest and healing.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {restorativeSequences.map((seq) => (
          <SequenceCard
            key={seq.id}
            name={seq.name}
            focus={seq.focus}
            difficulty={seq.difficulty}
            onClick={() => navigate(`/restorative-sequence/${seq.id}`)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default RestorativeYogaPage;