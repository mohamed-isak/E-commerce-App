import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { cloneDeep } from "lodash";

const Model = ({ gltfModelPath, imagePath }) => {
  const { nodes, materials } = useLoader(GLTFLoader, gltfModelPath);
  const texture = useLoader(TextureLoader, imagePath);
  const newMaterial = cloneDeep(materials.T_shirt);
  newMaterial.map = texture;
  return (
    <>
      <group dispose={null} scale={0.007} position={[0, -0.9, 0]}>
        <mesh
          geometry={nodes.body_LP_T_shirt_0.geometry}
          material={newMaterial}
        />
        <mesh
          geometry={nodes.bottom_LP_T_shirt_0.geometry}
          material={materials.T_shirt}
        />
        <mesh
          geometry={nodes.f_LP_T_shirt_0.geometry}
          material={materials.T_shirt}
        />
        <mesh
          geometry={nodes.up_LP_T_shirt_0.geometry}
          material={materials.T_shirt}
        />
      </group>
    </>
  );
};

export default Model;
