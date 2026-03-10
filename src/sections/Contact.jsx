import React, { useState } from 'react';
import { Mail, Linkedin, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playMenuClick } from '../audio';

const Contact = () => {
    const [status, setStatus] = useState('idle'); // idle, sending, success, error
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status !== 'idle') return;

        playMenuClick();
        setStatus('sending');

        try {
            // CRITICAL: Replace 'YOUR_FORM_ID' with your actual Formspree ID from formspree.io
            const FORM_ID = 'mojkvnnb';

            if (FORM_ID === 'YOUR_FORM_ID') {
                alert("SYSTEM_CONFIG_ERROR: Please replace 'YOUR_FORM_ID' in Contact.jsx with your real Formspree ID.");
                setStatus('idle');
                return;
            }

            const response = await fetch(`https://formspree.io/f/${FORM_ID}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 3000);
            }
        } catch (error) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section id="contact" className="py-24 md:py-40">
            <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
                <div className="mb-16 md:mb-20 text-center">
                    <h2 className="text-[12px] md:text-2xl font-bold tracking-tight md:tracking-[10px] inline-block border-b-6 border-nes-yellow pb-4 nes-text uppercase text-nes-yellow">
                        CHAPTER_08::UPLINK
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12 md:gap-16 text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="nes-border p-8 md:p-12 bg-black/80 flex flex-col gap-8 md:gap-10 shadow-pixel border-nes-yellow relative overflow-hidden group"
                    >
                        {/* Terminal Header */}
                        <div className="absolute top-0 left-0 right-0 bg-nes-yellow/10 border-b-2 border-nes-yellow/20 px-4 py-2 flex justify-between items-center z-20">
                            <span className="nes-text text-[5px] md:text-[6px] text-nes-yellow tracking-widest uppercase font-bold">
                                {status === 'success' ? 'TRANSMISSION_COMPLETE' :
                                    status === 'error' ? 'UPLINK_ERROR' : 'SIGNAL_TRANSMITTER_V2.0'}
                            </span>
                            <div className="flex gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${status === 'success' ? 'bg-green-500' :
                                    status === 'error' ? 'bg-red-500' : 'bg-nes-yellow animate-pulse'
                                    }`} />
                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                            </div>
                        </div>

                        {/* Success / Error Overlays */}
                        <AnimatePresence>
                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-black/95 z-10 flex flex-col items-center justify-center p-10 text-center"
                                >
                                    <div className="nes-text text-green-500 text-[10px] md:text-[12px] space-y-6">
                                        <p className="animate-pulse">SIGNAL_RECEIVED_SUCCESSFULLY</p>
                                        <div className="w-full h-1 bg-green-900 overflow-hidden relative">
                                            <motion.div
                                                className="absolute inset-0 bg-green-500"
                                                initial={{ x: '-100%' }}
                                                animate={{ x: '100%' }}
                                                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                            />
                                        </div>
                                        <p className="text-[6px] md:text-[8px] text-white/50 pt-4 uppercase tracking-widest">
                                            Packet delivery confirmed by main_core.<br />Returning to standby...
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 bg-red-900/90 z-10 flex flex-col items-center justify-center p-10 text-center"
                                >
                                    <div className="nes-text text-white text-[10px] md:text-[12px] space-y-4">
                                        <p className="font-bold underline text-nes-yellow">UPLINK_FAILURE_404</p>
                                        <p className="text-[6px] md:text-[8px] uppercase tracking-wider">
                                            ID_NOT_CONFIGURED OR INVALID_FREQ.<br />
                                            Check YOUR_FORM_ID in Contact.jsx.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="pt-8 space-y-8 md:space-y-10">
                            <div className="space-y-4">
                                <label className="flex items-center gap-3 nes-text text-[6px] md:text-[8px] text-white/50 uppercase">
                                    <span className="text-nes-yellow font-bold">&gt;</span> OPERATOR_ID
                                </label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={status !== 'idle'}
                                    className="w-full bg-nes-gray/10 border-2 border-white/10 p-4 text-[8px] md:text-[10px] outline-none focus:border-nes-yellow text-nes-yellow nes-text transition-colors placeholder:text-white/10 disabled:opacity-20"
                                    style={{ textTransform: 'none' }}
                                    placeholder="IDENT_NAME"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-3 nes-text text-[6px] md:text-[8px] text-white/50 uppercase">
                                    <span className="text-nes-yellow font-bold">&gt;</span> UPLINK_FREQ
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    disabled={status !== 'idle'}
                                    className="w-full bg-nes-gray/10 border-2 border-white/10 p-4 text-[8px] md:text-[10px] outline-none focus:border-nes-yellow text-nes-yellow nes-text transition-colors disabled:opacity-20"
                                    style={{ textTransform: 'none' }}
                                    placeholder="email@address.com"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="flex items-center gap-3 nes-text text-[6px] md:text-[8px] text-white/50 uppercase">
                                    <span className="text-nes-yellow font-bold">&gt;</span> MESSAGE_PACKET
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    disabled={status !== 'idle'}
                                    rows="4"
                                    className="w-full bg-nes-gray/10 border-2 border-white/10 p-4 text-[8px] md:text-[10px] outline-none focus:border-nes-yellow text-nes-yellow nes-text transition-colors placeholder:text-white/10 resize-none disabled:opacity-20"
                                    style={{ textTransform: 'none' }}
                                    placeholder="ENTER_TRANSMISSION..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={status === 'idle' ? { scale: 1.02, backgroundColor: '#f3ef00', color: '#000' } : {}}
                                whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                                className={`nes-btn w-full mt-4 text-[8px] font-bold py-5 tracking-[4px] border-4 uppercase ${status === 'sending' ? 'bg-nes-yellow text-black' : 'is-primary'}`}
                                disabled={status !== 'idle'}
                            >
                                {status === 'idle' && 'TRANSMIT_DATA'}
                                {status === 'sending' && 'SENDING_PACKET...'}
                                {status === 'error' && 'RETRY_UPLINK'}
                                {status === 'success' && 'SIGNAL_SENT'}
                            </motion.button>
                        </form>
                    </motion.div>

                    <div className="flex flex-col justify-center gap-10 md:gap-12 lg:pl-10">
                        <p className="story-text text-[8px] md:text-[10px] leading-relaxed md:leading-[2] text-white border-l-4 border-nes-yellow pl-6 md:pl-10 italic mb-6 md:mb-10">
                            "Signal if you want to collaborate on the next great upgrade."
                        </p>
                        <div className="space-y-8 md:space-y-12">
                            <a href="mailto:rrantideb@gmail.com" className="flex items-center gap-6 md:gap-8 group pointer-events-auto">
                                <div className="p-3 md:p-4 border-4 border-nes-yellow text-nes-yellow transition-all group-hover:bg-nes-yellow group-hover:text-black bg-black">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="nes-text text-[6px] md:text-[8px] text-white/40 mb-2 md:mb-3 uppercase tracking-widest">RADIO_ID</h4>
                                    <p className="nes-text text-[7px] md:text-[8px] font-bold text-white tracking-tight" style={{ textTransform: 'none' }}>rrantideb@gmail.com</p>
                                </div>
                            </a>
                            <a href="https://linkedin.com/in/rantideb-roy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 md:gap-8 group pointer-events-auto">
                                <div className="p-3 md:p-4 border-4 border-white text-white transition-all group-hover:bg-nes-white group-hover:text-black bg-black">
                                    <Linkedin size={20} />
                                </div>
                                <div>
                                    <h4 className="nes-text text-[6px] md:text-[8px] text-white/40 mb-2 md:mb-3 uppercase tracking-widest">NEURAL_BRIDGE</h4>
                                    <p className="nes-text text-[7px] md:text-[8px] font-bold text-white tracking-tight" style={{ textTransform: 'none' }}>linkedin.com/in/rantideb-roy</p>
                                </div>
                            </a>
                            <a href="https://wa.me/8801601018048" target="_blank" rel="noopener noreferrer" className="flex items-center gap-6 md:gap-8 group pointer-events-auto">
                                <div className="p-3 md:p-4 border-4 border-white text-white transition-all group-hover:bg-[#25D366] group-hover:border-[#25D366] group-hover:text-black bg-black">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <h4 className="nes-text text-[6px] md:text-[8px] text-white/40 mb-2 md:mb-3 uppercase tracking-widest">DIRECT_UPLINK</h4>
                                    <p className="nes-text text-[7px] md:text-[8px] font-bold text-white tracking-tight" style={{ textTransform: 'none' }}>+88 01601018048</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
