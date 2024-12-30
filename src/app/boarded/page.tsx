'use client'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/Card';
import VoiceInput from '@/components/VoiceInput';
import { Beth_Ellen } from "next/font/google";

const beth_ellen = Beth_Ellen({ weight: "400", subsets: ['latin'] });

const RecommendedGrid = () => {
    const recommended = [
        {
            src: "/image1.svg",
            title: "hello world",
            description: "goodbye world",
        },
        {
            src: "/image1.svg",
            title: "hello world",
            description: "goodbye world",
        },
        {
            src: "/image1.svg",
            title: "hello world",
            description: "goodbye world",
        },
        {
            src: "/image1.svg",
            title: "hello world",
            description: "goodbye world",
        },
    ];

    return (
        <div className="w-full overflow-x-auto flex justify-center items-center pb-6 text-white">
            <div className="grid grid-cols-4 gap-4 w-fit">
                {recommended.map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                        <div className="relative h-24 w-48">
                            <img
                                src={item.src}
                                alt={item.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <CardHeader>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription className="text-white/[0.4]">{item.description}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default function App() {
    return (
        <div className="min-h-screen min-w-screen bg-[#171717] flex flex-col items-center justify-center relative">
            <p className="text-4xl tracking-tight pb-2 text-white">welcome, andy!</p>
            <p className="text-2xl text-white/[0.3] pb-5">we missed your creative spark. what are you in the mood for today?</p>
            <RecommendedGrid />
            <div className="flex flex-row space-x-5 text-lg pb-10 text-white">
                <button className="border border-white/[0.6] p-2 rounded-xl">discover post ideas</button>
                <button className="border border-white/[0.6] p-2 rounded-xl">review schedule</button>
                <button className="border border-white/[0.6] p-2 rounded-xl">edit my brand identity</button>
            </div>
            <VoiceInput />
        </div>
    );
}