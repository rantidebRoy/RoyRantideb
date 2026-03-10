import React, { useState } from 'react';
import { Award, Trophy, Rocket, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Achievements = () => {
    const [selectedId, setSelectedId] = useState(null);
    const achievements = [
        { id: 1, type: "RESEARCH", title: "PUBLISHED_RESEARCH", text: "Co-authored: 'Image Processing and Analysis of Multiple Wavelength Astronomical Data Using Python Tools' (Oct 2024).", icon: <Award className="text-nes-yellow" size={28} />, img: "/research_preview.jpg" },
        { id: 2, type: "HACKATHON", title: "HACKATHON_WIN", text: "AstroCode Hackathon (Winner – Team Astromaniac).", icon: <Trophy className="text-nes-yellow" size={28} />, img: "/hackathon_preview.jpg" },
        { id: 3, type: "DISCOVERY", title: "ASTEROID_DISCOVERY", text: "Provisional Discovery of Main Belt Asteroid by IASC/NASA.", icon: <Rocket className="text-nes-yellow" size={28} />, img: "/asteroid_preview.jpg" }
    ];

    return (
        <section id="achievements" className="py-20 md:py-32 bg-nes-gray/20">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="mb-16 md:mb-24 text-center">
                    <h2 className="text-[10px] md:text-xl font-bold tracking-tight md:tracking-[8px] inline-block border-b-6 border-nes-yellow pb-4 nes-text uppercase text-nes-yellow">
                        CHAPTER_06::ACHIEVEMENTS
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {achievements.map((item) => (
                        <motion.div
                            key={item.id}
                            whileHover={{ y: -10 }}
                            viewport={{ once: true }}
                            onClick={() => setSelectedId(item.id)}
                            className="nes-border border-white/20 p-8 md:p-10 bg-black flex flex-col gap-6 h-full cursor-pointer group active:scale-95 transition-all"
                        >
                            {item.icon}
                            <h4 className="nes-text text-[8px] md:text-[9px] text-white tracking-[1px] md:tracking-[2px] group-hover:text-nes-yellow">{item.title}</h4>
                            <p className="story-text text-[7px] md:text-[8px] leading-relaxed md:leading-loose">{item.text}</p>
                            <span className="mt-auto nes-text text-[6px] text-nes-yellow opacity-50">[Click to Preview]</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedId(null)}>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="nes-border border-4 border-nes-yellow bg-black p-4 md:p-8 max-w-2xl w-full relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="absolute top-4 right-4 text-white nes-text text-[10px]" onClick={() => setSelectedId(null)}>[X]</button>
                            <div className="bg-nes-gray/20 mb-6 border-2 border-white/10 max-h-[60vh] overflow-auto">
                                <img
                                    src={achievements.find(a => a.id === selectedId).img}
                                    alt="PREVIEW"
                                    className="w-full h-auto block pixelated"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="hidden flex-col items-center gap-4 text-white/30 nes-text text-[7px] p-4 text-center">
                                    <Cpu size={32} className="animate-pulse" />
                                    SYSTEM_LOG: IMAGE_NOT_FOUND<br />
                                    NAME: {achievements.find(a => a.id === selectedId).img.replace('/', '')}
                                </div>
                            </div>
                            <h3 className="nes-text text-[9px] md:text-[11px] text-nes-yellow mb-4">
                                {achievements.find(a => a.id === selectedId).title}
                            </h3>
                            <p className="story-text text-[8px] md:text-[9px] leading-relaxed uppercase">
                                {achievements.find(a => a.id === selectedId).text}
                            </p>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Achievements;
