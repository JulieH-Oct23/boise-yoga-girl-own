// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Heading,
//   Input,
//   Textarea,
//   VStack,
//   FormControl,
//   FormLabel,
//   Select,
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
//   CloseButton,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// const MeditationBuilderPage = () => {
//   const [name, setName] = useState("");
//   const [text, setText] = useState("");
//   const [category, setCategory] = useState("");
//   const [saveSuccess, setSaveSuccess] = useState(false);
//   const [saveError, setSaveError] = useState(false);
//   const navigate = useNavigate();

//   const cardBg = useColorModeValue("#FAEDEC", "#353325");
//   const cardTextColor = useColorModeValue("#353325", "#FAEDEC");

//   const handleSaveMeditation = async () => {
//     if (!name.trim() || !text.trim() || !category) {
//       alert("Please enter a name, meditation text, and select a category.");
//       return;
//     }

//     try {
//       await axios.post(`${API_BASE}/api/meditations`, { name, text, category });
//       setSaveSuccess(true);
//       setSaveError(false);
//       setName("");
//       setText("");
//       setCategory("");
//     } catch (err) {
//       console.error("Failed to save meditation:", err);
//       setSaveSuccess(false);
//       setSaveError(true);
//     }
//   };

//   return (
//     <Box p={4}>
//       <Button mb={4} colorScheme="pink" onClick={() => navigate(-1)}>
//         ← Back
//       </Button>

//       <VStack spacing={4} align="center">
//         <Box
//           bg="#BEB1AE"
//           color={cardTextColor}
//           p={6}
//           borderRadius="xl"
//           boxShadow="md"
//           w="100%"
//           maxW="800px"
//         >
//           <Heading size="lg" mb={4} textAlign="center">
//             Create a New Meditation
//           </Heading>

//           {saveSuccess && (
//             <Alert status="success" mb={4} borderRadius="md" position="relative">
//               <AlertIcon boxSize="20px" />
//               <AlertTitle> Success!</AlertTitle>
//               <AlertDescription>Your meditation has been saved.</AlertDescription>
//               <CloseButton
//                 position="absolute"
//                 right="8px"
//                 top="8px"
//                 onClick={() => setSaveSuccess(false)}
//               />
//             </Alert>
//           )}

//           {saveError && (
//             <Alert status="error" mb={4} borderRadius="md" position="relative">
//               <AlertIcon boxSize="20px" />
//               <AlertTitle> Error!</AlertTitle>
//               <AlertDescription>Failed to save meditation.</AlertDescription>
//               <CloseButton
//                 position="absolute"
//                 right="8px"
//                 top="8px"
//                 onClick={() => setSaveError(false)}
//               />
//             </Alert>
//           )}

//           <FormControl mb={4}>
//             <FormLabel>Meditation Name</FormLabel>
//             <Input
//               placeholder="Enter meditation name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </FormControl>

//           <FormControl mb={4}>
//             <FormLabel>Category</FormLabel>
//             <Select
//               placeholder="Select category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               bg="#FAEDEC"
//               color="#353325"
//             >
//               <option value="Body">Body</option>
//               <option value="Mind">Mind</option>
//               <option value="Heart">Heart</option>
//               <option value="Breath">Breath</option>
//             </Select>
//           </FormControl>

//           <FormControl mb={6}>
//             <FormLabel>Meditation Text</FormLabel>
//             <Textarea
//               placeholder="Write the meditation script here..."
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               rows={10}
//             />
//           </FormControl>

//           <Button colorScheme="pink" onClick={handleSaveMeditation}>
//             Save Meditation
//           </Button>
//         </Box>
//       </VStack>
//     </Box>
//   );
// };

// export default MeditationBuilderPage;
import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

const MeditationBuilderPage = () => {
  const [meditation, setMeditation] = useState({
    title: "",
    type: "",
    difficulty: "",
    description: "",
  });

  const handleChange = (e) => {
    setMeditation({ ...meditation, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Meditation Saved:", meditation);
    // You could add axios POST here
  };

  const bgColor = useColorModeValue("#FAEDEC", "#BEB1AE");
  const inputBg = useColorModeValue("white", "white");
  const inputColor = useColorModeValue("black", "black");

  return (
    <Box
      maxW="600px"
      mx="auto"
      mt={8}
      p={6}
      borderRadius="lg"
      bg={bgColor}
      boxShadow="md"
    >
      <Heading
        as="h2"
        size="lg"
        mb={6}
        textAlign="center"
        color={useColorModeValue("#353325", "#FAEDEC")}
      >
        Build a New Meditation
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel color={useColorModeValue("#353325", "#FAEDEC")}>
            Title
          </FormLabel>
          <Input
            name="title"
            value={meditation.title}
            onChange={handleChange}
            bg={inputBg}
            color={inputColor}
          />
        </FormControl>

        <FormControl mb={4}>
          <FormLabel color={useColorModeValue("#353325", "#FAEDEC")}>
            Type
          </FormLabel>
          <Select
            name="type"
            value={meditation.type}
            onChange={handleChange}
            bg={inputBg}
            color={inputColor}
          >
            <option value="">Select Type</option>
            <option value="Mindfulness">Mindfulness</option>
            <option value="Body Scan">Body Scan</option>
            <option value="Loving-Kindness">Loving-Kindness</option>
            <option value="Visualization">Visualization</option>
          </Select>
        </FormControl>

        <FormControl mb={4}>
          <FormLabel color={useColorModeValue("#353325", "#FAEDEC")}>
            Difficulty
          </FormLabel>
          <Select
            name="difficulty"
            value={meditation.difficulty}
            onChange={handleChange}
            bg={inputBg}
            color={inputColor}
          >
            <option value="">Select Difficulty</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </Select>
        </FormControl>

        <FormControl mb={6}>
          <FormLabel color={useColorModeValue("#353325", "#FAEDEC")}>
            Description
          </FormLabel>
          <Textarea
            name="description"
            value={meditation.description}
            onChange={handleChange}
            bg={inputBg}
            color={inputColor}
            rows={6}
            resize="vertical"
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="pink"
          bg="#92636B"
          color="white"
          borderRadius="xl"
          px={6}
          py={2}
          _hover={{ bg: "#7f4e57" }}
          width="100%"
        >
          Save Meditation
        </Button>
      </form>
    </Box>
  );
};

export default MeditationBuilderPage;