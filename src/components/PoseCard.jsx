import {
  Box,
  Heading,
  Image,
  Text,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import images from "../images";

const PoseCard = ({
  _id,
  name,
  image,
  size = "default",
  disableLink = false,
  onRemove,
}) => {
  const bg = useColorModeValue("brand.light.surface", "brand.dark.surface");
  const borderColor = useColorModeValue(
    "brand.light.muted",
    "brand.dark.muted"
  );
  const textColor = useColorModeValue(
    "brand.light.poseCardText",
    "brand.dark.poseCardText"
  );
  const nameColor = useColorModeValue(
    "brand.light.poseCardTitle",
    "brand.dark.poseCardTitle"
  );

  const navigate = useNavigate();

  const imageKey = image?.replace(".png", "") || "";
  const resolvedImage = images[imageKey] || images.MissingPhoto;
  const isSmall = size === "small";

  const handleClick = () => {
    if (!disableLink) {
      navigate(`/pose/${_id}`);
    }
  };

  const content = (
    <Box
      position="relative"
      border="1px solid"
      borderColor={borderColor}
      borderRadius="lg"
      p={isSmall ? 2 : 4}
      bg={bg}
      color={textColor}
      boxShadow="sm"
      _hover={{ boxShadow: "md", transform: "scale(1.02)" }}
      transition="all 0.2s"
      onClick={handleClick}
      cursor={disableLink ? "default" : "pointer"}
      display="flex"
      flexDirection="column"
      height="100%"
      width={isSmall ? "150px" : "250px"}
      mx="auto"
    >
      {onRemove && (
        <IconButton
          icon={<CloseIcon />}
          size="xs"
          position="absolute"
          top="6px"
          right="6px"
          aria-label="Remove pose"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          color="#92636B"
          bg="transparent"
          _hover={{ bg: "gray.200" }}
        />
      )}

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

      <Heading
        size={isSmall ? "sm" : "md"}
        mb={1}
        color={nameColor}
        noOfLines={1}
        textAlign="center"
      >
        {name}
      </Heading>
    </Box>
  );

  return disableLink ? content : <Box>{content}</Box>;
};

export default PoseCard;