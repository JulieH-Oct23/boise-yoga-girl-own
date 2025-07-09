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

// const AllPosesPage = () => {
//   const [poses, setPoses] = useState([]);
//   const [filteredPoses, setFilteredPoses] = useState([]);
//   const [filterKey, setFilterKey] = useState("category");
//   const [filterValue, setFilterValue] = useState("");
//   const [loading, setLoading] = useState(true);

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
//         setPoses(enriched);
//         setFilteredPoses(enriched);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching poses:", err);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     setFilterValue(""); // Reset value when filter key changes
//   }, [filterKey]);

//   const filterOptions = useMemo(() => {
//     if (!poses.length) return [];

//     let values = [];

//     poses.forEach((pose) => {
//       const val = pose[filterKey];
//       if (Array.isArray(val)) {
//         values = values.concat(val.filter(Boolean));
//       } else if (typeof val === "string") {
//         values.push(val);
//       }
//     });

//     const unique = [...new Set(values.map((v) => v.toLowerCase().trim()))];
//     return unique;
//   }, [poses, filterKey]);

//   useEffect(() => {
//     if (!filterValue) {
//       setFilteredPoses(poses);
//     } else {
//       setFilteredPoses(
//         poses.filter((pose) => {
//           const value = pose[filterKey];
//           if (Array.isArray(value)) {
//             return value.some(
//               (v) =>
//                 v.toLowerCase().trim() === filterValue.toLowerCase().trim()
//             );
//           } else if (typeof value === "string") {
//             return (
//               value.toLowerCase().trim() === filterValue.toLowerCase().trim()
//             );
//           }
//           return false;
//         })
//       );
//     }
//   }, [filterValue, filterKey, poses]);

//   return (
//     <Box p={6}>
//       <Heading color={headingColor} mb={4}>
//         All Poses
//       </Heading>

//       <Box display="flex" gap={4} mb={6} flexWrap="wrap">
//         <Select
//           placeholder="Filter by..."
//           value={filterKey}
//           onChange={(e) => setFilterKey(e.target.value)}
//           bg={filterBg}
//           color={filterText}
//           borderColor={filterBg}
//           borderRadius="md"
//           _hover={{ bg: filterBg }}
//           _focus={{ borderColor: filterText }}
//         >
//           <option value="category">Category</option>
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
//           isDisabled={!filterOptions.length}
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
//               description={pose.description}
//             />
//           ))}
//         </SimpleGrid>
//       )}
//     </Box>
//   );
// };

// export default AllPosesPage;

// import React, { useEffect, useState } from "react";
// import { SimpleGrid, Box, Heading, Spinner, Text } from "@chakra-ui/react";
// import PoseCard from "../components/PoseCard";

// const AllPosesPage = () => {
//   const [poses, setPoses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchPoses() {
//       try {
//         const res = await fetch("/api/poses"); // adjust your API endpoint
//         const data = await res.json();
//         setPoses(data);
//       } catch (error) {
//         console.error("Failed to fetch poses:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchPoses();
//   }, []);

//   if (loading) {
//     return (
//       <Box textAlign="center" py={20}>
//         <Spinner size="xl" />
//       </Box>
//     );
//   }

//   if (!poses.length) {
//     return (
//       <Box textAlign="center" py={20}>
//         <Text>No poses found.</Text>
//       </Box>
//     );
//   }

//   return (
//     <Box p={6}>
//       <Heading mb={6}>All Poses</Heading>
//       <SimpleGrid columns={[1, 2, 3]} spacing={6}>
//         {poses.map((pose) => (
//           <PoseCard
//             key={pose._id}
//             _id={pose._id}
//             name={pose.name}
//             category={pose.category}
//             description={pose.description}
//             image={pose.image}  {/* <-- Pass image prop here */}
//           />
//         ))}
//       </SimpleGrid>
//     </Box>
//   );
// };

// export default AllPosesPage;

// src/pages/AllPosesPage.jsx
// import React, { useEffect, useState } from "react";
// import { SimpleGrid, Box, Heading, Spinner, Text } from "@chakra-ui/react";
// import PoseCard from "../components/PoseCard";

// const AllPosesPage = () => {
//   const [poses, setPoses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchPoses() {
//       try {
//         const res = await fetch("/api/poses"); // adjust your API endpoint
//         const data = await res.json();
//         setPoses(data);
//       } catch (error) {
//         console.error("Failed to fetch poses:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchPoses();
//   }, []);

//   if (loading) {
//     return (
//       <Box textAlign="center" py={20}>
//         <Spinner size="xl" />
//       </Box>
//     );
//   }

//   if (!poses.length) {
//     return (
//       <Box textAlign="center" py={20}>
//         <Text>No poses found.</Text>
//       </Box>
//     );
//   }

//   return (
//     <Box p={6}>
//       <Heading mb={6}>All Poses</Heading>
//       <SimpleGrid columns={[1, 2, 3]} spacing={6}>
//         {poses.map((pose) => (
//           <PoseCard
//             key={pose._id}
//             _id={pose._id}
//             name={pose.name}
//             category={pose.category}
//             description={pose.description}
//             image={pose.image} // ✅ image prop passed correctly
//           />
//         ))}
//       </SimpleGrid>
//     </Box>
//   );
// };

// export default AllPosesPage;



// import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import PoseCard from "../components/PoseCard";

// const AllPosesPage = () => {
//   const [poses, setPoses] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const res = await fetch("http://localhost:4000/api/poses");
//       const data = await res.json();
//       setPoses(data);
//     }
//     fetchData();
//   }, []);

//   return (
//     <Box px={[4, 6, 8]} py={6}>
//       <Heading mb={6}>All Poses</Heading>

//       <SimpleGrid
//         minChildWidth="250px"
//         spacing={6} // ensures spacing between ALL cards
//       >
//         {poses.map((pose) => (
//           <PoseCard key={pose._id} _id={pose._id} name={pose.name} image={pose.image} />
//         ))}
//       </SimpleGrid>
//     </Box>
//   );
// };

// export default AllPosesPage;

// import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import PoseCard from "../components/PoseCard";

// const AllPosesPage = () => {
//   const [poses, setPoses] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const res = await fetch("http://localhost:4000/api/poses");
//       const data = await res.json();
//       setPoses(data);
//     }
//     fetchData();
//   }, []);

//   return (
//     <Box px={[4, 6, 8]} py={6}>
//       <Heading mb={6}>All Poses</Heading>

//       <SimpleGrid
//         minChildWidth="250px"
//         spacing={6} // ensures spacing between ALL cards
//       >
//         {poses.map((pose) => (
//           <PoseCard key={pose._id} _id={pose._id} name={pose.name} image={pose.image} />
//         ))}
//       </SimpleGrid>
//     </Box>
//   );
// };

// export default AllPosesPage;

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Spinner,
  Text,
  SimpleGrid,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import PoseCard from "../components/PoseCard";

const AllPosesPage = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);

  const filterBg = useColorModeValue("brand.light.surface", "brand.dark.surface");
  const filterText = useColorModeValue("brand.light.text", "brand.dark.text");

  useEffect(() => {
    async function fetchPoses() {
      try {
        const res = await fetch("/api/poses");
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

  useEffect(() => {
    if (!filterKey) {
      setFilterOptions([]);
      setFilterValue("");
      return;
    }

    const values = new Set();

    poses.forEach((pose) => {
      const val = pose[filterKey];
      if (Array.isArray(val)) {
        val.forEach((item) => values.add(item));
      } else if (val) {
        values.add(val);
      }
    });

    setFilterOptions(Array.from(values).sort());
  }, [filterKey, poses]);

  const filteredPoses = filterKey && filterValue
    ? poses.filter((pose) => {
        const field = pose[filterKey];
        if (Array.isArray(field)) {
          return field.includes(filterValue);
        }
        return field === filterValue;
      })
    : poses;

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!poses.length) {
    return (
      <Box textAlign="center" py={20}>
        <Text>No poses found.</Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={4}>All Poses</Heading>

      <Box display="flex" gap={4} mb={6} flexWrap="wrap">
        <Select
          placeholder="Filter by..."
          value={filterKey}
          onChange={(e) => {
            setFilterKey(e.target.value);
            setFilterValue("");
          }}
          bg={filterBg}
          color={filterText}
          borderColor={filterBg}
          borderRadius="md"
          _hover={{ bg: filterBg }}
          _focus={{ borderColor: filterText }}
        >
          <option value="category">Category</option>
          <option value="level">Level</option>
          <option value="anatomy">Anatomy</option>
          <option value="indications">Indications</option>
          <option value="counterIndications">Counter Indications</option>
        </Select>

        <Select
          placeholder="Choose value"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          bg={filterBg}
          color={filterText}
          borderColor={filterBg}
          borderRadius="md"
          _hover={{ bg: filterBg }}
          _focus={{ borderColor: filterText }}
          isDisabled={!filterOptions.length}
        >
          {filterOptions.map((val, i) => (
            <option key={i} value={val}>
              {val}
            </option>
          ))}
        </Select>
      </Box>

      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3 }}
        spacingX={6}
        spacingY={8}
        minChildWidth="250px"
      >
        {filteredPoses.map((pose) => (
          <PoseCard key={pose._id} _id={pose._id} name={pose.name} image={pose.image} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AllPosesPage;
