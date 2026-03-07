import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    Github,
    Linkedin,
    Mail,
    Trophy,
    Cpu,
    Gamepad2,
    BookOpen,
    Smartphone,
    GraduationCap,
    Menu,
    X,
    Play,
    Terminal,
    Zap,
    Rocket,
    ChevronRight,
    MessageSquare,
    Search,
    Award,
    Book,
    Users,
    Code,
    GitFork
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Assistant Robot Helper ---
const AssistantRobot = () => {
    const [message, setMessage] = useState("GREETINGS_USER! I AM UNIT_RR-BOT. INITIALIZING...");
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollPos / height;

            if (progress < 0.1) setMessage("GREETINGS_USER! I AM UNIT_RR-BOT. INITIALIZING...");
            else if (progress < 0.15) setMessage("STAGE_01: ANALYZING_ID_LOGS...");
            else if (progress < 0.28) setMessage("STAGE_02: SCANNING_ARSENAL...");
            else if (progress < 0.42) setMessage("STAGE_03: ACCESSING_RECORDS...");
            else if (progress < 0.55) setMessage("STAGE_04: ACADEMIC_DATABASE...");
            else if (progress < 0.68) setMessage("STAGE_05: RESEARCH_VECTORS...");
            else if (progress < 0.81) setMessage("STAGE_06: ACHIEVEMENT_TRACKER...");
            else if (progress < 0.94) setMessage("STAGE_07: EXTRACURRICULAR_LOGS...");
            else setMessage("STAGE_08: ESTABLISHING_SIGNAL...");
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[2000] flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: 50 }}
                        className="speech-bubble mb-6 md:mb-10 text-[7px] md:text-[8px] pointer-events-auto"
                    >
                        {message}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                className="robot-frame flex justify-around p-2 cursor-pointer scale-75 md:scale-100 pointer-events-auto"
                whileHover={{ scale: 1.1 }}
                onClick={() => setIsVisible(!isVisible)}
            >
                <div className="robot-eye left-3" />
                <div className="robot-eye right-3" />
                <div className="absolute bottom-2 w-1/2 h-1 bg-white opacity-20" />
            </motion.div>
        </div>
    );
};

// --- Retro 8-Bit Space Component ---
const RetroSpace = () => {
    const stars = useMemo(() => {
        return Array.from({ length: 150 }).map((_, i) => ({
            id: i,
            top: `${Math.floor(Math.random() * 100)}%`,
            left: `${Math.floor(Math.random() * 100)}%`,
            size: Math.floor(Math.random() * 4) + 1,
            blink: Math.random() > 0.85,
            delay: Math.random() * 4,
            duration: Math.random() * 2 + 2,
        }));
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-black">
            {stars.map((star) => (
                <div
                    key={star.id}
                    className={`absolute star ${star.blink ? 'animate-pulse' : ''}`}
                    style={{
                        top: star.top,
                        left: star.left,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        backgroundColor: star.id % 20 === 0 ? '#f3ef00' : 'white',
                        animationDelay: `${star.delay}s`,
                        animationDuration: `${star.duration}s`,
                        opacity: 0.5
                    }}
                />
            ))}
        </div>
    );
};

// --- Navigation ---
const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navLinks = [
        { name: 'ABOUT', href: '#about' },
        { name: 'SKILLS', href: '#skills' },
        { name: 'PROJECTS', href: '#projects' },
        { name: 'EDUCATION', href: '#education' },
        { name: 'RESEARCH', href: '#research' },
        { name: 'ACHIEVEMENT', href: '#achievements' },
        { name: 'ACTIVITIES', href: '#activities' },
        { name: 'CONTACT', href: '#contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-[100] bg-black border-b-4 border-nes-yellow py-4 px-6 md:px-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <a href="#" className="text-[8px] md:text-[10px] font-black text-nes-yellow tracking-widest nes-text">
                    RR_CONSOLE::RANTIDEB_ROY
                </a>
                <div className="hidden xl:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="text-[8px] text-white font-bold hover:text-nes-yellow transition-all nes-text">
                            {link.name}
                        </a>
                    ))}
                    <a href="https://github.com/rantidebRoy" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-nes-white text-white hover:bg-nes-yellow hover:text-black">
                        <Github size={14} />
                    </a>
                </div>
                <button className="xl:hidden text-nes-yellow border-4 border-nes-yellow py-2 px-3 uppercase nes-text text-[8px] font-bold" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? "BACK" : "SELECT"}
                </button>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-black border-b-4 border-nes-yellow overflow-hidden xl:hidden"
                    >
                        <div className="flex flex-col p-10 gap-8 items-center">
                            {navLinks.map((link) => (
                                <a key={link.name} href={link.href} className="text-[12px] text-nes-white font-bold hover:text-nes-yellow nes-text tracking-widest" onClick={() => setMobileMenuOpen(false)}>
                                    {link.name}
                                </a>
                            ))}
                            <div className="flex gap-10 mt-4">
                                <a href="https://github.com/rantidebRoy" target="_blank" rel="noopener noreferrer" className="p-4 border-4 border-nes-white text-white hover:bg-nes-yellow hover:text-black">
                                    <Github size={20} />
                                </a>
                                <a href="https://linkedin.com/in/rantideb-roy" target="_blank" rel="noopener noreferrer" className="p-4 border-4 border-nes-white text-white hover:bg-nes-yellow hover:text-black">
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

// --- HERO SECTION ---
const Hero = () => (
    <section className="min-h-screen flex items-center pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-8 space-y-8 md:space-y-12 order-2 lg:order-1"
            >
                <div className="inline-block px-4 py-1 border-2 border-nes-yellow text-[7px] md:text-[8px] text-nes-yellow nes-text break-words max-w-full">
                    CHAPTER_00::SYSTEM_LOAD
                </div>
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight lg:tracking-tighter nes-text">
                    LOADED <span className="text-nes-yellow">RANTIDEB ROY</span> <br className="hidden sm:block" />
                    INTO THE <span className="md:inline">MAIN_FRAME</span>
                </h1>
                <div className="nes-border border-4 p-6 md:p-10 bg-black/60 shadow-pixel border-nes-yellow">
                    <p className="story-text text-[9px] md:text-[10px] leading-relaxed md:leading-loose">
                        I HAVE AWAKENED IN THE DIGITAL VOID. I AM RANTIDEB ROY, A SYSTEMS ARCHITECT STUDYING COMPUTER SCIENCE AT SUST.
                        MY MISSION IS TO OPTIMIZE THE WORLD THROUGH ELEGANT CODE MODULES AND SOLVE COMPLEX REAL-WORLD ENIGMAS.
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

            <div className="lg:col-span-4 flex justify-center order-1 lg:order-2 w-full">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 border-8 border-nes-white bg-nes-gray/20 flex flex-col items-center justify-center p-2 overflow-hidden shadow-pixel">
                    <div className="absolute top-2 left-2 z-10 text-[5px] md:text-[6px] nes-text text-white bg-black/50 px-1">UNIT_ID: RR_EXT</div>
                    <div className="absolute bottom-2 right-2 z-10 text-[5px] md:text-[6px] nes-text text-nes-yellow bg-black/50 px-1">VERSION: 4.0</div>

                    {/* Image Layer */}
                    <div className="w-full h-full relative group">
                        <img
                            src="/profile.jpg"
                            alt="IDENTITY_SCAN"
                            className="w-full h-full object-cover grayscale brightness-75 contrast-125 pixelated"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        {/* Fallback & Scanning Text */}
                        <div className="hidden absolute inset-0 w-full h-full flex-col items-center justify-center text-center p-4 bg-black/40">
                            <Rocket size={40} className="text-nes-yellow opacity-10 animate-pulse mb-4" />
                            <p className="italic text-white/30 text-[6px] md:text-[8px] nes-text leading-tight md:leading-loose">
                                ORBITAL_SCANNING_IN_PROGRESS...<br />
                                <span className="text-[5px] md:text-[6px]">AWAITING_IMAGE_UPLOAD</span>
                            </p>
                        </div>

                        {/* CRT Effect on Image */}
                        <div className="absolute inset-0 pointer-events-none border-2 border-nes-yellow/20"
                            style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 2px, 3px 100%' }}>
                        </div>
                    </div>

                    <div className="absolute top-0 left-0 w-full h-[2px] bg-nes-white/50 animate-[scan-vertical_5s_linear_infinite] z-20" />
                </div>
            </div>
        </div>
    </section>
);

// --- 1. ABOUT ME ---
const About = () => (
    <section id="about" className="py-20 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
            <div className="mb-12 md:mb-20 text-center">
                <h2 className="text-[10px] md:text-xl font-bold tracking-tight md:tracking-[6px] inline-block border-b-6 border-nes-yellow pb-4 nes-text uppercase">
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
                        I AM AN UNDERGRADUATE STUDENT IN COMPUTER SCIENCE AND ENGINEERING AT SHAHJALAL UNIVERSITY OF SCIENCE AND TECHNOLOGY (SUST), BANGLADESH.
                        I AM A PASSIONATE DEVELOPER AND RESEARCHER COMMITTED TO MASTERING MACHINE LEARNING, SOFTWARE ENGINEERING, AND SCIENTIFIC PROGRAMMING.
                        I SPEND MY DAYS BUILDING EFFICIENT SOFTWARE SOLUTIONS AND EXPLORING WHERE DATA SCIENCE MEETS THE STARS.
                    </p>
                    <p className="story-text text-[7px] md:text-[8px] italic text-nes-yellow font-bold uppercase">
                        "MISSION: RE-ENGINEERING DIGITAL ARCHITECTURE FOR MAXIMUM OPTIMIZATION."
                    </p>
                </motion.div>
            </div>
        </div>
    </section>
);

// --- 2. SKILLS ---
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
                <h2 className="text-[10px] md:text-xl font-bold tracking-tight md:tracking-[8px] text-center mb-16 md:mb-24 text-nes-yellow nes-text uppercase">
                    CHAPTER_02::SKILL_MATRIX
                </h2>

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

// --- 3. PROJECTS ---
const Projects = () => {
    const data = [
        { name: "STUDY_BUDDY", desc: "ANDROID APPLICATION DESIGNED TO ENHANCE STUDENT PRODUCTIVITY AND ACADEMIC MANAGEMENT.", tag: "KOTLIN", link: "https://github.com/rantidebRoy/StudyBuddy" },
        { name: "COURSE_MGMT", desc: "JAVA SERVLET-BASED WEB APPLICATION FOR MANAGING ACADEMIC COURSES AND REGISTRATIONS.", tag: "JAVA", link: "https://github.com/rantidebRoy/Course_Management_System" },
        { name: "BREAK_BRICKS", desc: "CLASSIC ARCADE GAME IMPLEMENTED IN C++, SHOWCASING GAME LOGIC AND GRAPHICS.", tag: "C++", link: "https://github.com/rantidebRoy/BreakBreaker" },
        { name: "LEARN_MGMT", desc: "ROBUST PLATFORM FOR HANDLING EDUCATIONAL CONTENT AND MONITORING USER PROGRESS.", tag: "REACT", link: "https://github.com/rantidebRoy/LearningManagementSystem" },
        { name: "LIB_MGMT", desc: "JAVA-BASED SYSTEM FOR AUTOMATING LIBRARY OPERATIONS AND MEMBER TRACKING.", tag: "JAVA", link: "https://github.com/rantidebRoy/LibraryManagementSystem" }
    ];

    return (
        <section id="projects" className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 border-b-6 border-nes-white pb-6 gap-6">
                    <h2 className="text-[10px] md:text-xl font-bold tracking-tight md:tracking-[4px] text-white nes-text uppercase">
                        CHAPTER_03::PROJECTS
                    </h2>
                    <span className="nes-text text-[8px] md:text-[10px] text-nes-yellow animate-pulse">TRIALS: 05_ACTIVE</span>
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

// --- 4. EDUCATION ---
const Education = () => (
    <section id="education" className="py-20 md:py-32 bg-nes-gray/20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
            <h2 className="text-[10px] md:text-xl font-bold tracking-tight md:tracking-[8px] text-center mb-16 md:mb-24 text-nes-yellow nes-text uppercase">
                CHAPTER_04::ACADEMICS
            </h2>

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
                        {/* University */}
                        <div className="relative border-l-4 border-nes-yellow pl-6 md:pl-10">
                            <h4 className="nes-text text-[8px] md:text-[10px] text-white">BACHELOR OF ENGINEERING</h4>
                            <p className="nes-text text-[6px] md:text-[8px] text-nes-yellow tracking-widest mt-2 uppercase">SUST, CSE</p>
                            <div className="story-text text-[8px] md:text-[10px] mt-4 leading-relaxed md:leading-loose uppercase">
                                CURRENTLY IN 3RD YEAR.
                            </div>
                        </div>

                        {/* College */}
                        <div className="relative border-l-4 border-white/20 pl-6 md:pl-10">
                            <h4 className="nes-text text-[8px] md:text-[10px] text-white">HIGHER SECONDARY (HSC)</h4>
                            <p className="nes-text text-[6px] md:text-[8px] text-nes-yellow tracking-widest mt-2 uppercase">NOTRE DAME COLLEGE</p>
                            <div className="story-text text-[8px] md:text-[10px] mt-4 leading-relaxed md:leading-loose uppercase">
                                RESULT: GPA 5.00
                            </div>
                        </div>

                        {/* School */}
                        <div className="relative border-l-4 border-white/20 pl-6 md:pl-10">
                            <h4 className="nes-text text-[8px] md:text-[10px] text-white">SECONDARY SCHOOL (SSC)</h4>
                            <p className="nes-text text-[6px] md:text-[8px] text-nes-yellow tracking-widest mt-2 uppercase">JUBILEE HIGH SCHOOL</p>
                            <div className="story-text text-[8px] md:text-[10px] mt-4 leading-relaxed md:leading-loose uppercase">
                                RESULT: GPA 5.00
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

// --- 5. RESEARCH INTERESTS ---
const Research = () => (
    <section id="research" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
            <h2 className="text-[10px] md:text-xl font-bold tracking-tight md:tracking-[8px] text-center mb-16 md:mb-24 text-nes-yellow nes-text uppercase">
                CHAPTER_05::RESEARCH
            </h2>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {[
                    { title: "MACHINE_LEARNING", desc: "DEVELOPING INTELLIGENT SYSTEMS AND PREDICTIVE MODELS.", icon: <Zap size={18} /> },
                    { title: "IMAGE_PROCESSING", desc: "ANALYZING AND ENHANCING VISUAL DATA STREAMS.", icon: <Search size={18} /> },
                    { title: "ASTRONOMICAL_DATA", desc: "APPLYING PYTHON TOOLS FOR PROCESSING SPACE DATA.", icon: <Rocket size={18} /> },
                    { title: "SOFTWARE_ENG", desc: "SCALABLE AND MAINTAINABLE CODE ARCHITECTURES.", icon: <Terminal size={18} /> }
                ].map((res, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ x: 10 }}
                        viewport={{ once: true }}
                        className="nes-border border-nes-yellow/30 p-6 md:p-10 bg-black flex items-start gap-4 md:gap-8"
                    >
                        <div className="text-nes-yellow mt-1">
                            {res.icon}
                        </div>
                        <div>
                            <h4 className="nes-text text-[8px] md:text-[9px] text-white mb-3 md:mb-4 tracking-[1px]">{res.title}</h4>
                            <p className="story-text text-[7px] md:text-[8px] leading-relaxed md:leading-loose opacity-70 uppercase">{res.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// --- 6. ACHIEVEMENTS ---
const Achievements = () => (
    <section id="achievements" className="py-20 md:py-32 bg-nes-gray/20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
            <h2 className="text-[10px] md:text-xl font-bold tracking-tight md:tracking-[8px] text-center mb-16 md:mb-24 text-nes-yellow nes-text uppercase">
                CHAPTER_06::ACHIEVEMENTS
            </h2>

            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                <motion.div
                    whileHover={{ y: -10 }}
                    viewport={{ once: true }}
                    className="nes-border border-white/20 p-8 md:p-10 bg-black flex flex-col gap-6 h-full"
                >
                    <Award className="text-nes-yellow" size={28} />
                    <h4 className="nes-text text-[8px] md:text-[9px] text-white tracking-[1px] md:tracking-[2px]">PUBLISHED_RESEARCH</h4>
                    <p className="story-text text-[7px] md:text-[8px] leading-relaxed md:leading-loose uppercase">
                        CO-AUTHORED: "IMAGE ANALYSIS OF ASTRONOMICAL DATA" (OCT 2024).
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ y: -10 }}
                    viewport={{ once: true }}
                    className="nes-border border-white/20 p-8 md:p-10 bg-black flex flex-col gap-6 h-full"
                >
                    <Trophy className="text-nes-yellow" size={28} />
                    <h4 className="nes-text text-[8px] md:text-[9px] text-white tracking-[1px] md:tracking-[2px]">MATH_OLYMPIAD</h4>
                    <p className="story-text text-[7px] md:text-[8px] leading-relaxed md:leading-loose uppercase">
                        PARTICIPATION IN BANGLADESH MATHEMATICAL OLYMPIAD.
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ y: -10 }}
                    viewport={{ once: true }}
                    className="nes-border border-white/20 p-8 md:p-10 bg-black flex flex-col gap-6 h-full"
                >
                    <Trophy className="text-nes-yellow" size={28} />
                    <h4 className="nes-text text-[8px] md:text-[9px] text-white tracking-[1px] md:tracking-[2px]">HACKATHON_WIN</h4>
                    <p className="story-text text-[7px] md:text-[8px] leading-relaxed md:leading-loose uppercase">
                        ASTROCODE HACKATHON (WINNER – TEAM ASTROMANIAC).
                    </p>
                </motion.div>

                <motion.div
                    whileHover={{ y: -10 }}
                    viewport={{ once: true }}
                    className="nes-border border-white/20 p-8 md:p-10 bg-black flex flex-col gap-6 h-full"
                >
                    <Rocket className="text-nes-yellow" size={28} />
                    <h4 className="nes-text text-[8px] md:text-[9px] text-white tracking-[1px] md:tracking-[2px]">ASTEROID_DISCOVERY</h4>
                    <p className="story-text text-[7px] md:text-[8px] leading-relaxed md:leading-loose uppercase">
                        PROVISIONAL DISCOVERY OF MAIN BELT ASTEROID BY IASC/NASA.
                    </p>
                </motion.div>
            </div>
        </div>
    </section>
);

// --- 7. OTHER ACTIVITIES ---
const Activities = () => {
    const activityLogs = [
        "FORMER ACADEMIC MEMBER OF BANGLADESH MATHEMATICAL OLYMPIAD",
        "FORMER GENERAL MEMBER OF NOTRE DAME NATURE STUDY CLUB",
        "GENERAL MEMBER OF CAM (COPARNICUS ASTRONOMICAL MEMORIAL) SUST",
        "GENERAL MEMBER OF KIN (CHARITY ORGANIZATION)"
    ];

    return (
        <section id="activities" className="py-20 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <h2 className="text-[10px] md:text-xl font-bold tracking-tight md:tracking-[8px] text-center mb-16 md:mb-24 text-nes-yellow nes-text uppercase">
                    CHAPTER_07::ACTIVITIES
                </h2>

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
                                    <p className="story-text text-[8px] md:text-[10px] leading-relaxed md:leading-loose uppercase tracking-tighter group-hover:text-nes-yellow transition-colors">
                                        {log}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// --- 8. CONTACT ---
const Contact = () => {
    return (
        <section id="contact" className="py-24 md:py-40">
            <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
                <h2 className="text-[12px] md:text-2xl font-bold tracking-tight md:tracking-[10px] uppercase mb-16 md:mb-20 nes-text text-nes-yellow">
                    CHAPTER_08::UPLINK
                </h2>

                <div className="grid md:grid-cols-2 gap-12 md:gap-16 text-left">
                    <div className="nes-border p-8 md:p-14 bg-black space-y-10 md:space-y-12 shadow-pixel border-nes-yellow">
                        <div className="space-y-6 md:space-y-8">
                            <div className="space-y-4 md:space-y-6">
                                <label className="block nes-text text-[6px] md:text-[8px] text-white/40 tracking-[1px] md:tracking-[2px]">OPERATOR_ID</label>
                                <input className="w-full bg-transparent border-b-2 border-white/10 py-3 md:py-4 text-[8px] md:text-[10px] outline-none focus:border-nes-yellow text-nes-yellow nes-text" placeholder="GUEST_NAME?" />
                            </div>
                            <div className="space-y-4 md:space-y-6">
                                <label className="block nes-text text-[6px] md:text-[8px] text-white/40 tracking-[1px] md:tracking-[2px]">UPLINK_FREQ</label>
                                <input className="w-full bg-transparent border-b-2 border-white/10 py-3 md:py-4 text-[8px] md:text-[10px] outline-none focus:border-nes-yellow text-nes-yellow nes-text" placeholder="EMAIL@VOID.NET" />
                            </div>
                        </div>
                        <button className="nes-btn w-full mt-6 md:mt-10 text-[7px] md:text-[8px] font-bold py-4">TRANSMIT_DATA</button>
                    </div>

                    <div className="flex flex-col justify-center gap-10 md:gap-12 lg:pl-10">
                        <p className="story-text text-[8px] md:text-[10px] leading-relaxed md:leading-[2] text-white border-l-4 border-nes-yellow pl-6 md:pl-10 italic mb-6 md:mb-10 uppercase">
                            "SIGNAL IF YOU WANT TO COLLABORATE ON THE NEXT GREAT UPGRADE."
                        </p>
                        <div className="space-y-8 md:space-y-12">
                            <div className="flex items-center gap-6 md:gap-8 group">
                                <div className="p-3 md:p-4 border-4 border-nes-yellow text-nes-yellow transition-all group-hover:bg-nes-yellow group-hover:text-black bg-black">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="nes-text text-[6px] md:text-[8px] text-white/40 mb-2 md:mb-3 uppercase tracking-widest">RADIO_ID</h4>
                                    <p className="nes-text text-[7px] md:text-[8px] font-bold text-white tracking-tight">rrantideb@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 md:gap-8 group">
                                <div className="p-3 md:p-4 border-4 border-white text-white transition-all group-hover:bg-white group-hover:text-black bg-black">
                                    <Linkedin size={20} />
                                </div>
                                <div>
                                    <h4 className="nes-text text-[6px] md:text-[8px] text-white/40 mb-2 md:mb-3 uppercase tracking-widest">NEURAL_BRIDGE</h4>
                                    <p className="nes-text text-[7px] md:text-[8px] font-bold text-white tracking-tight uppercase">RANTIDEB-ROY</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Footer ---
const Footer = () => (
    <footer className="py-16 md:py-24 bg-black border-t-8 border-nes-yellow px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12 text-center md:text-left">
            <div className="space-y-4 md:space-y-6">
                <p className="nes-text text-[6px] md:text-[8px] text-white tracking-[2px] md:tracking-[6px] leading-loose">
                    © 2026 RANTIDEB ROY // POWERED_BY_NES_ENGINE.V6
                </p>
                <p className="nes-text text-[5px] md:text-[6px] text-white/30 tracking-widest uppercase">
                    S.U.S.T_ENGINEERING_CORE // ALL_RIGHTS_RESERVED
                </p>
            </div>
            <div className="flex gap-8 md:gap-12 items-center">
                <div className="nes-text text-[6px] md:text-[8px] text-nes-yellow animate-flicker">GAME_STATE: STABLE</div>
                <div className="flex gap-3 md:gap-4">
                    <div className="w-2 md:w-3 h-2 md:h-3 bg-nes-yellow rounded-full animate-ping" />
                    <div className="nes-text text-[6px] md:text-[8px] text-white">READY_P1</div>
                </div>
            </div>
        </div>
    </footer>
);

function App() {
    return (
        <div className="min-h-screen bg-black selection:bg-nes-yellow selection:text-black overflow-x-hidden relative text-white crt flicker">
            <RetroSpace />
            <AssistantRobot />
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Education />
            <Research />
            <Achievements />
            <Activities />
            <Contact />
            <Footer />
        </div>
    );
}

export default App;
