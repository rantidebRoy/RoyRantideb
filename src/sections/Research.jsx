import React from 'react';
import { Zap, Search, Rocket, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Research = () => (
    <section id="research" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="mb-16 md:mb-24 text-center">
                <h2 className="text-[10px] md:text-xl font-bold tracking-tight md:tracking-[8px] inline-block border-b-6 border-nes-yellow pb-4 nes-text uppercase text-nes-yellow">
                    CHAPTER_05::RESEARCH
                </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {[
                    { title: "MACHINE_LEARNING", desc: "Developing intelligent systems and predictive models.", icon: <Zap size={18} /> },
                    { title: "IMAGE_PROCESSING", desc: "Analyzing and enhancing visual data streams.", icon: <Search size={18} /> },
                    { title: "ASTRONOMICAL_DATA", desc: "Applying Python tools for processing space data.", icon: <Rocket size={18} /> },
                    { title: "SOFTWARE_ENG", desc: "Scalable and maintainable code architectures.", icon: <Terminal size={18} /> }
                ].map((res, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ x: 10 }}
                        viewport={{ once: true }}
                        className="nes-border border-nes-yellow/30 p-6 md:p-10 bg-black flex items-start gap-4 md:gap-8"
                    >
                        <div className="text-nes-yellow mt-1">{res.icon}</div>
                        <div>
                            <h4 className="nes-text text-[8px] md:text-[9px] text-white mb-3 md:mb-4 tracking-[1px]">{res.title}</h4>
                            <p className="story-text text-[7px] md:text-[8px] leading-relaxed md:leading-loose opacity-70">{res.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default Research;
