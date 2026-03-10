import React from 'react';
import { motion } from 'framer-motion';

const About = () => (
    <section id="about" className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="mb-16 md:mb-24 text-center">
                <h2 className="text-[10px] md:text-xl font-bold tracking-tight md:tracking-[8px] inline-block border-b-6 border-nes-yellow pb-4 nes-text uppercase text-nes-yellow">
                    CHAPTER_01::ABOUT_ME
                </h2>
            </div>

            <div className="grid lg:grid-cols-1 gap-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="nes-border p-6 md:p-12 bg-black flex flex-col gap-6 md:gap-8 border-nes-yellow shadow-pixel"
                >
                    <div className="flex justify-between items-center border-b-2 border-nes-yellow/20 pb-4">
                        <span className="nes-text text-[6px] md:text-[8px] text-nes-yellow">SYSTEM_LOG::BIOGRAPHY</span>
                        <span className="nes-text text-[5px] md:text-[6px] text-white/40">STATUS: ACTIVE</span>
                    </div>
                    <p className="story-text text-[9px] md:text-[10px] leading-relaxed md:leading-[2] text-[#fff]">
                        I am currently a 3rd-year undergraduate student pursuing a Bachelor of Science in Computer Science and Engineering at Shahjalal University of Science and Technology (SUST), Bangladesh. My academic foundation is built on a rigorous study of <span className="text-nes-yellow font-bold">Data Structures (DSA)</span>, <span className="text-nes-yellow font-bold">Algorithms</span>, and <span className="text-nes-yellow font-bold">Object-Oriented Programming (OOP)</span> principles.
                        Beyond the core curriculum, I have extensive experience in developing modern applications using various <span className="text-nes-yellow font-bold">Web Technologies</span> and am actively integrating <span className="text-nes-yellow font-bold">Data Science</span> methodologies into my workflow. My professional focus lies in leveraging these analytical tools to build scalable, data-driven solutions while continuously evolving my expertise in emerging computational fields.
                    </p>
                    <p className="story-text text-[7px] md:text-[8px] italic text-nes-yellow font-bold">
                        "Objective: Bridging traditional engineering with the frontiers of data driven innovation."
                    </p>
                </motion.div>
            </div>
        </div>
    </section>
);

export default About;
