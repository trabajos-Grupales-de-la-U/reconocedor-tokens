import './App.css'
import FormFileInput from './Components/FormFileInput';


function App() {
  // Puedes definir la función que recibirá el archivo aquí
  const handleFileLoad = (file: File) => {
    // Aquí puedes manejar el archivo cargado
    console.log('Archivo cargado:', file);
  };

  return (
    <>
      <div className='bg-black'>
        <h2>Holaaa</h2>
        <FormFileInput onFileLoad={handleFileLoad} />
      </div>
    </>
  );
}

export default App
