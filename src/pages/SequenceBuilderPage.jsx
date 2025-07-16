import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  useToast,
  SimpleGrid,
  HStack,
  IconButton,
  Input,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import images from "../images";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

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

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <HStack
        bg="#92636B"
        color="#FAEDEC"
        px={4}
        py={2}
        borderRadius="md"
        mb={2}
        justifyContent="space-between"
        w="100%"
      >
        <Text>{index + 1}. {pose.name}</Text>
        <IconButton
          icon={<CloseIcon />}
          size="sm"
          colorScheme="pink"
          onClick={() => onRemove(pose._id)}
          aria-label="Remove pose"
        />
      </HStack>
    </Box>
  );
};

const SequenceBuilderPage = () => {
  const headingColor = useColorModeValue("brand.light.mainTitleText", "brand.dark.mainTitleText");
  const textColor = useColorModeValue("brand.light.poseCardText", "brand.dark.poseCardText");
  const buttonBg = useColorModeValue("brand.light.button", "brand.dark.button");
  const buttonText = useColorModeValue("brand.light.surface", "brand.dark.surface");
  const toast = useToast();

  const [poses, setPoses] = useState([]);
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [sequenceName, setSequenceName] = useState("");
  const [sequenceType, setSequenceType] = useState("");
  const [sequenceDifficulty, setSequenceDifficulty] = useState("");

  useEffect(() => {
    async function fetchPoses() {
      try {
        const res = await fetch(`${API_BASE}/api/poses`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setPoses(data);
      } catch (error) {
        console.error("Failed to fetch poses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPoses();
  }, []);

  const handlePoseClick = (pose) => {
    const isSelected = selectedPoses.find((p) => p._id === pose._id);
    if (isSelected) {
      setSelectedPoses(selectedPoses.filter((p) => p._id !== pose._id));
    } else {
      setSelectedPoses([...selectedPoses, pose]);
    }
  };

  const handleRemovePose = (id) => {
    setSelectedPoses(selectedPoses.filter((pose) => pose._id !== id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = selectedPoses.findIndex(p => p._id === active.id);
      const newIndex = selectedPoses.findIndex(p => p._id === over.id);
      setSelectedPoses(arrayMove(selectedPoses, oldIndex, newIndex));
    }
  };

  const handleSave = () => {
    if (!sequenceName || !sequenceType || !sequenceDifficulty) {
      toast({
        title: "Please complete all fields.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const sequence = {
      name: sequenceName,
      type: sequenceType,
      difficulty: sequenceDifficulty,
      poses: selectedPoses.map((p) => p._id),
    };

    // Simulate save
    console.log("✅ Sequence to save:", sequence);
    toast({
      title: "Sequence saved (mock)!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    // Reset form
    setSequenceName("");
    setSequenceType("");
    setSequenceDifficulty("");
    setSelectedPoses([]);
    setShowForm(false);
  };

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Text>Loading poses...</Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={4} color={headingColor}>
        Sequence Builder
      </Heading>
      <Text fontSize="lg" mb={6} color={textColor}>
        Use this page to create your personalized yoga sequences. Select poses, arrange their order, and save your flow for future practice.
      </Text>

      <Button
        bg="#A18E88"
        color="#FAEDEC"
        _hover={{ bg: "#92636B" }}
        mb={6}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Build a New Sequence"}
      </Button>

      {showForm && (
        <VStack align="start" spacing={4} mb={6}>
          <Input
            placeholder="Sequence Name"
            value={sequenceName}
            onChange={(e) => setSequenceName(e.target.value)}
          />
          <Select
            placeholder="Select Type"
            value={sequenceType}
            onChange={(e) => setSequenceType(e.target.value)}
          >
            <option value="Power">Power</option>
            <option value="Yin">Yin</option>
            <option value="Restorative">Restorative</option>
          </Select>
          <Select
            placeholder="Select Difficulty"
            value={sequenceDifficulty}
            onChange={(e) => setSequenceDifficulty(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </Select>
        </VStack>
      )}

      <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
        {poses.map((pose) => {
          const isSelected = selectedPoses.find((p) => p._id === pose._id);
          const imgKey = pose.image?.replace(".png", "") || "";
          const resolvedImage = images[imgKey] || images.MissingPhoto;

          return (
            <Box
              key={pose._id}
              borderWidth={2}
              borderColor={isSelected ? "#92636B" : "transparent"}
              borderRadius="xl"
              overflow="hidden"
              p={2}
              cursor="pointer"
              onClick={() => handlePoseClick(pose)}
              _hover={{ boxShadow: "md", transform: "scale(1.03)" }}
              transition="all 0.2s"
              bg="white"
            >
              <img
                src={resolvedImage}
                alt={pose.name}
                style={{ width: "100%", height: "auto", borderRadius: "12px" }}
              />
              <Text mt={2} fontWeight="bold" textAlign="center">
                {pose.name}
              </Text>
            </Box>
          );
        })}
      </SimpleGrid>

      {selectedPoses.length > 0 && (
        <VStack mt={8} align="start" spacing={4}>
          <Heading size="md" color={headingColor}>
            Selected Poses:
          </Heading>
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={selectedPoses.map((pose) => pose._id)} strategy={verticalListSortingStrategy}>
              {selectedPoses.map((pose, index) => (
                <SortablePose
                  key={pose._id}
                  pose={pose}
                  index={index}
                  onRemove={handleRemovePose}
                />
              ))}
            </SortableContext>
          </DndContext>

          <Button
            mt={4}
            bg={buttonBg}
            color={buttonText}
            onClick={handleSave}
          >
            Save Sequence
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default SequenceBuilderPage;
