"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

// ═══════════════════════════════════════════════════════════════
// EPIC DARK FANTASY KNIGHT
// Inspired by Dark Souls / Medieval Fantasy Art
// More detailed & atmospheric than V1
// ═══════════════════════════════════════════════════════════════

interface KnightProps {
  isHovered: boolean
}

function EpicKnight({ isHovered }: KnightProps) {
  const [windPhase, setWindPhase] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWindPhase(prev => prev + 0.04)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const capeFlow = Math.sin(windPhase) * (isHovered ? 15 : 8)
  const capeFlow2 = Math.sin(windPhase + 0.8) * (isHovered ? 12 : 6)

  return (
    <svg
      viewBox="0 0 600 800"
      className="w-full h-full"
      style={{ 
        filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.9)) drop-shadow(0 0 40px rgba(124, 45, 18, 0.2))'
      }}
    >
      <defs>
        {/* Gradient for depth */}
        <linearGradient id="armor-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="50%" stopColor="#27272a" />
          <stop offset="100%" stopColor="#18181b" />
        </linearGradient>
        
        <linearGradient id="cape-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7c2d12" />
          <stop offset="100%" stopColor="#450a0a" />
        </linearGradient>

        <linearGradient id="sword-shine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#52525b" />
          <stop offset="50%" stopColor="#a1a1aa" />
          <stop offset="100%" stopColor="#52525b" />
        </linearGradient>
      </defs>

      {/* ═══════════════════════════════════════════════════════════
          FLOWING CAPE - Dynamic wind animation
          ═══════════════════════════════════════════════════════ */}
      <g opacity={isHovered ? "1" : "0.9"}>
        {/* Main cape body */}
        <motion.path
          d={`
            M 280 180
            Q ${260 + capeFlow} 280 240 400
            Q ${220 + capeFlow2} 520 ${200 + capeFlow} 640
            L ${400 - capeFlow} 640
            Q ${380 - capeFlow2} 520 360 400
            Q ${340 - capeFlow} 280 320 180
            Z
          `}
          fill="url(#cape-gradient)"
          stroke="#7c2d12"
          strokeWidth="3"
          animate={{
            opacity: isHovered ? 1 : 0.85,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Cape shadow/depth */}
        <motion.path
          d={`
            M 285 190
            Q ${265 + capeFlow} 290 245 410
            Q ${225 + capeFlow2} 530 ${210 + capeFlow} 630
            L ${220 + capeFlow} 630
            Q ${230 + capeFlow2} 530 250 410
            Q ${270 + capeFlow} 290 290 190
            Z
          `}
          fill="#0a0a0a"
          opacity="0.4"
        />

        {/* Cape highlights */}
        <motion.path
          d={`M 300 200 Q ${290 + capeFlow * 0.5} 300 295 380`}
          stroke="#ea580c"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
          animate={{
            opacity: isHovered ? 0.5 : 0.3,
          }}
        />
      </g>

      {/* ═══════════════════════════════════════════════════════════
          KNIGHT BODY - Detailed armor
          ═══════════════════════════════════════════════════════ */}
      
      {/* Main torso */}
      <motion.g
        animate={{
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Chest plate - main */}
        <rect
          x="260"
          y="260"
          width="80"
          height="140"
          fill="url(#armor-gradient)"
          stroke="#52525b"
          strokeWidth="4"
          rx="4"
        />

        {/* Chest plate - details */}
        <rect
          x="268"
          y="270"
          width="64"
          height="120"
          fill="#27272a"
          stroke="#71717a"
          strokeWidth="2"
        />

        {/* Chest emblem */}
        <circle
          cx="300"
          cy="310"
          r="18"
          fill="#18181b"
          stroke="#7c2d12"
          strokeWidth="3"
        />
        <circle
          cx="300"
          cy="310"
          r="10"
          fill="#7c2d12"
          opacity="0.8"
        />

        {/* Armor plates - horizontal lines */}
        {[290, 320, 350, 380].map((y, i) => (
          <line
            key={`plate-${i}`}
            x1="268"
            y1={y}
            x2="332"
            y2={y}
            stroke="#18181b"
            strokeWidth="2"
          />
        ))}

        {/* Belt */}
        <rect
          x="255"
          y="395"
          width="90"
          height="12"
          fill="#7c2d12"
          stroke="#450a0a"
          strokeWidth="2"
        />

        {/* Belt buckle */}
        <rect
          x="295"
          y="398"
          width="10"
          height="6"
          fill="#ea580c"
        />
      </motion.g>

      {/* ═══════════════════════════════════════════════════════════
          SHOULDERS - Pauldrons
          ═══════════════════════════════════════════════════════ */}
      
      <motion.g
        animate={{
          x: isHovered ? -3 : 0,
          y: isHovered ? -6 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Left shoulder */}
        <ellipse
          cx="250"
          cy="255"
          rx="35"
          ry="30"
          fill="url(#armor-gradient)"
          stroke="#52525b"
          strokeWidth="4"
        />
        <ellipse
          cx="250"
          cy="255"
          rx="28"
          ry="23"
          fill="#27272a"
          stroke="#71717a"
          strokeWidth="2"
        />
        
        {/* Shoulder spikes */}
        <polygon
          points="235,240 245,250 238,252"
          fill="#52525b"
        />
        <polygon
          points="265,240 255,250 262,252"
          fill="#52525b"
        />
      </motion.g>

      <motion.g
        animate={{
          x: isHovered ? 3 : 0,
          y: isHovered ? -6 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Right shoulder */}
        <ellipse
          cx="350"
          cy="255"
          rx="35"
          ry="30"
          fill="url(#armor-gradient)"
          stroke="#52525b"
          strokeWidth="4"
        />
        <ellipse
          cx="350"
          cy="255"
          rx="28"
          ry="23"
          fill="#27272a"
          stroke="#71717a"
          strokeWidth="2"
        />

        {/* Shoulder spikes */}
        <polygon
          points="335,240 345,250 338,252"
          fill="#52525b"
        />
        <polygon
          points="365,240 355,250 362,252"
          fill="#52525b"
        />
      </motion.g>

      {/* ═══════════════════════════════════════════════════════════
          HELMET - Detailed great helm
          ═══════════════════════════════════════════════════════ */}
      
      <motion.g
        animate={{
          y: isHovered ? -10 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Helmet main */}
        <rect
          x="265"
          y="150"
          width="70"
          height="100"
          rx="6"
          fill="url(#armor-gradient)"
          stroke="#52525b"
          strokeWidth="4"
        />

        {/* Helmet face plate */}
        <rect
          x="270"
          y="160"
          width="60"
          height="85"
          rx="4"
          fill="#18181b"
          stroke="#71717a"
          strokeWidth="2"
        />

        {/* Visor slit - glowing eyes effect */}
        <motion.rect
          x="275"
          y="190"
          width="50"
          height="12"
          fill="#7c2d12"
          animate={{
            fill: isHovered ? "#ea580c" : "#7c2d12",
            opacity: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Eye glow effect when hovered */}
        {isHovered && (
          <>
            <motion.rect
              x="282"
              y="193"
              width="15"
              height="6"
              fill="#ff6b35"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.rect
              x="303"
              y="193"
              width="15"
              height="6"
              fill="#ff6b35"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
            />
          </>
        )}

        {/* Breathing holes */}
        {[215, 220, 225].map((y, i) => (
          <line
            key={`breath-${i}`}
            x1="285"
            y1={y}
            x2="315"
            y2={y}
            stroke="#0a0a0a"
            strokeWidth="3"
          />
        ))}

        {/* Helmet crest */}
        <motion.polygon
          points="300,150 280,170 320,170"
          fill="#7c2d12"
          stroke="#450a0a"
          strokeWidth="3"
          animate={{
            points: isHovered 
              ? "300,145 280,165 320,165"
              : "300,150 280,170 320,170",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Crest detail */}
        <circle
          cx="300"
          cy="162"
          r="4"
          fill="#ea580c"
        />
      </motion.g>

      {/* ═══════════════════════════════════════════════════════════
          SHIELD - Left arm with detailed shield
          ═══════════════════════════════════════════════════════ */}
      
      <motion.g
        animate={{
          x: isHovered ? -12 : -5,
          rotate: isHovered ? -8 : -5,
        }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: "200px 320px" }}
      >
        {/* Shield - main body */}
        <ellipse
          cx="200"
          cy="320"
          rx="45"
          ry="70"
          fill="url(#armor-gradient)"
          stroke="#52525b"
          strokeWidth="5"
        />

        {/* Shield - inner layer */}
        <ellipse
          cx="200"
          cy="320"
          rx="38"
          ry="63"
          fill="#27272a"
          stroke="#71717a"
          strokeWidth="2"
        />

        {/* Shield emblem - center boss */}
        <circle
          cx="200"
          cy="320"
          r="22"
          fill="#18181b"
          stroke="#7c2d12"
          strokeWidth="4"
        />

        <circle
          cx="200"
          cy="320"
          r="14"
          fill="#7c2d12"
          opacity="0.8"
        />

        {/* Shield rivets */}
        {[280, 320, 360].map((y, i) => (
          <>
            <circle key={`rivet-l-${i}`} cx="175" cy={y} r="3" fill="#52525b" />
            <circle key={`rivet-r-${i}`} cx="225" cy={y} r="3" fill="#52525b" />
          </>
        ))}

        {/* Arm behind shield */}
        <rect
          x="195"
          y="270"
          width="20"
          height="60"
          fill="#27272a"
          stroke="#18181b"
          strokeWidth="2"
          opacity="0.6"
        />
      </motion.g>

      {/* ═══════════════════════════════════════════════════════════
          SWORD - Right arm with epic blade
          ═══════════════════════════════════════════════════════ */}
      
      <motion.g
        animate={{
          rotate: isHovered ? -35 : -15,
          x: isHovered ? 25 : 10,
          y: isHovered ? -30 : -5,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ transformOrigin: "380px 300px" }}
      >
        {/* Blade - main */}
        <rect
          x="375"
          y="180"
          width="16"
          height="180"
          fill="url(#sword-shine)"
          stroke="#d4d4d8"
          strokeWidth="3"
        />

        {/* Blade - center shine */}
        <rect
          x="380"
          y="190"
          width="6"
          height="160"
          fill="#e4e4e7"
          opacity="0.7"
        />

        {/* Blade - edge highlight */}
        <motion.rect
          x="377"
          y="185"
          width="2"
          height="170"
          fill="#fafafa"
          animate={{
            opacity: isHovered ? 0.9 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Blood groove */}
        <line
          x1="383"
          y1="195"
          x2="383"
          y2="350"
          stroke="#18181b"
          strokeWidth="2"
        />

        {/* Crossguard */}
        <rect
          x="350"
          y="360"
          width="72"
          height="14"
          fill="#7c2d12"
          stroke="#450a0a"
          strokeWidth="3"
          rx="2"
        />

        {/* Crossguard detail */}
        <rect
          x="353"
          y="363"
          width="66"
          height="8"
          fill="#ea580c"
          opacity="0.5"
        />

        {/* Grip */}
        <rect
          x="378"
          y="374"
          width="10"
          height="45"
          fill="#27272a"
          stroke="#18181b"
          strokeWidth="2"
        />

        {/* Grip wrapping */}
        {[380, 390, 400, 410].map((y, i) => (
          <line
            key={`grip-${i}`}
            x1="378"
            y1={y}
            x2="388"
            y2={y}
            stroke="#18181b"
            strokeWidth="1.5"
          />
        ))}

        {/* Pommel */}
        <circle
          cx="383"
          cy="427"
          r="10"
          fill="#7c2d12"
          stroke="#450a0a"
          strokeWidth="3"
        />

        <circle
          cx="383"
          cy="427"
          r="5"
          fill="#ea580c"
          opacity="0.6"
        />
      </motion.g>

      {/* ═══════════════════════════════════════════════════════════
          LEGS - Armored greaves
          ═══════════════════════════════════════════════════════ */}
      
      <motion.g
        animate={{
          x: isHovered ? -2 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Left leg */}
        <rect
          x="270"
          y="407"
          width="28"
          height="130"
          fill="url(#armor-gradient)"
          stroke="#52525b"
          strokeWidth="3"
          rx="2"
        />

        {/* Knee plate */}
        <ellipse
          cx="284"
          cy="460"
          rx="16"
          ry="14"
          fill="#27272a"
          stroke="#71717a"
          strokeWidth="2"
        />
      </motion.g>

      <motion.g
        animate={{
          x: isHovered ? 2 : 0,
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Right leg */}
        <rect
          x="302"
          y="407"
          width="28"
          height="130"
          fill="url(#armor-gradient)"
          stroke="#52525b"
          strokeWidth="3"
          rx="2"
        />

        {/* Knee plate */}
        <ellipse
          cx="316"
          cy="460"
          rx="16"
          ry="14"
          fill="#27272a"
          stroke="#71717a"
          strokeWidth="2"
        />
      </motion.g>

      {/* Boots */}
      <rect
        x="265"
        y="537"
        width="35"
        height="40"
        fill="#18181b"
        stroke="#52525b"
        strokeWidth="3"
        rx="3"
      />
      <rect
        x="300"
        y="537"
        width="35"
        height="40"
        fill="#18181b"
        stroke="#52525b"
        strokeWidth="3"
        rx="3"
      />

      {/* ═══════════════════════════════════════════════════════════
          EFFECTS - Glow, particles when hovered
          ═══════════════════════════════════════════════════════ */}
      
      {isHovered && (
        <>
          {/* Sword glow */}
          <motion.rect
            x="370"
            y="175"
            width="26"
            height="190"
            fill="#a1a1aa"
            opacity="0.15"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Battle aura */}
          <motion.circle
            cx="300"
            cy="320"
            r="120"
            fill="#7c2d12"
            opacity="0.05"
            initial={{ scale: 0.9 }}
            animate={{ scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Embers rising */}
          {[...Array(10)].map((_, i) => (
            <motion.circle
              key={`ember-${i}`}
              cx={250 + Math.random() * 100}
              cy={580}
              r={1.5 + Math.random()}
              fill="#ea580c"
              initial={{ y: 0, opacity: 1 }}
              animate={{
                y: -200 - Math.random() * 100,
                opacity: 0,
                x: (Math.random() - 0.5) * 60,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════
// CASTLE SILHOUETTE - Dark fantasy background
// ═══════════════════════════════════════════════════════════════

function DarkCastle() {
  return (
    <svg
      viewBox="0 0 1920 1080"
      className="absolute inset-0 w-full h-full opacity-15"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Sky gradient */}
      <defs>
        <linearGradient id="sky-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a0a0a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#18181b" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Background mountains */}
      <path
        d="M 0 900 L 300 750 L 500 800 L 700 720 L 900 780 L 1100 700 L 1300 770 L 1500 720 L 1700 790 L 1920 760 L 1920 1080 L 0 1080 Z"
        fill="url(#sky-grad)"
      />

      {/* Main fortress */}
      <g opacity="0.7">
        {/* Central keep */}
        <rect x="860" y="350" width="200" height="730" fill="#0a0a0a" />
        
        {/* Keep roof */}
        <polygon points="860,350 960,220 1060,350" fill="#0a0a0a" />
        
        {/* Tower spire */}
        <polygon points="920,220 960,120 1000,220" fill="#0a0a0a" />
        
        {/* Windows with glow */}
        {[440, 530, 620, 710, 800, 890, 980].map((y) => (
          <rect 
            key={y}
            x="920" 
            y={y} 
            width="80" 
            height="50" 
            fill="#7c2d12" 
            opacity="0.4"
          />
        ))}

        {/* Side towers */}
        <rect x="680" y="520" width="160" height="560" fill="#18181b" />
        <polygon points="680,520 760,430 840,520" fill="#18181b" />
        
        <rect x="1080" y="520" width="160" height="560" fill="#18181b" />
        <polygon points="1080,520 1160,430 1240,520" fill="#18181b" />

        {/* Outer towers */}
        <rect x="560" y="680" width="100" height="400" fill="#0a0a0a" />
        <rect x="1260" y="680" width="100" height="400" fill="#0a0a0a" />
        
        {/* Battlements */}
        {Array.from({ length: 20 }).map((_, i) => (
          <rect 
            key={`batt-${i}`}
            x={640 + i * 30} 
            y={510} 
            width={18} 
            height={30} 
            fill="#18181b"
          />
        ))}
      </g>

      {/* Distant ruins */}
      <g opacity="0.3">
        <rect x="150" y="800" width="80" height="280" fill="#18181b" />
        <polygon points="150,800 190,750 230,800" fill="#18181b" />
        
        <rect x="1650" y="820" width="90" height="260" fill="#18181b" />
        <polygon points="1650,820 1695,760 1740,820" fill="#18181b" />
      </g>
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════
// ATMOSPHERIC PARTICLES
// ═══════════════════════════════════════════════════════════════

function Atmosphere() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating ash/dust */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute w-1 h-1 bg-muted-foreground/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -150 - Math.random() * 100],
            x: [(Math.random() - 0.5) * 60, (Math.random() - 0.5) * 120],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}

      {/* Embers */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`ember-${i}`}
          className="absolute w-1.5 h-1.5 bg-primary/30 rounded-full"
          style={{
            left: `${30 + Math.random() * 40}%`,
            bottom: `${Math.random() * 40}%`,
            boxShadow: '0 0 10px rgba(124, 45, 18, 0.5)',
          }}
          animate={{
            y: [-20, -200 - Math.random() * 100],
            x: [(Math.random() - 0.5) * 80, (Math.random() - 0.5) * 140],
            opacity: [0.8, 0.3, 0],
            scale: [1, 0.4],
          }}
          transition={{
            duration: 7 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// MAIN SCENE EXPORT
// ═══════════════════════════════════════════════════════════════

export function MedievalKnightScene() {
  const [isHovered, setIsHovered] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Handle window dimensions safely for SSR
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const springConfig = { stiffness: 150, damping: 15 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  // Parallax effect - now safe for SSR
  const castleX = useTransform(smoothMouseX, [-dimensions.width / 2, dimensions.width / 2], [-20, 20])
  const castleY = useTransform(smoothMouseY, [-dimensions.height / 2, dimensions.height / 2], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.top - rect.height / 2)
  }

  return (
    <div 
      className="relative w-full h-full bg-gradient-to-b from-background via-card/30 to-background"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Castle background with parallax */}
      <motion.div
        style={{ x: castleX, y: castleY }}
        className="absolute inset-0"
      >
        <DarkCastle />
      </motion.div>

      {/* Atmospheric effects */}
      <Atmosphere />

      {/* Epic Knight - Center positioned */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-full max-h-[700px] lg:max-h-[800px]">
          <EpicKnight isHovered={isHovered} />
        </div>
      </div>

      {/* Ground fog */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
    </div>
  )
}