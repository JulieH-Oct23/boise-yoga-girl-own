// import React from "react";
// import { Box, Image, Text, VStack } from "@chakra-ui/react";

// const PoseCard = ({ pose, onClick }) => {
//   return (
//     // <Box
//     //   onClick={onClick}
//     //   borderWidth="1px"
//     //   borderRadius="lg"
//     //   overflow="hidden"
//     //   p={4}
//     //   cursor="pointer"
//     //   bg="pink.50"
//     // >
//     //   <VStack spacing={2} align="start">
//     //     <Image src={pose.imageUrl} alt={pose.englishName} boxSize="200px" objectFit="cover" />
//     //     <Text fontWeight="bold">{pose.englishName}</Text>
//     //     <Text fontStyle="italic">{pose.sanskritName}</Text>
//     //     {pose.anatomy && pose.anatomy.length > 0 && (
//     //       <Text fontSize="sm">Anatomy: {pose.anatomy.join(", ")}</Text>
//     //     )}
//     //   </VStack>
//     // </Box>

// <Box
//   onClick={onClick}
//   borderWidth="1px"
//   borderRadius="lg"
//   overflow="hidden"
//   p={4}
//   cursor="pointer"
//   bg="pink.50"
//   maxW="220px"
// >
//   <Image
//     src={pose.imageUrl}
//     alt={pose.englishName}
//     boxSize="200px"
//     objectFit="cover"
//     mb={2}
//     borderRadius="md"
//   />
//   <VStack align="start" spacing={1} w="100%">
//     <Text fontWeight="bold">{pose.englishName}</Text>
//     <Text fontStyle="italic">{pose.sanskritName}</Text>

//     {pose.anatomy && pose.anatomy.length > 0 && (
//       <VStack align="start" spacing={0.5}>
//         <Text fontSize="sm" fontWeight="semibold">
//           Anatomy:
//         </Text>
//         {pose.anatomy.map((part) => (
//           <Text key={part} fontSize="sm" ml={2}>
//             {part}
//           </Text>
//         ))}
//       </VStack>
//     )}

//     {pose.cue && (
//       <Text fontSize="sm">
//         Cue: {pose.cue}
//       </Text>
//     )}
//   </VStack>
// </Box>
//   );
// };

// export default PoseCard;

import { Box, VStack, Text, Image } from "@chakra-ui/react";

const PoseCard = ({ pose, onClick }) => {
  return (
    <Box
      onClick={onClick}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      cursor="pointer"
      bg="pink.50"
      maxW="220px"
    >
      <Image
        src={pose.imageUrl}
        alt={pose.englishName}
        boxSize="200px"
        objectFit="cover"
        mb={2}
        borderRadius="md"
      />

      <VStack align="start" spacing={1} w="100%">
        {/* Name */}
        <Text fontWeight="bold">{pose.englishName}</Text>
        <Text fontStyle="italic">{pose.sanskritName}</Text>

        {/* Anatomy */}
        {pose.anatomy && pose.anatomy.length > 0 && (
          <>
            <Text fontSize="sm" fontWeight="semibold">
              Anatomy:
            </Text>
            {pose.anatomy.map((part) => (
              <Text key={part} fontSize="sm">
                {part}
              </Text>
            ))}
          </>
        )}

        {/* Indications */}
        {pose.indications && pose.indications.length > 0 && (
          <>
            <Text fontSize="sm" fontWeight="semibold">
              Indications:
            </Text>
            {pose.indications.map((item) => (
              <Text key={item} fontSize="sm">
                {item}
              </Text>
            ))}
          </>
        )}

        {/* Contraindications */}
        {pose.contraindications && pose.contraindications.length > 0 && (
          <>
            <Text fontSize="sm" fontWeight="semibold" align="match-parent">
              Contraindications:
            </Text>
            {pose.contraindications.map((item) => (
              <Text key={item} fontSize="sm">
                {item}
              </Text>
            ))}
          </>
        )}

        {/* Cue */}
        {pose.cue && (
          <Text fontSize="sm" fontWeight="semibold" align="match-parent">
            Cue: {pose.cue}
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default PoseCard;