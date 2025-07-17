import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Spinner,
  Text,
  SimpleGrid,
  Select,
  Input,
  Button,
  useColorModeValue,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import PoseCard from "../components/PoseCard";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const SequenceBuilderPage = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sequenceName, setSequenceName] = useState("");
  const [style, setStyle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [selectedPoses, setSelectedPoses] = useState([]);
  const [savedSequences, setSavedSequences] = useState({
    yin: [],
    restorative: [],
    power: [],
  });

  const bg = useColorModeValue("#ffffff", "#2D2D2D"); // main page bg white / dark mode dark
  const formBg = "#92636B"; // dark pink
  const textColor = useColorModeValue("#353325", "#FAEDEC"); // heading text color

  useEffect(() => {
    async function fetchPoses() {
      try {
        const res = await fetch(`${API_BASE}/api/poses`);
        const data = await res.json();
        setPoses(data);
        console.log("✅ poses fetched (sequence):", data);
      } catch (error) {
        console.error("Failed to fetch poses:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPoses();
  }, []);

  const togglePose = (poseId) => {
    // Add pose on click (allow duplicates)
    const poseToAdd = poses.find((p) => p._id === poseId);
    if (poseToAdd) {
      setSelectedPoses((prev) => [...prev, poseToAdd]);
    }
  };

  const saveSequence = () => {
    if (!sequenceName || !style || !difficulty || selectedPoses.length === 0) {
      alert("Please fill out all fields and select poses.");
      return;
    }

    const newSequence = {
      name: sequenceName,
      difficulty,
      poses: selectedPoses,
    };

    setSavedSequences((prev) => ({
      ...prev,
      [style.toLowerCase()]: [...prev[style.toLowerCase()], newSequence],
    }));

    // Reset form and selections
    setSequenceName("");
    setStyle("");
    setDifficulty("");
    setSelectedPoses([]);
  };

  // Remove selected pose at index i from the sequence being built
  const removeSelectedPoseAtIndex = (index) => {
    setSelectedPoses((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      return copy;
    });
  };

  // Remove pose at idx from saved sequence i in group
  const removeSavedSequencePose = (group, seqIndex, poseIndex) => {
    setSavedSequences((prev) => {
      const updatedGroup = [...prev[group]];
      const updatedSeq = { ...updatedGroup[seqIndex] };
      updatedSeq.poses = updatedSeq.poses.filter((_, idx) => idx !== poseIndex);
      updatedGroup[seqIndex] = updatedSeq;
      return {
        ...prev,
        [group]: updatedGroup,
      };
    });
  };

  if (loading) {
    return (
      <Box textAlign="center" py={20} bg={bg} color={textColor} minH="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={6} color={textColor} minH="100vh" bg={bg}>
      <Heading mb={6} color={textColor} textAlign="center">
        Sequence Builder
      </Heading>

      {/* Form Box with light gray/brown background */}
      <Box
        bg={formBg}
        p={6}
        borderRadius="md"
        mb={8}
        maxW="600px"
        mx="auto"
        boxShadow="md"
        width={["90%", "80%", "60%", "50%"]}
      >
        {/* Selected Poses */}
        {selectedPoses.length > 0 && (
          <Box mb={6}>
            <Heading size="md" mb={4}>
              Selected Poses ({selectedPoses.length})
            </Heading>
            <Wrap spacing={3}>
              {selectedPoses.map((pose, i) => (
                <WrapItem key={`${pose._id}-${i}`}>
                  <PoseCard
                    _id={pose._id}
                    name={pose.name}
                    image={pose.image}
                    size="small"
                    disableLink={true}
                    onRemove={() => removeSelectedPoseAtIndex(i)}
                  />
                </WrapItem>
              ))}
            </Wrap>
          </Box>
        )}

        <Input
          placeholder="Sequence Name"
          value={sequenceName}
          onChange={(e) => setSequenceName(e.target.value)}
          mb={4}
          borderRadius="md"
          bg="white"
          color="black"
        />
        <Select
          placeholder="Select Style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          mb={4}
          borderRadius="md"
          bg="white"
          color="black"
        >
          <option value="yin">Yin</option>
          <option value="restorative">Restorative</option>
          <option value="power">Power</option>
        </Select>
        <Select
          placeholder="Select Difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          mb={6}
          borderRadius="md"
          bg="white"
          color="black"
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </Select>
        <Button
          bg="#FAEDEC"
          borderRadius="md"
          onClick={saveSequence}
          width="100%"
        >
          Save Sequence
        </Button>
      </Box>

      {/* Poses grid for selecting */}
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacingX={1}
        spacingY={3}
        minChildWidth="250px"
        maxW="960px"
        mx="auto"
      >
        {poses.map((pose) => (
          <Box
            key={pose._id}
            borderRadius="md"
            cursor="pointer"
            onClick={() => togglePose(pose._id)}
          >
            <PoseCard
              _id={pose._id}
              name={pose.name}
              image={pose.image}
              size="small"
              disableLink={true}
            />
          </Box>
        ))}
      </SimpleGrid>

      {/* Saved Sequences display */}
      <Box mt={10} maxW="960px" mx="auto">
        <Heading size="lg" mb={4}>
          Saved Sequences
        </Heading>

        {["yin", "restorative", "power"].map((group) => (
          <Box key={group} mb={6}>
            <Heading size="md" mb={2} textTransform="capitalize">
              {group}
            </Heading>
            {savedSequences[group].length === 0 ? (
              <Text>No sequences yet.</Text>
            ) : (
              savedSequences[group].map((seq, i) => (
                <Box key={i} p={4} borderWidth="1px" borderRadius="md" mb={4} bg="white">
                  <Text fontWeight="bold" mb={2}>
                    {seq.name} ({seq.difficulty})
                  </Text>
                  <Wrap>
                    {seq.poses.map((pose, idx) => (
                      <WrapItem key={`${pose._id}-${idx}`}>
                        <PoseCard
                          _id={pose._id}
                          name={pose.name}
                          image={pose.image}
                          size="small"
                          disableLink={true}
                          onRemove={() => removeSavedSequencePose(group, i, idx)}
                        />
                      </WrapItem>
                    ))}
                  </Wrap>
                </Box>
              ))
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SequenceBuilderPage;