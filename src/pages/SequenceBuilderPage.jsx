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
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import images from "../images";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const SequenceBuilderPage = () => {
  const [poses, setPoses] = useState([]);
  const [filteredPoses, setFilteredPoses] = useState([]);
  const [meditations, setMeditations] = useState([]);
  const [filteredMeditations, setFilteredMeditations] = useState([]);
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [meditationSearchTerm, setMeditationSearchTerm] = useState("");
  const [sequenceName, setSequenceName] = useState("");
  const [sequenceStyle, setSequenceStyle] = useState("Power");
  const [sequenceLevel, setSequenceLevel] = useState("Beginner");
  const [saveSuccess, setSaveSuccess] = useState(null); // or string for style name
  const navigate = useNavigate();

  // Chakra color mode for bg and text colors on cards
  const cardBg = useColorModeValue("#FAEDEC", "#332F27");
  const cardTextColor = useColorModeValue("#332F27", "#FAEDEC");

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

    const fetchMeditations = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/meditations`);
        setMeditations(res.data);
        setFilteredMeditations(res.data);
      } catch (err) {
        console.error("Failed to fetch meditations:", err);
      }
    };

    fetchPoses();
    fetchMeditations();
  }, []);

  const handlePoseClick = (item) => {
   {
      setSelectedPoses([...selectedPoses, item]);
    }
  };

  const handleRemovePose = (poseId) => {
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

  const handleMeditationSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setMeditationSearchTerm(term);
    setFilteredMeditations(
      meditations.filter((med) => med.name.toLowerCase().includes(term))
    );
  };

  const handleSaveSequence = async () => {
    if (!sequenceName.trim()) {
      alert("Please enter a sequence name.");
      return;
    }
    if (selectedPoses.length === 0) {
      alert("Please select at least one pose or meditation.");
      return;
    }

    // Save only name and image for each item
    const newSequence = {
      name: sequenceName,
      style: sequenceStyle,
      difficulty: sequenceLevel,
      poses: selectedPoses.map((item) => ({
        name: item.name,
        image: item.image || null,
      })),
    };

    try {
      await axios.post(`${API_BASE}/api/sequences`, newSequence);
      setSaveSuccess(sequenceStyle);
      setSequenceName("");
      setSelectedPoses([]);
      setSearchTerm("");
      setMeditationSearchTerm("");
      setFilteredPoses(poses);
      setFilteredMeditations(meditations);
    } catch (err) {
      console.error("Failed to save sequence:", err);
      alert("Failed to save sequence, check console.");
      setSaveSuccess(null);
    }
  };

  // Helper for image src
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

          {selectedPoses.length > 0 && (
            <Box mt={4}>
              <Text fontWeight="bold" mb={2}>
                Selected Poses & Meditations:
              </Text>
              <HStack wrap="wrap" spacing={3}>
                {selectedPoses.map((pose, index) => (
                  <Box
                    key={`${pose._id}-${index}`}
                    p={2}
                    bg={cardBg}
                    border="1px solid #ccc"
                    borderRadius="md"
                    w="100px"
                    textAlign="center"
                    position="relative"
                    color={cardTextColor}
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

              {/* Save Sequence button moved here */}
              <Button mt={6} bg="#7a5758" color="white" _hover={{bg:"#92636B"}} borderRadius="md" px={3} py={1} onClick={handleSaveSequence}>
                Save Sequence
              </Button>
            </Box>
          )}

          <FormControl mb={4} mt={6}>
            <FormLabel>Search Poses</FormLabel>
            <Input
              placeholder="Search poses by name"
              value={searchTerm}
              onChange={handleSearch}
            />
          </FormControl>

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
                bg={cardBg}
                p={2}
                borderRadius="lg"
                boxShadow="md"
                textAlign="center"
                cursor="pointer"
                onClick={() => handlePoseClick(pose)}
                color={cardTextColor}
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

          <FormControl mb={4}>
            <FormLabel>Click on Meditations to Add to Sequence</FormLabel>
            <Input
              placeholder="Search meditations by name"
              value={meditationSearchTerm}
              onChange={handleMeditationSearch}
            />
          </FormControl>

          <SimpleGrid
            columns={[2, null, 3, 4]}
            spacing={4}
            maxW="960px"
            mx="auto"
            mb={8}
          >
            {filteredMeditations.map((med) => (
              <Box
                key={med._id}
                bg={cardBg}
                p={2}
                borderRadius="lg"
                boxShadow="md"
                textAlign="center"
                cursor="pointer"
                onClick={() => handlePoseClick(med)}
                color={cardTextColor}
              >
                <Image
                  src={images.MeditationIcon || images.MissingPhoto} // You can add a meditation icon to your images folder
                  alt={med.name}
                  boxSize="100px"
                  objectFit="contain"
                  mx="auto"
                  borderRadius="md"
                />
                <Text mt={2} fontSize="sm" noOfLines={1}>
                  {med.name}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
};

export default SequenceBuilderPage;