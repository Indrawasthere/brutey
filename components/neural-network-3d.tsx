"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { MathUtils, Vector3, BufferGeometry, BufferAttribute } from "three"
import type { Group, Mesh } from "three"
import { 
  Edges, 
  Float, 
  Sparkles, 
  MeshDistortMaterial,
  MeshWobbleMaterial,
  Text3D,
  Center,
  Wireframe
} from "@react-three/drei"

// Medieval color palette
const MEDIEVAL_COLORS = {
  stoneDark: "#121212",
  stoneMedium: "#1e1e1e",
  iron: "#2a2a2a",
  rust: "#5c3d2e",
  ember: "#ff6b35",
  gold: "#ffd700",
  torch: "#ff4500",
  magic: "#9b59b6",
  blood: "#8b0000",
  steel: "#4a4a4a",
  obsidian: "#0a0a0a",
}

const networkArchitecture = [5, 8, 12, 8, 5, 2]

interface TowerNode {
  position: Vector3
  size: number
  layer: number
  connections: number[]
  type: "tower" | "crystal" | "fortress" | "obelisk"
  rotation: [number, number, number]
}

// Brutalist Tower Node dengan Edges dari drei
function BrutalistTower({ 
  position, 
  size, 
  type, 
  rotation,
  isActive,
  isSignal,
  layer
}: { 
  position: Vector3
  size: number
  type: "tower" | "crystal" | "fortress" | "obelisk"
  rotation: [number, number, number]
  isActive: boolean
  isSignal: boolean
  layer: number
}) {
  const meshRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)
  
  const edgeColor = isActive ? MEDIEVAL_COLORS.ember : 
                     isSignal ? MEDIEVAL_COLORS.gold : 
                     layer === 0 ? MEDIEVAL_COLORS.ember :
                     layer === networkArchitecture.length - 1 ? MEDIEVAL_COLORS.gold :
                     MEDIEVAL_COLORS.steel
  
  const emissive = isActive ? MEDIEVAL_COLORS.ember : 
                  isSignal ? MEDIEVAL_COLORS.torch : 
                  "#000000"

  const baseColor = useMemo(() => {
    switch (type) {
      case "tower": return MEDIEVAL_COLORS.stoneDark
      case "crystal": return MEDIEVAL_COLORS.obsidian
      case "fortress": return MEDIEVAL_COLORS.stoneMedium
      case "obelisk": return MEDIEVAL_COLORS.rust
      default: return MEDIEVAL_COLORS.stoneDark
    }
  }, [type])

  useFrame((state) => {
    if (meshRef.current) {
      const targetScale = isActive ? 1.4 : isSignal ? 1.2 : 1
      meshRef.current.scale.x = MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1)
      meshRef.current.scale.y = MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1)
      meshRef.current.scale.z = MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.1)
    }
  })

  const geometry = useMemo(() => {
    switch (type) {
      case "tower": 
        return <boxGeometry args={[size, size * 2, size]} />
      case "crystal": 
        return <octahedronGeometry args={[size * 0.9, 0]} />
      case "fortress": 
        return <boxGeometry args={[size * 1.3, size * 1.3, size * 1.3]} />
      case "obelisk": 
        return <coneGeometry args={[size * 0.6, size * 2.5, 4]} />
      default: 
        return <boxGeometry args={[size, size, size]} />
    }
  }, [type, size])

  return (
    <Float 
      speed={isActive ? 4 : 1.5} 
      rotationIntensity={0.3} 
      floatIntensity={0.5}
    >
      <group ref={groupRef} position={position} rotation={rotation}>
        <mesh ref={meshRef}>
          {geometry}
          <MeshDistortMaterial
            color={baseColor}
            emissive={emissive}
            emissiveIntensity={isActive ? 4 : isSignal ? 2 : 0.3}
            roughness={0.7}
            metalness={0.8}
            distort={isActive ? 0.3 : 0}
            speed={isActive ? 3 : 1}
            flatShading
          />
          {/* Sharp edges untuk brutalist look */}
          <Edges 
            scale={1}
            threshold={15}
            color={edgeColor}
          />
        </mesh>
        
        {/* Inner glow mesh */}
        <mesh scale={0.95}>
          {geometry}
          <meshBasicMaterial 
            color={isActive ? MEDIEVAL_COLORS.ember : isSignal ? MEDIEVAL_COLORS.gold : MEDIEVAL_COLORS.obsidian} 
            transparent 
            opacity={0.1}
          />
        </mesh>
      </group>
    </Float>
  )
}

// Iron Chain dengan physical chain look
function IronChain3D({ start, end, isActive }: { start: Vector3; end: Vector3; isActive: boolean }) {
  const groupRef = useRef<Group>(null)
  
  const chainData = useMemo(() => {
    const dist = start.distanceTo(end)
    const segments = Math.floor(dist * 4)
    const items = []
    
    for (let i = 0; i <= segments; i++) {
      const t = i / segments
      const pos = new Vector3().lerpVectors(start, end, t)
      // Sagging effect
      pos.y -= Math.sin(t * Math.PI) * 0.15
      pos.x += Math.sin(t * Math.PI * 2) * 0.02
      
      items.push({
        position: pos,
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        scale: isActive ? 1.2 : 1
      })
    }
    return items
  }, [start, end, isActive])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.z += Math.sin(state.clock.elapsedTime * 2 + i) * 0.005
      })
    }
  })

  return (
    <group ref={groupRef}>
      {chainData.map((chain, i) => (
        <mesh 
          key={i} 
          position={chain.position as [number, number, number]}
          rotation={chain.rotation}
        >
          <torusGeometry args={[0.04, 0.015, 8, 6]} />
          <meshStandardMaterial
            color={isActive ? MEDIEVAL_COLORS.ember : MEDIEVAL_COLORS.iron}
            emissive={isActive ? MEDIEVAL_COLORS.ember : "#000000"}
            emissiveIntensity={isActive ? 2 : 0}
            metalness={0.95}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  )
}

// Main Medieval Network Scene
function MedievalNetwork() {
  const groupRef = useRef<Group>(null)
  const { pointer } = useThree()

  const nodes = useMemo<TowerNode[]>(() => {
    const towerNodes: TowerNode[] = []
    let nodeIndex = 0
    const types: ("tower" | "crystal" | "fortress" | "obelisk")[] = ["tower", "crystal", "fortress", "obelisk"]

    networkArchitecture.forEach((count, layer) => {
      const layerSpacing = 3
      const nodeSpacing = 1

      for (let i = 0; i < count; i++) {
        const x = (layer - networkArchitecture.length / 2) * layerSpacing
        const y = (i - count / 2) * nodeSpacing + (Math.random() - 0.5) * 0.5
        const z = (Math.random() - 0.5) * 2.5

        const connections: number[] = []
        if (layer > 0) {
          const prevLayerCount = networkArchitecture[layer - 1]
          const numConnections = Math.floor(Math.random() * 2) + 1
          for (let c = 0; c < numConnections; c++) {
            const targetIndex = Math.floor(Math.random() * prevLayerCount)
            let targetNodeIndex = 0
            for (let pl = 0; pl < layer - 1; pl++) {
              targetNodeIndex += networkArchitecture[pl]
            }
            targetNodeIndex += targetIndex
            if (targetNodeIndex < nodeIndex) {
              connections.push(targetNodeIndex)
            }
          }
        }

        const type = layer === 0 ? "obelisk" : 
                     layer === networkArchitecture.length - 1 ? "fortress" : 
                     types[layer % 4]

        towerNodes.push({
          position: new Vector3(x, y, z),
          size: layer === 0 || layer === networkArchitecture.length - 1 ? 0.3 : 0.2,
          layer,
          connections,
          type,
          rotation: [
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2
          ] as [number, number, number],
        })
        nodeIndex++
      }
    })

    return towerNodes
  }, [])

  const signalPathRef = useRef<number[]>([])
  const signalProgressRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const inputLayer = Math.floor(Math.random() * networkArchitecture[0])
      let startIndex = 0
      for (let i = 0; i < 0; i++) {
        startIndex += networkArchitecture[i]
      }
      const signalNode = startIndex + inputLayer
      signalPathRef.current = [signalNode]
      signalProgressRef.current = 0

      let currentNode = signalNode
      const path: number[] = [currentNode]

      while (currentNode < nodes.length - networkArchitecture[networkArchitecture.length - 1]) {
        const possibleConnections = nodes
          .slice(
            nodes.findIndex((n) => n.layer === nodes[currentNode].layer + 1),
            nodes.findIndex((n) => n.layer === nodes[currentNode].layer + 2),
          )
          .filter((n) => {
            const dx = n.position.x - nodes[currentNode].position.x
            const dy = n.position.y - nodes[currentNode].position.y
            return Math.sqrt(dx * dx + dy * dy) < 4
          })

        if (possibleConnections.length > 0) {
          const nextNode = possibleConnections[Math.floor(Math.random() * possibleConnections.length)]
          currentNode = nodes.indexOf(nextNode)
          path.push(currentNode)
        } else {
          break
        }
      }

      signalPathRef.current = path
    }, 4000)

    return () => clearInterval(interval)
  }, [nodes])

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow, heavy fortress rotation
      groupRef.current.rotation.y += delta * 0.012
      const targetX = pointer.x * 0.03
      const targetY = pointer.y * 0.03
      groupRef.current.rotation.x = MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.01)
      groupRef.current.rotation.z = MathUtils.lerp(groupRef.current.rotation.z, -targetX, 0.01)
    }

    if (signalProgressRef.current < signalPathRef.current.length - 1) {
      signalProgressRef.current += delta * 1.5
    } else {
      signalProgressRef.current = 0
    }
  })

  return (
    <group ref={groupRef}>
      {/* Render nodes */}
      {nodes.map((node, index) => {
        const isActive = signalPathRef.current.includes(index)
        const isSignal = signalPathRef.current.includes(index) && 
                        signalPathRef.current.includes(index + 1)

        return (
          <BrutalistTower
            key={index}
            position={node.position}
            size={node.size}
            type={node.type}
            rotation={node.rotation}
            isActive={isActive}
            isSignal={isSignal}
            layer={node.layer}
          />
        )
      })}

      {/* Iron chains */}
      {nodes.map((node, index) =>
        node.connections.map((targetIndex) => {
          const target = nodes[targetIndex]
          const isActive =
            signalPathRef.current.includes(index) &&
            signalPathRef.current.includes(targetIndex) &&
            signalPathRef.current.indexOf(index) < signalPathRef.current.indexOf(targetIndex)

          return (
            <IronChain3D
              key={`${index}-${targetIndex}`}
              start={node.position}
              end={target.position}
              isActive={isActive}
            />
          )
        }),
      )}

      {/* Signal energy orbs */}
      {signalPathRef.current.map((nodeIndex, i) => {
        if (i >= signalPathRef.current.length - 1) return null

        const current = nodes[nodeIndex]
        const next = nodes[signalPathRef.current[i + 1]]
        const progress = signalProgressRef.current
        const x = MathUtils.lerp(current.position.x, next.position.x, progress)
        const y = MathUtils.lerp(current.position.y, next.position.y, progress)
        const z = MathUtils.lerp(current.position.z, next.position.z, progress)

        return (
          <Float key={`signal-${i}`} speed={10} floatIntensity={0}>
            <mesh position={[x, y, z]}>
              <dodecahedronGeometry args={[0.08, 0]} />
              <meshBasicMaterial color={MEDIEVAL_COLORS.ember} />
              <pointLight color={MEDIEVAL_COLORS.ember} intensity={2} distance={3} />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

// Fortress shield barrier
function FortressShield() {
  const meshRef = useRef<Mesh>(null)
  const innerRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.008
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -state.clock.elapsedTime * 0.006
    }
  })

  return (
    <group position={[0, 0, -4]}>
      {/* Outer barrier */}
      <mesh ref={meshRef} scale={[4, 3.5, 3.5]}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshBasicMaterial 
          color={MEDIEVAL_COLORS.ember} 
          wireframe 
          transparent 
          opacity={0.08}
        />
      </mesh>
      
      {/* Inner shield */}
      <mesh ref={innerRef} scale={[3.5, 3, 3]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial 
          color={MEDIEVAL_COLORS.gold} 
          wireframe 
          transparent 
          opacity={0.05}
        />
      </mesh>
      
      {/* Energy lines */}
      <mesh scale={[3.8, 3.3, 3.3]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial 
          color={MEDIEVAL_COLORS.torch} 
          wireframe 
          transparent 
          opacity={0.03}
        />
      </mesh>
    </group>
  )
}

// Floating dungeon debris
function DungeonDebris() {
  const debris = useMemo(() => {
    const items = []
    for (let i = 0; i < 25; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 15 - 5,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        size: Math.random() * 0.1 + 0.02,
        speed: Math.random() * 0.5 + 0.2,
      })
    }
    return items
  }, [])

  return (
    <group>
      {debris.map((d, i) => (
        <Float 
          key={i}
          speed={d.speed} 
          rotationIntensity={1} 
          floatIntensity={2}
          floatingRange={[-0.5, 0.5]}
        >
          <mesh position={d.position} rotation={d.rotation}>
            <tetrahedronGeometry args={[d.size, 0]} />
            <meshStandardMaterial
              color={Math.random() > 0.5 ? MEDIEVAL_COLORS.stoneMedium : MEDIEVAL_COLORS.iron}
              roughness={0.9}
              metalness={0.6}
              flatShading
            />
            <Edges color={MEDIEVAL_COLORS.steel} threshold={20} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// Magical runes in background
function AncientRunes() {
  const runes = useMemo(() => {
    const items = []
    const runeChars = ["⚔", "♜", "♝", "⚔", "♛", "♚"]
    for (let i = 0; i < 8; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 25,
          (Math.random() - 0.5) * 25,
          -8 - Math.random() * 5,
        ] as [number, number, number],
        char: runeChars[i % runeChars.length],
        size: Math.random() * 0.5 + 0.3,
      })
    }
    return items
  }, [])

  return (
    <group>
      {runes.map((rune, i) => (
        <Float key={i} speed={0.3} floatIntensity={0.5}>
          <mesh position={rune.position as [number, number, number]}>
            <planeGeometry args={[rune.size, rune.size]} />
            <meshBasicMaterial 
              color={MEDIEVAL_COLORS.gold} 
              transparent 
              opacity={0.15}
              side={2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export function NeuralNetwork3D() {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-64 h-64 border-2 border-primary/30 animate-pulse" />
      </div>
    )
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 45 }}
      className="w-full h-full"
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      {/* Torch-lit dungeon atmosphere */}
      <ambientLight intensity={0.15} color="#ff6b35" />
      
      {/* Main torch */}
      <directionalLight position={[8, 8, 8]} intensity={0.8} color="#ff8c42" />
      
      {/* Secondary torch */}
      <directionalLight position={[-6, -4, 6]} intensity={0.5} color="#ffd700" />
      
      {/* Ember glow from below */}
      <pointLight position={[0, -8, 0]} intensity={0.6} color="#ff4500" />
      
      {/* Magic accent */}
      <pointLight position={[5, 5, -5]} intensity={0.3} color="#9b59b6" />

      {/* Scene fog */}
      <fog attach="fog" args={["#0a0a0a", 12, 30]} />

      {/* Sparkles - Magic embers */}
      <Sparkles
        count={100}
        scale={25}
        size={isMobile ? 2 : 4}
        speed={0.3}
        opacity={0.6}
        color={MEDIEVAL_COLORS.ember}
      />
      
      {/* Additional gold sparkles */}
      <Sparkles
        count={30}
        scale={20}
        size={3}
        speed={0.2}
        opacity={0.4}
        color={MEDIEVAL_COLORS.gold}
      />

      {/* Medieval scene */}
      <MedievalNetwork />
      <FortressShield />
      <DungeonDebris />
      <AncientRunes />
    </Canvas>
  )
}

