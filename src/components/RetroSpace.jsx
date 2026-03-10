import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// --- SVG Spacecraft ---
export const Spacecraft = ({ size = 40, flipped = false }) => (
    <svg
        width={size * 2.5}
        height={size}
        viewBox="0 0 100 40"
        style={{ transform: flipped ? 'scaleX(-1)' : 'none', opacity: 0.25 }}
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Main body */}
        <ellipse cx="50" cy="20" rx="35" ry="10" fill="#aaa" />
        {/* Cockpit */}
        <ellipse cx="62" cy="18" rx="12" ry="7" fill="#888" />
        <ellipse cx="64" cy="17" rx="7" ry="4" fill="#00ffff" opacity="0.3" />
        {/* Wings */}
        <polygon points="30,20 10,32 20,20" fill="#777" />
        <polygon points="30,20 10,8 20,20" fill="#777" />
        {/* Engine glow */}
        <ellipse cx="15" cy="20" rx="6" ry="3" fill="#f3ef00" opacity="0.6" />
        <ellipse cx="8" cy="20" rx="4" ry="2" fill="#ff8800" opacity="0.5" />
        {/* Engine nozzle */}
        <rect x="10" y="18" width="6" height="4" rx="1" fill="#555" />
        {/* Hull detail */}
        <line x1="35" y1="16" x2="55" y2="16" stroke="#666" strokeWidth="1" />
        <line x1="35" y1="24" x2="55" y2="24" stroke="#666" strokeWidth="1" />
        <circle cx="40" cy="20" r="2" fill="#f3ef00" opacity="0.4" />
        <circle cx="48" cy="20" r="1.5" fill="#f3ef00" opacity="0.3" />
    </svg>
);

// --- Retro 8-Bit Space Background ---
const RetroSpace = () => {
    const stars = useMemo(() => {
        return Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            top: `${Math.floor(Math.random() * 100)}%`,
            left: `${Math.floor(Math.random() * 100)}%`,
            size: Math.floor(Math.random() * 4) + 1,
            blink: Math.random() > 0.85,
            delay: Math.random() * 4,
            duration: Math.random() * 2 + 2,
        }));
    }, []);

    const spaceObjects = useMemo(() => [
        { type: "craft", top: "38%", left: "-18%", size: 28, delay: 5, duration: 22 },
        { type: "craft", top: "72%", left: "118%", size: 22, delay: 12, duration: 30, flipped: true },
        { type: "craft", top: "8%", left: "112%", size: 24, delay: 0, duration: 38, flipped: true }
    ], []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-black grayscale-[0.1]">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className={`absolute star ${star.blink ? 'animate-pulse' : ''}`}
                    style={{
                        top: star.top,
                        left: star.left,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        backgroundColor: star.id % 20 === 0 ? '#f3ef00' : 'white',
                        animationDelay: `${star.delay}s`,
                        animationDuration: `${star.duration}s`,
                        opacity: 0.5
                    }}
                />
            ))}
            {spaceObjects.map((obj, i) => (
                <motion.div
                    key={i}
                    animate={
                        obj.type === "craft"
                            ? { x: obj.left.startsWith("-") ? "140vw" : "-140vw", y: [0, -15, 15, 0] }
                            : obj.animType === "float"
                                ? { y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 10, -10, 0] }
                                : { opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }
                    }
                    transition={{
                        duration: obj.duration || (obj.type === "planet" ? 12 : 10),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: obj.delay
                    }}
                    className="absolute"
                    style={{
                        top: obj.top,
                        left: obj.left,
                    }}
                >
                    <Spacecraft size={obj.size} flipped={!!obj.flipped} />
                </motion.div>
            ))}
        </div>
    );
};

export default RetroSpace;
