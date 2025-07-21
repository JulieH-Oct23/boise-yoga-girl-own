import {
  Box,
  Heading,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import images from "../images";

const PoseCard = ({ pose, image, size = "default" }) => {
  const { _id, name } = pose;
  const navigate = useNavigate();

  const cardWidth = size === "small" ? "150px" : "250px";
  const fontSize = size === "small" ? "md" : "xl";
  const imgSize = size === "small" ? "120px" : "200px";

  const handleClick = () => {
    navigate(`/poses/${_id}`);
  };

  const bg = "#FAEDEC"; // your custom light pink
  const text = useColorModeValue("gray.800", "white");

  return (
    <Box
      onClick={handleClick}
      bg={bg}
      borderRadius="xl"
      p={3}
      textAlign="center"
      cursor="pointer"
      width={cardWidth}
      height={size === "small" ? "180px" : "auto"}
      boxShadow="md"
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
      transition="all 0.2s"
      overflow="hidden"
    >
      <Image
        src={image}
        alt={name}
        height={imgSize}
        width="auto"
        mx="auto"
        objectFit="contain"
        fallbackSrc={images.MissingPhoto}
        mb={2}
      />
      <Heading
        mt={2}
        fontSize={fontSize}
        color={text}
        noOfLines={1}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {name}
      </Heading>
    </Box>
  );
};

export default PoseCard;