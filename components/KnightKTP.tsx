"use client";

import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF, SkeletonUtils } from "three-stdlib";

type ActionName = "Idle" | "Walk" | "Run" | "Attack";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Object_4: THREE.Mesh;
    Object_5: THREE.Mesh;
    Object_10: THREE.SkinnedMesh;
    Object_12: THREE.SkinnedMesh;
    Object_14: THREE.SkinnedMesh;
    Object_16: THREE.SkinnedMesh;
    Object_18: THREE.SkinnedMesh;
    Object_20: THREE.SkinnedMesh;
    Object_22: THREE.SkinnedMesh;
    Object_24: THREE.SkinnedMesh;
    Object_25: THREE.SkinnedMesh;
    Object_27: THREE.SkinnedMesh;
    Object_28: THREE.SkinnedMesh;
    Object_29: THREE.SkinnedMesh;
    Object_31: THREE.SkinnedMesh;
    Object_103: THREE.Mesh;
    GLTF_created_0_rootJoint: THREE.Bone;
  };
  materials: {
    roses_mat: THREE.MeshStandardMaterial;
    cloak_mat: THREE.MeshStandardMaterial;
    center_armor_mat: THREE.MeshStandardMaterial;
    eye_plug_mat: THREE.MeshStandardMaterial;
    top_armor_mat: THREE.MeshStandardMaterial;
    bottom_armor_mat: THREE.MeshStandardMaterial;
    details_mat: THREE.MeshStandardMaterial;
    sword_mat: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type KnightKTPProps = JSX.IntrinsicElements["group"] & {
  showFullBody?: boolean;
  animation?: ActionName;
};

export function KnightKTP({
  showFullBody = false,
  animation = "Idle",
  ...props
}: KnightKTPProps) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/knight-opt.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    materials.roses_mat.metalness = 0.3;
    materials.roses_mat.roughness = 0.6;

    materials.center_armor_mat.metalness = 0.8;
    materials.center_armor_mat.roughness = 0.2;
    materials.top_armor_mat.metalness = 0.7;
    materials.top_armor_mat.roughness = 0.3;

    materials.sword_mat.metalness = 0.9;
    materials.sword_mat.roughness = 0.1;

    Object.values(materials).forEach((material) => {
      material.envMapIntensity = 0.8;
      material.needsUpdate = true;
    });
  }, [materials]);

  useEffect(() => {
    if (actions[animation]) {
      const action = actions[animation];
      action?.reset().fadeIn(0.5).play();

      if (action) {
        action.timeScale = 0.4;
      }

      return () => {
        action?.fadeOut(0.5);
      };
    }
  }, [actions, animation]);

  const portraitPosition = showFullBody ? [-1.2, 0, 0] : [-0.2, 0, 0];
  const portraitScale = showFullBody ? 0.8 : 2.0;

  return (
    <group ref={group} {...props} dispose={null}>
      <group
        position={[portraitPosition[0], portraitPosition[1], 0]}
        rotation={[0, Math.PI, 0]} // Selalu hadap ke depan
        scale={portraitScale}
      >
        {/* Knight skeleton and body parts */}
        <primitive object={nodes.GLTF_created_0_rootJoint} />

        {/* Roses decoration*/}
        <group
          position={[0.248, 1.783, 0.363]}
          rotation={[2.443, -1.393, -0.88]}
          scale={0.496}
        >
          <mesh
            geometry={nodes.Object_4.geometry}
            material={materials.roses_mat}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_5.geometry}
            material={materials.roses_mat}
            castShadow
            receiveShadow
          />
        </group>

        {/* Skinned meshes */}
        {[
          { node: nodes.Object_10, material: materials.cloak_mat },
          { node: nodes.Object_12, material: materials.center_armor_mat },
          { node: nodes.Object_14, material: materials.center_armor_mat },
          { node: nodes.Object_16, material: materials.eye_plug_mat },
          { node: nodes.Object_18, material: materials.top_armor_mat },
          { node: nodes.Object_20, material: materials.top_armor_mat },
          { node: nodes.Object_24, material: materials.center_armor_mat },
          { node: nodes.Object_25, material: materials.details_mat },
          { node: nodes.Object_27, material: materials.center_armor_mat },
          { node: nodes.Object_28, material: materials.details_mat },
          { node: nodes.Object_29, material: materials.top_armor_mat },
          { node: nodes.Object_31, material: materials.details_mat },
        ].map(({ node, material }, index) => (
          <skinnedMesh
            key={index}
            geometry={node.geometry}
            material={material}
            skeleton={node.skeleton}
            castShadow
            receiveShadow
          />
        ))}

        {/* Sword */}
        <mesh
          geometry={nodes.Object_103.geometry}
          material={materials.sword_mat}
          position={[0, 1.7, 0.3]}
          rotation={[0, 0, -0.1]}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/knight-opt.glb");
