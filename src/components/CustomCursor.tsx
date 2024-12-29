"use client";

import { RefObject, useEffect, useState } from "react";

interface CustomCursorProps {
    containerRef: RefObject<HTMLDivElement | null>;
}

const CustomCursor = ({ containerRef }: CustomCursorProps) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const updateCursorPosition = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setPosition({ x, y });
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

    if (!isMounted || !isVisible) return null;

    return (
        <div
            className="custom-cursor"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div className="cursor-dot"></div>
            <div className="cursor-circle"></div>
        </div>
    );
};

export default CustomCursor;