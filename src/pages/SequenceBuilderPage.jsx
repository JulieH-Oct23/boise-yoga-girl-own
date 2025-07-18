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
//   const [savedSequences, setSavedSequences] = useState([]);

//   const bg = useColorModeValue("#ffffff", "#2D2D2D"); // main page bg white / dark mode dark
//   const formBg = "#A18E88"; // dark pink
//   const textColor = useColorModeValue("#353325", "#FAEDEC"); // heading text color

//   useEffect(() => {
//     async function fetchPoses() {
//       try {
//         const res = await fetch(`${API_BASE}/api/poses`);
//         const data = await res.json();
//         setPoses(data);
//       } catch (error) {
//         console.error("Failed to fetch poses:", error);
//       }
//     }

//     async function fetchSequences() {
//       try {
//         const res = await fetch(`${API_BASE}/api/sequences`);
//         const data = await res.json();
//         setSavedSequences(data);
//       } catch (error) {
//         console.error("Failed to fetch sequences:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchPoses();
//     fetchSequences();
//   }, []);

//   const togglePose = (poseId) => {
//     const poseToAdd = poses.find((p) => p._id === poseId);
//     if (poseToAdd) {
//       setSelectedPoses((prev) => [...prev, poseToAdd]);
//     }
//   };

//   const saveSequence = async () => {
//     if (!sequenceName || !style || !difficulty || selectedPoses.length === 0) {
//       alert("Please fill out all fields and select poses.");
//       return;
//     }

//     const newSequence = {
//       name: sequenceName,
//       style,
//       difficulty,
//       poses: selectedPoses.map(({ _id, name, image }) => ({ _id, name, image })),
//     };

//     try {
//       const res = await fetch(`${API_BASE}/api/sequences`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newSequence),
//       });

//       if (!res.ok) {
//         throw new Error("Failed to save sequence");
//       }

//       const savedSeq = await res.json();

//       // Update local saved sequences state to include the new one
//       setSavedSequences((prev) => [...prev, savedSeq]);

//       // Reset form and selections
//       setSequenceName("");
//       setStyle("");
//       setDifficulty("");
//       setSelectedPoses([]);
//     } catch (error) {
//       console.error(error);
//       alert("Error saving sequence. Try again.");
//     }
//   };

//   // Remove selected pose at index i from the sequence being built
//   const removeSelectedPoseAtIndex = (index) => {
//     setSelectedPoses((prev) => {
//       const copy = [...prev];
//       copy.splice(index, 1);
//       return copy;
//     });
//   };

//   if (loading) {
//     return (
//       <Box textAlign="center" py={20} bg={bg} color={textColor} minH="100vh">
//         <Spinner size="xl" />
//       </Box>
//     );
//   }

//   return (
//     <Box p={6} color={textColor} minH="100vh" bg={bg}>
//       <Heading mb={6} color={textColor} textAlign="center">
//         Sequence Builder
//       </Heading>

//       {/* Form Box */}
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
//         {selectedPoses.length > 0 && (
//           <Box mb={6}>
//             <Heading size="md" mb={4}>
//               Selected Poses ({selectedPoses.length})
//             </Heading>
//             <Wrap spacing={3}>
//               {selectedPoses.map((pose, i) => (
//                 <WrapItem key={`${pose._id}-${i}`}>
//                   <PoseCard
//                     _id={pose._id}
//                     name={pose.name}
//                     image={pose.image}
//                     size="small"
//                     disableLink={true}
//                     onRemove={() => removeSelectedPoseAtIndex(i)}
//                   />
//                 </WrapItem>
//               ))}
//             </Wrap>
//           </Box>
//         )}

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
//           <option value="Yin">Yin</option>
//           <option value="Restorative">Restorative</option>
//           <option value="Power">Power</option>
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
//           <option value="Beginner">Beginner</option>
//           <option value="Intermediate">Intermediate</option>
//           <option value="Advanced">Advanced</option>
//         </Select>
//         <Button bg="#FAEDEC" borderRadius="md" onClick={saveSequence} width="100%">
//           Save Sequence
//         </Button>
//       </Box>

//       {/* Poses grid */}
//       <SimpleGrid
//         columns={{ base: 1, sm: 2, md: 3 }}
//         spacingX={1}
//         spacingY={3}
//         minChildWidth="250px"
//         maxW="960px"
//         mx="auto"
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
//               disableLink={true}
//             />
//           </Box>
//         ))}
//       </SimpleGrid>

//       {/* Saved Sequences */}
//       <Box mt={10} maxW="960px" mx="auto">
//         <Heading size="lg" mb={4}>
//           Saved Sequences
//         </Heading>

//         {savedSequences.length === 0 ? (
//           <Text>No sequences saved yet.</Text>
//         ) : (
//           savedSequences.map((seq) => (
//             <Box key={seq._id} p={4} borderWidth="1px" borderRadius="md" mb={4} bg="white">
//               <Text fontWeight="bold" mb={2}>
//                 {seq.name} ({seq.difficulty})
//               </Text>
//               <Wrap>
//                 {seq.poses.map((pose) => (
//                   <WrapItem key={pose._id}>
//                     <PoseCard
//                       _id={pose._id}
//                       name={pose.name}
//                       image={pose.image}
//                       size="small"
//                       disableLink={true}
//                     />
//                   </WrapItem>
//                 ))}
//               </Wrap>
//             </Box>
//           ))
//         )}
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

  const bg = useColorModeValue("#ffffff", "#2D2D2D"); // main page bg white / dark mode dark
  const formBg = "#A18E88"; // dark pink
  const textColor = useColorModeValue("#353325", "#FAEDEC"); // heading text color

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
    // Add pose on click (allow duplicates)
    const poseToAdd = poses.find((p) => p._id === poseId);
    if (poseToAdd) {
      setSelectedPoses((prev) => [...prev, poseToAdd]);
    }
  };

  const saveSequence = async () => {
    if (!sequenceName || !style || !difficulty || selectedPoses.length === 0) {
      alert("Please fill out all fields and select poses.");
      return;
    }

    const newSequence = {
      name: sequenceName,
      style,
      difficulty,
      poses: selectedPoses.map(({ _id, name, image }) => ({ _id, name, image })),
    };

    try {
      const res = await fetch(`${API_BASE}/api/sequences`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSequence),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save sequence");
      }

      alert("Sequence saved successfully!");
      // Reset form and selections
      setSequenceName("");
      setStyle("");
      setDifficulty("");
      setSelectedPoses([]);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Remove selected pose at index i from the sequence being built
  const removeSelectedPoseAtIndex = (index) => {
    setSelectedPoses((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  if (loading) {
    return (
      <Box textAlign="center" py={20} bg={bg} color={textColor} minH="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={6} color={textColor} minH="100vh" bg={bg}>
      <Heading mb={6} color={textColor} textAlign="center">
        Sequence Builder
      </Heading>

      {/* Form Box with light gray/brown background */}
      <Box
        bg={formBg}
        p={6}
        borderRadius="md"
        mb={8}
        maxW="600px"
        mx="auto"
        boxShadow="md"
        width={["90%", "80%", "60%", "50%"]}
      >
        {/* Selected Poses */}
        {selectedPoses.length > 0 && (
          <Box mb={6}>
            <Heading size="md" mb={4}>
              Selected Poses ({selectedPoses.length})
            </Heading>
            <Wrap spacing={3}>
              {selectedPoses.map((pose, i) => (
                <WrapItem key={`${pose._id}-${i}`}>
                  <PoseCard
                    _id={pose._id}
                    name={pose.name}
                    image={pose.image}
                    size="small"
                    disableLink={true}
                    onRemove={() => removeSelectedPoseAtIndex(i)}
                  />
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        )}

        <Input
          placeholder="Sequence Name"
          value={sequenceName}
          onChange={(e) => setSequenceName(e.target.value)}
          mb={4}
          borderRadius="md"
          bg="white"
          color="black"
        />
        <Select
          placeholder="Select Style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          mb={4}
          borderRadius="md"
          bg="white"
          color="black"
        >
          <option value="Yin">Yin</option>
          <option value="Restorative">Restorative</option>
          <option value="Power">Power</option>
        </Select>
        <Select
          placeholder="Select Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          mb={6}
          borderRadius="md"
          bg="white"
          color="black"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </Select>
        <Button
          bg="#FAEDEC"
          borderRadius="md"
          onClick={saveSequence}
          width="100%"
        >
          Save Sequence
        </Button>
      </Box>

      {/* Poses grid for selecting */}
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacingX={1}
        spacingY={3}
        minChildWidth="250px"
        maxW="960px"
        mx="auto"
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
              disableLink={true}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SequenceBuilderPage;