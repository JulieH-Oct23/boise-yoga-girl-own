
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Image,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import images from "../images";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const SequenceBuilderPage = () => {
  const [poses, setPoses] = useState([]);
  const [filteredPoses, setFilteredPoses] = useState([]);
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sequenceName, setSequenceName] = useState("");
  const [sequenceStyle, setSequenceStyle] = useState("Power");
  const [sequenceLevel, setSequenceLevel] = useState("Beginner");
  const [saveSuccess, setSaveSuccess] = useState(null); // or string for style name
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoses = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/poses`);
        setPoses(res.data);
        setFilteredPoses(res.data);
      } catch (err) {
        console.error("Failed to fetch poses:", err);
      }
    };
    fetchPoses();
  }, []);

  const handlePoseClick = (pose) => {
    setSelectedPoses([...selectedPoses, pose]);
  };

  const handleRemovePose = (poseId) => {
    const index = selectedPoses.findIndex((pose) => pose._id === poseId);
    if (index === -1) return;
    setSelectedPoses([
      ...selectedPoses.slice(0, index),
      ...selectedPoses.slice(index + 1),
    ]);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredPoses(
      poses.filter((pose) => pose.name.toLowerCase().includes(term))
    );
  };

  const handleSaveSequence = async () => {
    if (!sequenceName.trim()) {
      alert("Please enter a sequence name.");
      return;
    }
    if (selectedPoses.length === 0) {
      alert("Please select at least one pose.");
      return;
    }

    // Prepare sequence object to send
    const newSequence = {
      name: sequenceName,
      style: sequenceStyle,
      difficulty: sequenceLevel,
      poses: selectedPoses.map((p) => ({
        name: p.name,
        image: p.image,
      })),
    };

    try {
      await axios.post(`${API_BASE}/api/sequences`, newSequence);
      setSaveSuccess(sequenceStyle);
      setSequenceName("");
      setSelectedPoses([]);
      setSearchTerm("");
      setFilteredPoses(poses);
    } catch (err) {
      console.error("Failed to save sequence:", err);
      alert("Failed to save sequence, check console.");
      setSaveSuccess(null);
    }
  };

  // Helper for image src
  const getImageSrc = (imageName) => {
    if (!imageName) return images.MissingPhoto;
    const key = imageName.replace(/\.png$/i, "");
    return images[key] || images.MissingPhoto;
  };

  return (
    <Box p={4}>
      <Button mb={4} colorScheme="pink" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <VStack spacing={4} mb={8} align="center">
        <Box
          bg="#BEB1AE"
          p={6}
          borderRadius="xl"
          boxShadow="md"
          w="100%"
          maxW="960px"
        >
          <Heading size="lg" mb={4} textAlign="center">
            Build a New Sequence
          </Heading>

          {saveSuccess && (
            <Alert status="success" mb={4} borderRadius="md" position="relative">
              <AlertIcon boxSize="30px" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your sequence was saved to the {saveSuccess} Yoga Page.
              </AlertDescription>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setSaveSuccess(null)}
              />
            </Alert>
          )}

          <FormControl mb={3}>
            <FormLabel>Sequence Name</FormLabel>
            <Input
              value={sequenceName}
              onChange={(e) => setSequenceName(e.target.value)}
              placeholder="Enter a sequence name"
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Style</FormLabel>
            <Select
              value={sequenceStyle}
              onChange={(e) => setSequenceStyle(e.target.value)}
            >
              <option value="Power">Power</option>
              <option value="Yin">Yin</option>
              <option value="Restorative">Restorative</option>
            </Select>
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Difficulty Level</FormLabel>
            <Select
              value={sequenceLevel}
              onChange={(e) => setSequenceLevel(e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Search Poses</FormLabel>
            <Input
              placeholder="Search poses by name"
              value={searchTerm}
              onChange={handleSearch}
            />
          </FormControl>

          {selectedPoses.length > 0 && (
            <Box mt={4}>
              <Text fontWeight="bold" mb={2}>
                Selected Poses:
              </Text>
              <HStack wrap="wrap" spacing={3}>
                {selectedPoses.map((pose, index) => (
                  <Box
                    key={`${pose._id}-${index}`}
                    p={2}
                    bg="#FAEDEC"
                    border="1px solid #ccc"
                    borderRadius="md"
                    w="100px"
                    textAlign="center"
                    position="relative"
                  >
                    <Image
                      src={getImageSrc(pose.image)}
                      alt={pose.name}
                      boxSize="60px"
                      objectFit="contain"
                      borderRadius="md"
                      mx="auto"
                    />
                    <Text fontSize="xs" mt={1} noOfLines={1}>
                      {pose.name}
                    </Text>
                    <Button
                      size="xs"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => handleRemovePose(pose._id)}
                      position="absolute"
                      top="2px"
                      right="4px"
                    >
                      ×
                    </Button>
                  </Box>
                ))}
              </HStack>
            </Box>
          )}

          <Button mt={6} colorScheme="pink" onClick={handleSaveSequence}>
            Save Sequence
          </Button>
        </Box>
      </VStack>

      <SimpleGrid
        columns={[2, null, 3, 4]}
        spacing={4}
        maxW="960px"
        mx="auto"
        mb={8}
      >
        {filteredPoses.map((pose) => (
          <Box
            key={pose._id}
            bg="#FAEDEC"
            p={2}
            borderRadius="lg"
            boxShadow="md"
            textAlign="center"
            cursor="pointer"
            onClick={() => handlePoseClick(pose)}
          >
            <Image
              src={getImageSrc(pose.image)}
              alt={pose.name}
              boxSize="100px"
              objectFit="contain"
              mx="auto"
              borderRadius="md"
            />
            <Text mt={2} fontSize="sm" noOfLines={1}>
              {pose.name}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SequenceBuilderPage;
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Image,
//   Text,
//   Input,
//   Button,
//   Select,
//   useColorModeValue,
//   Flex,
// } from "@chakra-ui/react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import images from "../images";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// const SequenceDetailPage = () => {
//   const { id } = useParams();
//   const [sequence, setSequence] = useState(null);
//   const [timers, setTimers] = useState([]);
//   const [units, setUnits] = useState("seconds");
//   const [playingIndex, setPlayingIndex] = useState(null);
//   const [progress, setProgress] = useState(0);

//   const bg = useColorModeValue("#FAEDEC", "#353325");
//   const text = useColorModeValue("#353325", "#FAEDEC");

//   useEffect(() => {
//     const fetchSequence = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/api/sequences/${id}`);
//         setSequence(res.data);
//         const initialTimers = res.data.poses.map((pose) => pose.timer || 60); // default 60s
//         setTimers(initialTimers);
//       } catch (err) {
//         console.error("Failed to load sequence:", err);
//       }
//     };
//     fetchSequence();
//   }, [id]);

//   const handleTimerChange = (index, value) => {
//     const newTimers = [...timers];
//     newTimers[index] = parseInt(value) || 0;
//     setTimers(newTimers);
//   };

//   const saveSequence = async () => {
//     if (!sequence) return;
//     const updatedSequence = {
//       ...sequence,
//       poses: sequence.poses.map((pose, idx) => ({
//         ...pose,
//         timer: timers[idx],
//       })),
//     };
//     try {
//       await axios.put(`${API_BASE}/api/sequences/${id}`, updatedSequence);
//       alert("Timers saved!");
//     } catch (err) {
//       console.error("Failed to save timers:", err);
//       alert("Failed to save timers. See console for details.");
//     }
//   };

//   const playSequence = () => {
//     setPlayingIndex(0);
//     setProgress(0);
//   };

//   useEffect(() => {
//     let interval;
//     if (playingIndex !== null && sequence) {
//       const time =
//         units === "minutes" ? timers[playingIndex] * 60 : timers[playingIndex];
//       const start = Date.now();

//       interval = setInterval(() => {
//         const elapsed = (Date.now() - start) / 1000;
//         setProgress(Math.min(100, (elapsed / time) * 100));

//         if (elapsed >= time) {
//           clearInterval(interval);
//           if (playingIndex < sequence.poses.length - 1) {
//             setPlayingIndex((prev) => prev + 1);
//             setProgress(0);
//           } else {
//             setPlayingIndex(null);
//           }
//         }
//       }, 100);
//     }

//     return () => clearInterval(interval);
//   }, [playingIndex, sequence, timers, units]);

//   if (!sequence) return <Text>Loading...</Text>;

//   return (
//     <Box bg={bg} color={text} p={5} maxW="600px" mx="auto">
//       <Text fontSize="2xl" fontWeight="bold" mb={4}>
//         {sequence.name}
//       </Text>

//       <Box mb={4}>
//         <Select
//           value={units}
//           onChange={(e) => setUnits(e.target.value)}
//           width="200px"
//           mb={2}
//         >
//           <option value="seconds">Seconds</option>
//           <option value="minutes">Minutes</option>
//         </Select>
//         <Button onClick={saveSequence} mr={3} colorScheme="pink">
//           Save Timers
//         </Button>
//         <Button onClick={playSequence} colorScheme="green">
//           Play Sequence
//         </Button>
//       </Box>

//       {sequence.poses.map((pose, idx) => {
//         const isPlaying = idx === playingIndex;
//         const overlay = isPlaying ? (
//           <Box
//             position="absolute"
//             top="0"
//             left="0"
//             height="100%"
//             width={`${100 - progress}%`}
//             bg="rgba(0,0,0,0.4)"
//             zIndex="1"
//             transition="width 0.1s linear"
//             borderRadius="2xl"
//           />
//         ) : null;

//         return (
//           <Flex
//             key={idx}
//             borderWidth="1px"
//             borderRadius="2xl"
//             p={4}
//             mb={4}
//             position="relative"
//             bg="white"
//             alignItems="center"
//           >
//             {overlay}
//             <Image
//               src={images[pose.image] || null}
//               alt={pose.name}
//               boxSize="100px"
//               objectFit="contain"
//               mr={4}
//               borderRadius="md"
//             />
//             <Box flex="1">
//               <Text fontSize="xl" fontWeight="semibold">
//                 {pose.name}
//               </Text>
//               {pose.cue && (
//                 <Text fontSize="sm" mt={1} color="gray.600">
//                   {pose.cue}
//                 </Text>
//               )}
//             </Box>
//             <Box textAlign="center" minW="120px" ml={4}>
//               <Input
//                 type="number"
//                 value={timers[idx]}
//                 onChange={(e) => handleTimerChange(idx, e.target.value)}
//                 width="100px"
//                 disabled={playingIndex !== null}
//                 mb={1}
//               />
//               <Text fontSize="sm">{units}</Text>
//             </Box>
//           </Flex>
//         );
//       })}
//     </Box>
//   );
// };

// export default SequenceDetailPage;