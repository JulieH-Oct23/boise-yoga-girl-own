import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Image,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import images from "../images";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const SequenceBuilderPage = () => {
  const [poses, setPoses] = useState([]);
  const [filteredPoses, setFilteredPoses] = useState([]);
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sequenceName, setSequenceName] = useState("");
  const [sequenceStyle, setSequenceStyle] = useState("Power");
  const [sequenceLevel, setSequenceLevel] = useState("Beginner");
  const [saveSuccess, setSaveSuccess] = useState(null); // null or string "Power", "Yin", etc.
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoses = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/poses`);
        setPoses(res.data);
        setFilteredPoses(res.data);
      } catch (err) {
        console.error("Failed to fetch poses:", err);
      }
    };
    fetchPoses();
  }, []);

  const handlePoseClick = (pose) => {
    // Allow duplicates, so just add the pose
    setSelectedPoses([...selectedPoses, pose]);
  };

  const handleRemovePose = (poseId) => {
    // Remove only the first occurrence of pose with poseId
    const index = selectedPoses.findIndex((pose) => pose._id === poseId);
    if (index === -1) return;
    setSelectedPoses([
      ...selectedPoses.slice(0, index),
      ...selectedPoses.slice(index + 1),
    ]);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredPoses(
      poses.filter((pose) => pose.name.toLowerCase().includes(term))
    );
  };

  const handleSaveSequence = async () => {
    if (!sequenceName.trim()) {
      alert("Please enter a sequence name.");
      return;
    }
    if (selectedPoses.length === 0) {
      alert("Please select at least one pose.");
      return;
    }

    const newSequence = {
      name: sequenceName,
      style: sequenceStyle,
      difficulty: sequenceLevel,
      poses: selectedPoses.map((p) => ({
        name: p.name,
        image: p.image,
      })),
    };

    try {
      await axios.post(`${API_BASE}/api/sequences`, newSequence);
      setSaveSuccess(sequenceStyle); // show success message with style name
      setSequenceName("");
      setSelectedPoses([]);
      setSearchTerm("");
      setFilteredPoses(poses);
    } catch (err) {
      console.error("Failed to save sequence:", err);
      setSaveSuccess(null);
    }
  };

  // Helper to get image src from images object (strip .png)
  const getImageSrc = (imageName) => {
    if (!imageName) return images.MissingPhoto;
    const key = imageName.replace(/\.png$/i, "");
    return images[key] || images.MissingPhoto;
  };

  return (
    <Box p={4}>
      <Button mb={4} colorScheme="pink" onClick={() => navigate(-1)}>
        ← Back
      </Button>

      <VStack spacing={4} mb={8} align="center">
        <Box
          bg="#BEB1AE"
          p={6}
          borderRadius="xl"
          boxShadow="md"
          w="100%"
          maxW="960px"
        >
          <Heading size="lg" mb={4} textAlign="center">
            Build a New Sequence
          </Heading>

          {/* Success Alert */}
          {saveSuccess && (
            <Alert status="success" mb={4} borderRadius="md" position="relative">
              <AlertIcon boxSize="30px" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your sequence was saved to the {saveSuccess} Yoga Page.
              </AlertDescription>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => setSaveSuccess(null)}
              />
            </Alert>
          )}

          <FormControl mb={3}>
            <FormLabel>Sequence Name</FormLabel>
            <Input
              value={sequenceName}
              onChange={(e) => setSequenceName(e.target.value)}
              placeholder="Enter a sequence name"
            />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Style</FormLabel>
            <Select
              value={sequenceStyle}
              onChange={(e) => setSequenceStyle(e.target.value)}
            >
              <option value="Power">Power</option>
              <option value="Yin">Yin</option>
              <option value="Restorative">Restorative</option>
            </Select>
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Difficulty Level</FormLabel>
            <Select
              value={sequenceLevel}
              onChange={(e) => setSequenceLevel(e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Search Poses</FormLabel>
            <Input
              placeholder="Search poses by name"
              value={searchTerm}
              onChange={handleSearch}
            />
          </FormControl>

          {selectedPoses.length > 0 && (
            <Box mt={4}>
              <Text fontWeight="bold" mb={2}>
                Selected Poses:
              </Text>
              <HStack wrap="wrap" spacing={3}>
                {selectedPoses.map((pose, index) => (
                  <Box
                    key={`${pose._id}-${index}`}
                    p={2}
                    bg="#FAEDEC"
                    border="1px solid #ccc"
                    borderRadius="md"
                    w="100px"
                    textAlign="center"
                    position="relative"
                  >
                    <Image
                      src={getImageSrc(pose.image)}
                      alt={pose.name}
                      boxSize="60px"
                      objectFit="contain"
                      borderRadius="md"
                      mx="auto"
                    />
                    <Text fontSize="xs" mt={1} noOfLines={1}>
                      {pose.name}
                    </Text>
                    <Button
                      size="xs"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => handleRemovePose(pose._id)}
                      position="absolute"
                      top="2px"
                      right="4px"
                    >
                      ×
                    </Button>
                  </Box>
                ))}
              </HStack>
            </Box>
          )}

          <Button mt={6} colorScheme="pink" onClick={handleSaveSequence}>
            Save Sequence
          </Button>
        </Box>
      </VStack>

      <SimpleGrid
        columns={[2, null, 3, 4]}
        spacing={4}
        maxW="960px"
        mx="auto"
        mb={8}
      >
        {filteredPoses.map((pose) => (
          <Box
            key={pose._id}
            bg="#FAEDEC"
            p={2}
            borderRadius="lg"
            boxShadow="md"
            textAlign="center"
            cursor="pointer"
            onClick={() => handlePoseClick(pose)}
          >
            <Image
              src={getImageSrc(pose.image)}
              alt={pose.name}
              boxSize="100px"
              objectFit="contain"
              mx="auto"
              borderRadius="md"
            />
            <Text mt={2} fontSize="sm" noOfLines={1}>
              {pose.name}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SequenceBuilderPage;