export default function Hero() {
    return (
      <section id="hero" className="flex flex-col items-center justify-center h-screen bg-orange-400  text-white">
        <h1 className="text-4xl md:text-6xl font-bold">Hi, I&apos;m THORIQ</h1>
        <p className="mt-4 text-lg md:text-xl">Web Developer | Designer | Creator</p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-500 rounded-full hover:bg-gray-200">
          View My Work
        </button>
      </section>
    );
  }