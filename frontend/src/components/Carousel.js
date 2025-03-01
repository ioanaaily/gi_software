import React from "react";

const carouselImages = [
  process.env.REACT_APP_AWS_S3_BUCKET_URL + "/image1.jpg",
  process.env.REACT_APP_AWS_S3_BUCKET_URL + "/image2.jpg",
  process.env.REACT_APP_AWS_S3_BUCKET_URL + "/image3.jpg"
];

function Carousel() {
  return (
    <div className="w-full flex overflow-x-scroll">
      {carouselImages.map((src, index) => (
        <img key={index} src={src} alt={`carousel-${index}`} className="w-1/3 p-2" />
      ))}
    </div>
  );
}

export default Carousel;
