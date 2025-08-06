
// import { Box, Heading, Image, useColorModeValue } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import images from "../images";  // <-- IMPORT IMAGES HERE

// const PoseCard = ({ pose, size = "default" }) => {
//   const { _id, name, image } = pose;
//   const navigate = useNavigate();

//   const cardWidth = size === "small" ? "150px" : "250px";
//   const fontSize = size === "small" ? "md" : "xl";
//   const imgSize = size === "small" ? "100px" : "150px";

//   const handleClick = () => {
//     navigate(`/poses/${_id}`);
//   };

//   const bg = useColorModeValue("#FAEDEC", "#353325");
//   const textColor = useColorModeValue("#353325", "#FAEDEC");

//   const getImageSrc = (imageName) => {
//     if (!imageName) return images.MissingPhoto;
//     const key = imageName.replace(/\.png$/i, "");
//     return images[key] || images.MissingPhoto;
//   };

//   const imageSrc = getImageSrc(image);

//   return (
//     <Box
//       onClick={handleClick}
//       bg={bg}
//       borderRadius="lg"
//       p={3}
//       textAlign="center"
//       cursor="pointer"
//       width={cardWidth}
//       boxShadow="md"
//       _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
//       transition="all 0.2s"
//     >
//       {imageSrc && (
//         <Image
//           src={imageSrc}
//           alt={name}
//           boxSize={imgSize}
//           objectFit="contain"
//           mx="auto"
//           borderRadius="md"
//           mb={2}
//         />
//       )}
//       <Heading fontSize={fontSize} color={textColor} noOfLines={1}>
//         {name}
//       </Heading>
//       {Array.isArray(pose.anatomy) && pose.anatomy.length > 0 && (
//   <Box mt={1} fontSize="sm" color={textColor}>
//     Anatomy: {pose.anatomy.join(', ')}
//   </Box>
// )}
//  </Box>
//   );
// };

// export default PoseCard;
import React from "react";
import { Box, Image, Text, useColorModeValue } from "@chakra-ui/react";
import poseImages from "../images"; // Assuming this maps names to image imports

const PoseCard = ({ pose }) => {
  const cardBg = useColorModeValue("#FAEDEC", "#353325");
  const textColor = useColorModeValue("#353325", "#FAEDEC");

  return (
    <Box
      bg={cardBg}
      p={4}
      borderRadius="xl"
      boxShadow="md"
      maxW="250px"
      textAlign="center"
      m={2}
    >
      <Image
        src={poseImages[pose.englishName]}
        alt={pose.englishName}
        mb={3}
        borderRadius="md"
      />
      <Text fontWeight="bold" fontSize="lg" color={textColor}>
        {pose.englishName}
      </Text>
      <Text fontStyle="italic" fontSize="sm" color={textColor}>
        {pose.sanskritName}
      </Text>

      {/* ✅ Display Anatomy Array */}
      {pose.anatomy && pose.anatomy.length > 0 && (
        <Text mt={2} fontSize="sm" color={textColor}>
          <strong>Anatomy:</strong> {pose.anatomy.join(", ")}
        </Text>
      )}
    </Box>
  );
};

export default PoseCard;