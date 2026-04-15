"use client";
import { useState, useEffect, useRef } from "react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  selectedId?: number | null;
  onNodeSelect?: (id: number) => void;
}

const C = {
  bgMain: "#06080a",
  bgCard: "#0d1117",
  border: "#1e2730",
  border2: "#2a3540",
  textPrimary: "#f0f2f4",
  textSecondary: "#8a9bb0",
  accent: "#00c8b4",
  accentLight: "#9eeee8",
  accentWash: "#041e1c",
}

export default function RadialOrbitalTimeline({
  timelineData,
  selectedId = null,
  onNodeSelect,
}: RadialOrbitalTimelineProps) {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      onNodeSelect?.(0); // 0 = deselect signal
      setAutoRotate(true);
    }
  };

  const handleNodeClick = (id: number) => {
    if (selectedId === id) {
      onNodeSelect?.(0);
      setAutoRotate(true);
    } else {
      onNodeSelect?.(id);
      setAutoRotate(false);
      // Rotate so selected node floats to top
      const nodeIndex = timelineData.findIndex((item) => item.id === id);
      const totalNodes = timelineData.length;
      const targetAngle = (nodeIndex / totalNodes) * 360;
      setRotationAngle(270 - targetAngle);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoRotate) {
      timer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.6) % 360).toFixed(3)));
      }, 30);
    }
    return () => { if (timer) clearInterval(timer); };
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 210;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = selectedId
      ? 1
      : Math.max(0.5, Math.min(1, 0.5 + 0.5 * ((1 + Math.sin(radian)) / 2)));
    return { x, y, zIndex, opacity };
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight: "100vh", background: `radial-gradient(ellipse 60% 50% at 50% 50%, #0d1521 0%, ${C.bgMain} 70%)` }}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div
        className="orbital-scene relative w-full max-w-4xl flex items-center justify-center"
        style={{ height: "595px" }}
      >
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {/* Orbit ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: "464px",
              height: "464px",
              border: "2.5px solid rgba(255,255,255,0.22)",
              boxShadow: "0 0 18px rgba(255,255,255,0.05), inset 0 0 18px rgba(255,255,255,0.03)",
            }}
          />

          {/* Center — Allenix wordmark */}
          <div
            className="absolute flex items-center justify-center z-10"
            style={{
              width: "97px",
              height: "97px",
              borderRadius: "50%",
              backgroundColor: C.bgCard,
              border: `1px solid ${C.border2}`,
              boxShadow: `0 0 0 1px rgba(0,200,180,0.15), 0 0 40px rgba(0,200,180,0.06)`,
            }}
          >
            <div
              className="absolute rounded-full animate-ping"
              style={{
                width: "119px",
                height: "119px",
                border: `1px solid ${C.accent}`,
                opacity: 0.2,
              }}
            />
            <div
              className="absolute rounded-full animate-ping"
              style={{
                width: "144px",
                height: "144px",
                border: `1px solid ${C.accentLight}`,
                opacity: 0.1,
                animationDelay: "0.7s",
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "20px",
                letterSpacing: "-0.3px",
                color: C.textPrimary,
              }}
            >
              Allenix
            </span>
          </div>

          {/* Orbital nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isSelected = selectedId === item.id;
            const isHovered  = hoveredId === item.id && !isSelected;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el }}
                className="absolute cursor-pointer"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isSelected ? 200 : isHovered ? 150 : position.zIndex,
                  opacity: position.opacity,
                  transition: "opacity 300ms ease-out",
                }}
                onClick={(e) => { e.stopPropagation(); handleNodeClick(item.id); }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Hover ripple ring — only visible on hover */}
                {isHovered && (
                  <div
                    className="absolute rounded-full animate-ping"
                    style={{
                      width: "72px",
                      height: "72px",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      border: "1px solid rgba(0,200,180,0.4)",
                      pointerEvents: "none",
                    }}
                  />
                )}

                {/* Node circle */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: isSelected
                      ? "rgba(0,200,180,0.15)"
                      : isHovered
                      ? "rgba(0,200,180,0.10)"
                      : C.bgCard,
                    border: `1.5px solid ${
                      isSelected ? C.accent
                      : isHovered ? "rgba(0,200,180,0.75)"
                      : C.border2
                    }`,
                    boxShadow: isSelected
                      ? "0 0 24px rgba(0,200,180,0.7), 0 0 8px rgba(0,200,180,0.5)"
                      : isHovered
                      ? "0 0 22px rgba(0,200,180,0.5), 0 0 6px rgba(0,200,180,0.35)"
                      : "none",
                    transition: "all 180ms ease-out",
                    transform: isSelected ? "scale(1.2)" : isHovered ? "scale(1.15)" : "scale(1)",
                  }}
                >
                  <Icon
                    size={16}
                    color={isHovered || isSelected ? C.accent : "#ffffff"}
                    style={{ transition: "color 180ms ease-out" }}
                  />
                </div>

                {/* Node label */}
                <div
                  style={{
                    position: "absolute",
                    top: "52px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 600,
                    fontSize: "25px",
                    color: isSelected ? C.textPrimary : isHovered ? C.accent : "#ffffff",
                    textShadow: isHovered
                      ? "0 0 12px rgba(0,200,180,0.5), 0 1px 4px rgba(0,0,0,0.8)"
                      : "0 1px 4px rgba(0,0,0,0.8)",
                    transition: "color 180ms ease-out, text-shadow 180ms ease-out",
                  }}
                >
                  {item.title}
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
