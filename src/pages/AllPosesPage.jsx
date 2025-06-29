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
        console.log("Fetched poses example:", data[0]); // DEBUG: check anatomy
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

  const filterOptions = useMemo(() => {
    if (!poses.length) return [];

    if (
      filterKey === "category" ||
      filterKey === "indications" ||
      filterKey === "counterIndications" ||
      filterKey === "anatomy"
    ) {
      // flatten arrays and get unique values
      const options = [...new Set(poses.flatMap((pose) => pose[filterKey] || []))].filter(Boolean);
      // Sort options alphabetically for nicer UI
      options.sort((a, b) => a.localeCompare(b));
      return options;
    } else {
      const options = [...new Set(poses.map((pose) => pose[filterKey]))].filter(Boolean);
      options.sort((a, b) => a.localeCompare(b));
      return options;
    }
  }, [poses, filterKey]);

  useEffect(() => {
    if (!filterValue) {
      setFilteredPoses(poses);
    } else if (
      ["category", "indications", "counterIndications", "anatomy"].includes(filterKey)
    ) {
      setFilteredPoses(
        poses.filter((pose) => {
          const field = pose[filterKey];
          if (Array.isArray(field)) {
            return field.some(
              (val) => val.toLowerCase() === filterValue.toLowerCase()
            );
          }
          return false;
        })
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
          borderRadius="md"
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
          borderRadius="md"
          _hover={{ bg: filterBg }}
          _focus={{ borderColor: filterText }}
          icon={<ChevronDownIcon />}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
          }}
        >
          {filterOptions.length === 0 ? (
            <option disabled>No options</option>
          ) : (
            filterOptions.map((val, i) => (
              <option key={i} value={val}>
                {val}
              </option>
            ))
          )}
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