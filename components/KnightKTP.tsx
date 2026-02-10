"use client";

import * as THREE from "three";
import React, { useRef, useEffect, useMemo, useState } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF, SkeletonUtils } from "three-stdlib";

type ActionName = "Idle" | "Walk" | "Run" | "Attack";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: any;
  materials: any;
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

  // ═══════════════════════════════════════════════════════════════
  // USE KNIGHT-ULTRA.GLB (4.3MB instead of 77.8MB)
  // ═══════════════════════════════════════════════════════════════
  const { scene, animations } = useGLTF("/models/knight-ultra.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  // ═══════════════════════════════════════════════════════════════
  // MATERIAL OPTIMIZATION
  // Reduce quality on lower-end devices
  // ═══════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!materials) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const envMapIntensity = isMobile ? 0.5 : 0.8;

    // Apply to all materials with safe checks
    Object.values(materials).forEach((material: any) => {
      if (material && material instanceof THREE.MeshStandardMaterial) {
        material.envMapIntensity = envMapIntensity;
        material.needsUpdate = true;
      }
    });
  }, [materials]);

  // ═══════════════════════════════════════════════════════════════
  // ANIMATION HANDLING
  // ═══════════════════════════════════════════════════════════════
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return;

    let action = actions[animation];

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

  // ═══════════════════════════════════════════════════════════════
  // RENDER - Safe with flexible node structure
  // ═══════════════════════════════════════════════════════════════
  return (
    <group ref={group} {...props} dispose={null}>
      <group
        position={[portraitPosition[0], portraitPosition[1], 0]}
        rotation={[0, Math.PI, 0]}
        scale={portraitScale}
      >
        <primitive object={clone} />
      </group>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════
// PRELOAD knight-ultra.glb (4.3MB only!)
// ═══════════════════════════════════════════════════════════════
useGLTF.preload("/models/knight-ultra.glb");
