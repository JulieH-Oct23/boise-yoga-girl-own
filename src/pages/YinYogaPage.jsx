import { Box, Heading, Text, useColorModeValue, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PoseCard from "../components/PoseCard";
import SequenceCard from "../components/SequenceCard"; // newly created component
import { useEffect, useState } from "react";
import axios from "axios";

const YinYogaPage = () => {
  const headingColor = useColorModeValue("brand.light.mainTitleText", "brand.dark.mainTitleText");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
  const navigate = useNavigate();
  

  // Static featured sequences
  const yinSequences = [
    {
      id: "lunar-stillness",
      name: "Lunar Stillness",
      focus: "Hips & Lower Back",
      difficulty: "Beginner",
      poseIds: ["66yin12345...", "66yin23456...", "66yin34567..."], // example IDs
    },
    {
      id: "deep-release",
      name: "Deep Release",
      focus: "Spine & Fascia",
      difficulty: "Intermediate",
      poseIds: ["66yin99999...", "66yin88888...", "66yin77777..."],
    },
  ];

  // Saved sequences (fetched from database)
  const [savedSequences, setSavedSequences] = useState([]);

  useEffect(() => {
    const fetchSequences = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/sequences");
        const yinOnly = res.data.filter(seq => seq.style === "Yin");
        setSavedSequences(yinOnly);
      } catch (err) {
        console.error("Failed to fetch saved sequences", err);
      }
    };

    fetchSequences();
  }, []);

  return (
    <Box p={6}>
      <Heading mb={4} color={headingColor}>
        Yin Yoga
      </Heading>
      <Text fontSize="lg" color={textColor} mb={6}>
        This page features long-held, passive poses to target deep connective tissue and stillness.
      </Text>

      {/* Featured Sequences */}
      <Box bg="#FAEDEC" p={4} borderRadius="xl" mb={10}>
        <Heading size="md" mb={4} color={headingColor}>
          Featured Yin Sequences
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {yinSequences.map((seq) => (
            <PoseCard
              key={seq.id}
              name={seq.name}
              level={seq.difficulty}
              onClick={() => navigate(`/yin-sequence/${seq.id}`)}
            />
          ))}
        </SimpleGrid>
      </Box>

      {/* Saved Yin Sequences */}
      <Box bg="#FAEDEC" p={4} borderRadius="xl">
        <Heading size="md" mb={4} color={headingColor}>
          Saved Yin Sequences
        </Heading>
        {savedSequences.length === 0 ? (
          <Text color={textColor}>No saved sequences yet.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {savedSequences.map((seq) => (
              <SequenceCard
                key={seq._id}
                name={seq.name}
                difficulty={seq.difficulty}
                poseIds={seq.poseIds}
                onClick={() => navigate(`/sequence/${seq._id}`)}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default YinYogaPage;