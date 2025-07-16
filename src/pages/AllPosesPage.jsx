import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";
import PoseCard from "../components/PoseCard";

const API_BASE = import.meta.env.VITE_API_BASE;

const SequenceBuilderPage = () => {
  const [poses, setPoses] = useState([]);
  const [selectedPoses, setSelectedPoses] = useState([]);
  const toast = useToast();

  const headingColor = useColorModeValue("brand.light.mainTitleText", "brand.dark.mainTitleText");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
  const buttonBg = useColorModeValue("brand.light.button", "brand.dark.button");
  const buttonText = useColorModeValue("brand.light.surface", "brand.dark.surface");

  // ✅ Fetch poses from backend
  useEffect(() => {
    async function fetchPoses() {
      try {
        const res = await fetch(`${API_BASE}/api/poses`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setPoses(data);
      } catch (err) {
        console.error("Failed to fetch poses:", err);
        toast({
          title: "Error fetching poses.",
          description: err.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
    fetchPoses();
  }, []);

  // ✅ Toggle pose in the selected list
  const togglePoseSelection = (pose) => {
    setSelectedPoses((prev) =>
      prev.find((p) => p._id === pose._id)
        ? prev.filter((p) => p._id !== pose._id)
        : [...prev, pose]
    );
  };

  return (
    <Box p={6}>
      <Heading mb={4} color={headingColor}>
        Sequence Builder
      </Heading>
      <Text fontSize="lg" mb={6} color={textColor}>
        Click on poses below to add them to your sequence.
      </Text>

      <VStack spacing={4} align="start" mb={6}>
        <Button bg={buttonBg} color={buttonText}>
          Save Sequence (Coming Soon)
        </Button>
      </VStack>

      <Heading fontSize="xl" mb={4} color={headingColor}>
        All Poses
      </Heading>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacingX={6}
        spacingY={8}
        minChildWidth="250px"
      >
        {poses.map((pose) => {
          const isSelected = selectedPoses.find((p) => p._id === pose._id);
          return (
            <Box
              key={pose._id}
              borderWidth={isSelected ? "2px" : "1px"}
              borderColor={isSelected ? "#92636B" : "gray.200"}
              borderRadius="lg"
              cursor="pointer"
              onClick={() => togglePoseSelection(pose)}
            >
              <PoseCard _id={pose._id} name={pose.name} image={pose.image} />
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default SequenceBuilderPage;