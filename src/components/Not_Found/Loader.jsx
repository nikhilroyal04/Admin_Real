import React from "react";
import Lottie from "react-lottie-player";
import loaderAnimation from "../../assets/animation/200-loader.json";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        width: "auto",
      }}
    >
      <Lottie
        loop
        animationData={loaderAnimation}
        play
        style={{ width: 300, height: "auto" }}
      />
    </div>
  );
};

export default Loader;
