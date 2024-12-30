// ParallaxGallery.tsx
"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Beth_Ellen } from "next/font/google";
import Image from 'next/image';

const beth_ellen = Beth_Ellen({ weight: "400", subsets: ['latin'] });

const ParallaxGallery = () => {
    const { scrollY } = useScroll();
    const startScrollY = 0;

    const images = Array.from({ length: 5 }, (_, i) => ({
        src: `/image${i + 1}.svg`,
        transform: useTransform(scrollY, [startScrollY, startScrollY + 2400], [600, -600])
    }));

    const containerVariants = {
        hidden: {
            x: 1500,
            opacity: 0
        },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 70,
                damping: 20,
                duration: 1
            }
        }
    };

    return (
        <>
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="flex px-8 h-full items-center space-x-32"
                    initial="hidden"
                    whileInView="visible"
                    variants={containerVariants}
                >
                    {images.map((image, index) => (
                        <motion.div 
                            key={index} 
                            className="relative" 
                            style={{ x: image.transform }}
                        >
                            <Image
                                src={image.src}
                                alt={`Image ${index + 1}`}
                                height={500}
                                width={500}
                                className="h-full w-auto object-cover rounded-lg opacity-30 scale-150"
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-10 text-white">
                <div>
                    <p className="text-2xl sm:text-5xl relative z-20 font-light tracking-tight">
                        begin with a <span className={beth_ellen.className}>
                            <span className="text-[#50B5CC]">conversation.</span>
                        </span>
                    </p>
                    <p className="text-2xl sm:text-5xl relative z-20 font-light tracking-tight text-center">
                        let us handle the content.
                    </p>
                </div>
            </div>
        </>
    );
};

export default ParallaxGallery;
