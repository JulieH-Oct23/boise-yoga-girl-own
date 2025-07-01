import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PoseCard from "../components/PoseCard";
import images from "../images";

const YinYogaPage = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const headingColor = useColorModeValue(
    "brand.light.mainTitleText",
    "brand.dark.mainTitleText"
  );
  const spinnerColor = useColorModeValue(
    "brand.light.poseCardTitle",
    "brand.dark.poseCardTitle"
  );
  const loadingTextColor = useColorModeValue(
    "brand.light.muted",
    "brand.dark.muted"
  );

  const yinHipsPoses = [
    "Butterfly",
    "Half Butterfly",
    "Double Pigeon",
    "Sleeping Swan",
    "Dragon",
    "Frog",
    "Reclined Twist",
    "Happy Baby",
    "Savasana",
  ];

  const getImageKey = (photoName) =>
    photoName?.replace(/\s+/g, "").replace(/-/g, "").replace(/'/g, "");

  useEffect(() => {
    fetch("http://localhost:4000/api/poses")
      .then((res) => res.json())
      .then((data) => {
        const enriched = data.map((pose) => {
          const imageKey = getImageKey(pose.photoName);
          return {
            ...pose,
            image: images[imageKey] || null,
          };
        });

        const ordered = yinHipsPoses
          .map((name) => enriched.find((pose) => pose.name === name))
          .filter(Boolean);

        setPoses(ordered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching poses:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box px={{ base: 4, sm: 6, md: 8 }} py={6}>
      <Heading color={headingColor} mb={4}>
        Yin Yoga – Hip Opening Sequence
      </Heading>

      {loading ? (
        <Box textAlign="center" mt={10}>
          <Spinner size="xl" color={spinnerColor} />
          <Text color={loadingTextColor} mt={4}>
            Loading poses...
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} pb={10}>
          {poses.map((pose) => (
            <PoseCard
              key={pose._id}
              _id={pose._id}
              name={pose.name}
              image={pose.image}
              category={pose.category}
              description={pose.cue}
              onClick={() => navigate(`/pose/${pose._id}`)}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default YinYogaPage;