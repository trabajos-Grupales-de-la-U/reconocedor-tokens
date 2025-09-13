import FormFileInput from "./FormFileInput"


const Home = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[url('/src/assets/fondoR.webp')] bg-cover bg-center relative">
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <div className="flex flex-col items-center mb-10 z-10">
                <h1 className="text-7xl md:text-8xl font-bold text-center text-blue-500 drop-shadow-lg" style={{fontFamily: '"Righteous", sans-serif'}}>
                    Reconocedor
                </h1>
                <h2 className="text-3xl md:text-5xl font-bold text-center text-blue-300 mt-4 drop-shadow-lg" style={{fontFamily: '"Righteous", sans-serif'}}>
                    Tokens y Lexemas
                </h2>
            </div>
            <div className="w-full flex justify-center z-10">
                <FormFileInput />
            </div>
        </div>
    )
}

export default Home

