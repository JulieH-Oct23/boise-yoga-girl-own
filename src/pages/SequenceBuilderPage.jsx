// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Heading,
//   Spinner,
//   Text,
//   SimpleGrid,
//   Select,
//   Input,
//   Button,
//   useColorModeValue,
//   Wrap,
//   WrapItem,
// } from "@chakra-ui/react";
// import PoseCard from "../components/PoseCard";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// const SequenceBuilderPage = () => {
//   const [poses, setPoses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [sequenceName, setSequenceName] = useState("");
//   const [style, setStyle] = useState("");
//   const [difficulty, setDifficulty] = useState("");
//   const [selectedPoses, setSelectedPoses] = useState([]);
//   const [savedSequences, setSavedSequences] = useState({
//     yin: [],
//     restorative: [],
//     power: [],
//   });

//   const bg = useColorModeValue("#FAEDEC", "#2D2D2D"); // page bg
//   const formBg = "#FAEDEC"; // light gray/brown background for form box
//   const textColor = useColorModeValue("#353325", "#FAEDEC"); // heading text color

//   useEffect(() => {
//     async function fetchPoses() {
//       try {
//         const res = await fetch(`${API_BASE}/api/poses`);
//         const data = await res.json();
//         setPoses(data);
//         console.log("✅ poses fetched (sequence):", data);
//       } catch (error) {
//         console.error("Failed to fetch poses:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchPoses();
//   }, []);

//   const togglePose = (poseId) => {
//     setSelectedPoses((prev) =>
//       prev.includes(poseId) ? prev.filter((id) => id !== poseId) : [...prev, poseId]
//     );
//   };

//   const saveSequence = () => {
//     if (!sequenceName || !style || !difficulty || selectedPoses.length === 0) {
//       alert("Please fill out all fields and select poses.");
//       return;
//     }

//     const newSequence = {
//       name: sequenceName,
//       difficulty,
//       poses: poses.filter((p) => selectedPoses.includes(p._id)),
//     };

//     setSavedSequences((prev) => ({
//       ...prev,
//       [style.toLowerCase()]: [...prev[style.toLowerCase()], newSequence],
//     }));

//     // Reset form
//     setSequenceName("");
//     setStyle("");
//     setDifficulty("");
//     setSelectedPoses([]);
//   };

//   if (loading) {
//     return (
//       <Box textAlign="center" py={20} bg={bg} color={textColor}>
//         <Spinner size="xl" />
//       </Box>
//     );
//   }

//   return (
//     <Box p={6} color={textColor} minH="100vh">
//       <Heading mb={6} color={textColor}>
//         Sequence Builder
//       </Heading>

//       {/* Form Box with light gray/brown background */}
//       <Box
//         bg={formBg}
//         p={6}
//         borderRadius="md"
//         mb={8}
//         maxW="600px"
//         mx="auto"
//         boxShadow="md"
//         width={["90%", "80%", "60%", "50%"]}
//       >
//         <Input
//           placeholder="Sequence Name"
//           value={sequenceName}
//           onChange={(e) => setSequenceName(e.target.value)}
//           mb={4}
//           borderRadius="md"
//           bg="white"
//           color="black"
//         />
//         <Select
//           placeholder="Select Style"
//           value={style}
//           onChange={(e) => setStyle(e.target.value)}
//           mb={4}
//           borderRadius="md"
//           bg="white"
//           color="black"
//         >
//           <option value="yin">Yin</option>
//           <option value="restorative">Restorative</option>
//           <option value="power">Power</option>
//         </Select>
//         <Select
//           placeholder="Select Difficulty"
//           value={difficulty}
//           onChange={(e) => setDifficulty(e.target.value)}
//           mb={6}
//           borderRadius="md"
//           bg="white"
//           color="black"
//         >
//           <option value="beginner">Beginner</option>
//           <option value="intermediate">Intermediate</option>
//           <option value="advanced">Advanced</option>
//         </Select>
//         <Button
//           colorScheme="pink"
//           borderRadius="md"
//           onClick={saveSequence}
//           width="100%"
//         >
//           Save Sequence
//         </Button>
//       </Box>

//       <SimpleGrid
//         columns={{ base: 1, sm: 2, md: 3 }}
//         spacingX={1}
//         spacingY={3}
//         minChildWidth="250px"
//       >
//         {poses.map((pose) => (
//           <Box
//             key={pose._id}
//             borderRadius="md"
//             cursor="pointer"
//             onClick={() => togglePose(pose._id)}
//           >
//             <PoseCard
//               _id={pose._id}
//               name={pose.name}
//               image={pose.image}
//               size="small"
//               isSelected={selectedPoses.includes(pose._id)}
//             />
//           </Box>
//         ))}
//       </SimpleGrid>

//       <Box mt={10} maxW="960px" mx="auto">
//         <Heading size="lg" mb={4}>
//           Saved Sequences
//         </Heading>

//         {["yin", "restorative", "power"].map((group) => (
//           <Box key={group} mb={6}>
//             <Heading size="md" mb={2}>
//               {group.charAt(0).toUpperCase() + group.slice(1)}
//             </Heading>
//             {savedSequences[group].length === 0 ? (
//               <Text>No sequences yet.</Text>
//             ) : (
//               savedSequences[group].map((seq, i) => (
//                 <Box key={i} p={4} borderWidth="1px" borderRadius="md" mb={4} bg="white">
//                   <Text fontWeight="bold">
//                     {seq.name} ({seq.difficulty})
//                   </Text>
//                   <Wrap mt={2}>
//                     {seq.poses.map((pose) => (
//                       <WrapItem key={pose._id}>
//                         <PoseCard
//                           _id={pose._id}
//                           name={pose.name}
//                           image={pose.image}
//                           size="small"
//                         />
//                       </WrapItem>
//                     ))}
//                   </Wrap>
//                 </Box>
//               ))
//             )}
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default SequenceBuilderPage;

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Spinner,
  Text,
  SimpleGrid,
  Select,
  Input,
  Button,
  useColorModeValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import PoseCard from "../components/PoseCard";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const SequenceBuilderPage = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sequenceName, setSequenceName] = useState("");
  const [style, setStyle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [savedSequences, setSavedSequences] = useState({
    yin: [],
    restorative: [],
    power: [],
  });

  const bg = useColorModeValue("#FAEDEC", "#2D2D2D"); // page bg
  const formBg = "#92636B"; // updated light pink
  const textColor = useColorModeValue("#353325", "#FAEDEC");

  useEffect(() => {
    async function fetchPoses() {
      try {
        const res = await fetch(`${API_BASE}/api/poses`);
        const data = await res.json();
        setPoses(data);
        console.log("✅ poses fetched (sequence):", data);
      } catch (error) {
        console.error("Failed to fetch poses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPoses();
  }, []);

  const togglePose = (poseId) => {
    setSelectedPoses((prev) =>
      prev.includes(poseId) ? prev.filter((id) => id !== poseId) : [...prev, poseId]
    );
  };

  const saveSequence = () => {
    if (!sequenceName || !style || !difficulty || selectedPoses.length === 0) {
      alert("Please fill out all fields and select poses.");
      return;
    }

    const newSequence = {
      name: sequenceName,
      difficulty,
      poses: poses.filter((p) => selectedPoses.includes(p._id)),
    };

    setSavedSequences((prev) => ({
      ...prev,
      [style.toLowerCase()]: [...prev[style.toLowerCase()], newSequence],
    }));

    // Reset form
    setSequenceName("");
    setStyle("");
    setDifficulty("");
    setSelectedPoses([]);
  };

  if (loading) {
    return (
      <Box textAlign="center" py={20} bg={bg} color={textColor}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={6} color={textColor} minH="100vh">
      <Heading mb={6} color={textColor}>
      </Heading>

      {/* Styled Form Box */}
      <Box
        bg={formBg}
        p={6}
        borderRadius="2xl"
        mb={8}
        mx="auto"
        boxShadow="md"
        width={["100%", "90%", "80%", "60%"]}
        maxW="800px"
      >
        <Input
          placeholder="Sequence Name"
          value={sequenceName}
          onChange={(e) => setSequenceName(e.target.value)}
          mb={4}
          borderRadius="xl"
          bg="white"
          color="black"
        />
        <Select
          placeholder="Select Style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          mb={4}
          borderRadius="xl"
          bg="white"
          color="black"
        >
          <option value="yin">Yin</option>
          <option value="restorative">Restorative</option>
          <option value="power">Power</option>
        </Select>
        <Select
          placeholder="Select Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          mb={6}
          borderRadius="xl"
          bg="white"
          color="black"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </Select>
        <Button
          bg="#FAEDEC"
          color="black"
          borderRadius="xl"
          _hover={{ bg: "#f5b6b6" }}
          onClick={saveSequence}
          width="100%"
        >
          Save Sequence
        </Button>
      </Box>

      {/* Poses */}
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacingX={1}
        spacingY={3}
        minChildWidth="250px"
      >
        {poses.map((pose) => (
          <Box
            key={pose._id}
            borderRadius="md"
            cursor="pointer"
            onClick={() => togglePose(pose._id)}
          >
            <PoseCard
              _id={pose._id}
              name={pose.name}
              image={pose.image}
              size="small"
              isSelected={selectedPoses.includes(pose._id)}
            />
          </Box>
        ))}
      </SimpleGrid>

      {/* Saved Sequences */}
      <Box mt={10} maxW="960px" mx="auto">
        <Heading size="lg" mb={4}>
          Saved Sequences
        </Heading>

        {["yin", "restorative", "power"].map((group) => (
          <Box key={group} mb={6}>
            <Heading size="md" mb={2}>
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </Heading>
            {savedSequences[group].length === 0 ? (
              <Text>No sequences yet.</Text>
            ) : (
              savedSequences[group].map((seq, i) => (
                <Box key={i} p={4} borderWidth="1px" borderRadius="md" mb={4} bg="white">
                  <Text fontWeight="bold">
                    {seq.name} ({seq.difficulty})
                  </Text>
                  <Wrap mt={2}>
                    {seq.poses.map((pose) => (
                      <WrapItem key={pose._id}>
                        <PoseCard
                          _id={pose._id}
                          name={pose.name}
                          image={pose.image}
                          size="small"
                        />
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>
              ))
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SequenceBuilderPage;