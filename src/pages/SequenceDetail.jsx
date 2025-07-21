
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Heading,
//   Text,
//   Image,
//   Spinner,
//   Button,
//   VStack,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { useParams, useNavigate } from "react-router-dom";
// import poseImages from "../images";

// const SequenceDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [sequence, setSequence] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const API_BASE = import.meta.env.VITE_API_BASE;

//   useEffect(() => {
//     const fetchSequence = async () => {
//       try {
//         const response = await fetch(`${API_BASE}/api/sequences/${id}`);
//         const data = await response.json();
//         setSequence(data);
//       } catch (error) {
//         console.error("Error fetching sequence:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSequence();
//   }, [id, API_BASE]);

//   const bgColor = useColorModeValue("#FAEDEC", "#353325");
//   const cardColor = useColorModeValue("#FFFFFF", "#4A4A4A");
//   const textColor = useColorModeValue("#353325", "#FAEDEC");

//   if (loading) {
//     return (
//       <Box p={4}>
//         <Spinner />
//       </Box>
//     );
//   }

//   if (!sequence) {
//     return (
//       <Box p={4}>
//         <Text>Sequence not found.</Text>
//       </Box>
//     );
//   }

//   return (
//     <Box p={4} bg={bgColor} minHeight="100vh">
//       <Button onClick={() => navigate(-1)} mb={4} colorScheme="pink">
//         ← Back
//       </Button>
//       <VStack spacing={4} align="start" bg={cardColor} p={4} rounded="xl" shadow="md">
//         <Heading color={textColor}>{sequence.name}</Heading>
//         <Text color={textColor}><strong>Style:</strong> {sequence.style}</Text>
//         <Text color={textColor}><strong>Difficulty:</strong> {sequence.difficulty}</Text>

//         <Box mt={4}>
//           <Heading size="md" mb={2} color={textColor}>Poses:</Heading>
//           <VStack spacing={3} align="stretch">
//             {sequence.poses.map((pose, index) => (
//               <Box key={index} display="flex" alignItems="center" gap={4}>
//                 <Image
//                   src={poseImages[pose.image]}
//                   alt={pose.name}
//                   boxSize="80px"
//                   objectFit="cover"
//                   borderRadius="md"
//                 />
//                 <Text color={textColor}>{pose.name}</Text>
//               </Box>
//             ))}
//           </VStack>
//         </Box>
//       </VStack>
//     </Box>
//   );
// };

// export default SequenceDetail;
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Spinner,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import poseImages from "../images";  // <-- changed here

const SequenceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sequence, setSequence] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  useEffect(() => {
    const fetchSequence = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/sequences/${id}`);
        const data = await response.json();
        setSequence(data);
      } catch (error) {
        console.error("Error fetching sequence:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSequence();
  }, [id, API_BASE]);

  const bgColor = useColorModeValue("#FAEDEC", "#353325");
  const cardColor = useColorModeValue("#FFFFFF", "#4A4A4A");
  const textColor = useColorModeValue("#353325", "#FAEDEC");

  if (loading) {
    return (
      <Box p={4}>
        <Spinner />
      </Box>
    );
  }

  if (!sequence) {
    return (
      <Box p={4}>
        <Text>Sequence not found.</Text>
      </Box>
    );
  }

  return (
    <Box p={4} bg={bgColor} minHeight="100vh">
      <Button onClick={() => navigate(-1)} mb={4} colorScheme="pink">
        ← Back
      </Button>
      <VStack spacing={4} align="start" bg={cardColor} p={4} rounded="xl" shadow="md">
        <Heading color={textColor}>{sequence.name}</Heading>
        <Text color={textColor}><strong>Style:</strong> {sequence.style}</Text>
        <Text color={textColor}><strong>Difficulty:</strong> {sequence.difficulty}</Text>

        <Box mt={4}>
          <Heading size="md" mb={2} color={textColor}>Poses:</Heading>
          <VStack spacing={3} align="stretch">
            {sequence.poses.map((pose, index) => {
              // fallback key for images:
              const key = pose.image || pose.photoName || pose.name?.replace(/\s+/g, "") || "";
              return (
                <Box key={index} display="flex" alignItems="center" gap={4}>
                  <Image
                    src={poseImages[key] || poseImages.MissingPhoto}
                    alt={pose.name}
                    boxSize="80px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Text color={textColor}>{pose.name}</Text>
                </Box>
              );
            })}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default SequenceDetail;