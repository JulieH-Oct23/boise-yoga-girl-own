
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

//   const bg = useColorModeValue("#ffffff", "#2D2D2D"); // main page bg white / dark mode dark
//   const formBg = "#BEB1AE"; // dark pink
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
//     // Add pose on click (allow duplicates)
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
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Failed to save sequence");
//       }

//       alert("Sequence saved successfully!");
//       // Reset form and selections
//       setSequenceName("");
//       setStyle("");
//       setDifficulty("");
//       setSelectedPoses([]);
//     } catch (error) {
//       alert(`Error: ${error.message}`);
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
//         {/* Selected Poses */}
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
//         <Button
//           bg="#FAEDEC"
//           borderRadius="md"
//           onClick={saveSequence}
//           width="100%"
//         >
//           Save Sequence
//         </Button>
//       </Box>

//       {/* Poses grid for selecting */}
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
  const formBg = "#BEB1AE"; // dark pink
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
      setSequenceName("");
      setStyle("");
      setDifficulty("");
      setSelectedPoses([]);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

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

  // The custom arrow SVG styling for no double arrows:
  const selectArrowStyle = {
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3csvg fill='${encodeURIComponent(
      textColor
    )}' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 7l5 5 5-5z'/%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.75rem center",
    backgroundSize: "1rem",
    paddingRight: "2.25rem",
  };

  return (
    <Box p={6} color={textColor} minH="100vh" bg={bg}>
      <Heading mb={6} color={textColor} textAlign="center">
        Sequence Builder
      </Heading>

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
          sx={selectArrowStyle}
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
          sx={selectArrowStyle}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </Select>

        <Button bg="#FAEDEC" borderRadius="md" onClick={saveSequence} width="100%">
          Save Sequence
        </Button>
      </Box>

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
            <PoseCard _id={pose._id} name={pose.name} image={pose.image} size="small" disableLink={true} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SequenceBuilderPage;