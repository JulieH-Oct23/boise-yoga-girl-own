// import { Box, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import images from "../images"; // ✅ adjust path if needed

// const PoseCard = ({ _id, name, image }) => {
//   const bg = useColorModeValue("brand.light.surface", "brand.dark.surface");
//   const borderColor = useColorModeValue("brand.light.muted", "brand.dark.muted");
//   const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
//   // const categoryColor = useColorModeValue("brand.light.muted", "brand.dark.muted");
//   const nameColor = useColorModeValue("brand.light.poseCardTitle", "brand.dark.poseCardTitle");


//   // ✅ Strip .png from the image filename
//   const imageKey = image?.replace(".png", "") || "";
//   const resolvedImage = images[imageKey] || images.MissingPhoto;

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
//     <Box
//   width="100%"
//   height={{ base: "180px", sm: "200px", md: "220px" }}
//   overflow="hidden"
//   borderRadius="md"
//   mb={4}
//   position="relative"
//   display="flex"
//   alignItems="center"
//   justifyContent="center"
// >
//   <Image
//     src={resolvedImage}
//     alt={name}
//     objectFit="contain"
//     maxW="100%"
//     maxH="100%"
//     loading="lazy"
//     fallbackSrc={images.MissingPhoto}
//     draggable={false}
//   />
// </Box>

//         <Heading size="md" mb={2} color={nameColor} noOfLines={1}>
//           {name}
//         </Heading>
//         {/* <Text fontSize="sm" mb={1} color={categoryColor} noOfLines={1}>
//           Category: {Array.isArray(category) ? category.join(", ") : category}
//         </Text>
//         <Text fontSize="sm" color={textColor} noOfLines={2}>
//           {description}
//         </Text> */}
//       </Box>
//     </Link>
//   );
// };

// export default PoseCard;
import { Box, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import images from "../images";

const PoseCard = ({ _id, name, image, size = "default" }) => {
  const bg = useColorModeValue("brand.light.surface", "brand.dark.surface");
  const borderColor = useColorModeValue("brand.light.muted", "brand.dark.muted");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
  const nameColor = useColorModeValue("brand.light.poseCardTitle", "brand.dark.poseCardTitle");

  const imageKey = image?.replace(".png", "") || "";
  const resolvedImage = images[imageKey] || images.MissingPhoto;

  const isSmall = size === "small";

  return (
    <Link to={`/pose/${_id}`} style={{ textDecoration: "none" }}>
      <Box
        border="1px solid"
        borderColor={borderColor}
        borderRadius="lg"
        p={isSmall ? 2 : 4}
        bg={bg}
        color={textColor}
        boxShadow="sm"
        _hover={{ boxShadow: "md", transform: "scale(1.02)" }}
        transition="all 0.2s"
        cursor="pointer"
        display="flex"
        flexDirection="column"
        height="100%"
        width={isSmall ? "150px" : "250px"}
        mx="auto"
      >
        <Box
          width="100%"
          height={isSmall ? "100px" : "200px"}
          overflow="hidden"
          borderRadius="md"
          mb={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={resolvedImage}
            alt={name}
            objectFit="contain"
            maxW="100%"
            maxH="100%"
            loading="lazy"
            fallbackSrc={images.MissingPhoto}
            draggable={false}
          />
        </Box>

        <Heading size={isSmall ? "sm" : "md"} mb={1} color={nameColor} noOfLines={1} textAlign="center">
          {name}
        </Heading>
      </Box>
    </Link>
  );
};

export default PoseCard;