import React from 'react';
import { Cpu, Terminal, Zap, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const Skills = () => {
    const data = [
        { cat: "SYSTEMS_CORE", list: ["C / C++", "Java Shell", "Kotlin", "Python Script"], icon: <Cpu /> },
        { cat: "UI_HYPER_ENGINE", list: ["React Framework", "JavaScript", "HTML5 / CSS3", "Tailwind"], icon: <Terminal /> },
        { cat: "ARCH_TOOLS", list: ["Git / GitHub", "Firebase Forge", "MySQL Data", "Java Servlets"], icon: <Zap /> },
        { cat: "MOBILE_UNITS", list: ["Android Dev", "Kotlin Native", "UI / UX Flow", "Software Arch"], icon: <Smartphone /> }
    ];

    return (
        <section id="skills" className="py-20 md:py-32 bg-nes-gray/20">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="mb-16 md:mb-24 text-center">
                    <h2 className="text-[10px] md:text-xl font-bold tracking-tight md:tracking-[8px] inline-block border-b-6 border-nes-yellow pb-4 nes-text uppercase text-nes-yellow">
                        CHAPTER_02::SKILL_MATRIX
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {data.map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -8, borderColor: '#f3ef00' }}
                            viewport={{ once: true }}
                            className="nes-border border-white/20 p-8 md:p-10 bg-black group transition-all h-full"
                        >
                            <div className="text-nes-yellow mb-8 md:mb-10 group-hover:animate-bounce">
                                {React.cloneElement(item.icon, { size: 24 })}
                            </div>
                            <h3 className="nes-text text-[7px] md:text-[8px] text-white mb-8 md:mb-10 tracking-[1px]">{item.cat}</h3>
                            <div className="space-y-4 md:space-y-6">
                                {item.list.map(s => (
                                    <div key={s} className="story-text text-[7px] md:text-[8px] flex items-center gap-3 md:gap-4">
                                        <span className="w-1.5 h-1.5 bg-nes-yellow shadow-[0_0_5px_#f3ef00]" /> {s}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
