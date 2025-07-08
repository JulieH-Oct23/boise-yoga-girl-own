// import React from "react";
// import images from "../images";

// const ImageRenderer = ({ imageName, altText }) => {
//   if (!imageName) {
//     console.warn("ImageRenderer: No imageName provided");
//     return null;
//   }

//   const nameWithoutExt = imageName.replace(/\.[^/.]+$/, "");
//   const key = Object.keys(images).find(
//     (k) => k.toLowerCase() === nameWithoutExt.toLowerCase()
//   );

//   const imgSrc = key ? images[key] : images.MissingPhoto;

//   if (!key) {
//     console.warn(
//       `ImageRenderer: Could not find match for "${imageName}". Tried "${nameWithoutExt}".`
//     );
//   }

//   return (
//     <img
//       src={imgSrc}
//       alt={altText || nameWithoutExt}
//       style={{
//         width: "100%",
//         maxHeight: "200px",
//         objectFit: "contain",
//         borderRadius: "12px",
//       }}
//     />
//   );
// };

// export default ImageRenderer;

import React from "react";
import images from "../images";

const ImageRenderer = ({ imageName, altText }) => {
  if (!imageName) return null;

  const nameWithoutExt = imageName.replace(/\.[^/.]+$/, "");
  const availableKeys = Object.keys(images);

  console.log("🧠 From MongoDB:", imageName);
  console.log("🔎 Trying to match key:", nameWithoutExt);
  console.log("🔑 Available keys:", availableKeys);

  const key = availableKeys.find(
    (k) => k.toLowerCase() === nameWithoutExt.toLowerCase()
  );

  const imgSrc = key ? images[key] : images.MissingPhoto;

  if (!key) {
    console.warn(`❌ No match found for "${imageName}".`);
  }

  return (
    <img
      src={imgSrc}
      alt={altText || nameWithoutExt}
      style={{
        width: "100%",
        maxHeight: "200px",
        objectFit: "contain",
        borderRadius: "12px",
      }}
    />
  );
};

export default ImageRenderer;
