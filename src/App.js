import "./App.css";
import Header from "./components/header"

function App() {
  return (
    <div className="halaman">
      <Header />
      
      <main id="home">
        <h2>Belajar React dari Nol</h2>
        <p>ini isi utama website</p>
      </main>
    </div>
  );
}

export default App;