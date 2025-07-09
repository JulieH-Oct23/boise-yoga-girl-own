// import {
//   Box,
//   Heading,
//   SimpleGrid,
//   Spinner,
//   Text,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PoseCard from "../components/PoseCard";
// import images from "../images";

// const YinYogaPage = () => {
//   const [poses, setPoses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const headingColor = useColorModeValue(
//     "brand.light.mainTitleText",
//     "brand.dark.mainTitleText"
//   );
//   const spinnerColor = useColorModeValue(
//     "brand.light.poseCardTitle",
//     "brand.dark.poseCardTitle"
//   );
//   const loadingTextColor = useColorModeValue(
//     "brand.light.muted",
//     "brand.dark.muted"
//   );

//   const yinHipsPoses = [
//     "Butterfly",
//     "Half Butterfly",
//     "Double Pigeon",
//     "Sleeping Swan",
//     "Dragon",
//     "Frog",
//     "Reclined Twist",
//     "Happy Baby",
//     "Savasana",
//   ];

//   const getImageKey = (photoName) =>
//     photoName?.replace(/\s+/g, "").replace(/-/g, "").replace(/'/g, "");

//   useEffect(() => {
//     fetch("http://localhost:4000/api/poses")
//       .then((res) => res.json())
//       .then((data) => {
//         const enriched = data.map((pose) => {
//           const imageKey = getImageKey(pose.photoName);
//           return {
//             ...pose,
//             image: images[imageKey] || null,
//           };
//         });

//         const ordered = yinHipsPoses
//           .map((name) => enriched.find((pose) => pose.name === name))
//           .filter(Boolean);

//         setPoses(ordered);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching poses:", err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <Box px={{ base: 4, sm: 6, md: 8 }} py={6}>
//       <Heading color={headingColor} mb={4}>
//         Yin Yoga – Hip Opening Sequence
//       </Heading>

//       {loading ? (
//         <Box textAlign="center" mt={10}>
//           <Spinner size="xl" color={spinnerColor} />
//           <Text color={loadingTextColor} mt={4}>
//             Loading poses...
//           </Text>
//         </Box>
//       ) : (
//         <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6} pb={10}>
//           {poses.map((pose) => (
//             <PoseCard
//               key={pose._id}
//               _id={pose._id}
//               name={pose.name}
//               image={pose.image}
//               category={pose.category}
//               description={pose.cue}
//               onClick={() => navigate(`/pose/${pose._id}`)}
//             />
//           ))}
//         </SimpleGrid>
//       )}
//     </Box>
//   );
// };

// export default YinYogaPage;

// import { ChevronDownIcon } from "@chakra-ui/icons";
// import {
//   Box,
//   Heading,
//   Select,
//   SimpleGrid,
//   Spinner,
//   Text,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { useEffect, useMemo, useState } from "react";
// import PoseCard from "../components/PoseCard";
// import images from "../images";
// import { useNavigate } from "react-router-dom";

// const YinYogaPage = () => {
//   const [poses, setPoses] = useState([]);
//   const [filteredPoses, setFilteredPoses] = useState([]);
//   const [filterKey, setFilterKey] = useState("level");
//   const [filterValue, setFilterValue] = useState("");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const headingColor = useColorModeValue(
//     "brand.light.mainTitleText",
//     "brand.dark.mainTitleText"
//   );
//   const spinnerColor = useColorModeValue(
//     "brand.light.poseCardTitle",
//     "brand.dark.poseCardTitle"
//   );
//   const loadingTextColor = useColorModeValue(
//     "brand.light.muted",
//     "brand.dark.muted"
//   );
//   const filterBg = "#94626D";
//   const filterText = "#FBE3D2";

//   const getImageKey = (photoName) =>
//     photoName?.replace(/\s+/g, "").replace(/-/g, "").replace(/'/g, "");

//   useEffect(() => {
//     fetch("http://localhost:4000/api/poses")
//       .then((res) => res.json())
//       .then((data) => {
//         const enriched = data.map((pose) => {
//           const imageKey = getImageKey(pose.photoName);
//           return {
//             ...pose,
//             image: images[imageKey] || null,
//           };
//         });

//         const yinPoses = enriched.filter((pose) =>
//           (pose.category || []).includes("Yin")
//         );

//         setPoses(yinPoses);
//         setFilteredPoses(yinPoses);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching poses:", err);
//         setLoading(false);
//       });
//   }, []);

//   const filterOptions = useMemo(() => {
//     if (!poses.length) return [];

//     if (["indications", "counterIndications", "anatomy"].includes(filterKey)) {
//       const values = poses.flatMap((pose) => pose[filterKey] || []);
//       return [...new Set(values)].filter(Boolean);
//     }

//     return [...new Set(poses.map((pose) => pose[filterKey]).filter(Boolean))];
//   }, [poses, filterKey]);

//   useEffect(() => {
//     if (!filterValue) {
//       setFilteredPoses(poses);
//     } else {
//       setFilteredPoses(
//         poses.filter((pose) => {
//           const value = pose[filterKey];
//           if (Array.isArray(value)) {
//             return value.some((v) =>
//               v.toLowerCase().includes(filterValue.toLowerCase())
//             );
//           }
//           return (
//             typeof value === "string" &&
//             value.toLowerCase().includes(filterValue.toLowerCase())
//           );
//         })
//       );
//     }
//   }, [filterValue, filterKey, poses]);

//   return (
//     <Box p={6}>
//       <Heading color={headingColor} mb={4}>
//         Yin Yoga – Hip Opening Sequence
//       </Heading>

//       <Box display="flex" gap={4} mb={6} flexWrap="wrap">
//         <Select
//           placeholder="Filter by..."
//           value={filterKey}
//           onChange={(e) => {
//             setFilterKey(e.target.value);
//             setFilterValue("");
//           }}
//           bg={filterBg}
//           color={filterText}
//           borderColor={filterBg}
//           borderRadius="md"
//           _hover={{ bg: filterBg }}
//           _focus={{ borderColor: filterText }}
//           icon={<ChevronDownIcon />}
//         >
//           <option value="level">Level</option>
//           <option value="anatomy">Anatomy</option>
//           <option value="indications">Indications</option>
//           <option value="counterIndications">Counter Indications</option>
//         </Select>

//         <Select
//           placeholder="Choose value"
//           value={filterValue}
//           onChange={(e) => setFilterValue(e.target.value)}
//           bg={filterBg}
//           color={filterText}
//           borderColor={filterBg}
//           borderRadius="md"
//           _hover={{ bg: filterBg }}
//           _focus={{ borderColor: filterText }}
//           icon={<ChevronDownIcon />}
//         >
//           {filterOptions.map((val, i) => (
//             <option key={i} value={val}>
//               {val}
//             </option>
//           ))}
//         </Select>
//       </Box>

//       {loading ? (
//         <Box textAlign="center">
//           <Spinner size="xl" color={spinnerColor} />
//           <Text color={loadingTextColor} mt={4}>
//             Loading poses...
//           </Text>
//         </Box>
//       ) : (
//         <SimpleGrid
//           columns={{ base: 1, sm: 2, md: 3 }}
//           spacing={6}
//           px={{ base: 4, sm: 6, md: 8 }}
//           pb={10}
//         >
//           {filteredPoses.map((pose) => (
//             <PoseCard
//               key={pose._id}
//               _id={pose._id}
//               name={pose.name}
//               image={pose.image}
//               category={pose.category}
//               description={pose.cue}
//               onClick={() => navigate(`/pose/${pose._id}`)}
//             />
//           ))}
//         </SimpleGrid>
//       )}
//     </Box>
//   );
// };

// export default YinYogaPage;

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  Select,
  Flex,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import PoseCard from "../components/PoseCard";

const AllPosesPage = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [filterCategory, setFilterCategory] = useState("");
  const [filterAnatomy, setFilterAnatomy] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterIndications, setFilterIndications] = useState("");
  const [filterCounterIndications, setFilterCounterIndications] = useState("");

  const bg = useColorModeValue("brand.light.surface", "brand.dark.surface");
  const textColor = useColorModeValue("brand.light.text", "brand.dark.text");

  useEffect(() => {
    async function fetchPoses() {
      try {
        const res = await fetch("http://localhost:4000/api/poses");
        const data = await res.json();
        setPoses(data);
      } catch (error) {
        console.error("Failed to fetch poses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPoses();
  }, []);

  // Extract unique values for dropdowns
  const getUniqueValues = (key) => {
    return Array.from(
      new Set(
        poses.flatMap((pose) => {
          const val = pose[key];
          if (Array.isArray(val)) return val;
          if (typeof val === "string" && key === "anatomy") return val.split(",").map((s) => s.trim());
          return val ? [val] : [];
        })
      )
    ).filter(Boolean).sort();
  };

  const categories = getUniqueValues("category");
  const anatomies = getUniqueValues("anatomy");
  const levels = getUniqueValues("level");
  const indications = getUniqueValues("indications");
  const counterIndications = getUniqueValues("counterIndications");

  const filteredPoses = poses.filter((pose) => {
    const anatomyArray = typeof pose.anatomy === "string"
      ? pose.anatomy.split(",").map((s) => s.trim())
      : pose.anatomy || [];

    return (
      (!filterCategory || pose.category.includes(filterCategory)) &&
      (!filterAnatomy || anatomyArray.includes(filterAnatomy)) &&
      (!filterLevel || pose.level === filterLevel) &&
      (!filterIndications || pose.indications.includes(filterIndications)) &&
      (!filterCounterIndications || pose.counterIndications.includes(filterCounterIndications))
    );
  });

  const resetFilters = () => {
    setFilterCategory("");
    setFilterAnatomy("");
    setFilterLevel("");
    setFilterIndications("");
    setFilterCounterIndications("");
  };

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={6} bg={bg} minH="100vh">
      <Heading mb={4} color={textColor}>
        All Yoga Poses
      </Heading>

      {/* Filters Section */}
      <Flex flexWrap="wrap" gap={4} mb={6}>
        <Select
          placeholder="Filter by Category"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          bg="white"
          maxW="200px"
        >
          {categories.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </Select>

        <Select
          placeholder="Filter by Anatomy"
          value={filterAnatomy}
          onChange={(e) => setFilterAnatomy(e.target.value)}
          bg="white"
          maxW="200px"
        >
          {anatomies.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </Select>

        <Select
          placeholder="Filter by Level"
          value={filterLevel}
          onChange={(e) => setFilterLevel(e.target.value)}
          bg="white"
          maxW="200px"
        >
          {levels.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </Select>

        <Select
          placeholder="Filter by Indication"
          value={filterIndications}
          onChange={(e) => setFilterIndications(e.target.value)}
          bg="white"
          maxW="200px"
        >
          {indications.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </Select>

        <Select
          placeholder="Filter by Counter Indication"
          value={filterCounterIndications}
          onChange={(e) => setFilterCounterIndications(e.target.value)}
          bg="white"
          maxW="200px"
        >
          {counterIndications.map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </Select>

        <Button onClick={resetFilters} colorScheme="gray">
          Reset Filters
        </Button>
      </Flex>

      {filteredPoses.length === 0 ? (
        <Text color={textColor}>No poses match your filters.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {filteredPoses.map((pose) => (
            <PoseCard
              key={pose._id}
              _id={pose._id}
              name={pose.name}
              category={pose.category}
              image={pose.image}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default AllPosesPage;