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

  // THEME COLORS (hooks must be called at the top level)
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

  useEffect(() => {
    fetch(`http://localhost:4000/api/poses/${poseId}`)
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

  if (loading) return <Spinner size="xl" />;
  if (!pose) return <Text>Pose not found</Text>;

  const getImageKey = (name) =>
    name?.replace(/\s+/g, "").replace(/-/g, "").replace(/'/g, "");

  const imageKey = pose.photoName || getImageKey(pose.name);
  const imageSrc = images[imageKey] || images["MissingPhoto"];

  return (
    // <Box
    //   p={6}
    //   bg={bg}
    //   color={textColor}
    //   borderRadius="md"
    //   maxWidth="800px"
    //   mx="auto"
    //   boxShadow="md"
    // >
    <Box
  p={6}
  mt="30px"   // 👈 This moves the entire box down from the top
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
        <Box
          mb={6}
          p={5}
          bg={cueBoxBg}
          borderRadius="md"
          whiteSpace="pre-wrap"
        >
          <Text fontWeight="semibold" mb={3}>
            Cue:
          </Text>
          <Text>{pose.cue}</Text>
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
        <strong>Anatomy:</strong> {pose.anatomy}
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