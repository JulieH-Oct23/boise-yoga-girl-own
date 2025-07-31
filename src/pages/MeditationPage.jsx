// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Heading,
//   Text,
//   SimpleGrid,
//   VStack,
//   useColorModeValue,
//   Spinner,
// } from "@chakra-ui/react";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// const MeditationPage = () => {
//   const [meditations, setMeditations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const cardBg = useColorModeValue("#FAEDEC", "#353325");
//   const cardTextColor = useColorModeValue("#353325", "#FAEDEC");

//   useEffect(() => {
//     const fetchMeditations = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get(`${API_BASE}/api/meditations`);
//         setMeditations(res.data);
//         setError(null);
//       } catch (err) {
//         console.error("Failed to fetch meditations:", err);
//         setError("Failed to load meditations");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMeditations();
//   }, []);

//   if (loading) {
//     return (
//       <Box p={6} textAlign="center">
//         <Spinner size="xl" />
//         <Text mt={4}>Loading meditations...</Text>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box p={6} textAlign="center" color="red.500">
//         <Text>{error}</Text>
//       </Box>
//     );
//   }

//   return (
//     <Box p={6} maxW="960px" mx="auto">
//       <Heading mb={6} textAlign="center" color={cardTextColor}>
//         Meditations
//       </Heading>

//       {meditations.length === 0 ? (
//         <Text textAlign="center" color={cardTextColor}>
//           No meditations found.
//         </Text>
//       ) : (
//         <SimpleGrid columns={[1, 2]} spacing={6}>
//           {meditations.map(({ _id, name, text, category }) => (
//             <Box
//               key={_id}
//               bg={cardBg}
//               color={cardTextColor}
//               p={4}
//               borderRadius="lg"
//               boxShadow="md"
//               minH="180px"
//             >
//               <VStack align="start" spacing={3}>
//                 <Heading size="md">{name}</Heading>
//                 <Text fontWeight="bold" fontSize="sm" color="gray.500">
//                   Category: {category || "Uncategorized"}
//                 </Text>
//                 <Text whiteSpace="pre-wrap" fontSize="sm" noOfLines={8}>
//                   {text}
//                 </Text>
//               </VStack>
//             </Box>
//           ))}
//         </SimpleGrid>
//       )}
//     </Box>
//   );
// };

// export default MeditationPage;
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  useColorModeValue,
  Collapse,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const MeditationPage = () => {
  const [meditations, setMeditations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null); // track expanded meditation id

  const cardBg = useColorModeValue("#FAEDEC", "#353325");
  const cardTextColor = useColorModeValue("#353325", "#FAEDEC");

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/meditations`);
        setMeditations(res.data);
      } catch (err) {
        console.error("Failed to fetch meditations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeditations();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <VStack spacing={6} p={4} maxW="800px" mx="auto">
      <Heading mb={4}>Meditations</Heading>
      {meditations.map(({ _id, name, category, text }) => (
        <Box
          key={_id}
          bg={cardBg}
          color={cardTextColor}
          p={4}
          borderRadius="lg"
          boxShadow="md"
          w="100%"
          cursor="pointer"
          onClick={() => setExpandedId(expandedId === _id ? null : _id)}
        >
          <Text fontWeight="bold" fontSize="lg">
            {name}{" "}
            <Text as="span" fontWeight="normal" fontStyle="italic" fontSize="sm" color="gray.500">
              [{category}]
            </Text>
          </Text>
          <Collapse in={expandedId === _id} animateOpacity>
            <Text mt={3} whiteSpace="pre-wrap">
              {text}
            </Text>
          </Collapse>
          <Button
            size="sm"
            mt={2}
            onClick={(e) => {
              e.stopPropagation();
              setExpandedId(expandedId === _id ? null : _id);
            }}
          >
            {expandedId === _id ? "Show Less" : "Read More"}
          </Button>
        </Box>
      ))}
    </VStack>
  );
};

export default MeditationPage;