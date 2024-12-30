import dynamic from 'next/dynamic';
import { RefObject } from 'react';

const CursorImpl = dynamic(() => import('./CursorImpl'), {
    ssr: false
});

interface CustomCursorProps {
    containerRef: RefObject<HTMLDivElement | null>;
}

const CustomCursor = ({ containerRef }: CustomCursorProps) => {
    return <CursorImpl containerRef={containerRef} />;
};

export default CustomCursor;