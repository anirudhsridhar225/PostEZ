"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Beth_Ellen, Inter } from "next/font/google";
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });
const beth_ellen = Beth_Ellen({ weight: "400", subsets: ['latin'] });

export default function Pagetwo() {
    const { scrollY } = useScroll();
    const startScrollY = 0;

    const image1X = useTransform(scrollY, [startScrollY, startScrollY + 2400], [600, -600]);
    const image2X = useTransform(scrollY, [startScrollY, startScrollY + 2400], [600, -600]);
    const image3X = useTransform(scrollY, [startScrollY, startScrollY + 2400], [600, -600]);
    const image4X = useTransform(scrollY, [startScrollY, startScrollY + 2400], [600, -600]);
    const image5X = useTransform(scrollY, [startScrollY, startScrollY + 2400], [600, -600]);

    // Animation configuration for right-to-left
    const containerVariants = {
        hidden: {
            x: 1500, // Start from the right
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
        <div className="min-h-screen relative bg-[#0A0A0A] flex flex-col items-center justify-center my-12">
            {/* Parallax Gallery */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className="flex px-8 h-full items-center space-x-32"
                    initial="hidden"
                    whileInView="visible"
                    variants={containerVariants}
                >
                    <motion.div className="relative" style={{ x: image1X }}>
                        <Image
                            src="/image1.svg"
                            alt="Image 1"
                            height={500}
                            width={500}
                            className="h-full w-auto object-cover rounded-lg opacity-30 scale-150"
                        />
                    </motion.div>

                    <motion.div className="relative" style={{ x: image2X }}>
                        <Image
                            src="/image2.svg"
                            alt="Image 2"
                            height={500}
                            width={500}
                            className="h-full w-auto object-cover rounded-lg opacity-30 scale-150"
                        />
                    </motion.div>

                    <motion.div className="relative" style={{ x: image3X }}>
                        <Image
                            src="/image3.svg"
                            alt="Image 3"
                            height={500}
                            width={500}
                            className="h-full w-auto object-cover rounded-lg opacity-30 scale-150"
                        />
                    </motion.div>

                    <motion.div className="relative" style={{ x: image4X }}>
                        <Image
                            src="/image4.svg"
                            alt="Image 4"
                            height={500}
                            width={500}
                            className="h-full w-auto object-cover rounded-lg opacity-30 scale-150"
                        />
                    </motion.div>

                    <motion.div className="relative" style={{ x: image5X }}>
                        <Image
                            src="/image5.svg"
                            alt="Image 5"
                            height={500}
                            width={500}
                            className="h-full w-auto object-cover rounded-lg opacity-30 scale-150"
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
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
            <div className="absolute bottom-0 w-full flex justify-center">
                <p className="text-center w-3/5 text-xl text-[#FAFAFA]/[0.4] tracking-tighter">
                    Ditch the keyboard and let your voice do the work. Our intelligent system crafts high-quality content from your
                    voice messages, saving you time and effort. Ditch the keyboard and let your voice do the work.
                    Our intelligent system crafts high-quality content from your voice messages,
                    saving you time and effort.
                </p>
            </div>
        </div>
    );
}
