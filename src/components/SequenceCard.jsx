import React from "react";
import {
  Box,
  Image,
  Text,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import poseImages from "../images";

const SortablePose = ({ pose, index, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: pose._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const cardBg = useColorModeValue("#FAEDEC", "#2D2D2D");
  const textColor = useColorModeValue("#353325", "#FAEDEC");

  return (
    <Box
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      bg={cardBg}
      borderRadius="xl"
      boxShadow="md"
      p={2}
      w="120px"
      textAlign="center"
      position="relative"
    >
      <IconButton
        size="xs"
        icon={<CloseIcon />}
        onClick={() => onRemove(index)}
        position="absolute"
        top="4px"
        right="4px"
        aria-label="Remove Pose"
        bg="transparent"
        _hover={{ bg: "red.300" }}
      />
      <Image
        src={poseImages[pose.image]}
        alt={pose.name}
        borderRadius="md"
        mb={2}
      />
      <Text fontSize="sm" color={textColor}>
        {pose.name}
      </Text>
    </Box>
  );
};

export default SortablePose;