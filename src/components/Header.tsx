import { Button } from "@medusajs/ui";
import Image from "next/image";

export default function Header() {
    return (
        <div className="w-full flex justify-between mt-6 mb-10 mx-10 pb-10 z-10">
            <Image src="/logo.svg" alt="Logo" width={200} height={200} className="mx-10" />
            <button className="h-10 mx-10 my-2 px-2 border border-[#CC505B]/[0.5] bg-[rgb(32, 33, 37)] rounded-md">Log In to PostEz</button>
        </div>
    );
}