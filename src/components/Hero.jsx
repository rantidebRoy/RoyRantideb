import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, ChevronRight, Zap } from 'lucide-react';
import useTypewriter from '../hooks/useTypewriter';

const Hero = ({ started, onDone }) => {
    const titleLine1 = 'LOADED ';
    const titleName = 'RANTIDEB ROY';
    const titleLine2 = 'INTO THE MAIN_FRAME';
    const fullTitle = titleLine1 + titleName + ' ' + titleLine2;

    const bioText = "Initializing ID... I am Rantideb Roy, an undergraduate navigator at SUST. Currently crafting digital realms through real-time development, I am gathering system_resources to unlock the machine_learning sub-sectors. Calibrating neural pathways for the next stage.";

    const titleTyping = useTypewriter(fullTitle, 90, started);

    useEffect(() => {
        if (titleTyping.done && onDone) {
            const timer = setTimeout(onDone, 80);
            return () => clearTimeout(timer);
        }
    }, [titleTyping.done, onDone]);

    const namStart = titleLine1.length;
    const namEnd = namStart + titleName.length;

    const before = titleTyping.displayed.slice(0, namStart);
    const highlight = titleTyping.displayed.slice(namStart, Math.min(titleTyping.displayed.length, namEnd));
    const after = titleTyping.displayed.length > namEnd ? titleTyping.displayed.slice(namEnd) : '';

    return (
        <section className="min-h-screen flex items-center pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                {/* ── Left: Text Content ── */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="lg:col-span-8 space-y-8 md:space-y-12 order-2 lg:order-1"
                >
                    <AnimatePresence>
                        {titleTyping.done && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-block px-4 py-1 border-2 border-nes-yellow text-[7px] md:text-[8px] text-nes-yellow nes-text break-words max-w-full"
                            >
                                CHAPTER_00::SYSTEM_LOAD
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black leading-relaxed md:leading-tight tracking-tight lg:tracking-tighter nes-text min-h-[4rem] md:min-h-[6rem]">
                        {before}<span className="text-nes-yellow">{highlight}</span>{after.includes('INTO') ? <>{' '}<br />{after.trim()}</> : after}
                        {!titleTyping.done && <span className="animate-pulse text-nes-yellow">_</span>}
                    </h1>

                    <AnimatePresence>
                        {titleTyping.done && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-8 md:space-y-12"
                            >
                                <div className="nes-border border-4 p-6 md:p-10 bg-black/60 shadow-pixel border-nes-yellow">
                                    <p className="story-text text-[9px] md:text-[10px] leading-relaxed md:leading-loose">
                                        {bioText}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-4 md:gap-8 pt-4">
                                    <a href="#about" className="nes-btn group flex items-center gap-3 md:gap-4 text-[7px] md:text-[8px] flex-1 sm:flex-none justify-center">
                                        INITIATE <ChevronRight size={12} className="group-hover:translate-x-1" />
                                    </a>
                                    <a href="#projects" className="nes-btn nes-border-white group flex items-center gap-3 md:gap-4 text-[7px] md:text-[8px] flex-1 sm:flex-none justify-center">
                                        JUMP_TRIALS <Zap size={12} />
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* ── Right: Profile Image ── */}
                <div className="lg:col-span-4 flex justify-center order-1 lg:order-2 w-full">
                    <AnimatePresence>
                        {titleTyping.done && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 border-8 border-nes-white bg-black flex flex-col items-center justify-center p-2 overflow-hidden shadow-pixel"
                                style={{ zIndex: 20, position: 'relative' }}
                            >
                                <div className="absolute top-2 left-2 z-10 text-[5px] md:text-[6px] nes-text text-white bg-black/50 px-1">UNIT_ID: RR_EXT</div>
                                <div className="absolute bottom-2 right-2 z-10 text-[5px] md:text-[6px] nes-text text-nes-yellow bg-black/50 px-1">VERSION: 4.0</div>

                                <div className="w-full h-full relative">
                                    <img
                                        src="/profile.jpg"
                                        alt="IDENTITY_SCAN"
                                        className="w-full h-full object-cover contrast-125 pixelated"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="hidden absolute inset-0 w-full h-full flex-col items-center justify-center text-center p-4 bg-black/40">
                                        <Rocket size={40} className="text-nes-yellow opacity-10 animate-pulse mb-4" />
                                        <p className="italic text-white/30 text-[6px] md:text-[8px] nes-text leading-tight md:leading-loose">
                                            ORBITAL_SCANNING_IN_PROGRESS...<br />
                                            <span className="text-[5px] md:text-[6px]">AWAITING_IMAGE_UPLOAD</span>
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
};

export default Hero;
