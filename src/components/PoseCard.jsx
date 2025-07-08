// import { Box, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react";
// import { Link } from "react-router-dom";

// const PoseCard = ({ _id, name, category, description, image }) => {
//   const bg = useColorModeValue("brand.light.surface", "brand.dark.surface");
//   const borderColor = useColorModeValue("brand.light.muted", "brand.dark.muted");
//   const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
//   const categoryColor = useColorModeValue("brand.light.muted", "brand.dark.muted");
//   const nameColor = useColorModeValue("brand.light.poseCardTitle", "brand.dark.poseCardTitle");

//   return (
//     <Link to={`/pose/${_id}`} style={{ textDecoration: "none" }}>
//       <Box
//         border="1px solid"
//         borderColor={borderColor}
//         borderRadius="lg"
//         p={4}
//         bg={bg}
//         color={textColor}
//         boxShadow="md"
//         _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
//         transition="all 0.2s"
//         cursor="pointer"
//         display="flex"
//         flexDirection="column"
//         height="100%"
//       >
//         <Box
//           width="100%"
//           height={{ base: "180px", sm: "200px", md: "220px" }}
//           overflow="hidden"
//           borderRadius="md"
//           mb={4}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <Image
//             src={image || `https://placehold.co/300x200?text=${encodeURIComponent(name)}`}
//             alt={name}
//             objectFit="contain"
//             width="100%"
//             height="100%"
//           />
//         </Box>

//         <Heading size="md" mb={2} color={nameColor} noOfLines={1}>
//           {name}
//         </Heading>
//         <Text fontSize="sm" mb={1} color={categoryColor} noOfLines={1}>
//           Category: {category}
//         </Text>
//         <Text fontSize="sm" color={textColor} noOfLines={2}>
//           {description}
//         </Text>
//       </Box>
//     </Link>
//   );
// };

// export default PoseCard;

// import { Box, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import ImageRenderer from "../components/ImageRenderer"; // adjust path if needed

// const PoseCard = ({ _id, name, category, description, image }) => {
//   const bg = useColorModeValue("brand.light.surface", "brand.dark.surface");
//   const borderColor = useColorModeValue("brand.light.muted", "brand.dark.muted");
//   const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText") || "gray.700";
//   const categoryColor = useColorModeValue("brand.light.muted", "brand.dark.muted") || "gray.500";
//   const nameColor = useColorModeValue("brand.light.poseCardTitle", "brand.dark.poseCardTitle") || "gray.900";

//   return (
//     <Link to={`/pose/${_id}`} style={{ textDecoration: "none" }}>
//       <Box
//         border="1px solid"
//         borderColor={borderColor}
//         borderRadius="lg"
//         p={4}
//         bg={bg}
//         color={textColor}
//         boxShadow="md"
//         _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
//         transition="all 0.2s"
//         cursor="pointer"
//         display="flex"
//         flexDirection="column"
//         height="100%"
//         minW="0"
//         minH="0"
//         borderWidth="2px" // TEMP: visual debug
//         borderColor="red.200" // TEMP: visual debug
//       >
//         <Box
//           width="100%"
//           height={{ base: "180px", sm: "200px", md: "220px" }}
//           minW="0"
//           minH="0"
//           overflow="hidden"
//           borderRadius="md"
//           mb={4}
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//         >
//           <Image
//             src={image || `https://placehold.co/300x200?text=${encodeURIComponent(name)}`}
//             alt={name}
//             objectFit="contain"
//             width="100%"
//             height="100%"
//           />
//         </Box>

//         <Heading size="md" mb={2} color={nameColor} noOfLines={1}>
//           {name}
//         </Heading>
//         <Text fontSize="sm" mb={1} color={categoryColor} noOfLines={1}>
//           Category: {category}
//         </Text>
//         <Text fontSize="sm" color={textColor} noOfLines={2}>
//           {description}
//         </Text>
//       </Box>
//     </Link>
//   );
// };

// export default PoseCard;

// import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import ImageRenderer from "../components/ImageRenderer"; 

// const PoseCard = ({ _id, name, category, description, image }) => {
//   const bg = useColorModeValue("brand.light.surface", "brand.dark.surface");
//   const borderColor = useColorModeValue("brand.light.muted", "brand.dark.muted");
//   const textColor = useColorModeValue("brand.light.text", "brand.dark.text");

//   return (
//     <Box
//       as={Link}
//       to={`/poses/${_id}`}
//       p={4}
//       borderRadius="2xl"
//       borderWidth="1px"
//       borderColor={borderColor}
//       bg={bg}
//       color={textColor}
//       _hover={{ boxShadow: "md", transform: "scale(1.02)" }}
//       transition="all 0.2s"
//     >
//       <Heading size="md" mb={2}>
//         {name}
//       </Heading>
//       <Text fontSize="sm" mb={2} fontWeight="bold">
//         Category: {category}
//       </Text>

//       {/* ✅ Render image from MongoDB field */}
//       <ImageRenderer imageName={image} altText={name} />

//       <Text fontSize="sm" mt={2}>
//         {description}
//       </Text>
//     </Box>
//   );
// };

// export default PoseCard;

import { Box, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ImageRenderer from "../components/ImageRenderer";

const PoseCard = ({ _id, name, category, description, image }) => {
    console.log("📸 PoseCard image prop:", image, "for", name);
  const bg = useColorModeValue("brand.light.surface", "brand.dark.surface");
  const borderColor = useColorModeValue("brand.light.muted", "brand.dark.muted");
  const textColor = useColorModeValue("brand.light.text", "brand.dark.text");

  // 👇 fallback if image is missing
  const imageName = image || "MissingPhoto.jpeg";

  return (
    <Box
      as={Link}
      to={`/poses/${_id}`}
      p={4}
      borderRadius="2xl"
      borderWidth="1px"
      borderColor={borderColor}
      bg={bg}
      color={textColor}
      _hover={{ boxShadow: "md", transform: "scale(1.02)" }}
      transition="all 0.2s"
    >
      <Heading size="md" mb={2}>
        {name}
      </Heading>
      <Text fontSize="sm" mb={2} fontWeight="bold">
        Category: {category}
      </Text>

      {/* ✅ Use fallback if image is missing */}
      <ImageRenderer imageName={imageName} altText={name} />

      <Text fontSize="sm" mt={2}>
        {description}
      </Text>
    </Box>
  );
};

export default PoseCard;