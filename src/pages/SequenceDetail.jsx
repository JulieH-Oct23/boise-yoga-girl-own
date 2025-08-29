import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Select,
  Input,
  Button,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import images from "../images";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const SequenceDetailPage = () => {
  const { id } = useParams();
  const [sequence, setSequence] = useState(null);
  const [posesFull, setPosesFull] = useState([]);
  const [units, setUnits] = useState("seconds");
  const [playingIndex, setPlayingIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const bg = useColorModeValue("#FAEDEC", "#353325");
  const text = useColorModeValue("#353325", "#FAEDEC");

  // Fetch sequence and full pose info
  useEffect(() => {
    const fetchSequenceAndPoses = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/sequences/${id}`);
        const seq = res.data;

        setSequence(seq);

        const poseIds =
          seq.poses.map((pose) => pose._id || pose.poseId || pose.id) || [];

        if (poseIds.length > 0) {
          const posesRes = await axios.get(`${API_BASE}/api/poses`, {
            params: { ids: poseIds.join(",") },
          });
          setPosesFull(posesRes.data);
        } else {
          setPosesFull([]);
        }
      } catch (err) {
        console.error("Failed to load sequence or poses:", err);
      }
    };

    fetchSequenceAndPoses();
  }, [id]);

  const currentPoseFull =
    playingIndex !== null && sequence?.poses?.length > 0
      ? (() => {
          const seqItem = sequence.poses[playingIndex];
          if (!seqItem) return null;

          if (seqItem.type === "meditation") {
            return {
              name: seqItem.title || "Meditation",
              cue: seqItem.cue || "No cue provided.",
              type: "meditation",
              duration: seqItem.duration || 60,
            };
          }

          const foundPose = posesFull.find(
            (p) =>
              p._id === (seqItem._id || seqItem.poseId || seqItem.id) ||
              p.name === seqItem.name
          );
          return {
            ...foundPose,
            duration: seqItem.duration || foundPose?.duration || 60,
          };
        })()
      : null;

  // Handle updating pose durations inline
  const handleTimerChange = async (index, value) => {
    const intValue = parseInt(value, 10) > 0 ? parseInt(value, 10) : 60;
    const updatedSequence = { ...sequence };
    updatedSequence.poses[index].duration = intValue;
    setSequence(updatedSequence);

    try {
      await axios.put(`${API_BASE}/api/sequences/${id}`, updatedSequence);
    } catch (err) {
      console.error("Failed to save duration:", err);
    }
  };

  const playSequence = () => {
    setPlayingIndex(0);
    setProgress(0);
    setIsPaused(false);
    setElapsedTime(0);
  };

  const pauseSequence = () => {
    setIsPaused(true);
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };

  const resumeSequence = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    if (playingIndex === null || !sequence || isPaused) return;

    const timeInSeconds =
      units === "minutes"
        ? sequence.poses[playingIndex].duration * 60
        : sequence.poses[playingIndex].duration;

    const startTime = Date.now() - elapsedTime * 1000;

    const id = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setProgress(Math.min(100, (elapsed / timeInSeconds) * 100));

      if (elapsed >= timeInSeconds) {
        clearInterval(id);
        setElapsedTime(0);
        if (playingIndex < sequence.poses.length - 1) {
          setPlayingIndex((prev) => prev + 1);
          setProgress(0);
        } else {
          setPlayingIndex(null);
          setProgress(0);
        }
      } else {
        setElapsedTime(elapsed);
      }
    }, 100);

    setTimerId(id);
    return () => clearInterval(id);
  }, [playingIndex, sequence, units, isPaused, elapsedTime]);

  if (!sequence) {
    return (
      <Box p={5} textAlign="center" color={text}>
        <Text>Loading sequence...</Text>
      </Box>
    );
  }

  return (
    <Box bg={bg} color={text} p={5} maxW="600px" mx="auto" borderRadius="md">
      <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
        {sequence.name}
      </Text>

      <Box
        mb={4}
        display="flex"
        flexWrap="wrap"
        gap={3}
        justifyContent="center"
        alignItems="center"
      >
        <Select
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          width="140px"
        >
          <option value="seconds">Seconds</option>
          <option value="minutes">Minutes</option>
        </Select>

        {playingIndex === null ? (
          <Button onClick={playSequence} colorScheme="green">
            Play Sequence
          </Button>
        ) : isPaused ? (
          <Button onClick={resumeSequence} colorScheme="green">
            Resume
          </Button>
        ) : (
          <Button onClick={pauseSequence} colorScheme="yellow">
            Pause
          </Button>
        )}
      </Box>

      {/* Cue Box */}
      <Box
        mt={2}
        mb={6}
        p={4}
        bg="white"
        borderRadius="lg"
        borderWidth="1px"
        minHeight="80px"
        textAlign="center"
        fontStyle="italic"
      >
        {playingIndex === null
          ? "Play the sequence to see cues here."
          : currentPoseFull?.cue || "There is no cue for this item."}
      </Box>

      {sequence.poses.map((pose, idx) => {
        const isPlaying = idx === playingIndex;
        const imageKey = pose.image
          ? pose.image.replace(/\.(png|jpg|jpeg)$/i, "")
          : null;

        return (
          <Flex
            key={idx}
            bg="white"
            p={4}
            mb={4}
            borderRadius="2xl"
            borderWidth="1px"
            alignItems="center"
            position="relative"
          >
            {isPlaying && (
              <Box
                position="absolute"
                top="0"
                left="0"
                height="100%"
                width={`${progress}%`}
                bg="rgba(0,0,0,0.3)"
                borderRadius="2xl"
                transition="width 0.1s linear"
                zIndex={1}
              />
            )}

            <Image
              src={images[imageKey] || images.MissingPhoto || ""}
              alt={pose.name || "Pose image"}
              boxSize="100px"
              objectFit="contain"
              borderRadius="md"
              mr={4}
              zIndex={2}
            />

            <Box flex="1" zIndex={2}>
              <Text fontSize="xl" fontWeight="semibold" noOfLines={1}>
                {pose.name || pose.title || "Unnamed"}
              </Text>
            </Box>

            <Box textAlign="center" minW="120px" ml={4} zIndex={2}>
              <Input
                type="number"
                value={pose.duration || 60}
                onChange={(e) => handleTimerChange(idx, e.target.value)}
                width="100px"
                mb={1}
                min={1}
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
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Heading,
//   VStack,
//   HStack,
//   Image,
//   Text,
//   Input,
//   useColorModeValue,
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
//   CloseButton,
// } from "@chakra-ui/react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import images from "../images";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// const SequenceDetailPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [sequence, setSequence] = useState(null);
//   const [selectedPoses, setSelectedPoses] = useState([]);
//   const [saveSuccess, setSaveSuccess] = useState(false);

//   const cardBg = useColorModeValue("#FAEDEC", "#332F27");
//   const cardTextColor = useColorModeValue("#332F27", "#FAEDEC");

//   useEffect(() => {
//     const fetchSequence = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/api/sequences/${id}`);
//         const seq = res.data;
//         setSequence(seq);
//         // Ensure each pose has duration
//         const posesWithDuration = seq.poses.map((p) => ({
//           ...p,
//           duration: p.duration || 60,
//         }));
//         setSelectedPoses(posesWithDuration);
//       } catch (err) {
//         console.error("Failed to fetch sequence:", err);
//       }
//     };
//     fetchSequence();
//   }, [id]);

//   const handleDurationChange = (index, value) => {
//     const newDuration = parseInt(value, 10);
//     setSelectedPoses((prev) => {
//       const updated = [...prev];
//       updated[index] = { ...updated[index], duration: newDuration };
//       return updated;
//     });
//   };

//   const handleSaveTimers = async () => {
//     if (!sequence || selectedPoses.length === 0) return;

//     const updatedSequence = {
//       ...sequence,
//       poses: selectedPoses.map((p) => ({
//         ...p,
//         duration: p.duration || 60,
//       })),
//     };

//     try {
//       await axios.put(`${API_BASE}/api/sequences/${sequence._id}`, updatedSequence);
//       setSaveSuccess(true);
//     } catch (err) {
//       console.error("Failed to save timers:", err);
//       alert("Failed to save timers, check console.");
//       setSaveSuccess(false);
//     }
//   };

//   const getImageSrc = (imageName) => {
//     if (!imageName) return images.MissingPhoto;
//     const key = imageName.replace(/\.png$/i, "");
//     return images[key] || images.MissingPhoto;
//   };

//   if (!sequence) return <Text>Loading sequence...</Text>;

//   return (
//     <Box p={4}>
//       <Button mb={4} colorScheme="pink" onClick={() => navigate(-1)}>
//         ← Back
//       </Button>

//       <VStack spacing={4} align="center">
//         <Box
//           bg="#BEB1AE"
//           p={6}
//           borderRadius="xl"
//           boxShadow="md"
//           w="100%"
//           maxW="960px"
//         >
//           <Heading size="lg" mb={4} textAlign="center">
//             {sequence.name} - {sequence.style} ({sequence.difficulty})
//           </Heading>

//           {saveSuccess && (
//             <Alert status="success" mb={4} borderRadius="md" position="relative">
//               <AlertIcon boxSize="30px" />
//               <AlertTitle>Success!</AlertTitle>
//               <AlertDescription>
//                 Timers were updated successfully.
//               </AlertDescription>
//               <CloseButton
//                 position="absolute"
//                 right="8px"
//                 top="8px"
//                 onClick={() => setSaveSuccess(null)}
//               />
//             </Alert>
//           )}

//           <HStack wrap="wrap" spacing={3}>
//             {selectedPoses.map((pose, index) => (
//               <Box
//                 key={`${pose._id}-${index}`}
//                 p={2}
//                 bg={cardBg}
//                 border="1px solid #ccc"
//                 borderRadius="md"
//                 w="120px"
//                 textAlign="center"
//                 position="relative"
//                 color={cardTextColor}
//               >
//                 <Image
//                   src={getImageSrc(pose.image)}
//                   alt={pose.name}
//                   boxSize="60px"
//                   objectFit="contain"
//                   borderRadius="md"
//                   mx="auto"
//                 />
//                 <Text fontSize="xs" mt={1} noOfLines={1}>
//                   {pose.name}
//                 </Text>

//                 <Input
//                   type="number"
//                   value={pose.duration || 60}
//                   onChange={(e) => handleDurationChange(index, e.target.value)}
//                   size="xs"
//                   mt={2}
//                   width="60px"
//                   mx="auto"
//                   textAlign="center"
//                   borderRadius="md"
//                 />
//                 <Text fontSize="xs">sec</Text>
//               </Box>
//             ))}
//           </HStack>

//           <Button
//             mt={4}
//             bg="#7a5758"
//             color="white"
//             _hover={{ bg: "#92636B" }}
//             borderRadius="md"
//             px={3}
//             py={1}
//             onClick={handleSaveTimers}
//           >
//             Save Timers
//           </Button>
//         </Box>
//       </VStack>
//     </Box>
//   );
// };

// export default SequenceDetailPage;