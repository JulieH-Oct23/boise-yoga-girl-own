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

const AllPosesPage = () => {
  const [poses, setPoses] = useState([]);
  const [filteredPoses, setFilteredPoses] = useState([]);
  const [filterKey, setFilterKey] = useState("category");
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(true);

  // Use theme colors for text, spinner, etc
  const headingColor = useColorModeValue("brand.light.primary", "brand.dark.primary");
  const spinnerColor = useColorModeValue("brand.light.accent", "brand.dark.accent");
  const loadingTextColor = useColorModeValue("brand.light.muted", "brand.dark.muted");

  useEffect(() => {
    fetch("http://localhost:4000/api/poses")
      .then((res) => res.json())
      .then((data) => {
        setPoses(data);
        setFilteredPoses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching poses:", err);
        setLoading(false);
      });
  }, []);

  const filterOptions = useMemo(() => {
    if (!poses.length) return [];

    if (
      filterKey === "category" ||
      filterKey === "indications" ||
      filterKey === "counterIndications"
    ) {
      return [...new Set(poses.flatMap((pose) => pose[filterKey] || []))].filter(Boolean);
    } else if (filterKey === "anatomy") {
      return [...new Set(
        poses
          .flatMap((pose) =>
            (pose.anatomy || "")
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          )
      )];
    } else {
      return [...new Set(poses.map((pose) => pose[filterKey]))].filter(Boolean);
    }
  }, [poses, filterKey]);

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