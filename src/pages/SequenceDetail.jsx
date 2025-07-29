import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Input,
  Button,
  Select,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import images from "../images";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const SequenceDetailPage = () => {
  const { id } = useParams();
  const [sequence, setSequence] = useState(null);
  const [allPoses, setAllPoses] = useState([]);
  const [timers, setTimers] = useState([]);
  const [units, setUnits] = useState("seconds");
  const [playingIndex, setPlayingIndex] = useState(null);
  const [progress, setProgress] = useState(0);

  const bg = useColorModeValue("#FAEDEC", "#353325");
  const text = useColorModeValue("#353325", "#FAEDEC");

  // Fetch sequence data by ID
  useEffect(() => {
    const fetchSequence = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/sequences/${id}`);
        setSequence(res.data);
        const initialTimers = res.data.poses.map((pose) => pose.timer || 60);
        setTimers(initialTimers);
      } catch (err) {
        console.error("Failed to load sequence:", err);
      }
    };
    fetchSequence();
  }, [id]);

  // Fetch all poses (to get cues)
  useEffect(() => {
    const fetchAllPoses = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/poses`);
        setAllPoses(res.data);
      } catch (err) {
        console.error("Failed to load poses:", err);
      }
    };
    fetchAllPoses();
  }, []);

  // Get cue text for a pose by matching name
  const getCueForPose = (poseName) => {
    const pose = allPoses.find((p) => p.name === poseName);
    return pose?.cue || "No cue available";
  };

  // Handle timer input changes
  const handleTimerChange = (index, value) => {
    const newTimers = [...timers];
    newTimers[index] = parseInt(value, 10) || 0;
    setTimers(newTimers);
  };

  // Save updated timers to backend
  const saveSequence = async () => {
    if (!sequence) return;
    const updatedSequence = {
      ...sequence,
      poses: sequence.poses.map((pose, idx) => ({
        ...pose,
        timer: timers[idx],
      })),
    };
    try {
      await axios.put(`${API_BASE}/api/sequences/${id}`, updatedSequence);
      alert("Timers saved!");
    } catch (err) {
      console.error("Failed to save timers:", err);
      alert("Failed to save timers. Check console for details.");
    }
  };

  // Start playing the sequence timers
  const playSequence = () => {
    setPlayingIndex(0);
    setProgress(0);
  };

  // Play progress timer effect
  useEffect(() => {
    if (playingIndex === null || !sequence) return;

    const timeInSeconds =
      units === "minutes" ? timers[playingIndex] * 60 : timers[playingIndex];
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setProgress(Math.min(100, (elapsed / timeInSeconds) * 100));

      if (elapsed >= timeInSeconds) {
        clearInterval(interval);
        if (playingIndex < sequence.poses.length - 1) {
          setPlayingIndex(playingIndex + 1);
          setProgress(0);
        } else {
          setPlayingIndex(null);
          setProgress(0);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [playingIndex, sequence, timers, units]);

  if (!sequence) {
    return <Text>Loading sequence...</Text>;
  }

  return (
    <Box bg={bg} color={text} p={5} maxW="600px" mx="auto">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {sequence.name}
      </Text>

      <Box mb={4}>
        <Select
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          width="200px"
          mb={2}
        >
          <option value="seconds">Seconds</option>
          <option value="minutes">Minutes</option>
        </Select>
        <Button onClick={saveSequence} mr={3} colorScheme="pink" disabled={playingIndex !== null}>
          Save Timers
        </Button>
        <Button onClick={playSequence} colorScheme="green" disabled={playingIndex !== null}>
          Play Sequence
        </Button>
      </Box>

      {sequence.poses.map((pose, idx) => {
        const isPlaying = idx === playingIndex;
        const imageKey = pose.image ? pose.image.replace(/\.png$/i, "") : null;

        return (
          <Flex
            key={idx}
            bg="white"
            p={4}
            mb={4}
            borderRadius="2xl"
            borderWidth="1px"
            alignItems="center"
            position="relative"
          >
            {/* Progress overlay */}
            {/* {isPlaying && (
              <Box
                position="absolute"
                top="0"
                left="0"
                height="100%"
                width={`${100 - progress}%`}
                bg="rgba(0,0,0,0.4)"
                borderRadius="2xl"
                transition="width 0.1s linear"
                zIndex={1}
              />
            )} */}{isPlaying && (
  <Box
    position="absolute"
    top="0"
    left="0"
    height="100%"
    width={`${progress}%`}
    bg="rgba(0,0,0,0.4)"
    borderRadius="2xl"
    transition="width 0.1s linear"
    zIndex={1}
  />
)}

            <Image
              src={images[imageKey] || images.MissingPhoto || null}
              alt={pose.name}
              boxSize="100px"
              objectFit="contain"
              borderRadius="md"
              mr={4}
              zIndex={2}
            />

            <Box flex="1" zIndex={2}>
              <Text fontSize="xl" fontWeight="semibold">
                {pose.name}
              </Text>
              {/* <Text
                fontSize="sm"
                color="gray.600"
                mt={1}
                whiteSpace="pre-wrap"
                userSelect="text"
              >
                {getCueForPose(pose.name)}
              </Text> */}
            </Box>

            <Box textAlign="center" minW="120px" ml={4} zIndex={2}>
              <Input
                type="number"
                value={timers[idx]}
                onChange={(e) => handleTimerChange(idx, e.target.value)}
                width="100px"
                disabled={playingIndex !== null}
                mb={1}
              />
              <Text fontSize="sm">{units}</Text>
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
};

export default SequenceDetailPage;
