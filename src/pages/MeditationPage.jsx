import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  useColorModeValue,
  Collapse,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const MeditationPage = () => {
  const [meditations, setMeditations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  const cardBg = useColorModeValue("#FAEDEC", "#353325");
  const cardTextColor = useColorModeValue("#353325", "#FAEDEC");

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/meditations`);
        setMeditations(res.data);
      } catch (err) {
        console.error("Failed to fetch meditations:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeditations();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <VStack spacing={6} p={4} maxW="800px" mx="auto">
      <Heading mb={4}>Meditations</Heading>
      {meditations.map(({ _id, name, category, cue }) => (
        <Box
          key={_id}
          bg={cardBg}
          color={cardTextColor}
          p={4}
          borderRadius="lg"
          boxShadow="md"
          w="100%"
          cursor="pointer"
          onClick={() => setExpandedId(expandedId === _id ? null : _id)}
        >
          <Text fontWeight="bold" fontSize="lg">
            {name}{" "}
            <Text
              as="span"
              fontWeight="normal"
              fontStyle="italic"
              fontSize="sm"
              color="gray.500"
            >
              [{category}]
            </Text>
          </Text>
          <Collapse in={expandedId === _id} animateOpacity>
            <Text mt={3} whiteSpace="pre-wrap">
              {cue}
            </Text>
          </Collapse>
          <Button
            size="sm"
            mt={2}
            onClick={(e) => {
              e.stopPropagation();
              setExpandedId(expandedId === _id ? null : _id);
            }}
          >
            {expandedId === _id ? "Show Less" : "Read More"}
          </Button>
        </Box>
      ))}
    </VStack>
  );
};

export default MeditationPage;