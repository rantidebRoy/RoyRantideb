import React, { useState, useEffect, useRef } from 'react';
import { playAsteroidHit } from '../audio';

export const ASTEROID_COUNT = 14;

export const generateAsteroid = (id) => ({
    id,
    x: Math.random() * 100,         // vw %
    y: Math.random() * 100,         // vh %
    size: Math.random() < 0.25 ? 'lg' : Math.random() < 0.5 ? 'med' : 'sm',
    vx: (Math.random() - 0.5) * 0.045,  // vw per frame
    vy: (Math.random() - 0.5) * 0.045,
    rot: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 0.5,
    shape: Math.floor(Math.random() * 4),
    opacity: 0.25 + Math.random() * 0.3,
    exploding: false,
    explodeFrame: 0,
});

export const ASTEROID_SIZES = { sm: 18, med: 30, lg: 46 };

// SVG polygon shapes for pixel-art asteroid variety
const ASTEROID_PATHS = [
    "12,2 22,4 28,14 26,26 16,30 6,26 2,14 6,4",
    "10,0 20,2 28,10 30,22 22,30 10,28 2,20 0,10",
    "14,1 24,6 30,16 26,28 14,30 4,26 0,14 6,4",
    "8,2 18,0 28,8 30,20 24,30 12,30 2,22 0,10",
];

const AsteroidSVG = ({ shape, size, color }) => {
    const s = ASTEROID_SIZES[size];
    return (
        <svg width={s} height={s} viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
            <polygon points={ASTEROID_PATHS[shape]} fill={color} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            {/* crater details */}
            <circle cx="10" cy="10" r="2.5" fill="rgba(0,0,0,0.3)" />
            <circle cx="20" cy="18" r="1.8" fill="rgba(0,0,0,0.3)" />
            <circle cx="15" cy="22" r="1.2" fill="rgba(255,255,255,0.07)" />
        </svg>
    );
};

const ExplosionParticle = ({ x, y, angle, dist, frame, maxFrames, color }) => {
    const progress = frame / maxFrames;
    const px = x + Math.cos(angle) * dist * progress;
    const py = y + Math.sin(angle) * dist * progress;
    const opacity = 1 - progress;
    const sz = 3 * (1 - progress * 0.7);
    return (
        <div style={{
            position: 'fixed', left: `${px}px`, top: `${py}px`,
            width: sz, height: sz,
            backgroundColor: color,
            opacity, pointerEvents: 'none',
            borderRadius: 0,
            transform: 'translate(-50%,-50%)',
        }} />
    );
};

const AsteroidField = ({ onScore }) => {
    const [asteroids, setAsteroids] = useState(() =>
        Array.from({ length: ASTEROID_COUNT }, (_, i) => generateAsteroid(i))
    );
    const [explosions, setExplosions] = useState([]);
    const frameRef = useRef();
    const nextId = useRef(ASTEROID_COUNT);

    // Animation loop
    useEffect(() => {
        const tick = () => {
            setAsteroids(prev => prev.map(a => {
                if (a.exploding) return a;
                let nx = a.x + a.vx;
                let ny = a.y + a.vy;
                let nvx = a.vx;
                let nvy = a.vy;
                if (nx < -5) nx = 105;
                if (nx > 105) nx = -5;
                if (ny < -5) ny = 105;
                if (ny > 105) ny = -5;
                return { ...a, x: nx, y: ny, vx: nvx, vy: nvy, rot: a.rot + a.rotSpeed };
            }));

            setExplosions(prev => {
                const updated = prev.map(e => ({ ...e, frame: e.frame + 1 })).filter(e => e.frame < e.maxFrames);
                return updated;
            });

            frameRef.current = requestAnimationFrame(tick);
        };
        frameRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frameRef.current);
    }, []);

    const handleAsteroidClick = (e, asteroid) => {
        e.stopPropagation();
        if (asteroid.exploding) return;

        playAsteroidHit(asteroid.size);
        onScore(asteroid.size === 'lg' ? 30 : asteroid.size === 'med' ? 20 : 10);

        const rect = e.currentTarget.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const numParticles = asteroid.size === 'sm' ? 6 : asteroid.size === 'med' ? 10 : 16;
        const maxFrames = asteroid.size === 'sm' ? 18 : asteroid.size === 'med' ? 25 : 35;
        const colors = ['#f3ef00', '#ff8800', '#ffffff', '#ff4444'];

        const newParticles = Array.from({ length: numParticles }, (_, i) => ({
            id: Date.now() + i,
            x: cx, y: cy,
            angle: (i / numParticles) * Math.PI * 2 + Math.random() * 0.5,
            dist: 30 + Math.random() * (asteroid.size === 'lg' ? 60 : asteroid.size === 'med' ? 40 : 22),
            frame: 0,
            maxFrames,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));
        setExplosions(prev => [...prev, ...newParticles]);

        // Replace asteroid after a short delay
        setAsteroids(prev => prev.map(a => a.id === asteroid.id ? { ...a, exploding: true } : a));
        setTimeout(() => {
            const newAst = generateAsteroid(nextId.current++);
            setAsteroids(prev => prev.map(a => a.id === asteroid.id ? newAst : a));
        }, 600);
    };

    const COLORS = { sm: '#aaaaaa', med: '#888877', lg: '#665544' };

    return (
        <>
            {/* Asteroid sprites */}
            {asteroids.map(a => {
                if (a.exploding) return null;
                const s = ASTEROID_SIZES[a.size];
                return (
                    <div
                        key={a.id}
                        onMouseDown={(e) => handleAsteroidClick(e, a)}
                        style={{
                            position: 'fixed',
                            left: `${a.x}vw`,
                            top: `${a.y}vh`,
                            width: s + 24, // increased hit area
                            height: s + 24, // increased hit area
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: `translate(-50%, -50%) rotate(${a.rot}deg)`,
                            opacity: a.opacity,
                            cursor: 'crosshair',
                            pointerEvents: 'auto',
                            zIndex: 0,
                            userSelect: 'none',
                        }}
                    >
                        <AsteroidSVG shape={a.shape} size={a.size} color={COLORS[a.size]} />
                    </div>
                );
            })}
            {/* Explosion particles */}
            {explosions.map(p => <ExplosionParticle key={p.id} {...p} />)}
        </>
    );
};

export default AsteroidField;
