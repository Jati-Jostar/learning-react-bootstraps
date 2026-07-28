import "./App.css";
import Header from "./components/header";
import Hero from "./components/hero";

function App() {
  return (
    <div className="halaman">
      <Header />
      <Hero />

      <main id="home">
        <h2>Belajar React dari Nol</h2>
        <p>ini isi utama website</p>
      </main>
    </div>
  );
}

export default App;