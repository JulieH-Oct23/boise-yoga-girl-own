
// import { Box, Heading, Image, Text, useColorModeValue } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import images from "../images"; // ✅ adjust path if needed

// const PoseCard = ({ _id, name, image }) => {
//   const poseImage = images[image] || images["MissingPhoto.png"];
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
import images from "../images"; // ✅ adjust path if needed

const PoseCard = ({ _id, name, image }) => {
  const bg = useColorModeValue("brand.light.surface", "brand.dark.surface");
  const borderColor = useColorModeValue("brand.light.muted", "brand.dark.muted");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
  const nameColor = useColorModeValue("brand.light.poseCardTitle", "brand.dark.poseCardTitle");

  // ✅ Use image name directly from DB and match to images object
  const resolvedImage = images[image] || images["MissingPhoto.png"];

  return (
    <Link to={`/pose/${_id}`} style={{ textDecoration: "none" }}>
      <Box
        border="1px solid"
        borderColor={borderColor}
        borderRadius="lg"
        p={4}
        bg={bg}
        color={textColor}
        boxShadow="md"
        _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
        transition="all 0.2s"
        cursor="pointer"
        display="flex"
        flexDirection="column"
        height="100%"
      >
        <Box
          width="100%"
          height={{ base: "180px", sm: "200px", md: "220px" }}
          overflow="hidden"
          borderRadius="md"
          mb={4}
          position="relative"
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
            fallbackSrc={images["MissingPhoto.png"]}
            draggable={false}
          />
        </Box>

        <Heading size="md" mb={2} color={nameColor} noOfLines={1}>
          {name}
        </Heading>
      </Box>
    </Link>
  );
};

export default PoseCard;