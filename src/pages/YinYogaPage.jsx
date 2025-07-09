import React, { useEffect, useState, useMemo } from "react";
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

const YinYogaPage = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterKey, setFilterKey] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const bg = useColorModeValue("#ffffff", "brand.dark.surface");
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

  const yinPoses = poses.filter((pose) => {
    return Array.isArray(pose.category)
      ? pose.category.includes("Yin")
      : pose.category === "Yin";
  });

  const getUniqueValues = (key) => {
  const allValues = yinPoses.flatMap((pose) => {
    const val = pose[key];
    console.log(`Pose ID: ${pose._id}, ${key} value:`, val); // 🔍 Inspect each pose
    if (Array.isArray(val)) {
      return val.map((item) => item.trim?.() ?? item);
    }
    if (typeof val === "string") {
      return val.split(",").map((s) => s.trim());
    }
    return [];
  });

  const unique = Array.from(new Set(allValues)).filter(Boolean).sort();
  console.log(`Unique ${key} values:`, unique); // 🔍 Show final results
  return unique;
};
  console.log("Unique anatomy values:", getUniqueValues("anatomy"));
  const filterOptions = useMemo(() => {
    return {
      level: getUniqueValues("level"),
      anatomy: getUniqueValues("anatomy"),
      indications: getUniqueValues("indications"),
      counterIndications: getUniqueValues("counterIndications"),
    };
  }, [yinPoses]);

  const filteredPoses = yinPoses.filter((pose) => {
    if (!filterKey || !filterValue) return true;

    const field = pose[filterKey];
    if (Array.isArray(field)) return field.includes(filterValue);
    if (typeof field === "string") return field.split(",").includes(filterValue);
    return field === filterValue;
  });

  const resetFilters = () => {
    setFilterKey("");
    setFilterValue("");
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
        Yin Yoga Poses
      </Heading>

      <Flex flexWrap="wrap" gap={4} mb={6}>
        <Select
          placeholder="Choose a Filter"
          value={filterKey}
          onChange={(e) => {
            setFilterKey(e.target.value);
            setFilterValue("");
          }}
          bg="#A18E88"
          color="white"
          maxW="200px"
          borderColor="gray.300"
          borderRadius="md"
          _hover={{ borderColor: "gray.400" }}
          _focus={{ borderColor: "gray.500", boxShadow: "none" }}
        >
          <option value="level">Level</option>
          <option value="anatomy">Anatomy</option>
          <option value="indications">Indications</option>
          <option value="counterIndications">Counter Indications</option>
        </Select>

        <Select
          placeholder={
            filterKey
              ? `Select ${filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}`
              : "Select a Value"
          }
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          bg="#A18E88"
          color="white"
          maxW="200px"
          borderColor="gray.300"
          borderRadius="md"
          _hover={{ borderColor: "gray.400" }}
          _focus={{ borderColor: "gray.500", boxShadow: "none" }}
          isDisabled={!filterKey}
        >
          {filterKey &&
            filterOptions[filterKey]?.map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
        </Select>

        <Button
          onClick={resetFilters}
          color="white"
          bg="#92636B"
          borderRadius="md"
          _hover={{ bg: "#A18E88" }}
        >
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

export default YinYogaPage;