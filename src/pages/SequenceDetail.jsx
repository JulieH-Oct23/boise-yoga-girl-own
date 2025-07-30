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
  const [timers, setTimers] = useState([]);
  const [units, setUnits] = useState("seconds");
  const [playingIndex, setPlayingIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [posesFull, setPosesFull] = useState([]);

  const bg = useColorModeValue("#FAEDEC", "#353325");
  const text = useColorModeValue("#353325", "#FAEDEC");

  useEffect(() => {
    const fetchSequenceAndPoses = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/sequences/${id}`);
        const seq = res.data;
        setSequence(seq);

        const initialTimers = seq.poses.map((pose) =>
          Number.isInteger(pose.timer) && pose.timer > 0 ? pose.timer : 60
        );
        setTimers(initialTimers);

        const poseIds =
          seq.poses.map((pose) => pose._id || pose.poseId || pose.id) || [];

        if (poseIds.length > 0) {
          const posesRes = await axios.get(`${API_BASE}/api/poses`, {
            params: { ids: poseIds.join(",") },
          });
          setPosesFull(posesRes.data);
        } else {
          setPosesFull([]);
        }
      } catch (err) {
        console.error("Failed to load sequence or poses:", err);
      }
    };
    fetchSequenceAndPoses();
  }, [id]);

  const currentPoseFull =
    playingIndex !== null && posesFull.length > 0 && sequence
      ? posesFull.find((p) => {
          const seqPose = sequence.poses[playingIndex];
          return (
            p._id === (seqPose._id || seqPose.poseId || seqPose.id) ||
            p.name === seqPose.name
          );
        })
      : null;

  const handleTimerChange = (index, value) => {
    const intValue = parseInt(value, 10);
    const newTimers = [...timers];
    newTimers[index] = intValue > 0 ? intValue : 60;
    setTimers(newTimers);
  };

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

  const playSequence = () => {
    setPlayingIndex(0);
    setProgress(0);
    setIsPaused(false);
    setElapsedTime(0);
  };

  const pauseSequence = () => {
    setIsPaused(true);
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };

  const resumeSequence = () => {
    setIsPaused(false);
  };

  useEffect(() => {
    if (playingIndex === null || !sequence || isPaused) return;

    const timeInSeconds =
      units === "minutes" ? timers[playingIndex] * 60 : timers[playingIndex];

    const startTime = Date.now() - elapsedTime * 1000;

    const id = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      setProgress(Math.min(100, (elapsed / timeInSeconds) * 100));

      if (elapsed >= timeInSeconds) {
        clearInterval(id);
        setElapsedTime(0);
        if (playingIndex < sequence.poses.length - 1) {
          setPlayingIndex((prev) => prev + 1);
          setProgress(0);
        } else {
          setPlayingIndex(null);
          setProgress(0);
        }
      } else {
        setElapsedTime(elapsed);
      }
    }, 100);

    setTimerId(id);

    return () => clearInterval(id);
  }, [playingIndex, sequence, timers, units, isPaused, elapsedTime]);

  if (!sequence) {
    return (
      <Box p={5} textAlign="center" color={text}>
        <Text>Loading sequence...</Text>
      </Box>
    );
  }

  return (
    <Box bg={bg} color={text} p={5} maxW="600px" mx="auto" borderRadius="md">
      <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
        {sequence.name}
      </Text>

      <Box
        mb={4}
        display="flex"
        flexWrap="wrap"
        gap={3}
        justifyContent="center"
        alignItems="center"
      >
        <Select
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          width="140px"
        >
          <option value="seconds">Seconds</option>
          <option value="minutes">Minutes</option>
        </Select>

        <Button
          onClick={saveSequence}
          colorScheme="pink"
          disabled={playingIndex !== null}
        >
          Save Timers
        </Button>

        {playingIndex === null ? (
          <Button onClick={playSequence} colorScheme="green">
            Play Sequence
          </Button>
        ) : isPaused ? (
          <Button onClick={resumeSequence} colorScheme="green">
            Resume
          </Button>
        ) : (
          <Button onClick={pauseSequence} colorScheme="yellow">
            Pause
          </Button>
        )}
      </Box>

      {/* Cue Box — Always visible */}
      <Box
        mt={2}
        mb={6}
        p={4}
        bg="white"
        borderRadius="lg"
        borderWidth="1px"
        minHeight="80px"
        textAlign="center"
        fontStyle="italic"
      >
        {playingIndex === null
          ? "Play the sequence to see pose cues here."
          : currentPoseFull?.cue
          ? currentPoseFull.cue
          : "There is no cue for this pose."}
      </Box>

      {sequence.poses.map((pose, idx) => {
        const isPlaying = idx === playingIndex;

        const imageKey = pose.image
          ? pose.image.replace(/\.(png|jpg|jpeg)$/i, "")
          : null;

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
            {isPlaying && (
              <Box
                position="absolute"
                top="0"
                left="0"
                height="100%"
                width={`${progress}%`}
                bg="rgba(0,0,0,0.3)"
                borderRadius="2xl"
                transition="width 0.1s linear"
                zIndex={1}
              />
            )}

            <Image
              src={images[imageKey] || images.MissingPhoto || ""}
              alt={pose.name || "Pose image"}
              boxSize="100px"
              objectFit="contain"
              borderRadius="md"
              mr={4}
              zIndex={2}
            />

            <Box flex="1" zIndex={2}>
              <Text fontSize="xl" fontWeight="semibold" noOfLines={1}>
                {pose.name}
              </Text>
            </Box>

            <Box textAlign="center" minW="120px" ml={4} zIndex={2}>
              <Input
                type="number"
                value={timers[idx]}
                onChange={(e) => handleTimerChange(idx, e.target.value)}
                width="100px"
                disabled={playingIndex !== null}
                mb={1}
                min={1}
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