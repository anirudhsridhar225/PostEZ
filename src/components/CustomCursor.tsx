"use client";

import React, { useEffect, useRef, useState } from "react";

interface CustomCursorProps {
    containerRef: React.RefObject<HTMLDivElement>;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ containerRef }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateCursorPosition = (e: MouseEvent) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            setPosition({ x, y });
        };

        const handleMouseEnter = () => setIsVisible(true);
        const handleMouseLeave = () => setIsVisible(false);

        const element = containerRef.current;
        element.addEventListener("mousemove", updateCursorPosition);
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            element.removeEventListener("mousemove", updateCursorPosition);
            element.removeEventListener("mouseenter", handleMouseEnter);
            element.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [containerRef]);

    useEffect(() => {
        const moveCursor = () => {
            if (cursorRef.current) {
                const { x, y } = position;
                const currentX = parseFloat(cursorRef.current.style.left) || 0;
                const currentY = parseFloat(cursorRef.current.style.top) || 0;

                const newX = currentX + (x - currentX) * 0.1;
                const newY = currentY + (y - currentY) * 0.1;

                cursorRef.current.style.left = `${newX}px`;
                cursorRef.current.style.top = `${newY}px`;
            }
            requestAnimationFrame(moveCursor);
        };

        moveCursor();
    }, [position]);

    if (!isVisible) return null;

    return (
        <div
            ref={cursorRef}
            className="pointer-events-none absolute z-[9999] mix-blend-difference"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div className="absolute left-0 top-0 w-2 h-2 bg-[#E55865] rounded-full"></div>
            <div className="absolute left-0 top-0 w-10 h-10 border-2 border-solid border-[#E55865] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
    );
};

export default CustomCursor;