import { Beth_Ellen, Inter } from "next/font/google";

const inter = Inter({ subsets: ['latin'] });
const beth_ellen = Beth_Ellen({ weight: "400", subsets: ['latin'] });

export default function Pagetwo() {
    return (
        <div className="flex flex-col items-center justify-center min-w-screen min-h-screen">
            <div>
                <p className="text-2xl sm:text-5xl relative z-20 font-light tracking-tight"><span className={inter.className}>begin with a <span className={beth_ellen.className}><span className="text-[#50B5CC]">conversation.</span></span></span></p>
                <p className="text-2xl sm:text-5xl relative z-20 font-light tracking-tight text-center"><span className={inter.className}>let us handle the content.</span></p>
            </div>
        </div>
    );
}