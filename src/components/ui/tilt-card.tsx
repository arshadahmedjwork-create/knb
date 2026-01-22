import { useRef, useState, MouseEvent } from "react";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}

export const TiltCard = ({ children, className = "", intensity = 15 }: TiltCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -intensity;
        const rotateY = ((x - centerX) / centerX) * intensity;

        setTilt({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
        setTilt({ rotateX: 0, rotateY: 0 });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            style={{
                transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: "transform 0.1s ease-out",
            }}
        >
            {children}
        </div>
    );
};
