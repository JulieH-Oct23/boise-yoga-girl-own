// import { ChevronDownIcon } from "@chakra-ui/icons"; // <-- Added this import
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
// import images from "../images"; // ✅ STEP 1: Import the image mapping

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

//   // ✅ STEP 2: Helper to normalize pose name → image key
//   const getImageKey = (name) =>
//     name?.replace(/\s+/g, "").replace(/-/g, "").replace(/'/g, "");

//   // ✅ STEP 3: Fetch poses and enrich them with image links
//   useEffect(() => {
//     fetch("http://localhost:4000/api/poses")
//       .then((res) => res.json())
//       .then((data) => {
//         const enrichedPoses = data.map((pose) => {
//           const imageKey = getImageKey(pose.name);
//           return {
//             ...pose,
//             image: images[imageKey] || null, // If image doesn't exist, fallback is handled by PoseCard
//           };
//         });

//         setPoses(enrichedPoses);
//         setFilteredPoses(enrichedPoses);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching poses:", err);
//         setLoading(false);
//       });
//   }, []);

//   const filterOptions = useMemo(() => {
//     if (!poses.length) return [];

//     if (
//       filterKey === "category" ||
//       filterKey === "indications" ||
//       filterKey === "counterIndications"
//     ) {
//       return [...new Set(poses.flatMap((pose) => pose[filterKey] || []))].filter(
//         Boolean
//       );
//     } else if (filterKey === "anatomy") {
//       return [
//         ...new Set(
//           poses
//             .flatMap((pose) =>
//               (pose.anatomy || "")
//                 .split(",")
//                 .map((s) => s.trim())
//                 .filter(Boolean)
//             )
//         ),
//       ];
//     } else {
//       return [...new Set(poses.map((pose) => pose[filterKey]))].filter(Boolean);
//     }
//   }, [poses, filterKey]);

//   useEffect(() => {
//     if (!filterValue) {
//       setFilteredPoses(poses);
//     } else if (
//       ["category", "indications", "counterIndications"].includes(filterKey)
//     ) {
//       setFilteredPoses(
//         poses.filter((pose) => {
//           const field = pose[filterKey];
//           if (Array.isArray(field)) {
//             return field.some((val) =>
//               val.toLowerCase().includes(filterValue.toLowerCase())
//             );
//           }
//           return false;
//         })
//       );
//     } else if (filterKey === "anatomy") {
//       setFilteredPoses(
//         poses.filter((pose) =>
//           (pose.anatomy || "")
//             .split(",")
//             .map((s) => s.trim().toLowerCase())
//             .includes(filterValue.toLowerCase())
//         )
//       );
//     } else {
//       setFilteredPoses(
//         poses.filter((pose) =>
//           pose[filterKey]?.toLowerCase().includes(filterValue.toLowerCase())
//         )
//       );
//     }
//   }, [filterKey, filterValue, poses]);

//   return (
//     <Box>
//       <Heading color={headingColor} mb={4}>
//       </Heading>

//       <Box display="flex" gap={4} mb={6}>
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
//           _hover={{ bg: filterBg }}
//           _focus={{ borderColor: filterText }}
//           icon={<ChevronDownIcon />} // <-- Added Chakra arrow icon here
//           style={{
//             appearance: "none",
//             WebkitAppearance: "none",
//             MozAppearance: "none",
//           }} // <-- Hide native arrow
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
//           _hover={{ bg: filterBg }}
//           _focus={{ borderColor: filterText }}
//           icon={<ChevronDownIcon />} // <-- Added Chakra arrow icon here too
//           style={{
//             appearance: "none",
//             WebkitAppearance: "none",
//             MozAppearance: "none",
//           }} // <-- Hide native arrow
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
//         <SimpleGrid columns={[1, 2, 3]} spacing={6}>
//           {filteredPoses.map((pose) => (
//             <PoseCard
//               key={pose._id}
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

import { ChevronDownIcon } from "@chakra-ui/icons"; // Chakra arrow icon
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

  // Normalize photoName to image key for image lookup
  const getImageKey = (photoName) =>
    photoName?.replace(/\s+/g, "").replace(/-/g, "").replace(/'/g, "");

  // Fetch poses and add image from photoName
  useEffect(() => {
    fetch("http://localhost:4000/api/poses")
      .then((res) => res.json())
      .then((data) => {
        const enrichedPoses = data.map((pose) => {
          const imageKey = getImageKey(pose.photoName);
          return {
            ...pose,
            image: images[imageKey] || null,
          };
        });
        setPoses(enrichedPoses);
        setFilteredPoses(enrichedPoses);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching poses:", err);
        setLoading(false);
      });
  }, []);

  // Calculate filter options depending on filterKey
  const filterOptions = useMemo(() => {
    if (!poses.length) return [];

    if (
      filterKey === "category" ||
      filterKey === "indications" ||
      filterKey === "counterIndications"
    ) {
      return [...new Set(poses.flatMap((pose) => pose[filterKey] || []))].filter(
        Boolean
      );
    } else if (filterKey === "anatomy") {
      return [
        ...new Set(
          poses
            .flatMap((pose) =>
              (pose.anatomy || "")
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
        ),
      ];
    } else {
      return [...new Set(poses.map((pose) => pose[filterKey]))].filter(Boolean);
    }
  }, [poses, filterKey]);

  // Filter poses based on selected filter value
  useEffect(() => {
    if (!filterValue) {
      setFilteredPoses(poses);
    } else if (
      ["category", "indications", "counterIndications"].includes(filterKey)
    ) {
      setFilteredPoses(
        poses.filter((pose) => {
          const field = pose[filterKey];
          if (Array.isArray(field)) {
            return field.some((val) =>
              val.toLowerCase().includes(filterValue.toLowerCase())
            );
          }
          return false;
        })
      );
    } else if (filterKey === "anatomy") {
      setFilteredPoses(
        poses.filter((pose) =>
          (pose.anatomy || "")
            .split(",")
            .map((s) => s.trim().toLowerCase())
            .includes(filterValue.toLowerCase())
        )
      );
    } else {
      setFilteredPoses(
        poses.filter((pose) =>
          pose[filterKey]?.toLowerCase().includes(filterValue.toLowerCase())
        )
      );
    }
  }, [filterKey, filterValue, poses]);

  return (
    <Box>
      <Heading color={headingColor} mb={4}>
        All Poses
      </Heading>

      <Box display="flex" gap={4} mb={6}>
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
          _hover={{ bg: filterBg }}
          _focus={{ borderColor: filterText }}
          icon={<ChevronDownIcon />}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
          }}
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
          _hover={{ bg: filterBg }}
          _focus={{ borderColor: filterText }}
          icon={<ChevronDownIcon />}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
          }}
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
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {filteredPoses.map((pose) => (
            <PoseCard
              key={pose._id}
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