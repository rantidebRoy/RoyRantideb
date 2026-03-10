import React from 'react';
import { Github } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects = () => {
    const data = [
        { name: "STUDY_BUDDY", desc: "Android application designed to enhance student productivity and academic management.", tag: "KOTLIN", link: "https://github.com/rantidebRoy/StudyBuddy" },
        { name: "COURSE_MGMT", desc: "Java Servlet-based web application for managing academic courses and registrations.", tag: "JAVA", link: "https://github.com/rantidebRoy/Course_Management_System" },
        { name: "BREAK_BRICKS", desc: "Classic arcade game implemented in C++, showcasing game logic and graphics.", tag: "C++", link: "https://github.com/rantidebRoy/BreakBreaker" },
        { name: "LEARN_MGMT", desc: "Robust platform for handling educational content and monitoring user progress.", tag: "REACT", link: "https://github.com/rantidebRoy/LearningManagementSystem" }
    ];

    return (
        <section id="projects" className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="mb-16 md:mb-24 text-center">
                    <h2 className="text-[10px] md:text-xl font-bold tracking-tight md:tracking-[8px] inline-block border-b-6 border-nes-yellow pb-4 nes-text uppercase text-nes-yellow">
                        CHAPTER_03::PROJECTS
                    </h2>
                    <div className="mt-6">
                        <span className="nes-text text-[8px] md:text-[10px] text-nes-yellow animate-pulse">TRIALS: 04_ACTIVE</span>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.map((proj, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ backgroundColor: "rgba(243, 239, 0, 0.05)" }}
                            viewport={{ once: true }}
                            className="nes-border p-8 md:p-12 bg-transparent group relative transition-all flex flex-col h-full border-white/10"
                        >
                            <div className="mb-8 md:mb-10 text-xl md:text-2xl opacity-10 text-nes-white italic nes-text">LVL-{idx + 1}</div>
                            <h3 className="nes-text text-[8px] md:text-[9px] font-bold text-white mb-6 md:mb-8 transition-colors group-hover:text-nes-yellow">{proj.name}</h3>
                            <p className="story-text text-[7px] md:text-[8px] leading-relaxed md:leading-loose mb-8 md:mb-10 flex-grow">{proj.desc}</p>
                            <div className="flex justify-between items-center mt-auto pt-4 md:pt-6">
                                <span className="nes-text text-[5px] md:text-[6px] text-nes-yellow border-b border-nes-yellow pb-1 font-bold">{proj.tag}</span>
                                <a href={proj.link} target="_blank" rel="noopener noreferrer" className="p-2 md:p-3 border-2 border-nes-white text-white hover:bg-nes-yellow hover:text-black transition-all">
                                    <Github size={16} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
