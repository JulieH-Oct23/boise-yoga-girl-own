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

// ✅ ADDED: use VITE_API_BASE to work on Vercel and locally
const API_BASE = import.meta.env.VITE_API_BASE;

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
        // ✅ UPDATED: use full backend URL
        const res = await fetch(`${API_BASE}/api/poses`);
        const data = await res.json();
        setPoses(data);
        console.log("✅ poses fetched:", data);
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
          bg="#A18E88"
          color="#FAEDEC"
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
          isDisabled={!filterOptions.length}
          bg="#A18E88"
          color="white"
          borderColor="#A18E88"
          borderRadius="md"
          _hover={{ borderColor: "#92636B" }}
          _focus={{
            borderColor: "#92636B",
            boxShadow: "0 0 0 1px #92636B",
          }}
        >
          {filterOptions.map((val, i) => (
            <option key={i} value={val} style={{ backgroundColor: "#A18E88", color: "white" }}>
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
