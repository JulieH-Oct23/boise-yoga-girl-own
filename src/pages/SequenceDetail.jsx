
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Heading,
//   Text,
//   Image,
//   Spinner,
//   Button,
//   VStack,
//   useColorModeValue,
//   Stack,
// } from "@chakra-ui/react";
// import { useParams, useNavigate } from "react-router-dom";
// import poseImages from "../images";

// const SequenceDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [sequence, setSequence] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

//   useEffect(() => {
//     const fetchSequence = async () => {
//       try {
//         const response = await fetch(`${API_BASE}/api/sequences/${id}`);
//         const data = await response.json();
//         setSequence(data);
//       } catch (error) {
//         console.error("Error fetching sequence:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSequence();
//   }, [id, API_BASE]);

//   const bgColor = useColorModeValue("#FAEDEC", "#353325");
//   const cardColor = useColorModeValue("#FFFFFF", "#4A4A4A");
//   const textColor = useColorModeValue("#353325", "#FAEDEC");

//   if (loading) {
//     return (
//       <Box p={4}>
//         <Spinner />
//       </Box>
//     );
//   }

//   if (!sequence) {
//     return (
//       <Box p={4}>
//         <Text>Sequence not found.</Text>
//       </Box>
//     );
//   }

//   return (
//     <Box p={4} bg={bgColor} minHeight="100vh">
//       <Button onClick={() => navigate(-1)} mb={4} colorScheme="pink">
//         ← Back
//       </Button>
//       <VStack spacing={4} align="start" bg={cardColor} p={4} rounded="xl" shadow="md">
//         <Heading color={textColor}>{sequence.name}</Heading>
//         <Text color={textColor}><strong>Style:</strong> {sequence.style}</Text>
//         <Text color={textColor}><strong>Difficulty:</strong> {sequence.difficulty}</Text>

//         <Box mt={4} w="100%">
//           <Heading size="md" mb={2} color={textColor}>Poses:</Heading>
//           <VStack spacing={3} align="stretch">
//             {sequence.poses.map((pose, index) => {
//               const key = pose.image || pose.photoName || pose.name?.replace(/\s+/g, "") || "";
//               const imageSrc = poseImages[key] || poseImages.MissingPhoto;

//               return (
//                 <Stack key={index} direction="row" spacing={4} align="center">
//                   <Image
//                     src={imageSrc}
//                     alt={pose.name}
//                     boxSize="80px"
//                     objectFit="cover"
//                     borderRadius="md"
//                   />
//                   <Text color={textColor} fontWeight="medium">{pose.name}</Text>
//                 </Stack>
//               );
//             })}
//           </VStack>
//         </Box>
//       </VStack>
//     </Box>
//   );
// };

// export default SequenceDetail;
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Spinner,
  Button,
  VStack,
  useColorModeValue,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useParams, useNavigate } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

import poseImages from "../images";

const SequenceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sequence, setSequence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [poses, setPoses] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  const fetchSequence = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/sequences/${id}`);
      const data = await response.json();
      setSequence(data);
      setPoses(data.poses || []);
    } catch (error) {
      console.error("Error fetching sequence:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSequence();
  }, [id]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = poses.findIndex((p) => p._id === active.id);
      const newIndex = poses.findIndex((p) => p._id === over.id);
      const newPoses = arrayMove(poses, oldIndex, newIndex);
      setPoses(newPoses);
    }
  };

  const handleRemove = (poseId) => {
    setPoses((prev) => prev.filter((p) => p._id !== poseId));
  };

  const handleSave = async () => {
    try {
      const updatedPoseIds = poses.map((p) => p._id);
      const response = await fetch(`${API_BASE}/api/sequences/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ poseIds: updatedPoseIds }),
      });

      if (!response.ok) throw new Error("Failed to save");

      alert("Sequence updated!");
      fetchSequence();
    } catch (err) {
      console.error("Save error:", err);
      alert("Could not save.");
    }
  };

  const bgColor = useColorModeValue("#FAEDEC", "#353325");
  const cardColor = useColorModeValue("#FFFFFF", "#4A4A4A");
  const textColor = useColorModeValue("#353325", "#FAEDEC");

  if (loading) {
    return (
      <Box p={4}>
        <Spinner />
      </Box>
    );
  }

  if (!sequence) {
    return (
      <Box p={4}>
        <Text>Sequence not found.</Text>
      </Box>
    );
  }

  return (
    <Box p={4} bg={bgColor} minHeight="100vh">
      <Button onClick={() => navigate(-1)} mb={4} colorScheme="pink">
        ← Back
      </Button>

      <VStack spacing={4} align="start" bg={cardColor} p={4} rounded="xl" shadow="md">
        <Heading color={textColor}>{sequence.name}</Heading>
        <Text color={textColor}><strong>Style:</strong> {sequence.style}</Text>
        <Text color={textColor}><strong>Difficulty:</strong> {sequence.difficulty}</Text>

        <Box mt={4} w="100%">
          <Heading size="md" mb={2} color={textColor}>Poses:</Heading>

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={poses.map((p) => p._id)} strategy={verticalListSortingStrategy}>
              <VStack spacing={3} align="stretch">
                {poses.map((pose) => (
                  <SortablePoseRow
                    key={pose._id}
                    pose={pose}
                    onRemove={() => handleRemove(pose._id)}
                    textColor={textColor}
                  />
                ))}
              </VStack>
            </SortableContext>
          </DndContext>

          <Button mt={6} colorScheme="pink" onClick={handleSave}>
            Save Order
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

const SortablePoseRow = ({ pose, onRemove, textColor }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: pose._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const key = pose.image || pose.photoName || pose.name?.replace(/\s+/g, "") || "";

  return (
    <HStack
      ref={setNodeRef}
      style={style}
      spacing={4}
      p={2}
      bg="whiteAlpha.200"
      rounded="md"
      shadow="sm"
    >
      <Box {...attributes} {...listeners} cursor="grab" color={textColor}>
        <GripVertical />
      </Box>
      <Image
        src={poseImages[key] || poseImages.MissingPhoto}
        alt={pose.name}
        boxSize="60px"
        objectFit="cover"
        borderRadius="md"
      />
      <Text flex="1" color={textColor}>
        {pose.name}
      </Text>
      <IconButton
        icon={<CloseIcon />}
        size="sm"
        onClick={onRemove}
        aria-label="Remove pose"
        colorScheme="pink"
        variant="ghost"
      />
    </HStack>
  );
};

export default SequenceDetail;