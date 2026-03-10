import React, { useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { playMenuClick } from '../audio';

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
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-[8px] text-white font-bold hover:text-nes-yellow transition-all nes-text"
                            onClick={() => playMenuClick()}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a href="https://github.com/rantidebRoy" target="_blank" rel="noopener noreferrer" className="p-2 border-2 border-nes-white text-white hover:bg-nes-yellow hover:text-black">
                        <Github size={14} />
                    </a>
                </div>
                <button
                    className="xl:hidden text-nes-yellow border-4 border-nes-yellow py-2 px-3 uppercase nes-text text-[8px] font-bold"
                    onClick={() => { playMenuClick(); setMobileMenuOpen(!mobileMenuOpen); }}
                >
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
                                        playMenuClick();
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

export default Navbar;
