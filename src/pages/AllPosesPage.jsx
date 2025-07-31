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
// import images from "../images";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

// const AllPosesPage = () => {
//   const [poses, setPoses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterKey, setFilterKey] = useState("");
//   const [filterValue, setFilterValue] = useState("");
//   const [filterOptions, setFilterOptions] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

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

//   const filteredPoses = poses
//     .filter((pose) => {
//       if (filterKey && filterValue) {
//         const field = pose[filterKey];
//         if (Array.isArray(field)) {
//           return field.includes(filterValue);
//         }
//         return field === filterValue;
//       }
//       return true;
//     })
//     .filter((pose) =>
//       pose.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
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
//     <Box p={6} pt={10}>
//       {/* Filter Section */}
//       <Box bg="#BEB1AE" p={6} mb={6} borderRadius="md" boxShadow="md">
//         <Heading mb={4} color="#353325">
//           Filter through yoga poses using drop down menus:
//         </Heading>

//         <Input
//           mb={4}
//           placeholder="Search poses by name"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           bg="white"
//           color="#353325"
//           borderColor="#A18E88"
//           borderRadius="md"
//           _hover={{ borderColor: "#A18E88" }}
//           _focus={{
//             borderColor: "#A18E88",
//             boxShadow: "0 0 0 1px #A18E88",
//           }}
//         />

//         <Box display="flex" gap={4} flexWrap="wrap">
//           <Select
//             placeholder="Filter by..."
//             value={filterKey}
//             onChange={(e) => {
//               setFilterKey(e.target.value);
//               setFilterValue("");
//             }}
//             bg="white"
//             color="#353325"
//             borderColor="#A18E88"
//             borderRadius="md"
//             _hover={{ borderColor: "#A18E88" }}
//             _focus={{
//               borderColor: "#A18E88",
//               boxShadow: "0 0 0 1px #A18E88",
//             }}
//             sx={{
//               appearance: "none",
//               backgroundImage: `url("data:image/svg+xml,%3csvg fill='${encodeURIComponent(
//                 "#353325"
//               )}' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 7l5 5 5-5z'/%3e%3c/svg%3e")`,
//               backgroundRepeat: "no-repeat",
//               backgroundPosition: "right 0.75rem center",
//               backgroundSize: "1rem",
//               paddingRight: "2.25rem",
//             }}
//           >
//             <option value="category">Category</option>
//             <option value="level">Level</option>
//             <option value="anatomy">Anatomy</option>
//             <option value="indications">Indications</option>
//             <option value="counterIndications">Counter Indications</option>
//           </Select>

//           <Select
//             placeholder="Choose value"
//             value={filterValue}
//             onChange={(e) => setFilterValue(e.target.value)}
//             isDisabled={!filterOptions.length}
//             bg="white"
//             color="#353325"
//             borderColor="#A18E88"
//             borderRadius="md"
//             _hover={{ borderColor: "#A18E88" }}
//             _focus={{
//               borderColor: "#A18E88",
//               boxShadow: "0 0 0 1px #A18E88",
//             }}
//             sx={{
//               appearance: "none",
//               backgroundImage: `url("data:image/svg+xml,%3csvg fill='${encodeURIComponent(
//                 "#353325"
//               )}' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 7l5 5 5-5z'/%3e%3c/svg%3e")`,
//               backgroundRepeat: "no-repeat",
//               backgroundPosition: "right 0.75rem center",
//               backgroundSize: "1rem",
//               paddingRight: "2.25rem",
//             }}
//           >
//             {filterOptions.map((val, i) => (
//               <option
//                 key={i}
//                 value={val}
//                 style={{ backgroundColor: "#A18E88", color: "#FAEDEC" }}
//               >
//                 {val}
//               </option>
//             ))}
//           </Select>
//         </Box>
//       </Box>

//       {/* Pose Cards Grid */}
//       <SimpleGrid columns={[2, null, 3, 4]} spacing={6} maxW="960px" mx="auto">
//         {filteredPoses.map((pose) => (
//           <Box
//             key={pose._id}
//             bg="#FAEDEC"
//             p={2}
//             borderRadius="lg"
//             boxShadow="md"
//             textAlign="center"
//             cursor="pointer"
//             w="100px"
//             overflow="hidden"
//           >
//             <Box
//               as="img"
//               src={images[pose.image?.replace(/\.png$/i, "")] || images.MissingPhoto}
//               alt={pose.name}
//               boxSize="100px"
//               objectFit="contain"
//               mx="auto"
//               borderRadius="md"
//               mb={2}
//             />
//             <Text fontSize="sm" noOfLines={1} color="#353325">
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
import { useNavigate } from "react-router-dom";  // <-- Added this
import images from "../images";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const AllPosesPage = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();  // <-- Added this

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
      pose.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
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
    <Box p={6} pt={10}>
      {/* Filter Section */}
      <Box bg="#BEB1AE" p={6} mb={6} borderRadius="md" boxShadow="md">
        <Heading mb={4} color="#353325">
          Filter through yoga poses using drop down menus:
        </Heading>

        <Input
          mb={4}
          placeholder="Search poses by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg="white"
          color="#353325"
          borderColor="#A18E88"
          borderRadius="md"
          _hover={{ borderColor: "#A18E88" }}
          _focus={{
            borderColor: "#A18E88",
            boxShadow: "0 0 0 1px #A18E88",
          }}
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
            bg="white"
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
              <option
                key={i}
                value={val}
                style={{ backgroundColor: "#A18E88", color: "#FAEDEC" }}
              >
                {val}
              </option>
            ))}
          </Select>
        </Box>
      </Box>

      {/* Pose Cards Grid */}
      <SimpleGrid columns={[2, null, 3, 4]} spacing={6} maxW="960px" mx="auto">
        {filteredPoses.map((pose) => (
          <Box
            key={pose._id}
            bg="#FAEDEC"
            p={2}
            borderRadius="lg"
            boxShadow="md"
            textAlign="center"
            cursor="pointer"
            w="100px"
            overflow="hidden"
            onClick={() => navigate(`/poses/${pose._id}`)} // <-- added navigation here
          >
            <Box
              as="img"
              src={images[pose.image?.replace(/\.png$/i, "")] || images.MissingPhoto}
              alt={pose.name}
              boxSize="100px"
              objectFit="contain"
              mx="auto"
              borderRadius="md"
              mb={2}
            />
            <Text fontSize="sm" noOfLines={1} color="#353325">
              {pose.name}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AllPosesPage;