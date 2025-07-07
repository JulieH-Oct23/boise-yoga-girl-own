
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

// // const filterOptions = useMemo(() => {
// //   if (!poses.length) return [];

// //   const rawValues = poses.flatMap((pose) => {
// //     const val = pose[filterKey];

// //     if (Array.isArray(val)) {
// //       return val.map((v) => v?.trim().toLowerCase());
// //     }

// //     if (typeof val === "string") {
// //       return val.split(",").map((v) => v?.trim().toLowerCase());
// //     }

// //     return [];
// //   });

// const filterOptions = useMemo(() => {
//   if (!poses.length) return [];

//   let allValues = [];

//   poses.forEach((pose) => {
//     const val = pose[filterKey];

//     if (Array.isArray(val)) {
//       // Flatten all values in array (like anatomy)
//       allValues = allValues.concat(val);
//     } else if (typeof val === "string") {
//       allValues.push(val);
//     }
//   });

//   // Clean and unique values (case-insensitive)
//   const uniqueValues = [...new Set(
//     allValues
//       .filter(Boolean)
//       .map((v) => v.toString().toLowerCase().trim())
//   )];

//   console.log(`Filter key: ${filterKey}, options:`, uniqueValues);

//   return uniqueValues;
// }, [poses, filterKey]);

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
// <SimpleGrid
//   columns={{ base: 1, sm: 2, md: 3 }}
//   spacing={6}
//   px={{ base: 4, sm: 6, md: 8 }}
//   pb={10}
// >
//   {filteredPoses.map((pose) => (
//     <PoseCard
//       key={pose._id}
//       _id={pose._id}
//       name={pose.name}
//       image={pose.image}
//       category={pose.category}
//       description={pose.description}
//     />
//   ))}
// </SimpleGrid>
//       )}
//     </Box>
//   );
// };

// export default AllPosesPage;

import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import PoseCard from "../components/PoseCard";
import images from "../images";

const AllPosesPage = () => {
  const [poses, setPoses] = useState([]);
  const [filteredPoses, setFilteredPoses] = useState([]);
  const [filterKey, setFilterKey] = useState("category");
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(true);

  const headingColor = useColorModeValue(
    "brand.light.mainTitleText",
    "brand.dark.mainTitleText"
  );
  const spinnerColor = useColorModeValue(
    "brand.light.poseCardTitle",
    "brand.dark.poseCardTitle"
  );
  const loadingTextColor = useColorModeValue(
    "brand.light.muted",
    "brand.dark.muted"
  );
  const filterBg = "#94626D";
  const filterText = "#FBE3D2";

  const getImageKey = (photoName) =>
    photoName?.replace(/\s+/g, "").replace(/-/g, "").replace(/'/g, "");

  useEffect(() => {
    fetch("http://localhost:4000/api/poses")
      .then((res) => res.json())
      .then((data) => {
        const enriched = data.map((pose) => {
          const imageKey = getImageKey(pose.photoName);
          return {
            ...pose,
            image: images[imageKey] || null,
          };
        });
        setPoses(enriched);
        setFilteredPoses(enriched);
        setLoading(false);

        // Debug: check anatomy field exists and is array
        console.log(
          "Loaded poses sample:",
          enriched.slice(0, 5).map((p) => ({
            name: p.name,
            anatomy: p.anatomy,
          }))
        );
      })
      .catch((err) => {
        console.error("Error fetching poses:", err);
        setLoading(false);
      });
  }, []);

  // Debug: log filterKey changes
  useEffect(() => {
    console.log("Filter key changed:", filterKey);
    setFilterValue(""); // reset filter value when key changes
  }, [filterKey]);

  const filterOptions = useMemo(() => {
    if (!poses.length) return [];

    console.log("Computing filter options for key:", filterKey);

    let allValues = [];

    poses.forEach((pose) => {
      const val = pose[filterKey];
      if (Array.isArray(val)) {
        allValues = allValues.concat(val.filter(Boolean));
      } else if (typeof val === "string") {
        allValues.push(val);
      }
    });

    // Normalize values: lowercase and trimmed
    const uniqueValues = [...new Set(allValues.map((v) => v.toLowerCase().trim()))];

    console.log("Unique filter options:", uniqueValues);

    return uniqueValues;
  }, [poses, filterKey]);

  useEffect(() => {
    if (!filterValue) {
      setFilteredPoses(poses);
    } else {
      setFilteredPoses(
        poses.filter((pose) => {
          const value = pose[filterKey];

          if (Array.isArray(value)) {
            return value.some(
              (v) => v.toLowerCase().trim() === filterValue.toLowerCase().trim()
            );
          }

          return (
            typeof value === "string" &&
            value.toLowerCase().trim() === filterValue.toLowerCase().trim()
          );
        })
      );
    }
  }, [filterValue, filterKey, poses]);

  return (
    <Box p={6}>
      <Heading color={headingColor} mb={4}>
        All Poses
      </Heading>

      <Box display="flex" gap={4} mb={6} flexWrap="wrap">
        <Select
          placeholder="Filter by..."
          value={filterKey}
          onChange={(e) => {
            setFilterKey(e.target.value);
          }}
          bg={filterBg}
          color={filterText}
          borderColor={filterBg}
          borderRadius="md"
          _hover={{ bg: filterBg }}
          _focus={{ borderColor: filterText }}
          icon={<ChevronDownIcon />}
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
          icon={<ChevronDownIcon />}
          isDisabled={!filterOptions.length}
        >
          {filterOptions.map((val, i) => (
            <option key={i} value={val}>
              {val}
            </option>
          ))}
        </Select>
      </Box>

      {loading ? (
        <Box textAlign="center">
          <Spinner size="xl" color={spinnerColor} />
          <Text color={loadingTextColor} mt={4}>
            Loading poses...
          </Text>
        </Box>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          spacing={6}
          px={{ base: 4, sm: 6, md: 8 }}
          pb={10}
        >
          {filteredPoses.map((pose) => (
            <PoseCard
              key={pose._id}
              _id={pose._id}
              name={pose.name}
              image={pose.image}
              category={pose.category}
              description={pose.description}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default AllPosesPage;