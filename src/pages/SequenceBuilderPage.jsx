import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Make sure this environment variable is set correctly for local and deployed backend URL
const API_BASE = import.meta.env.VITE_API_BASE;

const SequenceBuilderPage = () => {
  const headingColor = useColorModeValue("brand.light.mainTitleText", "brand.dark.mainTitleText");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
  const buttonBg = useColorModeValue("brand.light.button", "brand.dark.button");
  const buttonText = useColorModeValue("brand.light.surface", "brand.dark.surface");
  const toast = useToast();

  const [poses, setPoses] = useState([]);
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [loading, setLoading] = useState(true); // FIX: added loading state

  useEffect(() => {
    async function fetchPoses() {
      try {
        const res = await fetch(`${API_BASE}/api/poses`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setPoses(data);
      } catch (error) {
        console.error("Failed to fetch poses:", error);
        toast({
          title: "Error fetching poses.",
          description: error.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchPoses();
  }, [toast]);

  const handlePoseClick = (pose) => {
    const isSelected = selectedPoses.find((p) => p._id === pose._id);
    if (isSelected) {
      setSelectedPoses(selectedPoses.filter((p) => p._id !== pose._id));
    } else {
      setSelectedPoses([...selectedPoses, pose]);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Text>Loading poses...</Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={4} color={headingColor}>
        Sequence Builder
      </Heading>
      <Text fontSize="lg" mb={6} color={textColor}>
        Use this page to create your personalized yoga sequences. Select poses, arrange their order, and save your flow for future practice.
      </Text>

      <Button
        bg="#A18E88"
        color="#FAEDEC"
        _hover={{ bg: "#92636B" }}
        mb={6}
        onClick={() => {
          toast({
            title: "Form coming soon!",
            status: "info",
            duration: 2000,
            isClosable: true,
          });
        }}
      >
        Build a New Sequence
      </Button>

      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
        {poses.map((pose) => {
          const isSelected = selectedPoses.find((p) => p._id === pose._id);
          return (
            <Box
              key={pose._id}
              borderWidth={2}
              borderColor={isSelected ? "#92636B" : "transparent"}
              borderRadius="xl"
              overflow="hidden"
              p={2}
              cursor="pointer"
              onClick={() => handlePoseClick(pose)}
              _hover={{ boxShadow: "md", transform: "scale(1.03)" }}
              transition="all 0.2s"
              bg="white"
            >
              <img
                // FIX: prepend backend URL to pose.image for correct path
                src={`${API_BASE}/images/${pose.image}`}
                alt={pose.name}
                style={{ width: "100%", height: "auto", borderRadius: "12px" }}
              />
              <Text mt={2} fontWeight="bold" textAlign="center">
                {pose.name}
              </Text>
            </Box>
          );
        })}
      </SimpleGrid>

      {selectedPoses.length > 0 && (
        <VStack mt={8} align="start">
          <Heading size="md" color={headingColor}>
            Selected Poses:
          </Heading>
          {selectedPoses.map((pose, idx) => (
            <Text key={pose._id} color={textColor}>
              {idx + 1}. {pose.name}
            </Text>
          ))}
          <Button
            mt={4}
            bg={buttonBg}
            color={buttonText}
            onClick={() => {
              toast({
                title: "Save functionality coming soon!",
                status: "info",
                duration: 2000,
                isClosable: true,
              });
            }}
          >
            Save Sequence
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default SequenceBuilderPage;