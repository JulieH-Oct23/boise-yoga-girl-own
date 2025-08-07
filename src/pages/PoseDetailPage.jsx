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
  const cueBoxBg = useColorModeValue("brand.light.box", "brand.dark.box");

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  useEffect(() => {
    fetch(`${API_BASE}/api/poses/${poseId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Pose not found");
        return res.json();
      })
      .then((data) => {
        setPose(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching pose:", err);
        setLoading(false);
      });
  }, [poseId]);

  const getImageSrc = (imageName) => {
    if (!imageName) return images.MissingPhoto;
    const key = imageName.replace(/\.png$/i, "");
    return images[key] || images.MissingPhoto;
  };

  if (loading) return <Spinner size="xl" />;
  if (!pose) return <Text>Pose not found</Text>;

  const imageSrc = getImageSrc(pose.image);

  return (
    <Box
      p={6}
      mt="30px"
      bg={bg}
      color={textColor}
      borderRadius="md"
      maxWidth="800px"
      mx="auto"
      boxShadow="md"
    >
      <Button mb={4} onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <Heading color={titleColor} mb={4}>
        {pose.name}
      </Heading>
      {pose.sanskritName && (
      <Text fontStyle="italic" mb={4}>
      {pose.sanskritName}
      </Text>
      )}

      {imageSrc && (
        <Image
          src={imageSrc}
          alt={pose.name}
          borderRadius="md"
          mb={4}
          maxHeight="400px"
          objectFit="contain"
          mx="auto"
        />
      )}

      {pose.cue && (
        <Box mb={6} p={5} bg={cueBoxBg} borderRadius="md" whiteSpace="pre-wrap">
          <Text fontWeight="semibold" mb={3}>
            Cue:
          </Text>
          <Text>{pose.cue}</Text>
        </Box>
      )}
      {pose.anatomy && (
  <Box>
    <Text fontWeight="bold">Anatomy:</Text>
    <ul>
      {pose.anatomy.map((part, index) => (
        <li key={index}>{part}</li>
      ))}
    </ul>
  </Box>
)}

      <Text mb={2}>
        <strong>Category:</strong> {pose.category?.join(", ")}
      </Text>
      <Text mb={2}>
        <strong>Level:</strong> {pose.level}
      </Text>
      <Text mb={2}>
        <strong>Timing:</strong> {pose.timing?.join(", ")}
      </Text>
       <Text mb={2}>
        <strong>Anatomy:</strong> {pose.anatomy?.join(", ")}
      </Text>
      <Text mb={2}>
        <strong>Indications:</strong> {pose.indications?.join(", ")}
      </Text>
      <Text mb={2}>
        <strong>Counter Indications:</strong> {pose.counterIndications?.join(", ")}
      </Text>

      {pose.description && (
        <Box mt={4}>
          <Text>{pose.description}</Text>
        </Box>
      )}
    </Box>
  );
};

export default PoseDetailPage;

