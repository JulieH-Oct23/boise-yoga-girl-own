import { Box, Heading, Text, useColorModeValue, SimpleGrid, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SequenceCard from "../components/SequenceCard";
import { useEffect, useState } from "react";
import axios from "axios";
import images from "../images";

const YinYogaPage = () => {
  const headingColor = useColorModeValue("brand.light.mainTitleText", "brand.dark.mainTitleText");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
  const navigate = useNavigate();
  const [yinSequences, setYinSequences] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";


  useEffect(() => {
  async function fetchYinSequences() {
    try {
      const res = await axios.get(`${API_BASE}/api/sequences`);
      const filtered = res.data.filter(seq => seq.style.toLowerCase() === "yin");
      setYinSequences(filtered);
    } catch (err) {
      console.error("Error fetching Yin sequences:", err);
    }
  }
  fetchYinSequences();
}, [API_BASE]);

  const getRandomPoseImage = (poses) => {
    if (!poses || poses.length === 0) return images.MissingPhoto;
    const randomPose = poses[Math.floor(Math.random() * poses.length)];
    // Try by _id first, then by name, else fallback
    return images[randomPose._id] || images[randomPose.name] || images.MissingPhoto;
  };

  return (
    <Box p={6}>
      <Button mb={4} onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Heading mb={4} color={headingColor}>
        Yin Yoga Sequences
      </Heading>
      <Text fontSize="lg" color={textColor} mb={6}>
          Yin Yoga is a slow-paced, meditative style of yoga that targets the deep connective tissues of the body such as ligaments, joints, and fascia. Unlike more dynamic yoga practices, Yin holds poses for extended periods—typically 3 to 5 minutes or longer—to gently stretch and strengthen these often neglected areas. This practice encourages relaxation, mindfulness, and increased flexibility, helping to balance the more active, yang aspects of daily life and exercise.
          In a typical Yin Yoga class, you can expect a calm and quiet environment where poses are mostly floor-based and supported, allowing you to surrender into each stretch without strain. The focus is on stillness, breath awareness, and cultivating patience as you explore your body’s limits. Over time, this practice can improve joint mobility, reduce stress, relieve tension, and enhance overall energy flow, making it especially beneficial for those seeking deeper release and restorative balance.
      </Text>

      <Box
        bg="#FAEDEC"
        p={4}
        borderRadius="xl"
        mx="auto"
        width="fit-content"
        maxWidth="100%"
      >
        {yinSequences.length === 0 ? (
          <Text color={textColor}>No saved sequences yet.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {yinSequences.map((seq) => (
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

export default YinYogaPage;