import { Box, Heading, Text, useColorModeValue, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SequenceCard from "../components/SequenceCard";

const YinYogaPage = () => {
  const headingColor = useColorModeValue("brand.light.mainTitleText", "brand.dark.mainTitleText");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
  const navigate = useNavigate();

  const yinSequences = [
    {
      id: "lunar-stillness",
      name: "Lunar Stillness",
      focus: "Hips & Lower Back",
      difficulty: "Beginner",
      poseIds: ["66yin12345...", "66yin23456...", "66yin34567..."], // replace with actual MongoDB _ids
    },
    {
      id: "deep-release",
      name: "Deep Release",
      focus: "Spine & Fascia",
      difficulty: "Intermediate",
      poseIds: ["66yin99999...", "66yin88888...", "66yin77777..."],
    },
  ];

  return (
    <Box p={6}>
      <Heading mb={4} color={headingColor}>
        Yin Yoga
      </Heading>
      <Text fontSize="lg" color={textColor} mb={6}>
        This page features long-held, passive poses to target deep connective tissue and stillness.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {yinSequences.map((seq) => (
          <SequenceCard
            key={seq.id}
            name={seq.name}
            focus={seq.focus}
            difficulty={seq.difficulty}
            onClick={() => navigate(`/yin-sequence/${seq.id}`)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default YinYogaPage;