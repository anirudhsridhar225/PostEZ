import dynamic from 'next/dynamic';

const ParallaxGallery = dynamic(() => import('./ParallaxGallery'), {
    ssr: false
});

export default function Pagetwo() {
    return (
        <div className="min-h-screen relative bg-[#0A0A0A] flex flex-col items-center justify-center">
            <ParallaxGallery />
        </div>
    );
}