import "./App.css";
import Header from "./components/header";
import Hero from "./components/hero";
import Services from "./components/Services";

function App() {
  return (
    <div className="halaman">
      <Header />
      <Hero 
      judul="Belajar React dari Nol"
      deskripsi="Ini web React Pertama ku"
      tombol="Tekan Untuk Mulai"
      namaPembuat="Fida Jati"
      />
      <Services />
    </div>
  );
}

export default App;