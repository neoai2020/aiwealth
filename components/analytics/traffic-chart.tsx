"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const data = [
    { day: "Mon", value: 120 },
    { day: "Tue", value: 145 },
    { day: "Wed", value: 290 },
    { day: "Thu", value: 210 },
    { day: "Fri", value: 380 },
    { day: "Sat", value: 450 },
    { day: "Sun", value: 520 },
];

export function TrafficChart() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Calculate dimensions and scales
    const width = 100; // SVG viewBox width percentage
    const height = 50; // SVG viewBox height
    const padding = 5;
    const graphWidth = 100 - padding * 2;
    const graphHeight = 50 - padding * 2;

    const maxValue = Math.max(...data.map(d => d.value));

    // Create points for the polyline
    const points = data.map((d, i) => {
        const x = padding + (i / (data.length - 1)) * graphWidth;
        const y = height - padding - (d.value / maxValue) * graphHeight;
        return `${x},${y}`;
    }).join(" ");

    // Create area path (close the loop at the bottom)
    const areaPath = `${points} ${100 - padding},${height - padding} ${padding},${height - padding}`;

    return (
        <div className="w-full h-64 md:h-80 relative select-none">
            {/* SVG Chart */}
            <svg
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="none"
                className="w-full h-full overflow-visible"
            >
                {/* Gradients */}
                <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Grid Lines (Horizontal) */}
                {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
                    <line
                        key={tick}
                        x1={0}
                        y1={height - padding - tick * graphHeight}
                        x2={100}
                        y2={height - padding - tick * graphHeight}
                        stroke="white"
                        strokeOpacity="0.05"
                        strokeWidth="0.2"
                    />
                ))}

                {/* Area Fill */}
                <motion.path
                    initial={{ opacity: 0, d: `M ${padding},${height - padding} L ${100 - padding},${height - padding} L ${padding},${height - padding}` }}
                    animate={{ opacity: 1, d: `M ${points.split(' ')[0]} L ${points.replace(/,/g, ' ')} L ${100 - padding},${height - padding} L ${padding},${height - padding} Z` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    fill="url(#chartGradient)"
                />

                {/* Line Stroke */}
                <motion.polyline
                    points={points}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="0.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Data Points */}
                {data.map((d, i) => {
                    const x = padding + (i / (data.length - 1)) * graphWidth;
                    const y = height - padding - (d.value / maxValue) * graphHeight;

                    return (
                        <g key={i}>
                            {/* Hover Interaction Area (Invisible) */}
                            <rect
                                x={x - 5}
                                y={0}
                                width={10}
                                height={height}
                                fill="transparent"
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="cursor-crosshair"
                            />

                            {/* Point Dot */}
                            <motion.circle
                                cx={x}
                                cy={y}
                                r={hoveredIndex === i ? 1.5 : 0.8}
                                fill="white"
                                stroke="var(--primary)"
                                strokeWidth="0.2"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1 + i * 0.1 }}
                            />
                        </g>
                    );
                })}
            </svg>

            {/* Tooltip */}
            {hoveredIndex !== null && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bg-gray-900/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl pointer-events-none"
                    style={{
                        left: `${(hoveredIndex / (data.length - 1)) * 100}%`,
                        top: `${50 - (data[hoveredIndex].value / maxValue) * 50}%`, // Rough approximation
                        transform: 'translate(-50%, -120%)'
                    }}
                >
                    <div className="text-xs text-gray-400 font-bold uppercase mb-1">{data[hoveredIndex].day}</div>
                    <div className="text-lg font-bold text-white flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        {data[hoveredIndex].value}
                    </div>
                </motion.div>
            )}

            {/* X-Axis Labels */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-[5%] text-xs text-gray-500 font-mono">
                {data.map((d, i) => (
                    <span key={i}>{d.day}</span>
                ))}
            </div>
        </div>
    );
}
