import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Heading,
  Textarea,
  Alert,
  AlertIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const MeditationBuilderPage = () => {
  const [name, setName] = useState("");
  const [cue, setCue] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState(null); // 'success' or 'error'
  const [message, setMessage] = useState("");

  const handleSaveMeditation = async () => {
    if (!name || !cue || !category) {
      setStatus("error");
      setMessage("Please fill in all fields before saving.");
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/meditations`, {
        name,
        cue,
        category,
      });

      setName("");
      setCue("");
      setCategory("");
      setStatus("success");
      setMessage("Meditation saved successfully!");
    } catch (error) {
      console.error("Failed to save meditation:", error);
      setStatus("error");
      setMessage("Failed to save meditation. Please try again.");
    }

    // Hide the message after 3 seconds
    setTimeout(() => {
      setStatus(null);
      setMessage("");
    }, 3000);
  };

  const bgColor = useColorModeValue("#FAEDEC", "#353325");
  const inputBg = useColorModeValue("white", "gray.700");

  return (
    <Box maxW="600px" mx="auto" mt={10} p={5} bg={bgColor} borderRadius="2xl">
      <Heading mb={6}>Build Your Meditation</Heading>

      {status && (
        <Alert status={status} borderRadius="md" mb={4}>
          <AlertIcon boxSize={10}/>
          {message}
        </Alert>
      )}

      <VStack spacing={4}>
        <Input
          placeholder="Meditation Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          bg={inputBg}
        />
        <Input
          placeholder="Category (e.g., Relaxation, Focus)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          bg={inputBg}
        />
        <Textarea
          placeholder="Enter the cue for this meditation..."
          value={cue}
          onChange={(e) => setCue(e.target.value)}
          rows={6}
          bg={inputBg}
        />
        <Button colorScheme="pink" onClick={handleSaveMeditation}>
          Save Meditation
        </Button>
      </VStack>
    </Box>
  );
};

export default MeditationBuilderPage;