"use client";

import { RefObject, useEffect, useState } from "react";

interface CursorPosition {
    x: number;
    y: number;
}

interface CustomCursorImplProps {
    containerRef: RefObject<HTMLDivElement | null>;
}

const CursorImpl = ({ containerRef }: CustomCursorImplProps) => {
    const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateCursorPosition = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            setPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        container.addEventListener("mousemove", updateCursorPosition);
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            container.removeEventListener("mousemove", updateCursorPosition);
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [containerRef]);

    if (!isVisible) return null;

    return (
        <div
            className="custom-cursor"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                position: 'absolute',
                pointerEvents: 'none',
                zIndex: 50,
            }}
        >
            <div className="cursor-dot" />
            <div className="cursor-circle" />
        </div>
    );
};

export default CursorImpl;