import { Box, Image, Text } from "@chakra-ui/react";
import images from "../images";

const SequenceCard = ({ pose }) => {
  const imgKey = pose.image?.replace(".png", "") || "";
  const resolvedImage = images[imgKey] || images.MissingPhoto;

  return (
    <Box
      width="140px" // ✅ Smaller than AllPosesPage
      height="180px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      borderColor="#A18E88"
      bg="white"
      textAlign="center"
      boxShadow="sm"
    >
      <Image
        src={resolvedImage}
        alt={pose.name}
        objectFit="cover"
        width="100%"
        height="110px" // ✅ Fixed height for uniformity
        borderTopRadius="lg"
      />
      <Text
        mt={2}
        px={2}
        fontSize="sm"
        fontWeight="medium"
        color="#92636B"
        noOfLines={2}
      >
        {pose.name}
      </Text>
    </Box>
  );
};

export default SequenceCard;
