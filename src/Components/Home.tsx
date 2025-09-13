




import FormFileInput from "./FormFileInput"

const Home = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-2 sm:px-5">
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-2 sm:px-5 py-10 sm:py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <div className="flex flex-col items-center mb-6 sm:mb-10 z-10 max-w-lg w-full">
                <h1 className="text-4xl sm:text-7xl md:text-8xl font-bold text-center text-blue-500 drop-shadow-lg" style={{fontFamily: '"Righteous", sans-serif'}}>
                    Reconocedor
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center text-blue-300 mt-2 sm:mt-4 drop-shadow-lg" style={{fontFamily: '"Righteous", sans-serif'}}>
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

