import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playMenuClick } from '../audio';

const AssistantRobot = ({ started, onStart, score = 0, scoreFlash = false }) => {
    const [message, setMessage] = useState(null);
    const [bubbleVisible, setBubbleVisible] = useState(true);

    useEffect(() => {
        if (!started) {
            setMessage(null);
            return;
        }
        setMessage("SEQUENCE_INITIALIZED! SCROLLING_ENABLED.");
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollPos / height;
            if (progress < 0.1) setMessage("Unit_RR-Bot Online. Reading Bio Data...");
            else if (progress < 0.15) setMessage("Stage_01: Analyzing ID Logs...");
            else if (progress < 0.28) setMessage("Stage_02: Scanning Arsenal...");
            else if (progress < 0.42) setMessage("Stage_03: Accessing Records...");
            else if (progress < 0.55) setMessage("Stage_04: Academic Database...");
            else if (progress < 0.68) setMessage("Stage_05: Research Vectors...");
            else if (progress < 0.81) setMessage("Stage_06: Achievement Tracker...");
            else if (progress < 0.94) setMessage("Stage_07: Extracurricular Logs...");
            else setMessage("Stage_08: Establishing Signal...");
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [started]);

    return (
        <>
            {/* ── FULL-SCREEN INTRO PROMPT (before start) ── */}
            <AnimatePresence>
                {!started && (
                    <motion.div
                        key="intro-prompt"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.6 } }}
                        className="fixed inset-0 z-[3000] flex flex-col items-center justify-center bg-black pointer-events-auto"
                    >
                        {/* Scanline overlay */}
                        <div className="absolute inset-0 pointer-events-none"
                            style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)' }}
                        />

                        {/* Robot figure */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="robot-frame flex justify-around p-2 mb-10"
                            style={{ width: 90, height: 90, borderColor: '#f3ef00', borderWidth: 4 }}
                        >
                            <div className="robot-eye left-3" />
                            <div className="robot-eye right-3" />
                            <div className="absolute bottom-2 w-1/2 h-1 bg-nes-yellow opacity-40" />
                        </motion.div>

                        {/* Dialog box */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="nes-border border-4 border-nes-yellow bg-black p-8 md:p-12 max-w-sm w-[90vw] flex flex-col gap-6"
                        >
                            <p className="nes-text text-nes-yellow text-[8px] md:text-[10px] leading-loose tracking-wider">
                                &gt; UNIT_RR-BOT :: ONLINE<br />
                                &gt; SYSTEM :: READY<br />
                                &gt; MISSION :: PORTFOLIO_LOAD
                            </p>
                            <div className="border-t border-nes-yellow/30 pt-4">
                                <p className="nes-text text-white text-[7px] md:text-[9px] leading-loose mb-6">
                                    GREETINGS, VISITOR.<br />
                                    SHALL I INITIALIZE<br />
                                    THE JOURNEY?
                                </p>
                                <div className="flex flex-col gap-3">
                                    <motion.button
                                        id="bot-start-btn"
                                        whileHover={{ scale: 1.03, backgroundColor: '#f3ef00', color: '#000' }}
                                        whileTap={{ scale: 0.97 }}
                                        className="w-full nes-btn text-[8px] md:text-[10px] py-3 tracking-widest px-4"
                                        onClick={onStart}
                                    >
                                        ▶ YES — BEGIN
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ opacity: 0.8 }}
                                        className="w-full border-2 border-white/20 text-white/30 nes-text text-[6px] py-2 tracking-widest bg-transparent"
                                        onClick={() => { playMenuClick(); window.history.back(); }}
                                    >
                                        ✕ NO — EXIT
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── BOTTOM-RIGHT HELPER (after start) ── */}
            {started && (
                <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[2000] flex flex-col items-end pointer-events-none">
                    <AnimatePresence>
                        {bubbleVisible && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                                className="speech-bubble mb-6 md:mb-10 text-[7px] md:text-[8px] pointer-events-auto flex flex-col gap-1"
                            >
                                <span>{message || 'UNIT_RR-BOT_ONLINE. READING_BIO_DATA...'}</span>
                                <span
                                    style={{
                                        color: scoreFlash ? '#000000ff' : 'rgba(9, 9, 9, 0.65)',
                                        transition: 'color 0.2s',
                                        fontSize: '6px',
                                        letterSpacing: '1px',
                                        marginTop: '4px',
                                    }}
                                >
                                    ☄ ROCKS: {score}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        className="robot-frame flex justify-around p-2 cursor-pointer scale-75 md:scale-100 pointer-events-auto"
                        whileHover={{ scale: 1.1 }}
                        onClick={() => { playMenuClick(); setBubbleVisible(v => !v); }}
                    >
                        <div className="robot-eye left-3" />
                        <div className="robot-eye right-3" />
                        <div className="absolute bottom-2 w-1/2 h-1 bg-white opacity-20" />
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default AssistantRobot;
