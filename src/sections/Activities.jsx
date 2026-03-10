import React from 'react';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const Activities = () => {
    const activityLogs = [
        "Former Academic Member of Bangladesh Mathematical Olympiad",
        "Former General Member of Notre Dame Nature Study Club",
        "General Member of CAM (Copernicus Astronomical Memorial) SUST",
        "General Member of KIN (Charity Organization)"
    ];

    return (
        <section id="activities" className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="mb-16 md:mb-24 text-center">
                    <h2 className="text-[10px] md:text-xl font-bold tracking-tight md:tracking-[8px] inline-block border-b-6 border-nes-yellow pb-4 nes-text uppercase text-nes-yellow">
                        CHAPTER_07::ACTIVITIES
                    </h2>
                </div>

                <div className="grid lg:grid-cols-1 gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="nes-border border-nes-yellow/30 p-6 md:p-12 bg-black"
                    >
                        <div className="flex items-center gap-4 md:gap-6 mb-8 md:mb-12 border-b border-white/10 pb-6">
                            <Trophy className="text-nes-yellow" size={20} />
                            <h3 className="nes-text text-[8px] md:text-[10px] text-white uppercase tracking-widest">ACTIVITY::LEDGER</h3>
                        </div>
                        <div className="space-y-8 md:space-y-10">
                            {activityLogs.map((log, i) => (
                                <div key={i} className="flex gap-4 md:gap-6 items-start group">
                                    <div className="nes-text text-[8px] md:text-[10px] text-nes-yellow mt-1">{">>"}</div>
                                    <p className="story-text text-[8px] md:text-[10px] leading-relaxed md:leading-loose tracking-tighter group-hover:text-nes-yellow transition-colors">{log}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Activities;
