// --- Typewriter Sound (Web Audio API) ---
// Audio is only unlocked after an explicit user gesture (browser autoplay policy).
// We use a Promise so any code can await the unlock.
let _audioCtx = null;
let _audioUnlockResolve = null;
export const audioUnlocked = new Promise(resolve => { _audioUnlockResolve = resolve; });

// iOS Safari requires a silent buffer to be played synchronously on the first
// user gesture, plus an explicit resume(), before any other audio will work.
export const unlockAudio = () => {
    if (_audioCtx) {
        // Already created — just make sure it's resumed (handles Safari suspend)
        _audioCtx.resume().then(() => _audioUnlockResolve(_audioCtx)).catch(() => { });
        return;
    }
    _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // Play a 1-sample silent buffer — required on iOS to properly unlock the ctx
    try {
        const silentBuf = _audioCtx.createBuffer(1, 1, 22050);
        const silentSrc = _audioCtx.createBufferSource();
        silentSrc.buffer = silentBuf;
        silentSrc.connect(_audioCtx.destination);
        silentSrc.start(0);
    } catch (_) { }
    _audioCtx.resume().then(() => _audioUnlockResolve(_audioCtx)).catch(() => { });
};

// Helper: attempt to run fn(ctx) now if running, or after resume (iOS fallback)
export const withAudio = (fn) => {
    if (!_audioCtx) return;
    if (_audioCtx.state === 'running') {
        fn(_audioCtx);
    } else {
        _audioCtx.resume().then(() => fn(_audioCtx)).catch(() => { });
    }
};

export const playTypeClick = () => {
    try {
        withAudio((ctx) => {
            // Soft, quiet sine blip — like a subtle terminal cursor tick
            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(0.06, ctx.currentTime);
            masterGain.connect(ctx.destination);

            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1100, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.025);
            const g = ctx.createGain();
            g.gain.setValueAtTime(1, ctx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
            osc.connect(g);
            g.connect(masterGain);
            osc.start();
            osc.stop(ctx.currentTime + 0.025);
        });
    } catch (_) { /* silently ignore */ }
};

export const playMenuClick = () => {
    try {
        withAudio((ctx) => {
            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(0.18, ctx.currentTime);
            masterGain.connect(ctx.destination);

            const osc = ctx.createOscillator();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(1200, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);

            const oscGain = ctx.createGain();
            oscGain.gain.setValueAtTime(0.4, ctx.currentTime);
            oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

            osc.connect(oscGain);
            oscGain.connect(masterGain);
            osc.start();
            osc.stop(ctx.currentTime + 0.05);
        });
    } catch (_) { /* ignore */ }
};

export const playAsteroidHit = (size = 'med') => {
    try {
        withAudio((ctx) => {
            const t = ctx.currentTime;
            const masterGain = ctx.createGain();
            masterGain.gain.setValueAtTime(0.35, t);
            masterGain.connect(ctx.destination);

            // noise burst — explosion crunch
            const sampleRate = ctx.sampleRate;
            const len = size === 'lg' ? 0.18 : size === 'sm' ? 0.07 : 0.12;
            const bufSize = Math.floor(sampleRate * len);
            const buf = ctx.createBuffer(1, bufSize, sampleRate);
            const data = buf.getChannelData(0);
            for (let n = 0; n < bufSize; n++) data[n] = (Math.random() * 2 - 1) * Math.pow(1 - n / bufSize, 1.5);
            const noise = ctx.createBufferSource();
            noise.buffer = buf;
            const nFilter = ctx.createBiquadFilter();
            nFilter.type = 'lowpass';
            nFilter.frequency.value = size === 'sm' ? 1800 : 900;
            const nGain = ctx.createGain();
            nGain.gain.setValueAtTime(1, t);
            nGain.gain.exponentialRampToValueAtTime(0.001, t + len);
            noise.connect(nFilter);
            nFilter.connect(nGain);
            nGain.connect(masterGain);
            noise.start();
            noise.stop(t + len);

            // pitched thud
            const freq = size === 'lg' ? 60 : size === 'sm' ? 180 : 110;
            const osc = ctx.createOscillator();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq * 2, t);
            osc.frequency.exponentialRampToValueAtTime(freq * 0.4, t + len);
            const oGain = ctx.createGain();
            oGain.gain.setValueAtTime(0.6, t);
            oGain.gain.exponentialRampToValueAtTime(0.001, t + len);
            osc.connect(oGain);
            oGain.connect(masterGain);
            osc.start();
            osc.stop(t + len);
        });
    } catch (_) { /* ignore */ }
};

export const playStartSound = () => {
    try {
        withAudio((ctx) => {
            const t = ctx.currentTime;

            const playNote = (freq, start, duration) => {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(freq, start);
                g.gain.setValueAtTime(0.2, start);
                g.gain.exponentialRampToValueAtTime(0.01, start + duration);
                osc.connect(g);
                g.connect(ctx.destination);
                osc.start(start);
                osc.stop(start + duration);
            };

            // Celebratory arpeggio: C5 -> E5 -> G5 -> C6
            playNote(523.25, t, 0.1);        // C5
            playNote(659.25, t + 0.08, 0.1); // E5
            playNote(783.99, t + 0.16, 0.1); // G5
            playNote(1046.50, t + 0.24, 0.3); // C6
        });
    } catch (_) { /* ignore */ }
};
