// import {
//   Box,
//   Button,
//   Heading,
//   Image,
//   Spinner,
//   Text,
//   useColorModeValue,
//   VStack
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import images from "../images";

// const PoseDetailPage = () => {
//   const { poseId } = useParams();
//   const navigate = useNavigate();
//   const [pose, setPose] = useState(null);
//   const [loading, setLoading] = useState(true);

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

//   const getImageSrc = (imageName) => {
//     if (!imageName) return images.MissingPhoto;
//     const key = imageName.replace(/\.png$/i, "");
//     return images[key] || images.MissingPhoto;
//   };

//   // Normalize anatomy to array
//   const normalizeAnatomy = (anatomy) => {
//     if (!anatomy) return [];
//     if (Array.isArray(anatomy)) return anatomy;
//     return anatomy.split(",").map((part) => part.trim());
//   };

//   if (loading) return <Spinner size="xl" />;
//   if (!pose) return <Text>Pose not found</Text>;

//   const imageSrc = getImageSrc(pose.image);
//   const anatomyArray = normalizeAnatomy(pose.anatomy);

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

//       <Heading color={titleColor} mb={1}>
//         {pose.name}
//       </Heading>

//       {/* Sanskrit name displayed immediately below English name */}
//       {pose.sanskritName && (
//         <Text fontSize="lg" fontStyle="italic" color={textColor} mb={4} userSelect="text">
//           {pose.sanskritName}
//         </Text>
//       )}

//       {imageSrc && (
//         <Image
//           src={imageSrc}
//           alt={pose.name}
//           borderRadius="md"
//           mb={20}
//           maxHeight="400px"
//           objectFit="contain"
//           mx="auto"
//         />
//       )}

//       {pose.cue && (
//         <Box mb={8} p={1} bg={cueBoxBg} borderRadius="sm">
//           <Text fontWeight="semibold" mb={3}>
//             Cue:
//           </Text>
//           <Text>{pose.cue}</Text>
//         </Box>
//       )}

//       {anatomyArray.length > 0 && (
//         <Text mb={2}>
//           <strong>Anatomy:</strong> {pose.anatomy?.join(", ")}
//         </Text>
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

// import {
//   Box,
//   Button,
//   Heading,
//   Image,
//   Spinner,
//   Text,
//   useColorModeValue,
//   VStack
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import images from "../images";

// const PoseDetailPage = () => {
//   const { poseId } = useParams();
//   const navigate = useNavigate();
//   const [pose, setPose] = useState(null);
//   const [loading, setLoading] = useState(true);

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

//   const getImageSrc = (imageName) => {
//     if (!imageName) return images.MissingPhoto;
//     const key = imageName.replace(/\.png$/i, "");
//     return images[key] || images.MissingPhoto;
//   };

//   // Normalize anatomy to array
//   const normalizeAnatomy = (anatomy) => {
//     if (!anatomy) return [];
//     if (Array.isArray(anatomy)) return anatomy;
//     return anatomy.split(",").map((part) => part.trim());
//   };

//   if (loading) return <Spinner size="xl" />;
//   if (!pose) return <Text>Pose not found</Text>;

//   const imageSrc = getImageSrc(pose.image);
//   const anatomyArray = normalizeAnatomy(pose.anatomy);

//   return (
//     <Box maxW="800px" mx="auto" mt="30px" px={4}>
//       {/* Back button above card */}
//       <Button mb={4} onClick={() => navigate(-1)}>
//         ← Back
//       </Button>

//       {/* Pose card */}
//       <Box
//         p={6}
//         bg={bg}
//         color={textColor}
//         borderRadius="md"
//         boxShadow="md"
//       >
//         {/* Pose name */}
//         <Heading color={titleColor} fontSize="3xl" mb={2}>
//           {pose.name}
//         </Heading>

//         {/* Sanskrit name */}
//         {pose.sanskritName && (
//           <Text
//             fontSize="xl"
//             fontStyle="italic"
//             color={textColor}
//             mb={4}
//             userSelect="text"
//           >
//             {pose.sanskritName}
//           </Text>
//         )}

//         {/* Pose image */}
//         {imageSrc && (
//           <Image
//             src={imageSrc}
//             alt={pose.name}
//             borderRadius="md"
//             mb={6}
//             maxHeight="400px"
//             objectFit="contain"
//             mx="auto"
//           />
//         )}

//         {/* Cue */}
//         {pose.cue && (
//           <Box mb={6} p={4} bg={cueBoxBg} borderRadius="md" whiteSpace="pre-wrap">
//             <Text fontWeight="semibold" fontSize="md" mb={2}>
//               Cue:
//             </Text>
//             <Text fontSize="sm">{pose.cue}</Text>
//           </Box>
//         )}

//         {/* Anatomy */}
//         {anatomyArray.length > 0 && (
//           <Box mb={4}>
//             <Text fontWeight="bold" mb={1}>
//               Anatomy:
//             </Text>
//             <VStack align="start" spacing={0.5}>
//               {anatomyArray.map((part, index) => (
//                 <Text key={index} fontSize="sm">
//                   {part}
//                 </Text>
//               ))}
//             </VStack>
//           </Box>
//         )}

//         {/* Other metadata */}
//         <Text mb={2} fontSize="sm">
//           <strong>Category:</strong> {pose.category?.join(", ")}
//         </Text>
//         <Text mb={2} fontSize="sm">
//           <strong>Level:</strong> {pose.level}
//         </Text>
//         <Text mb={2} fontSize="sm">
//           <strong>Timing:</strong> {pose.timing?.join(", ")}
//         </Text>

//         {/* Indications */}
//         {pose.indications?.length > 0 && (
//           <Box mb={2}>
//             <Text fontWeight="bold" mb={1}>
//               Indications:
//             </Text>
//             <VStack align="start" spacing={0.5}>
//               {pose.indications.map((item, i) => (
//                 <Text key={i} fontSize="sm">{item}</Text>
//               ))}
//             </VStack>
//           </Box>
//         )}

//         {/* Counter Indications */}
//         {pose.counterIndications?.length > 0 && (
//           <Box mb={2}>
//             <Text fontWeight="bold" mb={1}>
//               Counter Indications:
//             </Text>
//             <VStack align="start" spacing={0.5}>
//               {pose.counterIndications.map((item, i) => (
//                 <Text key={i} fontSize="sm">{item}</Text>
//               ))}
//             </VStack>
//           </Box>
//         )}

//         {/* Description */}
//         {pose.description && (
//           <Box mt={4}>
//             <Text fontSize="sm">{pose.description}</Text>
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default PoseDetailPage;

import {
  Box,
  Button,
  Heading,
  Image,
  Spinner,
  Text,
  useColorModeValue,
  VStack
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

  // Normalize anatomy to array
  const normalizeAnatomy = (anatomy) => {
    if (!anatomy) return [];
    if (Array.isArray(anatomy)) return anatomy;
    return anatomy.split(",").map((part) => part.trim());
  };

  if (loading) return <Spinner size="xl" />;
  if (!pose) return <Text>Pose not found</Text>;

  const imageSrc = getImageSrc(pose.image);
  const anatomyArray = normalizeAnatomy(pose.anatomy);

  return (
    <Box maxW="800px" mx="auto" mt="30px" px={4}>
      {/* Back button above card */}
      <Button mb={4} onClick={() => navigate(-1)}>
        ← Back
      </Button>

      {/* Pose card */}
      <Box
        p={6}
        bg={bg}
        color={textColor}
        borderRadius="md"
        boxShadow="md"
      >
        {/* Pose name */}
        <Heading color={titleColor} fontSize="3xl" mb={1}>
          {pose.name}
        </Heading>

        {/* Sanskrit name */}
        {pose.sanskritName && (
          <Text fontSize="lg" fontStyle="italic" color={textColor} mb={4} userSelect="text">
            {pose.sanskritName}
          </Text>
        )}

        {/* Pose image */}
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={pose.name}
            borderRadius="md"
            mb={20}
            maxHeight="400px"
            objectFit="contain"
            mx="auto"
          />
        )}

        {/* Cue */}
        {pose.cue && (
          <Box mb={8} p={1} bg={cueBoxBg} borderRadius="sm">
            <Text fontWeight="semibold" mb={3}>
              Cue:
            </Text>
            <Text>{pose.cue}</Text>
          </Box>
        )}

        {/* Anatomy */}
        {anatomyArray.length > 0 && (
          <Text mb={2}>
            <strong>Anatomy:</strong> {pose.anatomy?.join(", ")}
          </Text>
        )}

        {/* Category, Level, Timing */}
        <Text mb={2}>
          <strong>Category:</strong> {pose.category?.join(", ")}
        </Text>
        <Text mb={2}>
          <strong>Level:</strong> {pose.level}
        </Text>
        {/* Indications */}
        <Text mb={2}>
          <strong>Indications:</strong> {pose.indications?.join(", ")}
        </Text>

        {/* Counter Indications */}
        <Text mb={2}>
          <strong>Counter Indications:</strong> {pose.counterIndications?.join(", ")}
        </Text>

        {/* Description */}
        {pose.description && (
          <Box mt={4}>
            <Text>{pose.description}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PoseDetailPage;