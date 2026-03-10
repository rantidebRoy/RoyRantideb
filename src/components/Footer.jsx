import React from 'react';
import { motion } from 'framer-motion';

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

export default Footer;
