// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Heading,
//   Spinner,
//   Text,
//   SimpleGrid,
//   Select,
// } from "@chakra-ui/react";
// import PoseCard from "../components/PoseCard";

// // ✅ API setup
// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// const AllPosesPage = () => {
//   const [poses, setPoses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterKey, setFilterKey] = useState("");
//   const [filterValue, setFilterValue] = useState("");
//   const [filterOptions, setFilterOptions] = useState([]);

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

//   const filteredPoses = filterKey && filterValue
//     ? poses.filter((pose) => {
//         const field = pose[filterKey];
//         if (Array.isArray(field)) {
//           return field.includes(filterValue);
//         }
//         return field === filterValue;
//       })
//     : poses;

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

//       <Box display="flex" gap={4} mb={6} flexWrap="wrap">
//         <Select
//   placeholder="Filter by..."
//   value={filterKey}
//   onChange={(e) => {
//     setFilterKey(e.target.value);
//     setFilterValue("");
//   }}
//   bg="#BEB1AE"
//   color="#353325"
//   borderColor="#A18E88"
//   borderRadius="md"
//   _hover={{ borderColor: "#A18E88" }}
//   _focus={{
//     borderColor: "#A18E88",
//     boxShadow: "0 0 0 1px #A18E88",
//   }}
//   sx={{
//     appearance: "none",
//     WebkitAppearance: "none",
//     MozAppearance: "none",
//     backgroundImage: `url("data:image/svg+xml,%3csvg fill='${encodeURIComponent(
//       "#353325"
//     )}' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 7l5 5 5-5z'/%3e%3c/svg%3e")`,
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "right 0.75rem center",
//     backgroundSize: "1rem",
//     paddingRight: "2.25rem",
//   }}
// >
//   <option value="category">Category</option>
//   <option value="level">Level</option>
//   <option value="anatomy">Anatomy</option>
//   <option value="indications">Indications</option>
//   <option value="counterIndications">Counter Indications</option>
// </Select>

// <Select
//   placeholder="Choose value"
//   value={filterValue}
//   onChange={(e) => setFilterValue(e.target.value)}
//   isDisabled={!filterOptions.length}
//   bg="#BEB1AE"
//   color="#353325"
//   borderColor="#A18E88"
//   borderRadius="md"
//   _hover={{ borderColor: "#A18E88" }}
//   _focus={{
//     borderColor: "#A18E88",
//     boxShadow: "0 0 0 1px #A18E88",
//   }}
//   sx={{
//     appearance: "none",
//     WebkitAppearance: "none",
//     MozAppearance: "none",
//     backgroundImage: `url("data:image/svg+xml,%3csvg fill='${encodeURIComponent(
//       "#353325"
//     )}' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 7l5 5 5-5z'/%3e%3c/svg%3e")`,
//     backgroundRepeat: "no-repeat",
//     backgroundPosition: "right 0.75rem center",
//     backgroundSize: "1rem",
//     paddingRight: "2.25rem",
//   }}
// >
//   {filterOptions.map((val, i) => (
//     <option key={i} value={val} style={{ backgroundColor: "#A18E88", color: "#FAEDEC" }}>
//       {val}
//     </option>
//   ))}
// </Select>
//       </Box>

//       <SimpleGrid
//         columns={{ base: 1, sm: 2, md: 3 }}
//         spacingX={6}
//         spacingY={8}
//         minChildWidth="250px"
//       >
//         {filteredPoses.map((pose) => (
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
} from "@chakra-ui/react";
import PoseCard from "../components/PoseCard";
import { useNavigate } from "react-router-dom";

// ✅ API setup
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const AllPosesPage = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);

  const navigate = useNavigate();

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
      <Heading mb={4}>Filter through yoga poses using drop down menus:</Heading>

      <Box display="flex" gap={4} mb={6} flexWrap="wrap">
        <Select
          placeholder="Filter by..."
          value={filterKey}
          onChange={(e) => {
            setFilterKey(e.target.value);
            setFilterValue("");
          }}
          bg="#BEB1AE"
          color="#353325"
          borderColor="#A18E88"
          borderRadius="md"
          _hover={{ borderColor: "#A18E88" }}
          _focus={{
            borderColor: "#A18E88",
            boxShadow: "0 0 0 1px #A18E88",
          }}
          sx={{
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3csvg fill='${encodeURIComponent(
              "#353325"
            )}' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 7l5 5 5-5z'/%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "1rem",
            paddingRight: "2.25rem",
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
          isDisabled={!filterOptions.length}
          bg="#BEB1AE"
          color="#353325"
          borderColor="#A18E88"
          borderRadius="md"
          _hover={{ borderColor: "#A18E88" }}
          _focus={{
            borderColor: "#A18E88",
            boxShadow: "0 0 0 1px #A18E88",
          }}
          sx={{
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3csvg fill='${encodeURIComponent(
              "#353325"
            )}' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 7l5 5 5-5z'/%3e%3c/svg%3e")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.75rem center",
            backgroundSize: "1rem",
            paddingRight: "2.25rem",
          }}
        >
          {filterOptions.map((val, i) => (
            <option key={i} value={val} style={{ backgroundColor: "#A18E88", color: "#FAEDEC" }}>
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
          <Box
            key={pose._id}
            cursor="pointer"
            onClick={() => navigate(`/pose/${pose._id}`)}
          >
            <PoseCard _id={pose._id} name={pose.name} image={pose.image} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AllPosesPage;