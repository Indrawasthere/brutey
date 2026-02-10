"use client";

import * as THREE from "three";
import React, { useRef, useEffect, useMemo } from "react";
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
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  // Material tweaks with safety checks
  useEffect(() => {
    if (!materials) return;

    const applyMaterialProperties = (
      material: THREE.Material | undefined,
      props: any,
    ) => {
      if (material && material instanceof THREE.MeshStandardMaterial) {
        Object.assign(material, props);
      }
    };

    applyMaterialProperties(materials.roses_mat, {
      metalness: 0.3,
      roughness: 0.6,
    });

    applyMaterialProperties(materials.center_armor_mat, {
      metalness: 0.8,
      roughness: 0.2,
    });

    applyMaterialProperties(materials.top_armor_mat, {
      metalness: 0.7,
      roughness: 0.3,
    });

    applyMaterialProperties(materials.sword_mat, {
      metalness: 0.9,
      roughness: 0.1,
    });

    // Apply to all materials
    Object.values(materials).forEach((material: THREE.Material) => {
      if (material instanceof THREE.MeshStandardMaterial) {
        material.envMapIntensity = 0.8;
        material.needsUpdate = true;
      }
    });
  }, [materials]);

  // Animation handling with safety
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return;

    let action = actions[animation];

    // Fallback to first available action
    if (!action) {
      const availableActions = Object.keys(actions);
      if (availableActions.length > 0) {
        action = actions[availableActions[0] as ActionName];
      }
    }

    if (!action) return;

    action.reset().fadeIn(0.5).play();
    action.timeScale = 0.4;

    return () => {
      action?.fadeOut(0.5);
    };
  }, [actions, animation]);

  const portraitPosition = showFullBody ? [-1.2, 0, 0] : [-0.2, 0, 0];
  const portraitScale = showFullBody ? 0.8 : 2.0;

  // Safe rendering with null checks
  return (
    <group ref={group} {...props} dispose={null}>
      <group
        position={[portraitPosition[0], portraitPosition[1], 0]}
        rotation={[0, Math.PI, 0]}
        scale={portraitScale}
      >
        {/* Knight skeleton */}
        {nodes.GLTF_created_0_rootJoint && (
          <primitive object={nodes.GLTF_created_0_rootJoint} />
        )}

        {/* Roses decoration - only render if Object_4 exists */}
        {nodes.Object_4 && (
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
            {/* Object_5 mungkin tidak ada dalam model Anda */}
          </group>
        )}

        {/* Skinned meshes with safe checks */}
        {nodes.Object_10 && materials.cloak_mat && (
          <skinnedMesh
            geometry={nodes.Object_10.geometry}
            material={materials.cloak_mat}
            skeleton={nodes.Object_10.skeleton}
            castShadow
            receiveShadow
          />
        )}

        {nodes.Object_12 && materials.center_armor_mat && (
          <skinnedMesh
            geometry={nodes.Object_12.geometry}
            material={materials.center_armor_mat}
            skeleton={nodes.Object_12.skeleton}
            castShadow
            receiveShadow
          />
        )}

        {nodes.Object_14 && materials.center_armor_mat && (
          <skinnedMesh
            geometry={nodes.Object_14.geometry}
            material={materials.center_armor_mat}
            skeleton={nodes.Object_14.skeleton}
            castShadow
            receiveShadow
          />
        )}

        {nodes.Object_16 && materials.eye_plug_mat && (
          <skinnedMesh
            geometry={nodes.Object_16.geometry}
            material={materials.eye_plug_mat}
            skeleton={nodes.Object_16.skeleton}
            castShadow
            receiveShadow
          />
        )}

        {nodes.Object_18 && materials.top_armor_mat && (
          <skinnedMesh
            geometry={nodes.Object_18.geometry}
            material={materials.top_armor_mat}
            skeleton={nodes.Object_18.skeleton}
            castShadow
            receiveShadow
          />
        )}

        {nodes.Object_20 && materials.top_armor_mat && (
          <skinnedMesh
            geometry={nodes.Object_20.geometry}
            material={materials.top_armor_mat}
            skeleton={nodes.Object_20.skeleton}
            castShadow
            receiveShadow
          />
        )}

        {nodes.Object_22 && materials.bottom_armor_mat && (
          <skinnedMesh
            geometry={nodes.Object_22.geometry}
            material={materials.bottom_armor_mat}
            skeleton={nodes.Object_22.skeleton}
            castShadow
            receiveShadow
          />
        )}

        {nodes.Object_24 && materials.center_armor_mat && (
          <skinnedMesh
            geometry={nodes.Object_24.geometry}
            material={materials.center_armor_mat}
            skeleton={nodes.Object_24.skeleton}
            castShadow
            receiveShadow
          />
        )}

        {nodes.Object_25 && materials.details_mat && (
          <skinnedMesh
            geometry={nodes.Object_25.geometry}
            material={materials.details_mat}
            skeleton={nodes.Object_25.skeleton}
            castShadow
            receiveShadow
          />
        )}

        {nodes.Object_27 && materials.center_armor_mat && (
          <skinnedMesh
            geometry={nodes.Object_27.geometry}
            material={materials.center_armor_mat}
            skeleton={nodes.Object_27.skeleton}
            castShadow
            receiveShadow
          />
        )}

        {nodes.Object_28 && materials.details_mat && (
          <skinnedMesh
            geometry={nodes.Object_28.geometry}
            material={materials.details_mat}
            skeleton={nodes.Object_28.skeleton}
            castShadow
            receiveShadow
          />
        )}

        {nodes.Object_29 && materials.top_armor_mat && (
          <skinnedMesh
            geometry={nodes.Object_29.geometry}
            material={materials.top_armor_mat}
            skeleton={nodes.Object_29.skeleton}
            castShadow
            receiveShadow
          />
        )}

        {nodes.Object_31 && materials.details_mat && (
          <skinnedMesh
            geometry={nodes.Object_31.geometry}
            material={materials.details_mat}
            skeleton={nodes.Object_31.skeleton}
            castShadow
            receiveShadow
          />
        )}

        {/* Sword */}
        {nodes.Object_103 && materials.sword_mat && (
          <mesh
            geometry={nodes.Object_103.geometry}
            material={materials.sword_mat}
            position={[0, 1.7, 0.3]}
            rotation={[0, 0, -0.1]}
            castShadow
            receiveShadow
          />
        )}
      </group>
    </group>
  );
}

useGLTF.preload("/models/knight-opt.glb");
