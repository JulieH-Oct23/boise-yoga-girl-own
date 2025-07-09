// import React from "react";
// import images from "../images";

// const ImageRenderer = ({ imageName, altText }) => {
//   if (!imageName) return null;

//   const nameWithoutExt = imageName.replace(/\.[^/.]+$/, "");
//   const availableKeys = Object.keys(images);
//   const key = availableKeys.find(
//     (k) => k.toLowerCase() === nameWithoutExt.toLowerCase()
//   );

//   const imgSrc = key ? images[key] : images.MissingPhoto;

//   return (
//     <img
//       src={imgSrc}
//       alt={altText || nameWithoutExt}
//       style={{
//         width: "100%",
//         height: "100%",
//         objectFit: "cover", // Use "contain" for padding style
//         borderRadius: "8px",
//       }}
//     />
//   );
// };

// export default ImageRenderer;

// import React from "react";
// import images from "../images";

// const ImageRenderer = ({ imageName, altText }) => {
//   if (!imageName) return null;

//   const nameWithoutExt = imageName.replace(/\.[^/.]+$/, "");
//   const availableKeys = Object.keys(images);
//   const key = availableKeys.find(
//     (k) => k.toLowerCase() === nameWithoutExt.toLowerCase()
//   );

//   const imgSrc = key ? images[key] : images.MissingPhoto;

//   return (
//     <img
//       src={imgSrc}
//       alt={altText || nameWithoutExt}
//       style={{
//         width: "100%",
//         height: "100%",
//         objectFit: "cover", // Use "contain" for padding style
//         borderRadius: "8px",
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
  const key = Object.keys(images).find(
    (k) => k.toLowerCase() === nameWithoutExt.toLowerCase()
  );

  const imgSrc = key ? images[key] : images.MissingPhoto;

  return (
    <img
      src={imgSrc}
      alt={altText || nameWithoutExt}
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        borderRadius: "12px",
      }}
    />
  );
};

export default ImageRenderer;