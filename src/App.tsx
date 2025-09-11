import './App.css'
import Home from './Components/Home';


function App() {
  const handleFileLoad = (file: File) => {
    console.log('Archivo cargado:', file);
  };

  return (
    <>
  <Home />
    </>
  );
}

export default App
