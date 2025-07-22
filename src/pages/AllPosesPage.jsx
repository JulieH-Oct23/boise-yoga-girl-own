// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Heading,
//   Spinner,
//   Text,
//   SimpleGrid,
//   Select,
//   Input,
// } from "@chakra-ui/react";
// import PoseCard from "../components/PoseCard";
// import { useNavigate } from "react-router-dom";
// import poseImages from "../images";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// const AllPosesPage = () => {
//   const [poses, setPoses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterKey, setFilterKey] = useState("");
//   const [filterValue, setFilterValue] = useState("");
//   const [filterOptions, setFilterOptions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const navigate = useNavigate();

//   // Helper for image key
//   const getImageKey = (pose) => {
//     if (!pose) return "MissingPhoto";
//     const keyRaw = pose.photoName || pose.name || "";
//     return keyRaw.replace(/\s+/g, "").replace(/-/g, "").replace(/'/g, "") || "MissingPhoto";
//   };

//   useEffect(() => {
//     async function fetchPoses() {
//       try {
//         const res = await fetch(`${API_BASE}/api/poses`);
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

//   useEffect(() => {
//     if (!filterKey) {
//       setFilterOptions([]);
//       setFilterValue("");
//       return;
//     }

//     const values = new Set();

//     poses.forEach((pose) => {
//       const val = pose[filterKey];
//       if (Array.isArray(val)) {
//         val.forEach((item) => values.add(item));
//       } else if (val) {
//         values.add(val);
//       }
//     });

//     setFilterOptions(Array.from(values).sort());
//   }, [filterKey, poses]);

//   // Filter + search filtering combined
//   const filteredPoses = poses
//     .filter((pose) => {
//       if (filterKey && filterValue) {
//         const field = pose[filterKey];
//         if (Array.isArray(field)) return field.includes(filterValue);
//         return field === filterValue;
//       }
//       return true;
//     })
//     .filter((pose) =>
//       pose.name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

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
//       <Heading mb={4}>Filter through yoga poses using drop down menus:</Heading>

//       {/* Wrap filters and search in a box */}
//       <Box
//         mb={6}
//         p={4}
//         borderRadius="md"
//         border="1px solid"
//         borderColor="#A18E88"
//         display="flex"
//         gap={4}
//         flexWrap="wrap"
//         alignItems="center"
//       >
//         {/* Filter dropdown */}
//         <Select
//           placeholder="Filter by..."
//           value={filterKey}
//           onChange={(e) => {
//             setFilterKey(e.target.value);
//             setFilterValue("");
//           }}
//           bg="#BEB1AE"
//           color="#353325"
//           borderColor="#A18E88"
//           borderRadius="md"
//           _hover={{ borderColor: "#A18E88" }}
//           _focus={{
//             borderColor: "#A18E88",
//             boxShadow: "0 0 0 1px #A18E88",
//           }}
//           sx={{
//             appearance: "none",
//             WebkitAppearance: "none",
//             MozAppearance: "none",
//             backgroundImage: `url("data:image/svg+xml,%3csvg fill='${encodeURIComponent(
//               "#353325"
//             )}' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 7l5 5 5-5z'/%3e%3c/svg%3e")`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "right 0.75rem center",
//             backgroundSize: "1rem",
//             paddingRight: "2.25rem",
//             minWidth: "180px",
//           }}
//         >
//           <option value="category">Category</option>
//           <option value="level">Level</option>
//           <option value="anatomy">Anatomy</option>
//           <option value="indications">Indications</option>
//           <option value="counterIndications">Counter Indications</option>
//         </Select>

//         {/* Value dropdown */}
//         <Select
//           placeholder="Choose value"
//           value={filterValue}
//           onChange={(e) => setFilterValue(e.target.value)}
//           isDisabled={!filterOptions.length}
//           bg="#BEB1AE"
//           color="#353325"
//           borderColor="#A18E88"
//           borderRadius="md"
//           _hover={{ borderColor: "#A18E88" }}
//           _focus={{
//             borderColor: "#A18E88",
//             boxShadow: "0 0 0 1px #A18E88",
//           }}
//           sx={{
//             appearance: "none",
//             WebkitAppearance: "none",
//             MozAppearance: "none",
//             backgroundImage: `url("data:image/svg+xml,%3csvg fill='${encodeURIComponent(
//               "#353325"
//             )}' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 7l5 5 5-5z'/%3e%3c/svg%3e")`,
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "right 0.75rem center",
//             backgroundSize: "1rem",
//             paddingRight: "2.25rem",
//             minWidth: "180px",
//           }}
//         >
//           {filterOptions.map((val, i) => (
//             <option
//               key={i}
//               value={val}
//               style={{ backgroundColor: "#A18E88", color: "#FAEDEC" }}
//             >
//               {val}
//             </option>
//           ))}
//         </Select>

//         {/* Search by name */}
//         <Input
//           placeholder="Search by name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           maxW="200px"
//           bg="#BEB1AE"
//           color="#353325"
//           borderColor="#A18E88"
//           borderRadius="md"
//           _hover={{ borderColor: "#A18E88" }}
//           _focus={{
//             borderColor: "#A18E88",
//             boxShadow: "0 0 0 1px #A18E88",
//           }}
//         />
//       </Box>

//       <SimpleGrid columns={[2, null, 3, 4]} spacing={4}>
//         {filteredPoses.map((pose) => (
//           <Box
//             key={pose._id}
//             bg="#FAEDEC"
//             p={2}
//             borderRadius="lg"
//             boxShadow="md"
//             textAlign="center"
//             cursor="pointer"
//             onClick={() => navigate(`/pose/${pose._id}`)}
//           >
//             <img
//               src={`/images/${pose.image || "MissingPhoto.png"}`}
//               alt={pose.name}
//               style={{
//                 width: "100px",
//                 height: "100px",
//                 objectFit: "contain",
//                 margin: "0 auto",
//                 borderRadius: "8px",
//               }}
//             />
//             <Text mt={2} fontSize="sm" noOfLines={1}>
//               {pose.name}
//             </Text>
//           </Box>
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
  Input,
} from "@chakra-ui/react";
import PoseCard from "../components/PoseCard";
import { useNavigate } from "react-router-dom";
import poseImages from "../images";

// API base URL
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const AllPosesPage = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Helper to convert pose name/photoName to images key format
  const getImageKey = (pose) => {
    if (!pose) return "MissingPhoto";
    const keyRaw = pose.photoName || pose.name || "";
    // remove spaces, dashes, apostrophes to match your images keys
    return keyRaw.replace(/\s+/g, "").replace(/-/g, "").replace(/'/g, "") || "MissingPhoto";
  };

  useEffect(() => {
    async function fetchPoses() {
      try {
        const res = await fetch(`${API_BASE}/api/poses`);
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

  // Filter poses by filter key/value and search term
  const filteredPoses = poses
    .filter((pose) => {
      if (filterKey && filterValue) {
        const field = pose[filterKey];
        if (Array.isArray(field)) {
          return field.includes(filterValue);
        }
        return field === filterValue;
      }
      return true;
    })
    .filter((pose) =>
      pose.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
      <Heading mb={4}>Filter through yoga poses using drop down menus:</Heading>

      <Box
        p={4}
        mb={6}
        borderRadius="md"
        boxShadow="md"
        bg="#beb1ae"
        maxW="600px"
      >
        <Input
          mb={4}
          placeholder="Search by pose name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg="white"
          borderColor="#A18E88"
          _hover={{ borderColor: "#92636B" }}
          _focus={{ borderColor: "#92636B", boxShadow: "0 0 0 1px #92636B" }}
        />

        <Box display="flex" gap={4} flexWrap="wrap">
          <Select
            placeholder="Filter by..."
            value={filterKey}
            onChange={(e) => {
              setFilterKey(e.target.value);
              setFilterValue("");
            }}
            bg="white"
            borderColor="#A18E88"
            _hover={{ borderColor: "#92636B" }}
            _focus={{ borderColor: "#92636B", boxShadow: "0 0 0 1px #92636B" }}
            flex="1"
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
            isDisabled={!filterOptions.length}
            bg="white"
            borderColor="#A18E88"
            _hover={{ borderColor: "#92636B" }}
            _focus={{ borderColor: "#92636B", boxShadow: "0 0 0 1px #92636B" }}
            flex="1"
          >
            {filterOptions.map((val, i) => (
              <option
                key={i}
                value={val}
                style={{ backgroundColor: "#92636B", color: "#FAEDEC" }}
              >
                {val}
              </option>
            ))}
          </Select>
        </Box>
      </Box>

      <SimpleGrid columns={[2, null, 3, 4]} spacing={4}>
        {filteredPoses.map((pose) => (
          <Box
            key={pose._id}
            bg="#FAEDEC"
            p={2}
            borderRadius="lg"
            boxShadow="md"
            textAlign="center"
            cursor="pointer"
            onClick={() => navigate(`/pose/${pose._id}`)}
          >
            <img
              src={poseImages[getImageKey(pose)] || poseImages.MissingPhoto}
              alt={pose.name}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
                margin: "0 auto",
                borderRadius: "8px",
              }}
            />
            <Text mt={2} fontSize="sm" noOfLines={1}>
              {pose.name}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AllPosesPage;