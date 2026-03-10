import { useState, useEffect } from 'react';
import { playTypeClick } from '../audio';

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

export default useTypewriter;
