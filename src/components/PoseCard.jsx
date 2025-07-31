
import { Box, Heading, Image, useColorModeValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import images from "../images";  // <-- IMPORT IMAGES HERE

const PoseCard = ({ pose, size = "default" }) => {
  const { _id, name, image } = pose;
  const navigate = useNavigate();

  const cardWidth = size === "small" ? "150px" : "250px";
  const fontSize = size === "small" ? "md" : "xl";
  const imgSize = size === "small" ? "100px" : "150px";

  const handleClick = () => {
    navigate(`/poses/${_id}`);
  };

  const bg = useColorModeValue("#FAEDEC", "#353325");
  const textColor = useColorModeValue("#353325", "#FAEDEC");

  const getImageSrc = (imageName) => {
    if (!imageName) return images.MissingPhoto;
    const key = imageName.replace(/\.png$/i, "");
    return images[key] || images.MissingPhoto;
  };

  const imageSrc = getImageSrc(image);

  return (
    <Box
      onClick={handleClick}
      bg={bg}
      borderRadius="lg"
      p={3}
      textAlign="center"
      cursor="pointer"
      width={cardWidth}
      boxShadow="md"
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
      transition="all 0.2s"
    >
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={name}
          boxSize={imgSize}
          objectFit="contain"
          mx="auto"
          borderRadius="md"
          mb={2}
        />
      )}
      <Heading fontSize={fontSize} color={textColor} noOfLines={1}>
        {name}
      </Heading>
    </Box>
  );
};

export default PoseCard;