import React from 'react';
import { GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Education = () => (
    <section id="education" className="py-20 md:py-32 bg-nes-gray/20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="mb-16 md:mb-24 text-center">
                <h2 className="text-[10px] md:text-xl font-bold tracking-tight md:tracking-[8px] inline-block border-b-6 border-nes-yellow pb-4 nes-text uppercase text-nes-yellow">
                    CHAPTER_04::ACADEMICS
                </h2>
            </div>

            <div className="grid lg:grid-cols-1 gap-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="nes-border border-white/20 p-6 md:p-12 bg-black flex flex-col gap-8 md:gap-10 shadow-pixel"
                >
                    <div className="flex justify-between items-center border-b-2 border-white/10 pb-4">
                        <span className="nes-text text-[6px] md:text-[8px] text-white flex items-center gap-2 md:gap-3"><GraduationCap size={16} /> PRIMARY_DB</span>
                        <span className="nes-text text-[5px] md:text-[6px] text-nes-yellow">ACTIVE</span>
                    </div>

                    <div className="space-y-10 md:space-y-12">
                        <div className="relative border-l-4 border-nes-yellow pl-6 md:pl-10">
                            <h4 className="nes-text text-[8px] md:text-[10px] text-white">Bachelor of Engineering</h4>
                            <p className="nes-text text-[6px] md:text-[8px] text-nes-yellow tracking-widest mt-2">SUST, CSE</p>
                            <div className="story-text text-[8px] md:text-[10px] mt-4 leading-relaxed md:leading-loose">Currently in 3rd Year.</div>
                        </div>
                        <div className="relative border-l-4 border-white/20 pl-6 md:pl-10">
                            <h4 className="nes-text text-[8px] md:text-[10px] text-white">Higher Secondary (HSC)</h4>
                            <p className="nes-text text-[6px] md:text-[8px] text-nes-yellow tracking-widest mt-2">Notre Dame College</p>
                            <div className="story-text text-[8px] md:text-[10px] mt-4 leading-relaxed md:leading-loose">Result: GPA 5.00</div>
                        </div>
                        <div className="relative border-l-4 border-white/20 pl-6 md:pl-10">
                            <h4 className="nes-text text-[8px] md:text-[10px] text-white">Secondary School (SSC)</h4>
                            <p className="nes-text text-[6px] md:text-[8px] text-nes-yellow tracking-widest mt-2">Jubilee High School</p>
                            <div className="story-text text-[8px] md:text-[10px] mt-4 leading-relaxed md:leading-loose">Result: GPA 5.00</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

export default Education;
