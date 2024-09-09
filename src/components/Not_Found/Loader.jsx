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
        height: "100vh",
        width: "auto",
        backgroundColor: "#fff",
      }}
    >
      <Lottie
        loop
        animationData={loaderAnimation}
        play
        style={{ width: 400, height: "auto" }}
      />
    </div>
  );
};

export default Loader;
