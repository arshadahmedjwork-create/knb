import { useState, useEffect } from "react";

interface TypewriterEffectProps {
    text: string;
    speed?: number;
    className?: string;
    delay?: number;
}

export const TypewriterEffect = ({
    text,
    speed = 50,
    className = "",
    delay = 0
}: TypewriterEffectProps) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const delayTimer = setTimeout(() => {
            setIsStarted(true);
        }, delay);

        return () => clearTimeout(delayTimer);
    }, [delay]);

    useEffect(() => {
        if (!isStarted) return;

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed, isStarted]);

    return (
        <span className={className}>
            {displayedText}
            {currentIndex < text.length && (
                <span className="animate-pulse">|</span>
            )}
        </span>
    );
};
