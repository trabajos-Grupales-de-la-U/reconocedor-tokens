import FormFileInput from "./FormFileInput"


const Home = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[url('/src/assets/fondoR.webp')] bg-cover bg-center relative">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
            </div>
            <div className="flex flex-col items-center mb-10 z-10">
                <h1 className="text-7xl md:text-8xl font-bold text-center text-violet-300 drop-shadow-lg" style={{fontFamily: 'Slackey, sans-serif'}}>
                    Reconocedor
                </h1>
                <h2 className="text-3xl md:text-5xl font-bold text-center text-violet-200 mt-4 drop-shadow-lg" style={{fontFamily: 'Slackey, sans-serif'}}>
                    Tokens y Lexemas
                </h2>
            </div>
            <div className="w-full flex justify-center z-10">
                <FormFileInput  />
            </div>
        </div>
    )
}

export default Home

