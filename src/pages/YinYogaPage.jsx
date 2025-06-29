// import {
//   Box,
//   Heading,
//   SimpleGrid,
//   Spinner,
//   Text,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PoseCard from "../components/PoseCard";
// import images from "../images";

// const YinYogaPage = () => {
//   const yinHipsPoses = [
//     "Butterfly",
//     "Half Butterfly",
//     "Double Pigeon",
//     "Sleeping Swan",
//     "Dragon",
//     "Frog",
//     "Reclined Twist",
//     "Happy Baby",
//     "Savasana",
//   ];

//   const [poses, setPoses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const headingColor = useColorModeValue(
//     "brand.light.mainTitleText",
//     "brand.dark.mainTitleText"
//   );
//   const introTextColor = useColorModeValue("gray.700", "gray.300");
//   const closingTextColor = useColorModeValue("gray.600", "gray.400");

//   const getImageKey = (photoName) =>
//     photoName?.replace(/\s+/g, "").replace(/-/g, "").replace(/'/g, "");

//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);
//     fetch("http://localhost:4000/api/poses")
//       .then((res) => res.json())
//       .then((data) => {
//         const filtered = data.filter((pose) =>
//           yinHipsPoses.some(
//             (name) => name.toLowerCase().trim() === pose.name.toLowerCase().trim()
//           )
//         );
//         const enriched = filtered.map((pose) => ({
//           ...pose,
//           image: images[getImageKey(pose.photoName)] || null,
//         }));
//         setPoses(enriched);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to load Yin hip poses:", err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <Box maxW="900px" mx="auto" p={6} color={useColorModeValue("gray.900", "gray.100")}>
//       <Heading mb={4} color={headingColor} textAlign="center">
//         Yin Yoga: Opening the Hips
//       </Heading>

//       <Text mb={6} fontSize="lg" color={introTextColor} whiteSpace="pre-line">
//         {`Welcome to your yin practice. Today, we will be opening the hips—an area where we tend to store stress, tension, and unspoken emotion. As you settle in, bring your awareness to your breath. Let each inhale nourish you, and each exhale soften and release. You are safe here. Supported. Ready to receive.`}
//       </Text>

//       {loading ? (
//         <Box textAlign="center" py={10}>
//           <Spinner size="xl" />
//           <Text mt={4} fontSize="md">
//             Loading poses...
//           </Text>
//         </Box>
//       ) : (
//         <SimpleGrid columns={[1, 2]} spacing={6} mb={6}>
//           {poses.map((pose) => (
//             <Box
//               key={pose._id}
//               cursor="pointer"
//               onClick={() => navigate(`/pose/${pose._id}`)}
//             >
//               <PoseCard
//                 name={pose.name}
//                 image={pose.image}
//                 cue={pose.cue}
//               />
//             </Box>
//           ))}
//         </SimpleGrid>
//       )}

//       <Text fontSize="md" color={closingTextColor} whiteSpace="pre-line" textAlign="center" mt={10}>
//         {`Begin to bring gentle movement back. Wiggle your fingers and toes. Draw your knees in and roll to one side. Come up slowly. Bring your hands to heart center. Bow to your own courage for showing up and going deep. May the space you have created ripple out into your day.

// Let each breath ground you. Feel supported by the earth.`}
//       </Text>
//     </Box>
//   );
// };

// export default YinYogaPage;

import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PoseCard from "../components/PoseCard";
import images from "../images";

const YinYogaPage = () => {
  const [poses, setPoses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const yinHipsPoses = [
    "Butterfly",
    "Half Butterfly",
    "Double Pigeon",
    "Sleeping Swan",
    "Dragon",
    "Frog",
    "Reclined Twist",
    "Happy Baby",
    "Savasana"
  ];

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

        const ordered = yinHipsPoses
          .map((name) => enriched.find((pose) => pose.name === name))
          .filter(Boolean);

        setPoses(ordered);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching poses:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box px={4} py={6}>
      <Heading color={headingColor} mb={4}>
        Yin Yoga – Hip Opening Sequence
      </Heading>

      {loading ? (
        <Box textAlign="center" mt={10}>
          <Spinner size="xl" color={spinnerColor} />
          <Text color={loadingTextColor} mt={4}>
            Loading poses...
          </Text>
        </Box>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {poses.map((pose) => (
            <PoseCard
              key={pose._id}
              _id={pose._id}
              name={pose.name}
              image={pose.image}
              category={pose.category}
              description={pose.cue}
              onClick={() => navigate(`/poses/${pose._id}`)}
            />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default YinYogaPage;