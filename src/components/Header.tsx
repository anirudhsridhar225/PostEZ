import Image from "next/image";

export default function Header() {
    return (
        <div className="w-full flex justify-between mt-6 mb-10 mx-10 pb-10 z-10">
            <Image src="/logo.svg" alt="Logo" width={150} height={150} className="mx-10" />
            <button className="h-10 mx-10 my-2 px-2 border border-[#CC505B]/[0.5] bg-[rgb(32, 33, 37)] hover:scale-110 transition-all duration-100 rounded-md">Log In to PostEz</button>
        </div>
    );
}