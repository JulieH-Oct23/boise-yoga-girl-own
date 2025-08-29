// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Heading,
//   Input,
//   Select,
//   SimpleGrid,
//   Text,
//   VStack,
//   HStack,
//   FormControl,
//   FormLabel,
//   Image,
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
//   CloseButton,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import axios from "axios";
// import images from "../images";
// import { useNavigate, useParams } from "react-router-dom";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// const SequenceBuilderPage = () => {
//   const { id: sequenceId } = useParams();
//   const [poses, setPoses] = useState([]);
//   const [filteredPoses, setFilteredPoses] = useState([]);
//   const [meditations, setMeditations] = useState([]);
//   const [filteredMeditations, setFilteredMeditations] = useState([]);
//   const [selectedPoses, setSelectedPoses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [meditationSearchTerm, setMeditationSearchTerm] = useState("");
//   const [sequenceName, setSequenceName] = useState("");
//   const [sequenceStyle, setSequenceStyle] = useState("Power");
//   const [sequenceLevel, setSequenceLevel] = useState("Beginner");
//   const [saveSuccess, setSaveSuccess] = useState(null);

//   const navigate = useNavigate();

//   const cardBg = useColorModeValue("#FAEDEC", "#332F27");
//   const cardTextColor = useColorModeValue("#332F27", "#FAEDEC");

//   // Fetch poses and meditations
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const posesRes = await axios.get(`${API_BASE}/api/poses`);
//         setPoses(posesRes.data);
//         setFilteredPoses(posesRes.data);

//         const medRes = await axios.get(`${API_BASE}/api/meditations`);
//         setMeditations(medRes.data);
//         setFilteredMeditations(medRes.data);
//       } catch (err) {
//         console.error("Failed to fetch poses or meditations:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   // Fetch existing sequence if editing
//   useEffect(() => {
//     if (!sequenceId) return;
//     const fetchSequence = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/api/sequences/${sequenceId}`);
//         const seq = res.data;
//         setSequenceName(seq.name);
//         setSequenceStyle(seq.style);
//         setSequenceLevel(seq.difficulty);

//         const posesWithDuration = seq.poses.map((p) => ({
//           ...p,
//           duration: p.duration?.[0] || 60,
//         }));
//         setSelectedPoses(posesWithDuration);
//       } catch (err) {
//         console.error("Failed to fetch sequence:", err);
//       }
//     };
//     fetchSequence();
//   }, [sequenceId]);

//   const handleAddPose = (pose) => {
//     const poseWithDuration = { ...pose, duration: pose.duration?.[0] || 60 };
//     setSelectedPoses([...selectedPoses, poseWithDuration]);
//   };

//   const handleRemovePose = (poseId) => {
//     setSelectedPoses(selectedPoses.filter((p) => p._id !== poseId));
//   };

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     setFilteredPoses(poses.filter((p) => p.name.toLowerCase().includes(term)));
//   };

//   const handleMeditationSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setMeditationSearchTerm(term);
//     setFilteredMeditations(
//       meditations.filter((m) => m.name.toLowerCase().includes(term))
//     );
//   };

//   const handleSaveSequence = async () => {
//     if (!sequenceName.trim()) {
//       alert("Please enter a sequence name.");
//       return;
//     }
//     if (selectedPoses.length === 0) {
//       alert("Please select at least one pose or meditation.");
//       return;
//     }

//     const posesWithDuration = selectedPoses.map((pose) => ({
//       name: pose.name,
//       image: pose.image || null,
//       duration: [pose.duration || 60],
//     }));

//     const sequenceToSave = {
//       name: sequenceName,
//       style: sequenceStyle,
//       difficulty: sequenceLevel,
//       poses: posesWithDuration,
//     };

//     try {
//       const res = await axios.post(`${API_BASE}/api/sequences`, sequenceToSave);
//       console.log("Sequence saved:", res.data);
//       setSelectedPoses([]);
//       setSequenceName("");
//       setSequenceStyle("Power");
//       setSequenceLevel("Beginner");
//       setSaveSuccess(true);
//     } catch (err) {
//       console.error("Failed to save sequence:", err);
//       alert("Failed to save sequence, check console.");
//       setSaveSuccess(false);
//     }
//   };

//   const handleSaveTimers = async () => {
//     if (!sequenceId || selectedPoses.length === 0) return;

//     const updatedSequence = {
//       name: sequenceName,
//       style: sequenceStyle,
//       difficulty: sequenceLevel,
//       poses: selectedPoses.map((p) => ({
//         ...p,
//         duration: [p.duration || 60],
//       })),
//     };

//     try {
//       await axios.put(`${API_BASE}/api/sequences/${sequenceId}`, updatedSequence);
//       alert("Timers saved successfully!");
//     } catch (err) {
//       console.error("Failed to save timers:", err);
//       alert("Failed to save timers, check console.");
//     }
//   };

//   const getImageSrc = (imageName) => {
//     if (!imageName) return images.MissingPhoto;
//     const key = imageName.replace(/\.png$/i, "");
//     return images[key] || images.MissingPhoto;
//   };

//   return (
//     <Box p={4}>
//       <Button mb={4} colorScheme="pink" onClick={() => navigate(-1)}>
//         ← Back
//       </Button>

//       <VStack spacing={4} mb={8} align="center">
//         <Box
//           bg="#BEB1AE"
//           p={6}
//           borderRadius="xl"
//           boxShadow="md"
//           w="100%"
//           maxW="960px"
//         >
//           <Heading size="lg" mb={4} textAlign="center">
//             {sequenceId ? "Edit Sequence" : "Build a New Sequence"}
//           </Heading>

//           {saveSuccess && (
//             <Alert status="success" mb={4} borderRadius="md" position="relative">
//               <AlertIcon boxSize="30px" />
//               <AlertTitle>Success!</AlertTitle>
//               <AlertDescription>
//                 Your sequence was saved successfully.
//               </AlertDescription>
//               <CloseButton
//                 position="absolute"
//                 right="8px"
//                 top="8px"
//                 onClick={() => setSaveSuccess(null)}
//               />
//             </Alert>
//           )}

//           <FormControl mb={3}>
//             <FormLabel>Sequence Name</FormLabel>
//             <Input
//               value={sequenceName}
//               onChange={(e) => setSequenceName(e.target.value)}
//               placeholder="Enter a sequence name"
//             />
//           </FormControl>

//           <FormControl mb={3}>
//             <FormLabel>Style</FormLabel>
//             <Select
//               value={sequenceStyle}
//               onChange={(e) => setSequenceStyle(e.target.value)}
//             >
//               <option value="Power">Power</option>
//               <option value="Hatha">Hatha</option>
//               <option value="Yin">Yin</option>
//               <option value="Restorative">Restorative</option>
//             </Select>
//           </FormControl>

//           <FormControl mb={3}>
//             <FormLabel>Difficulty Level</FormLabel>
//             <Select
//               value={sequenceLevel}
//               onChange={(e) => setSequenceLevel(e.target.value)}
//             >
//               <option value="Beginner">Beginner</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Advanced">Advanced</option>
//             </Select>
//           </FormControl>

//           {selectedPoses.length > 0 && (
//             <Box mt={4}>
//               <Text fontWeight="bold" mb={2}>
//                 Selected Poses & Meditations:
//               </Text>
//               <HStack wrap="wrap" spacing={3}>
//                 {selectedPoses.map((pose, index) => (
//                   <Box
//                     key={`${pose._id}-${index}`}
//                     p={2}
//                     bg={cardBg}
//                     border="1px solid #ccc"
//                     borderRadius="md"
//                     w="120px"
//                     textAlign="center"
//                     color={cardTextColor}
//                     position="relative"
//                   >
//                     <Image
//                       src={getImageSrc(pose.image)}
//                       alt={pose.name}
//                       boxSize="60px"
//                       objectFit="contain"
//                       mx="auto"
//                       borderRadius="md"
//                     />
//                     <Text fontSize="xs" mt={1} noOfLines={1}>
//                       {pose.name}
//                     </Text>
//                     <Input
//                       type="number"
//                       value={pose.duration || 60}
//                       onChange={(e) => {
//                         const newDuration = parseInt(e.target.value, 10);
//                         setSelectedPoses((prev) => {
//                           const updated = [...prev];
//                           updated[index] = { ...updated[index], duration: newDuration };
//                           return updated;
//                         });
//                       }}
//                       size="xs"
//                       mt={2}
//                       width="60px"
//                       mx="auto"
//                       textAlign="center"
//                       borderRadius="md"
//                     />
//                     <Text fontSize="xs">sec</Text>
//                     <Button
//                       size="xs"
//                       colorScheme="red"
//                       variant="ghost"
//                       onClick={() => handleRemovePose(pose._id)}
//                       position="absolute"
//                       top="2px"
//                       right="4px"
//                     >
//                       ×
//                     </Button>
//                   </Box>
//                 ))}
//               </HStack>

//               <Button
//                 mt={4}
//                 bg="#7a5758"
//                 color="white"
//                 _hover={{ bg: "#92636B" }}
//                 borderRadius="md"
//                 px={3}
//                 py={1}
//                 onClick={handleSaveSequence}
//               >
//                 {sequenceId ? "Update Sequence" : "Save Sequence"}
//               </Button>

//               {sequenceId && (
//                 <Button
//                   mt={2}
//                   size="sm"
//                   colorScheme="pink"
//                   onClick={handleSaveTimers}
//                 >
//                   Save Timers
//                 </Button>
//               )}
//             </Box>
//           )}

//           <FormControl mb={4} mt={6}>
//             <FormLabel>Search Poses</FormLabel>
//             <Input
//               placeholder="Search poses by name"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//           </FormControl>

//           <SimpleGrid columns={[2, null, 3, 4]} spacing={4} maxW="960px" mx="auto" mb={8}>
//             {filteredPoses.map((pose) => (
//               <Box
//                 key={pose._id}
//                 bg={cardBg}
//                 p={2}
//                 borderRadius="lg"
//                 boxShadow="md"
//                 textAlign="center"
//                 cursor="pointer"
//                 onClick={() => handleAddPose(pose)}
//                 color={cardTextColor}
//               >
//                 <Image
//                   src={getImageSrc(pose.image)}
//                   alt={pose.name}
//                   boxSize="100px"
//                   objectFit="contain"
//                   mx="auto"
//                   borderRadius="md"
//                 />
//                 <Text mt={2} fontSize="sm" noOfLines={1}>
//                   {pose.name}
//                 </Text>
//               </Box>
//             ))}
//           </SimpleGrid>

//           <FormControl mb={4}>
//             <FormLabel>Click on Meditations to Add to Sequence</FormLabel>
//             <Input
//               placeholder="Search meditations by name"
//               value={meditationSearchTerm}
//               onChange={handleMeditationSearch}
//             />
//           </FormControl>

//           <SimpleGrid columns={[2, null, 3, 4]} spacing={4} maxW="960px" mx="auto" mb={8}>
//             {filteredMeditations.map((med) => (
//               <Box
//                 key={med._id}
//                 bg={cardBg}
//                 p={2}
//                 borderRadius="lg"
//                 boxShadow="md"
//                 textAlign="center"
//                 cursor="pointer"
//                 onClick={() => handleAddPose(med)}
//                 color={cardTextColor}
//               >
//                 <Image
//                   src={images.MeditationIcon || images.MissingPhoto}
//                   alt={med.name}
//                   boxSize="100px"
//                   objectFit="contain"
//                   mx="auto"
//                   borderRadius="md"
//                 />
//                 <Text mt={2} fontSize="sm" noOfLines={1}>
//                   {med.name}
//                 </Text>
//               </Box>
//             ))}
//           </SimpleGrid>
//         </Box>
//       </VStack>
//     </Box>
//   );
// };

// export default SequenceBuilderPage;

// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Heading,
//   Input,
//   Select,
//   SimpleGrid,
//   Text,
//   VStack,
//   HStack,
//   FormControl,
//   FormLabel,
//   Image,
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
//   CloseButton,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import axios from "axios";
// import images from "../images";
// import { useNavigate, useParams } from "react-router-dom";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// const SequenceBuilderPage = () => {
//   const { id: sequenceId } = useParams(); // For editing existing sequences
//   const navigate = useNavigate();

//   const [poses, setPoses] = useState([]);
//   const [filteredPoses, setFilteredPoses] = useState([]);
//   const [meditations, setMeditations] = useState([]);
//   const [filteredMeditations, setFilteredMeditations] = useState([]);
//   const [selectedPoses, setSelectedPoses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [meditationSearchTerm, setMeditationSearchTerm] = useState("");
//   const [sequenceName, setSequenceName] = useState("");
//   const [sequenceStyle, setSequenceStyle] = useState("Power");
//   const [sequenceLevel, setSequenceLevel] = useState("Beginner");
//   const [saveSuccess, setSaveSuccess] = useState(null);

//   const cardBg = useColorModeValue("#FAEDEC", "#332F27");
//   const cardTextColor = useColorModeValue("#332F27", "#FAEDEC");

//   // Fetch all poses and meditations
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [posesRes, medRes] = await Promise.all([
//           axios.get(`${API_BASE}/api/poses`),
//           axios.get(`${API_BASE}/api/meditations`)
//         ]);

//         // Ensure each pose/meditation has duration array
//         const posesWithDuration = posesRes.data.map(p => ({
//           ...p,
//           duration: Array.isArray(p.duration) && p.duration.length ? p.duration : [60]
//         }));

//         const medWithDuration = medRes.data.map(m => ({
//           ...m,
//           duration: Array.isArray(m.duration) && m.duration.length ? m.duration : [60]
//         }));

//         setPoses(posesWithDuration);
//         setFilteredPoses(posesWithDuration);
//         setMeditations(medWithDuration);
//         setFilteredMeditations(medWithDuration);
//       } catch (err) {
//         console.error("Failed to fetch poses/meditations:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   // Fetch existing sequence for editing
//   useEffect(() => {
//     if (!sequenceId) return;
//     const fetchSequence = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/api/sequences/${sequenceId}`);
//         const seq = res.data;
//         setSequenceName(seq.name);
//         setSequenceStyle(seq.style);
//         setSequenceLevel(seq.difficulty);

//         // Ensure all poses have duration array
//         const posesWithDuration = seq.poses.map(p => ({
//           ...p,
//           duration: Array.isArray(p.duration) && p.duration.length ? p.duration : [60]
//         }));
//         setSelectedPoses(posesWithDuration);
//       } catch (err) {
//         console.error("Failed to fetch sequence:", err);
//       }
//     };
//     fetchSequence();
//   }, [sequenceId]);

//   // Add pose or meditation to selectedPoses
//   const handleAddPose = (pose) => {
//     const poseWithDuration = {
//       ...pose,
//       duration: Array.isArray(pose.duration) && pose.duration.length ? pose.duration : [60]
//     };
//     setSelectedPoses([...selectedPoses, poseWithDuration]);
//   };

//   const handleRemovePose = (poseId) => {
//     setSelectedPoses(selectedPoses.filter((pose, index) => index !== poseId));
//   };

//   // Filter handlers
//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     setFilteredPoses(poses.filter((p) => p.name.toLowerCase().includes(term)));
//   };

//   const handleMeditationSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setMeditationSearchTerm(term);
//     setFilteredMeditations(
//       meditations.filter((m) => m.name.toLowerCase().includes(term))
//     );
//   };

//   // Save new sequence
//   const handleSaveSequence = async () => {
//     if (!sequenceName.trim()) {
//       alert("Please enter a sequence name.");
//       return;
//     }
//     if (selectedPoses.length === 0) {
//       alert("Please select at least one pose or meditation.");
//       return;
//     }

//     const posesWithDuration = selectedPoses.map(p => ({
//       name: p.name,
//       image: p.image || null,
//       duration: Array.isArray(p.duration) && p.duration.length ? p.duration : [60]
//     }));

//     const sequenceToSave = {
//       name: sequenceName,
//       style: sequenceStyle,
//       difficulty: sequenceLevel,
//       poses: posesWithDuration
//     };

//     try {
//       const res = await axios.post(`${API_BASE}/api/sequences`, sequenceToSave);
//       console.log("Sequence saved:", res.data);

//       // Reset builder
//       setSelectedPoses([]);
//       setSequenceName("");
//       setSequenceStyle("Power");
//       setSequenceLevel("Beginner");
//       setSaveSuccess(true);
//     } catch (err) {
//       console.error("Failed to save sequence:", err);
//       alert("Failed to save sequence, check console.");
//       setSaveSuccess(false);
//     }
//   };

//   // Save timers for existing sequence
//   const handleSaveTimers = async () => {
//     if (!sequenceId || selectedPoses.length === 0) return;

//     const updatedSequence = {
//       name: sequenceName,
//       style: sequenceStyle,
//       difficulty: sequenceLevel,
//       poses: selectedPoses.map(p => ({
//         ...p,
//         duration: Array.isArray(p.duration) && p.duration.length ? p.duration : [60]
//       }))
//     };

//     try {
//       await axios.put(`${API_BASE}/api/sequences/${sequenceId}`, updatedSequence);
//       alert("Timers saved successfully!");
//     } catch (err) {
//       console.error("Failed to save timers:", err);
//       alert("Failed to save timers, check console.");
//     }
//   };

//   const getImageSrc = (imageName) => {
//     if (!imageName) return images.MissingPhoto;
//     const key = imageName.replace(/\.png$/i, "");
//     return images[key] || images.MissingPhoto;
//   };

//   return (
//     <Box p={4}>
//       <Button mb={4} colorScheme="pink" onClick={() => navigate(-1)}>
//         ← Back
//       </Button>

//       <VStack spacing={4} mb={8} align="center">
//         <Box
//           bg="#BEB1AE"
//           p={6}
//           borderRadius="xl"
//           boxShadow="md"
//           w="100%"
//           maxW="960px"
//         >
//           <Heading size="lg" mb={4} textAlign="center">
//             Build a New Sequence
//           </Heading>

//           {saveSuccess && (
//             <Alert status="success" mb={4} borderRadius="md" position="relative">
//               <AlertIcon boxSize="30px" />
//               <AlertTitle>Success!</AlertTitle>
//               <AlertDescription>
//                 Your sequence was saved!
//               </AlertDescription>
//               <CloseButton
//                 position="absolute"
//                 right="8px"
//                 top="8px"
//                 onClick={() => setSaveSuccess(null)}
//               />
//             </Alert>
//           )}

//           <FormControl mb={3}>
//             <FormLabel>Sequence Name</FormLabel>
//             <Input
//               value={sequenceName}
//               onChange={(e) => setSequenceName(e.target.value)}
//               placeholder="Enter a sequence name"
//             />
//           </FormControl>

//           <FormControl mb={3}>
//             <FormLabel>Style</FormLabel>
//             <Select
//               value={sequenceStyle}
//               onChange={(e) => setSequenceStyle(e.target.value)}
//             >
//               <option value="Power">Power</option>
//               <option value="Hatha">Hatha</option>
//               <option value="Yin">Yin</option>
//               <option value="Restorative">Restorative</option>
//             </Select>
//           </FormControl>

//           <FormControl mb={3}>
//             <FormLabel>Difficulty Level</FormLabel>
//             <Select
//               value={sequenceLevel}
//               onChange={(e) => setSequenceLevel(e.target.value)}
//             >
//               <option value="Beginner">Beginner</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Advanced">Advanced</option>
//             </Select>
//           </FormControl>

//           {selectedPoses.length > 0 && (
//             <Box mt={4}>
//               <Text fontWeight="bold" mb={2}>
//                 Selected Poses & Meditations:
//               </Text>
//               <HStack wrap="wrap" spacing={3}>
//                 {selectedPoses.map((pose, index) => (
//                   <Box
//                     key={`${pose._id}-${index}`}
//                     p={2}
//                     bg={cardBg}
//                     border="1px solid #ccc"
//                     borderRadius="md"
//                     w="120px"
//                     textAlign="center"
//                     position="relative"
//                     color={cardTextColor}
//                   >
//                     <Image
//                       src={getImageSrc(pose.image)}
//                       alt={pose.name}
//                       boxSize="60px"
//                       objectFit="contain"
//                       borderRadius="md"
//                       mx="auto"
//                     />
//                     <Text fontSize="xs" mt={1} noOfLines={1}>
//                       {pose.name}
//                     </Text>

//                     <Input
//                       type="number"
//                       value={pose.duration[0] || 60}
//                       onChange={(e) => {
//                         const newDuration = parseInt(e.target.value, 10);
//                         setSelectedPoses((prev) => {
//                           const updated = [...prev];
//                           updated[index] = { ...updated[index], duration: [newDuration] };
//                           return updated;
//                         });
//                       }}
//                       size="xs"
//                       mt={2}
//                       width="60px"
//                       mx="auto"
//                       textAlign="center"
//                       borderRadius="md"
//                     />
//                     <Text fontSize="xs">sec</Text>

//                     <Button
//                       size="xs"
//                       colorScheme="red"
//                       variant="ghost"
//                       onClick={() => handleRemovePose(index)}
//                       position="absolute"
//                       top="2px"
//                       right="4px"
//                     >
//                       ×
//                     </Button>
//                   </Box>
//                 ))}
//               </HStack>

//               <Button
//                 mt={4}
//                 bg="#7a5758"
//                 color="white"
//                 _hover={{ bg: "#92636B" }}
//                 borderRadius="md"
//                 px={3}
//                 py={1}
//                 onClick={handleSaveSequence}
//               >
//                 Save Sequence
//               </Button>

//               {sequenceId && (
//                 <Button
//                   mt={2}
//                   size="sm"
//                   colorScheme="pink"
//                   onClick={handleSaveTimers}
//                 >
//                   Save Timers
//                 </Button>
//               )}
//             </Box>
//           )}

//           {/* Pose search */}
//           <FormControl mb={4} mt={6}>
//             <FormLabel>Search Poses</FormLabel>
//             <Input
//               placeholder="Search poses by name"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//           </FormControl>

//           <SimpleGrid columns={[2, null, 3, 4]} spacing={4} maxW="960px" mx="auto" mb={8}>
//             {filteredPoses.map((pose) => (
//               <Box
//                 key={pose._id}
//                 bg={cardBg}
//                 p={2}
//                 borderRadius="lg"
//                 boxShadow="md"
//                 textAlign="center"
//                 cursor="pointer"
//                 onClick={() => handleAddPose(pose)}
//                 color={cardTextColor}
//               >
//                 <Image
//                   src={getImageSrc(pose.image)}
//                   alt={pose.name}
//                   boxSize="100px"
//                   objectFit="contain"
//                   mx="auto"
//                   borderRadius="md"
//                 />
//                 <Text mt={2} fontSize="sm" noOfLines={1}>
//                   {pose.name}
//                 </Text>
//               </Box>
//             ))}
//           </SimpleGrid>

//           {/* Meditation search */}
//           <FormControl mb={4}>
//             <FormLabel>Click on Meditations to Add to Sequence</FormLabel>
//             <Input
//               placeholder="Search meditations by name"
//               value={meditationSearchTerm}
//               onChange={handleMeditationSearch}
//             />
//           </FormControl>

//           <SimpleGrid columns={[2, null, 3, 4]} spacing={4} maxW="960px" mx="auto" mb={8}>
//             {filteredMeditations.map((med) => (
//               <Box
//                 key={med._id}
//                 bg={cardBg}
//                 p={2}
//                 borderRadius="lg"
//                 boxShadow="md"
//                 textAlign="center"
//                 cursor="pointer"
//                 onClick={() => handleAddPose(med)}
//                 color={cardTextColor}
//               >
//                 <Image
//                   src={images.MeditationIcon || images.MissingPhoto}
//                   alt={med.name}
//                   boxSize="100px"
//                   objectFit="contain"
//                   mx="auto"
//                   borderRadius="md"
//                 />
//                 <Text mt={2} fontSize="sm" noOfLines={1}>
//                   {med.name}
//                 </Text>
//               </Box>
//             ))}
//           </SimpleGrid>
//         </Box>
//       </VStack>
//     </Box>
//   );
// };

// export default SequenceBuilderPage;

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
import { useNavigate, useParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const SequenceBuilderPage = () => {
  const { id: sequenceId } = useParams();
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
  const [saveSuccess, setSaveSuccess] = useState(null);

  const navigate = useNavigate();
  const cardBg = useColorModeValue("#FAEDEC", "#332F27");
  const cardTextColor = useColorModeValue("#332F27", "#FAEDEC");

  // Fetch poses and meditations
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

  // Load existing sequence for editing
  useEffect(() => {
    if (!sequenceId) return;
    const fetchSequence = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/sequences/${sequenceId}`);
        const seq = res.data;
        setSequenceName(seq.name);
        setSequenceStyle(seq.style);
        setSequenceLevel(seq.difficulty);
        const posesWithDuration = seq.poses.map((p) => ({
          ...p,
          duration: Array.isArray(p.duration) && p.duration.length ? p.duration : [60],
        }));
        setSelectedPoses(posesWithDuration);
      } catch (err) {
        console.error("Failed to fetch sequence:", err);
      }
    };
    fetchSequence();
  }, [sequenceId]);

  const handleAddPose = (pose) => {
    const poseWithDuration = {
      ...pose,
      duration: Array.isArray(pose.duration) && pose.duration.length ? pose.duration : [60],
    };
    setSelectedPoses([...selectedPoses, poseWithDuration]);
  };

  const handleRemovePose = (poseIndex) => {
    setSelectedPoses(selectedPoses.filter((_, idx) => idx !== poseIndex));
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredPoses(poses.filter((p) => p.name.toLowerCase().includes(term)));
  };

  const handleMeditationSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setMeditationSearchTerm(term);
    setFilteredMeditations(
      meditations.filter((m) => m.name.toLowerCase().includes(term))
    );
  };

  // Save new sequence
  const handleSaveSequence = async () => {
    if (!sequenceName.trim()) {
      alert("Please enter a sequence name.");
      return;
    }
    if (selectedPoses.length === 0) {
      alert("Please select at least one pose or meditation.");
      return;
    }

    const posesWithDuration = selectedPoses.map((pose) => ({
      name: pose.name,
      image: pose.image || null,
      duration: Array.isArray(pose.duration) && pose.duration.length
        ? pose.duration
        : [60],
    }));

    const sequenceToSave = {
      name: sequenceName,
      style: sequenceStyle,
      difficulty: sequenceLevel,
      poses: posesWithDuration,
    };

    try {
      const res = await axios.post(`${API_BASE}/api/sequences`, sequenceToSave);
      console.log("Sequence saved:", res.data);
      setSelectedPoses([]);
      setSequenceName("");
      setSequenceStyle("Power");
      setSequenceLevel("Beginner");
      setSaveSuccess(true);
    } catch (err) {
      console.error("Failed to save sequence:", err);
      alert("Failed to save sequence, check console.");
      setSaveSuccess(false);
    }
  };

  // Save timers for existing sequence
  const handleSaveTimers = async () => {
    if (!sequenceId || selectedPoses.length === 0) return;

    const updatedSequence = {
      name: sequenceName,
      style: sequenceStyle,
      difficulty: sequenceLevel,
      poses: selectedPoses.map((p) => ({
        ...p,
        duration: Array.isArray(p.duration) && p.duration.length ? p.duration : [60],
      })),
    };

    try {
      const res = await axios.put(`${API_BASE}/api/sequences/${sequenceId}`, updatedSequence);
      console.log("Timers updated:", res.data);
      alert("Timers saved successfully!");
    } catch (err) {
      console.error("Failed to save timers:", err);
      alert("Failed to save timers, check console.");
    }
  };

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
                Your sequence was saved successfully.
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
              <option value="Hatha">Hatha</option>
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
                    key={`${pose._id || index}-${index}`}
                    p={2}
                    bg={cardBg}
                    border="1px solid #ccc"
                    borderRadius="md"
                    w="120px"
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
                    <Input
                      type="number"
                      value={pose.duration?.[0] || 60}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10) || 60;
                        setSelectedPoses((prev) => {
                          const updated = [...prev];
                          updated[index] = { ...updated[index], duration: [val] };
                          return updated;
                        });
                      }}
                      size="xs"
                      mt={2}
                      width="60px"
                      mx="auto"
                      textAlign="center"
                      borderRadius="md"
                    />
                    <Text fontSize="xs">sec</Text>

                    <Button
                      size="xs"
                      colorScheme="red"
                      variant="ghost"
                      onClick={() => handleRemovePose(index)}
                      position="absolute"
                      top="2px"
                      right="4px"
                    >
                      ×
                    </Button>
                  </Box>
                ))}
              </HStack>

              <Button
                mt={4}
                bg="#7a5758"
                color="white"
                _hover={{ bg: "#92636B" }}
                borderRadius="md"
                px={3}
                py={1}
                onClick={handleSaveSequence}
              >
                Save Sequence
              </Button>

              {sequenceId && (
                <Button mt={2} size="sm" colorScheme="pink" onClick={handleSaveTimers}>
                  Save Timers
                </Button>
              )}
            </Box>
          )}

          {/* Pose search */}
          <FormControl mb={4} mt={6}>
            <FormLabel>Search Poses</FormLabel>
            <Input
              placeholder="Search poses by name"
              value={searchTerm}
              onChange={handleSearch}
            />
          </FormControl>

          <SimpleGrid columns={[2, 3, 4]} spacing={3}>
            {filteredPoses.map((pose, idx) => (
              <Box
                key={idx}
                p={2}
                bg={cardBg}
                border="1px solid #ccc"
                borderRadius="md"
                textAlign="center"
                cursor="pointer"
                _hover={{ transform: "scale(1.05)", boxShadow: "md" }}
                onClick={() => handleAddPose(pose)}
              >
                <Image
                  src={getImageSrc(pose.image)}
                  alt={pose.name}
                  boxSize="60px"
                  objectFit="contain"
                  mx="auto"
                  mb={1}
                />
                <Text fontSize="sm" noOfLines={1}>{pose.name}</Text>
              </Box>
            ))}
          </SimpleGrid>

          {/* Meditation search */}
          <FormControl mb={4} mt={6}>
            <FormLabel>Search Meditations</FormLabel>
            <Input
              placeholder="Search meditations by name"
              value={meditationSearchTerm}
              onChange={handleMeditationSearch}
            />
          </FormControl>

          <SimpleGrid columns={[2, 3, 4]} spacing={3}>
            {filteredMeditations.map((med, idx) => (
              <Box
                key={idx}
                p={2}
                bg={cardBg}
                border="1px solid #ccc"
                borderRadius="md"
                textAlign="center"
                cursor="pointer"
                _hover={{ transform: "scale(1.05)", boxShadow: "md" }}
                onClick={() => handleAddPose(med)}
              >
                <Image
                  src={getImageSrc(med.image)}
                  alt={med.name}
                  boxSize="60px"
                  objectFit="contain"
                  mx="auto"
                  mb={1}
                />
                <Text fontSize="sm" noOfLines={1}>{med.name}</Text>
              </Box>
            ))}
          </SimpleGrid>

        </Box>
      </VStack>
    </Box>
  );
};

export default SequenceBuilderPage;