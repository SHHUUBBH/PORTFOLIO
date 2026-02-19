import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
    words: string[];
    /** ms per character typed */
    typeSpeed?: number;
    /** ms per character deleted */
    deleteSpeed?: number;
    /** ms to pause after full word typed */
    pauseAfterType?: number;
    /** ms to pause after full word deleted */
    pauseAfterDelete?: number;
    className?: string;
}

export default function Typewriter({
    words,
    typeSpeed = 70,
    deleteSpeed = 40,
    pauseAfterType = 1800,
    pauseAfterDelete = 400,
    className = "",
}: TypewriterProps) {
    const [displayed, setDisplayed] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "pause-after-delete">("typing");
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const word = words[wordIndex % words.length];

        if (phase === "typing") {
            if (displayed.length < word.length) {
                timer.current = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typeSpeed);
            } else {
                timer.current = setTimeout(() => setPhase("pausing"), pauseAfterType);
            }
        } else if (phase === "pausing") {
            timer.current = setTimeout(() => setPhase("deleting"), 0);
        } else if (phase === "deleting") {
            if (displayed.length > 0) {
                timer.current = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), deleteSpeed);
            } else {
                timer.current = setTimeout(() => {
                    setWordIndex((i) => (i + 1) % words.length);
                    setPhase("typing");
                }, pauseAfterDelete);
            }
        }

        return () => { if (timer.current) clearTimeout(timer.current); };
    }, [displayed, phase, wordIndex, words, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete]);

    return (
        <span className={className}>
            {displayed}
            <span
                className="inline-block w-[2px] h-[1em] bg-current ml-[2px] align-middle"
                style={{ animation: "blink 1s step-start infinite" }}
            />
            <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
        </span>
    );
}
