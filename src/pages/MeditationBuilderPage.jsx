// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Flex,
//   Heading,
//   Input,
//   Textarea,
//   useColorModeValue,
//   Text,
//   IconButton,
// } from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
// import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// const MeditationBuilderPage = () => {
//   const [title, setTitle] = useState("");
//   const [cue, setCue] = useState("");
//   const [cues, setCues] = useState([]);
//   const [savedMeditations, setSavedMeditations] = useState([]);

//   const bg = useColorModeValue("#FAEDEC", "#2D2D2D");
//   const boxBg = useColorModeValue("#92636B", "#444");
//   const textColor = useColorModeValue("#353325", "#FAEDEC");

//   useEffect(() => {
//     fetchMeditations();
//   }, []);

//   const fetchMeditations = async () => {
//     try {
//       const res = await axios.get(`${API_BASE}/api/meditations`);
//       setSavedMeditations(res.data);
//     } catch (err) {
//       console.error("Error fetching meditations", err);
//     }
//   };

//   const handleAddCue = () => {
//     if (cue.trim() !== "") {
//       setCues([...cues, cue]);
//       setCue("");
//     }
//   };

//   const handleRemoveCue = (index) => {
//     const updated = [...cues];
//     updated.splice(index, 1);
//     setCues(updated);
//   };

//   const handleSubmit = async () => {
//     if (!title || cues.length === 0) return;

//     try {
//       const meditationData = {
//         title,
//         cues, // This will be an array of cue strings
//       };

//       await axios.post(`${API_BASE}/api/meditations`, meditationData);
//       setTitle("");
//       setCues([]);
//       fetchMeditations();
//     } catch (err) {
//       console.error("Error saving meditation", err);
//     }
//   };

//   return (
//     <Box p={4} bg={bg} minHeight="100vh">
//       <Heading mb={4} color={textColor}>
//         Build a Meditation
//       </Heading>

//       <Box
//         bg={boxBg}
//         p={4}
//         rounded="xl"
//         boxShadow="md"
//         color="white"
//         maxWidth="600px"
//         mb={8}
//       >
//         <Input
//           placeholder="Meditation Title"
//           mb={3}
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           bg="white"
//           color="black"
//         />
//         <Textarea
//           placeholder="Enter a cue"
//           mb={3}
//           value={cue}
//           onChange={(e) => setCue(e.target.value)}
//           bg="white"
//           color="black"
//         />
//         <Button onClick={handleAddCue} colorScheme="pink" mb={4}>
//           Add Cue
//         </Button>

//         <Box>
//           {cues.map((c, index) => (
//             <Flex
//               key={index}
//               align="center"
//               justify="space-between"
//               bg="white"
//               color="black"
//               p={2}
//               rounded="md"
//               mb={2}
//             >
//               <Text>{c}</Text>
//               <IconButton
//                 icon={<CloseIcon boxSize={2} />}
//                 size="xs"
//                 onClick={() => handleRemoveCue(index)}
//                 aria-label="Remove cue"
//               />
//             </Flex>
//           ))}
//         </Box>

//         <Button onClick={handleSubmit} colorScheme="green" mt={4}>
//           Save Meditation
//         </Button>
//       </Box>

//       <Heading size="md" mb={4} color={textColor}>
//         Saved Meditations
//       </Heading>

//       {savedMeditations.map((meditation) => (
//         <Box
//           key={meditation._id}
//           bg={boxBg}
//           p={4}
//           mb={4}
//           rounded="xl"
//           boxShadow="md"
//           color="white"
//           maxWidth="600px"
//         >
//           <Heading size="md" mb={2}>
//             {meditation.title}
//           </Heading>
//           {meditation.cues?.map((cueText, idx) => (
//             <Text key={idx} mb={1}>
//               - {cueText}
//             </Text>
//           ))}
//         </Box>
//       ))}
//     </Box>
//   );
// };

// export default MeditationBuilderPage;
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Textarea,
  useColorModeValue,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const MeditationBuilderPage = () => {
  const [title, setTitle] = useState("");
  const [cue, setCue] = useState("");
  const [cues, setCues] = useState([]);
  const [savedMeditations, setSavedMeditations] = useState([]);

  const bg = useColorModeValue("#FAEDEC", "#2D2D2D");
  const boxBg = useColorModeValue("#92636B", "#444");
  const textColor = useColorModeValue("#353325", "#FAEDEC");

  useEffect(() => {
    fetchMeditations();
  }, []);

  const fetchMeditations = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/meditations`);
      setSavedMeditations(res.data);
    } catch (err) {
      console.error("Error fetching meditations", err);
    }
  };

  const handleAddCue = () => {
    if (cue.trim() !== "") {
      setCues([...cues, cue.trim()]);
      setCue("");
    }
  };

  const handleRemoveCue = (index) => {
    const updated = [...cues];
    updated.splice(index, 1);
    setCues(updated);
  };

  const handleSubmit = async () => {
    if (!title.trim() || cues.length === 0) {
      alert("Please enter a title and at least one cue.");
      return;
    }

    try {
      const meditationData = {
        title: title.trim(),
        cue: cues.join("\n\n"), // join cues as one string with double line breaks
      };

      await axios.post(`${API_BASE}/api/meditations`, meditationData);
      setTitle("");
      setCues([]);
      fetchMeditations();
    } catch (err) {
      console.error("Error saving meditation", err);
      alert("Failed to save meditation");
    }
  };

  return (
    <Box p={4} bg={bg} minHeight="100vh">
      <Heading mb={4} color={textColor}>
        Build a Meditation
      </Heading>

      <Box
        bg={boxBg}
        p={4}
        rounded="xl"
        boxShadow="md"
        color="white"
        maxWidth="600px"
        mb={8}
      >
        <Input
          placeholder="Meditation Title"
          mb={3}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          bg="white"
          color="black"
        />
        <Textarea
          placeholder="Enter a cue"
          mb={3}
          value={cue}
          onChange={(e) => setCue(e.target.value)}
          bg="white"
          color="black"
          rows={3}
        />
        <Button onClick={handleAddCue} colorScheme="pink" mb={4}>
          Add Cue
        </Button>

        <Box>
          {cues.map((c, index) => (
            <Flex
              key={index}
              align="center"
              justify="space-between"
              bg="white"
              color="black"
              p={2}
              rounded="md"
              mb={2}
            >
              <Text>{c}</Text>
              <IconButton
                icon={<CloseIcon boxSize={2} />}
                size="xs"
                onClick={() => handleRemoveCue(index)}
                aria-label="Remove cue"
              />
            </Flex>
          ))}
        </Box>

        <Button onClick={handleSubmit} colorScheme="green" mt={4} width="100%">
          Save Meditation
        </Button>
      </Box>

      <Heading size="md" mb={4} color={textColor}>
        Saved Meditations
      </Heading>

      {savedMeditations.map((meditation) => (
        <Box
          key={meditation._id}
          bg={boxBg}
          p={4}
          mb={4}
          rounded="xl"
          boxShadow="md"
          color="white"
          maxWidth="600px"
        >
          <Heading size="md" mb={2}>
            {meditation.title}
          </Heading>
          <Text whiteSpace="pre-wrap">{meditation.cue}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default MeditationBuilderPage;