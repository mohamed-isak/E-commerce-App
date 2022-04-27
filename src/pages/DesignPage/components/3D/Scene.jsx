import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./Model";
import { Environment, OrbitControls } from "@react-three/drei";

const Scene = ({ gltfModelPath, imagePath }) => {
  return (
    <div className="h-100">
      <Canvas dpr={[1, 2]} camera={{ fov: 35, position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Model gltfModelPath={gltfModelPath} imagePath={imagePath} />
          <OrbitControls />
          <Environment preset="studio" background />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
