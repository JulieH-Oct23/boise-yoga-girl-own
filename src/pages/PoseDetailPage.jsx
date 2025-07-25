
// import {
//   Box,
//   Button,
//   Heading,
//   Image,
//   Spinner,
//   Text,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import images from "../images";

// const PoseDetailPage = () => {
//   const { poseId } = useParams();
//   const navigate = useNavigate();
//   const [pose, setPose] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // THEME COLORS
//   const bg = useColorModeValue("brand.light.surface", "brand.dark.surface");
//   const textColor = useColorModeValue(
//     "brand.light.poseCardText",
//     "brand.dark.poseCardText"
//   );
//   const titleColor = useColorModeValue(
//     "brand.light.poseCardTitle",
//     "brand.dark.poseCardTitle"
//   );
//   const cueBoxBg = useColorModeValue("brand.light.box", "brand.dark.box");

//   const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

//   useEffect(() => {
//     fetch(`${API_BASE}/api/poses/${poseId}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Pose not found");
//         return res.json();
//       })
//       .then((data) => {
//         setPose(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching pose:", err);
//         setLoading(false);
//       });
//   }, [poseId]);

//   // NEW helper to get image src from pose.image string (like in SequenceBuilderPage)
//   const getImageSrc = (imageName) => {
//     if (!imageName) return images.MissingPhoto;
//     const key = imageName.replace(/\.png$/i, "");
//     return images[key] || images.MissingPhoto;
//   };

//   if (loading) return <Spinner size="xl" />;
//   if (!pose) return <Text>Pose not found</Text>;

//   // Use pose.image here, fallback to MissingPhoto
//   const imageSrc = getImageSrc(pose.image);

//   return (
//     <Box
//       p={6}
//       mt="30px"
//       bg={bg}
//       color={textColor}
//       borderRadius="md"
//       maxWidth="800px"
//       mx="auto"
//       boxShadow="md"
//     >
//       <Button mb={4} onClick={() => navigate(-1)}>
//         ← Back
//       </Button>

//       <Heading color={titleColor} mb={4}>
//         {pose.name}
//       </Heading>

//       {imageSrc && (
//         <Image
//           src={imageSrc}
//           alt={pose.name}
//           borderRadius="md"
//           mb={4}
//           maxHeight="400px"
//           objectFit="contain"
//           mx="auto"
//         />
//       )}

//       {pose.cue && (
//         <Box mb={6} p={5} bg={cueBoxBg} borderRadius="md" whiteSpace="pre-wrap">
//           <Text fontWeight="semibold" mb={3}>
//             Cue:
//           </Text>
//           <Text>{pose.cue}</Text>
//         </Box>
//       )}

//       <Text mb={2}>
//         <strong>Category:</strong> {pose.category?.join(", ")}
//       </Text>
//       <Text mb={2}>
//         <strong>Level:</strong> {pose.level}
//       </Text>
//       <Text mb={2}>
//         <strong>Timing:</strong> {pose.timing?.join(", ")}
//       </Text>
//       <Text mb={2}>
//         <strong>Anatomy:</strong> {pose.anatomy}
//       </Text>
//       <Text mb={2}>
//         <strong>Indications:</strong> {pose.indications?.join(", ")}
//       </Text>
//       <Text mb={2}>
//         <strong>Counter Indications:</strong> {pose.counterIndications?.join(", ")}
//       </Text>

//       {pose.description && (
//         <Box mt={4}>
//           <Text>{pose.description}</Text>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default PoseDetailPage;
import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Input,
  Button,
  Select,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import images from "../images";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const SequenceDetailPage = () => {
  const { id } = useParams();
  const [sequence, setSequence] = useState(null);
  const [timers, setTimers] = useState([]);
  const [units, setUnits] = useState("seconds");
  const [playingIndex, setPlayingIndex] = useState(null);
  const [progress, setProgress] = useState(0);

  const bg = useColorModeValue("#FAEDEC", "#353325");
  const text = useColorModeValue("#353325", "#FAEDEC");

  useEffect(() => {
    const fetchSequence = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/sequences/${id}`);
        setSequence(res.data);
        const initialTimers = res.data.poses.map((pose) => pose.timer || 60);
        setTimers(initialTimers);
      } catch (err) {
        console.error("Failed to load sequence:", err);
      }
    };
    fetchSequence();
  }, [id]);

  const handleTimerChange = (index, value) => {
    const newTimers = [...timers];
    newTimers[index] = parseInt(value);
    setTimers(newTimers);
  };

  const saveSequence = async () => {
    if (!sequence) return;
    const updatedSequence = {
      ...sequence,
      poses: sequence.poses.map((pose, idx) => ({
        ...pose,
        timer: timers[idx],
      })),
    };
    try {
      await axios.put(`${API_BASE}/api/sequences/${id}`, updatedSequence);
      alert("Timers saved!");
    } catch (err) {
      console.error("Save failed:", err.response?.data || err.message);
      alert("Save failed. See console.");
    }
  };

  const playSequence = () => {
    setPlayingIndex(0);
    setProgress(0);
  };

  useEffect(() => {
    let interval;
    if (playingIndex !== null && sequence) {
      const time = units === "minutes" ? timers[playingIndex] * 60 : timers[playingIndex];
      const start = Date.now();

      interval = setInterval(() => {
        const elapsed = (Date.now() - start) / 1000;
        setProgress(Math.min(100, (elapsed / time) * 100));

        if (elapsed >= time) {
          clearInterval(interval);
          if (playingIndex < sequence.poses.length - 1) {
            setPlayingIndex((prev) => prev + 1);
            setProgress(0);
          } else {
            setPlayingIndex(null);
          }
        }
      }, 100);
    }

    return () => clearInterval(interval);
  }, [playingIndex, sequence, timers, units]);

  if (!sequence) return <Text>Loading...</Text>;

  return (
    <Box bg={bg} color={text} p={5} maxW="600px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {sequence.name}
      </Text>

      <Box mb={4}>
        <Select
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          width="200px"
          mb={2}
        >
          <option value="seconds">Seconds</option>
          <option value="minutes">Minutes</option>
        </Select>
        <Button onClick={saveSequence} mr={3} colorScheme="pink">
          Save Timers
        </Button>
        <Button onClick={playSequence} colorScheme="green">
          Play Sequence
        </Button>
      </Box>

      {sequence.poses.map((pose, idx) => {
        const isPlaying = idx === playingIndex;
        const overlay = isPlaying ? (
          <Box
            position="absolute"
            top="0"
            left="0"
            height="100%"
            width={`${100 - progress}%`}
            bg="rgba(0,0,0,0.4)"
            zIndex="1"
            transition="width 0.1s linear"
            borderRadius="2xl"
          />
        ) : null;

        return (
          <Flex
            key={idx}
            borderWidth="1px"
            borderRadius="2xl"
            p={4}
            mb={4}
            position="relative"
            bg="white"
            alignItems="center"
          >
            {overlay}
            <Image
              src={images[pose.image] || ""}
              alt={pose.name}
              boxSize="100px"
              objectFit="contain"
              mr={4}
              borderRadius="md"
            />
            <Box flex="1">
              <Text fontSize="xl" fontWeight="semibold">
                {pose.name}
              </Text>
              <Text fontSize="sm" mt={1} color="gray.600" whiteSpace="pre-wrap">
                {pose.cue || "No cue available"}
              </Text>
            </Box>
            <Box textAlign="center" minW="120px" ml={4}>
              <Input
                type="number"
                value={timers[idx]}
                onChange={(e) => handleTimerChange(idx, e.target.value)}
                width="100px"
                disabled={playingIndex !== null}
                mb={1}
              />
              <Text fontSize="sm">{units}</Text>
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
};

export default SequenceDetailPage;