
import { Box, Heading, Text, useColorModeValue, SimpleGrid, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SequenceCard from "../components/SequenceCard";
import { useEffect, useState } from "react";
import axios from "axios";
import images from "../images";

const RestorativeYogaPage = () => {
  const headingColor = useColorModeValue("brand.light.mainTitleText", "brand.dark.mainTitleText");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
  const navigate = useNavigate();

  const [restorativeSequences, setRestorativeSequences] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  useEffect(() => {
  async function fetchRestorativeSequences() {
    try {
      const res = await axios.get(`${API_BASE}/api/sequences`);
      const filtered = res.data.filter(seq => seq.style.toLowerCase() === "restorative");
      setRestorativeSequences(filtered);
    } catch (err) {
      console.error("Error fetching Restorative sequences:", err);
    }
  }
  fetchRestorativeSequences();
}, [API_BASE]);

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

      <Heading mb={4} color={headingColor}>Restorative Yoga Sequences</Heading>
      <Text fontSize="lg" color={textColor} mb={6}>
          Restorative Yoga is a deeply relaxing and gentle practice designed to promote healing and balance in both body and mind. By using supportive props such as bolsters, blankets, and blocks, practitioners hold passive poses for extended periods, allowing the muscles to fully release tension. This slow, mindful approach calms the nervous system, reduces physical stress, and fosters profound relaxation. It’s especially beneficial for those recovering from injury, managing chronic pain, or looking to restore energy.
          Beyond physical benefits, Restorative Yoga offers powerful support for mental health. It has been shown to reduce symptoms of anxiety and depression by encouraging deep relaxation, lowering cortisol levels, and cultivating mindfulness. The practice helps soothe the nervous system, quiet racing thoughts, and create a safe space for emotional healing. In a Restorative class, you can expect gentle, slow-paced sequences where the focus is on surrender, breath awareness, and creating a sense of inner peace and calm — making it an ideal practice for anyone seeking relief from stress, anxiety, or emotional overwhelm.
      </Text>

      <Box bg="#FAEDEC" p={4} borderRadius="xl" maxW="fit-content">
        {restorativeSequences.length === 0 ? (
          <Text color={textColor}>No saved sequences yet.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {restorativeSequences.map((seq) => (
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

export default RestorativeYogaPage;