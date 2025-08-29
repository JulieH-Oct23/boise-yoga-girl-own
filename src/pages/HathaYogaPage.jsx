import { Box, Heading, Text, useColorModeValue, SimpleGrid, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SequenceCard from "../components/SequenceCard";
import { useEffect, useState } from "react";
import axios from "axios";
import images from "../images";

const HathaYogaPage = () => {
  const headingColor = useColorModeValue("brand.light.mainTitleText", "brand.dark.mainTitleText");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
  const navigate = useNavigate();

  const [hathaSequences, setHathaSequences] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  useEffect(() => {
  async function fetchHathaSequences() {
    try {
      const res = await axios.get(`${API_BASE}/api/sequences`);
      const filtered = res.data.filter(seq => seq.style.toLowerCase() === "hatha");
      setHathaSequences(filtered);
    } catch (err) {
      console.error("Error fetching Hatha sequences:", err);
    }
  }
  fetchHathaSequences();
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

      <Heading mb={4} color={headingColor}>Hatha Yoga Sequences</Heading>
      <Text fontSize="lg" color={textColor} mb={6}>
          Hatha yoga is one of the most widely practiced styles of yoga, especially in the West, and it serves as the foundation for many other yoga styles. The word “Hatha” comes from Sanskrit, where “Ha” means sun and “Tha” means moon, symbolizing the balance of opposing energies within the body, such as active versus passive, heating versus cooling, and effort versus relaxation. Hatha yoga emphasizes physical postures (asanas), breath control (pranayama), and mindful relaxation, often at a slower pace than dynamic styles like Vinyasa or Power Yoga.
          Hatha yoga is characterized by slower, deliberate movements, an emphasis on alignment and posture, longer holds in poses, and suitability for beginners and people of all ages. It can be both therapeutic and restorative, providing numerous benefits such as improving physical strength, balance, and flexibility, reducing stress and anxiety, enhancing focus and body awareness, and preparing the mind for meditation. Its gentle yet mindful approach makes it an excellent choice for anyone seeking to cultivate both physical and mental well-being.  Hatha is considered a Yang style of yoga.
      </Text>
      <Text fontSize="lg" color={textColor} mb={6}>
        Yin & Yang Poses can look very similar, but are practiced differently. A great example is the differnce between Lunges(Yang) and Dragons(Yin). Lunges(Yang) are practiced actively, often with the back leg lifted and engaged. The spine is upright, the core is on, and breath fuels muscular strength. Inhale to lengthen the back leg and lift the chest; exhale to stabilize and deepen. In contrast, the Yin version, Dragon, begins similarly from Downward Dog, but once the knee is down and hands or
        forearms are grounded, there is no muscle activation—only surrender. The breath is slow and minimal effort is used as you allow connective tissue to stretch with time. There’s no pushing, no reaching—only staying. Yin is passive and meditative, Yang is dynamic and energizing. This is an important point of differentiation if your aim is to practice effectively.
      </Text>

      <Box bg="#FAEDEC" p={4} borderRadius="xl" maxW="fit-content">
        {hathaSequences.length === 0 ? (
          <Text color={textColor}>No saved sequences yet.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
            {hathaSequences.map((seq) => (
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

export default HathaYogaPage;