import React from "react";
import Lottie from "react-lottie-player";
import loaderAnimation from "../../assets/animation/200-NoData.json"; 

const NoData = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: "auto",
      }}
    >
      <Lottie
        loop
        animationData={loaderAnimation}
        play
        style={{ width: 300, height: 500, }}
      />
    </div>
  );
};

export default NoData;
