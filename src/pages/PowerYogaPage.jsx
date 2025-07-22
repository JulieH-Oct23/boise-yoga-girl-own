import { Box, Heading, Text, useColorModeValue, SimpleGrid, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SequenceCard from "../components/SequenceCard";
import { useEffect, useState } from "react";
import axios from "axios";
import images from "../images";

const PowerYogaPage = () => {
  const headingColor = useColorModeValue("brand.light.mainTitleText", "brand.dark.mainTitleText");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
  const navigate = useNavigate();

  const [powerSequences, setPowerSequences] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  useEffect(() => {
  async function fetchPowerSequences() {
    try {
      const res = await axios.get(`${API_BASE}/api/sequences`);
      const filtered = res.data.filter(seq => seq.style.toLowerCase() === "power");
      setPowerSequences(filtered);
    } catch (err) {
      console.error("Error fetching Power sequences:", err);
    }
  }
  fetchPowerSequences();
}, [API_BASE]);;

  const getRandomPoseImage = (poses) => {
    if (!poses || poses.length === 0) return images.MissingPhoto;
    const randomPose = poses[Math.floor(Math.random() * poses.length)];
    return images[randomPose._id] || images[randomPose.name] || images.MissingPhoto;
  };

  return (
    <Box p={6}>
      <Button mb={4} onClick={() => navigate(-1)} colorScheme="pink">
        ← Back
      </Button>

      <Heading mb={4} color={headingColor}>Power Yoga Sequences</Heading>
      <Text fontSize="lg" color={textColor} mb={6}>
          Power Yoga is a dynamic and vigorous style of yoga that emphasizes strength, flexibility, and stamina. It draws inspiration from traditional Ashtanga yoga but offers a more flexible and accessible approach, focusing on continuous movement, breath synchronization, and challenging poses to build muscular endurance and cardiovascular fitness. This style is designed to energize the body and mind, making it a great choice for those looking to build power and increase overall athletic performance.
          In a Power Yoga class, you can expect a fast-paced, flowing sequence of poses that engage the whole body, often linking breath with movement in a continuous flow. Classes typically include a mix of strength-building postures like planks, arm balances, and core work, combined with dynamic transitions and standing poses. This practice cultivates mental focus, resilience, and physical vitality, leaving you feeling empowered, strong, and energized.
      </Text>

      <Box bg="#FAEDEC" p={4} borderRadius="xl" maxW="fit-content">
        {powerSequences.length === 0 ? (
          <Text color={textColor}>No saved sequences yet.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {powerSequences.map((seq) => (
              <SequenceCard
                key={seq._id}
                name={seq.name}
                difficulty={seq.difficulty}
                imageSrc={getRandomPoseImage(seq.poses)}
                onClick={() => navigate(`/sequence/${seq._id}`)}
                size="small"
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
};

export default PowerYogaPage;