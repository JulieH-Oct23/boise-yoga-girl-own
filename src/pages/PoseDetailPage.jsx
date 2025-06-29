import {
    Box,
    Button,
    Heading,
    Image,
    Spinner,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import images from "../images";

const PoseDetailPage = () => {
  const { poseId } = useParams();
  const navigate = useNavigate();
  const [pose, setPose] = useState(null);
  const [loading, setLoading] = useState(true);

  const bg = useColorModeValue("brand.light.surface", "brand.dark.surface");
  const textColor = useColorModeValue(
    "brand.light.poseCardText",
    "brand.dark.poseCardText"
  );
  const titleColor = useColorModeValue(
    "brand.light.poseCardTitle",
    "brand.dark.poseCardTitle"
  );

  useEffect(() => {
    fetch(`http://localhost:4000/api/poses/${poseId}`)
      .then((res) => res.json())
      .then((data) => {
        setPose(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pose:", err);
        setLoading(false);
      });
  }, [poseId]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!pose) {
    return <Text>Pose not found</Text>;
  }

  const getImageKey = (name) =>
    name?.replace(/\s+/g, "").replace(/-/g, "").replace(/'/g, "");
  const imageKey = getImageKey(pose.name);
  const imageSrc = images[imageKey] || null;

  return (
    <Box
      p={6}
      bg={bg}
      color={textColor}
      borderRadius="md"
      maxWidth="600px"
      mx="auto"
      boxShadow="md"
    >
      <Button mb={4} onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Heading color={titleColor} mb={4}>
        {pose.name}
      </Heading>

      {imageSrc && (
        <Image src={imageSrc} alt={pose.name} borderRadius="md" mb={4} />
      )}

      <Text mb={2}>
        <strong>Category:</strong> {pose.category}
      </Text>
      <Text mb={2}>
        <strong>Level:</strong> {pose.level}
      </Text>
      <Text mb={2}>
        <strong>Anatomy:</strong> {pose.anatomy}
      </Text>
      <Text mb={2}>
        <strong>Indications:</strong> {pose.indications?.join(", ")}
      </Text>
      <Text mb={2}>
        <strong>Counter Indications:</strong> {pose.counterIndications?.join(", ")}
      </Text>
      <Text mt={4}>{pose.description}</Text>
    </Box>
  );
};

export default PoseDetailPage;