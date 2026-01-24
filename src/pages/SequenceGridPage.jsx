import { Box, SimpleGrid, Image, Text, Spinner, Heading, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import images from "../images";

const SequenceDetailPage = () => {
  const { sequenceId } = useParams();
  const [sequence, setSequence] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");

  useEffect(() => {
    const fetchSequence = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/sequences/${sequenceId}`);
        setSequence(res.data);
      } catch (err) {
        console.error("Error fetching sequence:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSequence();
  }, [API_BASE, sequenceId]);

  const getPoseImage = (pose) => {
    if (!pose?.image) return images.MissingPhoto;
    const key = pose.image.replace(/\.png$/i, "");
    return images[key] || images.MissingPhoto;
  };

  if (loading) return <Spinner size="xl" />;
  if (!sequence) return <Text>Sequence not found</Text>;

  return (
    <Box p={6} maxW="1400px" mx="auto">
      <Heading mb={4}>{sequence.name}</Heading>
      <SimpleGrid columns={{ base: 2, sm: 3, md: 6, lg: 8 }} spacing={3}>
        {sequence.poses.map((pose) => (
          <Box key={pose._id}>
            <Image
              src={getPoseImage(pose)}
              alt={pose.name}
              borderRadius="md"
              objectFit="cover"
              maxH="150px"
              w="100%"
            />
            <Text fontSize="xs" color={textColor} textAlign="center">
              {pose.name}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SequenceDetailPage;