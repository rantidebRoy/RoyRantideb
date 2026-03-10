import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { unlockAudio, audioUnlocked, playStartSound } from './audio';
import RetroSpace from './components/RetroSpace';
import AsteroidField from './components/AsteroidField';
import AssistantRobot from './components/AssistantRobot';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Research from './sections/Research';
import Achievements from './sections/Achievements';
import Activities from './sections/Activities';
import Contact from './sections/Contact';

function App() {
    const [started, setStarted] = useState(false);
    const [isHeroDone, setIsHeroDone] = useState(false);
    const [asteroidScore, setAsteroidScore] = useState(0);
    const [scoreFlash, setScoreFlash] = useState(false);
    const scoreFlashTimer = useRef(null);

    const handleScore = (pts) => {
        setAsteroidScore(prev => prev + pts);
        setScoreFlash(true);
        clearTimeout(scoreFlashTimer.current);
        scoreFlashTimer.current = setTimeout(() => setScoreFlash(false), 400);
    };

    const handleStart = () => {
        unlockAudio();
        audioUnlocked.then(() => {
            playStartSound();
        });
        setStarted(true);
    };

    return (
        <div className="min-h-screen selection:bg-nes-yellow selection:text-black overflow-x-hidden relative text-white">
            {/* Always visible: starfield background */}
            <RetroSpace />

            {/* Asteroid mini-game layer — always active */}
            <div style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
                <AsteroidField onScore={handleScore} />
            </div>

            {/* Score HUD — top-right corner */}
            <div
                style={{
                    position: 'fixed',
                    top: '82px',
                    right: '20px',
                    zIndex: 150,
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '2px',
                    padding: '6px 12px',
                    background: 'rgba(0,0,0,0.80)',
                    border: '2px solid',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    borderColor: scoreFlash ? '#f3ef00' : 'rgba(243,239,0,0.28)',
                    boxShadow: scoreFlash ? '0 0 10px rgba(243,239,0,0.4)' : 'none',
                }}
            >
                <span style={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: '7px',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                }}>☄ ROCKS_DESTROYED:</span>
                <span style={{
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: '9px',
                    color: scoreFlash ? '#f3ef00' : 'rgba(243,239,0,0.8)',
                    transition: 'color 0.2s',
                    minWidth: '36px',
                    textAlign: 'right',
                }}>{asteroidScore}</span>
            </div>

            {/* Bot: shows intro prompt before start, helper after */}
            <AssistantRobot started={started} onStart={handleStart} />

            {/* Main site content — only mounts after user starts */}
            <AnimatePresence>
                {started && (
                    <motion.div
                        key="site"
                        className="crt flicker"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Navbar />
                        <Hero started={started} onDone={() => setIsHeroDone(true)} />

                        <AnimatePresence>
                            {isHeroDone && (
                                <motion.div
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                >
                                    <About />
                                    <Skills />
                                    <Projects />
                                    <Education />
                                    <Research />
                                    <Achievements />
                                    <Activities />
                                    <Contact />
                                    <Footer />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
