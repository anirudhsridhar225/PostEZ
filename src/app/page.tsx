
export default function Home() {
  return (
    <div className="min-h-screen w-screen bg-[rgb(32, 33, 37)] bg-grid-white/[0.07] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Hello World
      </p>
    </div>
  );
}
