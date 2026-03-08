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

// --- Typewriter Sound (Web Audio API) ---
// Audio is only unlocked after an explicit user gesture (browser autoplay policy).
// We use a Promise so any code can await the unlock.
let _audioCtx = null;
let _audioUnlockResolve = null;
const audioUnlocked = new Promise(resolve => { _audioUnlockResolve = resolve; });

const unlockAudio = () => {
    if (_audioCtx) return; // already done
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    _audioCtx.resume().then(() => _audioUnlockResolve(_audioCtx));
};

const playTypeClick = () => {
    try {
        if (!_audioCtx || _audioCtx.state !== 'running') return;
        const ctx = _audioCtx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.4, ctx.currentTime);
        masterGain.connect(ctx.destination);

        // White noise burst — mechanical key contact
        const bufSize = Math.floor(ctx.sampleRate * 0.04);
        const buffer = ctx.createBuffer(1, bufSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let n = 0; n < bufSize; n++) data[n] = Math.random() * 2 - 1;
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = buffer;
        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.value = 2200;
        noiseFilter.Q.value = 1.0;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(1, ctx.currentTime);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);
        noiseSource.start();
        noiseSource.stop(ctx.currentTime + 0.04);

        // Tonal thud — key body resonance
        const osc = ctx.createOscillator();
        osc.type = 'square';
        osc.frequency.setValueAtTime(480, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.03);
        const oscGain = ctx.createGain();
        oscGain.gain.setValueAtTime(0.7, ctx.currentTime);
        oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        osc.stop(ctx.currentTime + 0.03);
    } catch (_) { /* silently ignore */ }
};

// --- Typewriter Hook ---
// `active` must be true before typing begins — caller controls this.
const useTypewriter = (text, speed = 60, active = false, silent = false) => {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);
    useEffect(() => {
        if (!active) return;
        let i = 0;
        setDisplayed('');
        setDone(false);
        const interval = setInterval(() => {
            setDisplayed(text.slice(0, i + 1));
            if (!silent) playTypeClick();
            i++;
            if (i >= text.length) { clearInterval(interval); setDone(true); }
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed, active, silent]);
    return { displayed, done };
};

// --- SVG Spacecraft ---
const Spacecraft = ({ size = 40, flipped = false }) => (
    <svg
        width={size * 2.5}
        height={size}
        viewBox="0 0 100 40"
        style={{ transform: flipped ? 'scaleX(-1)' : 'none', opacity: 0.25 }}
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Main body */}
        <ellipse cx="50" cy="20" rx="35" ry="10" fill="#aaa" />
        {/* Cockpit */}
        <ellipse cx="62" cy="18" rx="12" ry="7" fill="#888" />
        <ellipse cx="64" cy="17" rx="7" ry="4" fill="#00ffff" opacity="0.3" />
        {/* Wings */}
        <polygon points="30,20 10,32 20,20" fill="#777" />
        <polygon points="30,20 10,8 20,20" fill="#777" />
        {/* Engine glow */}
        <ellipse cx="15" cy="20" rx="6" ry="3" fill="#f3ef00" opacity="0.6" />
        <ellipse cx="8" cy="20" rx="4" ry="2" fill="#ff8800" opacity="0.5" />
        {/* Engine nozzle */}
        <rect x="10" y="18" width="6" height="4" rx="1" fill="#555" />
        {/* Hull detail */}
        <line x1="35" y1="16" x2="55" y2="16" stroke="#666" strokeWidth="1" />
        <line x1="35" y1="24" x2="55" y2="24" stroke="#666" strokeWidth="1" />
        <circle cx="40" cy="20" r="2" fill="#f3ef00" opacity="0.4" />
        <circle cx="48" cy="20" r="1.5" fill="#f3ef00" opacity="0.3" />
    </svg>
);

// --- Assistant Robot Helper ---
const AssistantRobot = ({ started, onStart }) => {
    const [message, setMessage] = useState(null);
    const [bubbleVisible, setBubbleVisible] = useState(true);

    useEffect(() => {
        if (!started) {
            setMessage(null); // use the start prompt
            return;
        }
        setMessage("SEQUENCE_INITIALIZED! SCROLLING_ENABLED.");
        const handleScroll = () => {
            const scrollPos = window.scrollY;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollPos / height;
            if (progress < 0.1) setMessage("UNIT_RR-BOT_ONLINE. READING_BIO_DATA...");
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
                                        onClick={() => window.history.back()}
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
                                className="speech-bubble mb-6 md:mb-10 text-[7px] md:text-[8px] pointer-events-auto"
                            >
                                {message || 'UNIT_RR-BOT_ONLINE. READING_BIO_DATA...'}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.5, type: 'spring' }}
                        className="robot-frame flex justify-around p-2 cursor-pointer scale-75 md:scale-100 pointer-events-auto"
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setBubbleVisible(v => !v)}
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

    const spaceObjects = useMemo(() => [
        { type: "planet", top: "15%", left: "10%", size: 45, color: "#ff4444", delay: 0, animType: "float" },
        { type: "planet", top: "65%", left: "85%", size: 65, color: "#4444ff", delay: 2, animType: "float" },
        { type: "planet", top: "45%", left: "75%", size: 25, color: "#aaa", delay: 1, animType: "pulse" },
        { type: "craft", top: "38%", left: "-18%", size: 28, delay: 5, duration: 22 },
        { type: "craft", top: "72%", left: "118%", size: 22, delay: 12, duration: 30, flipped: true },
        { type: "craft", top: "8%", left: "112%", size: 24, delay: 0, duration: 38, flipped: true }
    ], []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-black grayscale-[0.1]">
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
            {spaceObjects.map((obj, i) => (
                <motion.div
                    key={i}
                    animate={
                        obj.type === "craft"
                            ? { x: obj.left.startsWith("-") ? "140vw" : "-140vw", y: [0, -15, 15, 0] }
                            : obj.animType === "float"
                                ? { y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 10, -10, 0] }
                                : { opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }
                    }
                    transition={{
                        duration: obj.duration || (obj.type === "planet" ? 12 : 10),
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: obj.delay
                    }}
                    className="absolute"
                    style={{
                        top: obj.top,
                        left: obj.left,
                    }}
                >
                    {obj.type === "planet" ? (
                        <div className="rounded-full blur-[1px] opacity-40 shadow-[0_0_30px_rgba(255,255,255,0.1)]" style={{ backgroundColor: obj.color, width: obj.size, height: obj.size }} />
                    ) : (
                        <Spacecraft size={obj.size} flipped={!!obj.flipped} />
                    )}
                </motion.div>
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
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-[12px] text-nes-white font-bold hover:text-nes-yellow nes-text tracking-widest"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setMobileMenuOpen(false);
                                        setTimeout(() => {
                                            const target = document.querySelector(link.href);
                                            if (target) {
                                                const navbarHeight = 72;
                                                const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                                                window.scrollTo({ top, behavior: 'smooth' });
                                            }
                                        }, 350);
                                    }}
                                >
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
const Hero = ({ started, onDone }) => {
    const titleLine1 = 'LOADED ';
    const titleName = 'RANTIDEB ROY';
    const titleLine2 = 'INTO THE MAIN_FRAME';
    const fullTitle = titleLine1 + titleName + ' ' + titleLine2;

    const bioText = "INITIALIZING_ID... I AM RANTIDEB ROY, AN UNDERGRADUATE NAVIGATOR AT SUST. CURRENTLY CRAFTING DIGITAL REALMS THROUGH REAL-TIME DEVELOPMENT, I AM GATHERING SYSTEM_RESOURCES TO UNLOCK THE MACHINE_LEARNING SUB-SECTORS. CALIBRATING NEURAL PATHWAYS FOR THE NEXT STAGE.";

    const titleTyping = useTypewriter(fullTitle, 90, started);
    const bioTyping = useTypewriter(bioText, 25, titleTyping.done, true); // Silent, starts after title done

    useEffect(() => {
        if (bioTyping.done && onDone) {
            onDone();
        }
    }, [bioTyping.done, onDone]);

    const namStart = titleLine1.length;
    const namEnd = namStart + titleName.length;

    const before = titleTyping.displayed.slice(0, namStart);
    const highlight = titleTyping.displayed.slice(namStart, Math.min(titleTyping.displayed.length, namEnd));
    const after = titleTyping.displayed.length > namEnd ? titleTyping.displayed.slice(namEnd) : '';

    return (
        <section className="min-h-screen flex items-center pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
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
                                    <p className="story-text text-[9px] md:text-[10px] leading-relaxed md:leading-loose min-h-[4rem]">
                                        {bioTyping.displayed}
                                        {!bioTyping.done && <span className="animate-pulse text-nes-yellow">_</span>}
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

                <div className="lg:col-span-4 flex justify-center order-1 lg:order-2 w-full">
                    <AnimatePresence>
                        {titleTyping.done && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 border-8 border-nes-white bg-nes-gray/20 flex flex-col items-center justify-center p-2 overflow-hidden shadow-pixel"
                            >
                                <div className="absolute top-2 left-2 z-10 text-[5px] md:text-[6px] nes-text text-white bg-black/50 px-1">UNIT_ID: RR_EXT</div>
                                <div className="absolute bottom-2 right-2 z-10 text-[5px] md:text-[6px] nes-text text-nes-yellow bg-black/50 px-1">VERSION: 4.0</div>

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

// --- 1. ABOUT ME ---
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
                        I AM CURRENTLY A 3RD-YEAR UNDERGRADUATE STUDENT PURSUING A BACHELOR OF SCIENCE IN COMPUTER SCIENCE AND ENGINEERING AT SHAHJALAL UNIVERSITY OF SCIENCE AND TECHNOLOGY (SUST), BANGLADESH. MY ACADEMIC FOUNDATION IS BUILT ON A RIGOROUS STUDY OF <span className="text-nes-yellow font-bold">DATA STRUCTURES (DSA)</span>, <span className="text-nes-yellow font-bold">ALGORITHMS</span>, AND <span className="text-nes-yellow font-bold">OBJECT-ORIENTED PROGRAMMING (OOP)</span> PRINCIPLES.
                        BEYOND THE CORE CURRICULUM, I HAVE EXTENSIVE EXPERIENCE IN DEVELOPING MODERN APPLICATIONS USING VARIOUS <span className="text-nes-yellow font-bold">WEB TECHNOLOGIES</span> AND AM ACTIVELY INTEGRATING <span className="text-nes-yellow font-bold">DATA SCIENCE</span> METHODOLOGIES INTO MY WORKFLOW. MY PROFESSIONAL FOCUS LIES IN LEVERAGING THESE ANALYTICAL TOOLS TO BUILD SCALABLE, DATA-DRIVEN SOLUTIONS WHILE CONTINUOUSLY EVOLVING MY EXPERTISE IN EMERGING COMPUTATIONAL FIELDS.
                    </p>
                    <p className="story-text text-[7px] md:text-[8px] italic text-nes-yellow font-bold uppercase">
                        "OBJECTIVE: BRIDGING TRADITIONAL ENGINEERING WITH THE FRONTIERS OF DATA DRIVEN INNOVATION."
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

// --- 3. PROJECTS ---
const Projects = () => {
    const data = [
        { name: "STUDY_BUDDY", desc: "ANDROID APPLICATION DESIGNED TO ENHANCE STUDENT PRODUCTIVITY AND ACADEMIC MANAGEMENT.", tag: "KOTLIN", link: "https://github.com/rantidebRoy/StudyBuddy" },
        { name: "COURSE_MGMT", desc: "JAVA SERVLET-BASED WEB APPLICATION FOR MANAGING ACADEMIC COURSES AND REGISTRATIONS.", tag: "JAVA", link: "https://github.com/rantidebRoy/Course_Management_System" },
        { name: "BREAK_BRICKS", desc: "CLASSIC ARCADE GAME IMPLEMENTED IN C++, SHOWCASING GAME LOGIC AND GRAPHICS.", tag: "C++", link: "https://github.com/rantidebRoy/BreakBreaker" },
        { name: "LEARN_MGMT", desc: "ROBUST PLATFORM FOR HANDLING EDUCATIONAL CONTENT AND MONITORING USER PROGRESS.", tag: "REACT", link: "https://github.com/rantidebRoy/LearningManagementSystem" }
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

// --- 4. EDUCATION ---
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
                            <h4 className="nes-text text-[8px] md:text-[10px] text-white">BACHELOR OF ENGINEERING</h4>
                            <p className="nes-text text-[6px] md:text-[8px] text-nes-yellow tracking-widest mt-2 uppercase">SUST, CSE</p>
                            <div className="story-text text-[8px] md:text-[10px] mt-4 leading-relaxed md:leading-loose uppercase">CURRENTLY IN 3RD YEAR.</div>
                        </div>
                        <div className="relative border-l-4 border-white/20 pl-6 md:pl-10">
                            <h4 className="nes-text text-[8px] md:text-[10px] text-white">HIGHER SECONDARY (HSC)</h4>
                            <p className="nes-text text-[6px] md:text-[8px] text-nes-yellow tracking-widest mt-2 uppercase">NOTRE DAME COLLEGE</p>
                            <div className="story-text text-[8px] md:text-[10px] mt-4 leading-relaxed md:leading-loose uppercase">RESULT: GPA 5.00</div>
                        </div>
                        <div className="relative border-l-4 border-white/20 pl-6 md:pl-10">
                            <h4 className="nes-text text-[8px] md:text-[10px] text-white">SECONDARY SCHOOL (SSC)</h4>
                            <p className="nes-text text-[6px] md:text-[8px] text-nes-yellow tracking-widest mt-2 uppercase">JUBILEE HIGH SCHOOL</p>
                            <div className="story-text text-[8px] md:text-[10px] mt-4 leading-relaxed md:leading-loose uppercase">RESULT: GPA 5.00</div>
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
            <div className="mb-16 md:mb-24 text-center">
                <h2 className="text-[10px] md:text-xl font-bold tracking-tight md:tracking-[8px] inline-block border-b-6 border-nes-yellow pb-4 nes-text uppercase text-nes-yellow">
                    CHAPTER_05::RESEARCH
                </h2>
            </div>

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
                        <div className="text-nes-yellow mt-1">{res.icon}</div>
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
const Achievements = () => {
    const [selectedId, setSelectedId] = useState(null);
    const achievements = [
        { id: 1, type: "RESEARCH", title: "PUBLISHED_RESEARCH", text: "CO-AUTHORED: 'IMAGE PROCESSING AND ANALYSIS OF MULTIPLE WAVELENGTH ASTRONOMICAL DATA USING PYTHON TOOLS' (OCT 2024).", icon: <Award className="text-nes-yellow" size={28} />, img: "/research_preview.jpg" },
        { id: 2, type: "HACKATHON", title: "HACKATHON_WIN", text: "ASTROCODE HACKATHON (WINNER – TEAM ASTROMANIAC).", icon: <Trophy className="text-nes-yellow" size={28} />, img: "/hackathon_preview.jpg" },
        { id: 3, type: "DISCOVERY", title: "ASTEROID_DISCOVERY", text: "PROVISIONAL DISCOVERY OF MAIN BELT ASTEROID BY IASC/NASA.", icon: <Rocket className="text-nes-yellow" size={28} />, img: "/asteroid_preview.jpg" }
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
                            <p className="story-text text-[7px] md:text-[8px] leading-relaxed md:leading-loose uppercase">{item.text}</p>
                            <span className="mt-auto nes-text text-[6px] text-nes-yellow opacity-50">[CLICK_TO_PREVIEW]</span>
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
                                    <p className="story-text text-[8px] md:text-[10px] leading-relaxed md:leading-loose uppercase tracking-tighter group-hover:text-nes-yellow transition-colors">{log}</p>
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
const Contact = () => (
    <section id="contact" className="py-24 md:py-40">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
            <div className="mb-16 md:mb-20 text-center">
                <h2 className="text-[12px] md:text-2xl font-bold tracking-tight md:tracking-[10px] inline-block border-b-6 border-nes-yellow pb-4 nes-text uppercase text-nes-yellow">
                    CHAPTER_08::UPLINK
                </h2>
            </div>

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
    const [started, setStarted] = useState(false);
    const [isHeroDone, setIsHeroDone] = useState(false);

    const handleStart = () => {
        unlockAudio(); // AudioContext created + resumed inside this click handler
        setStarted(true);
    };

    return (
        <div className="min-h-screen bg-black selection:bg-nes-yellow selection:text-black overflow-x-hidden relative text-white">
            {/* Always visible: starfield background */}
            <RetroSpace />

            {/* Bot: shows intro prompt before start, helper after */}
            <AssistantRobot started={started} onStart={handleStart} />

            {/* Main site content — only mounts after user starts */}
            <AnimatePresence>
                {started && (
                    <motion.div
                        key="site"
                        className="crt flicker"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Navbar />
                        <Hero started={started} onDone={() => setIsHeroDone(true)} />

                        <AnimatePresence>
                            {isHeroDone && (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                >
                                    <About />
                                    <Skills />
                                    <Projects />
                                    <Education />
                                    <Research />
                                    <Achievements />
                                    <Activities />
                                    <Contact />
                                    <Footer />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
