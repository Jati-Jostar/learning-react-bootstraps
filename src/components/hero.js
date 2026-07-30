import { useState } from "react";

function Hero({ judul, namaPembuat, deskripsi, tombol }) {
  const [jumlahKlik, setJumlahKlik] = useState(0);

  function tekanTombol() {
    setJumlahKlik(jumlahKlik + 1);
  }

  function resetClick(){
    setJumlahKlik(0)
  }

  return (
    <section id="home" className="hero">
      <h1>{judul}</h1>

      <p>Dibuat oleh {namaPembuat}</p>

      <p>{deskripsi}</p>

      <button onClick={tekanTombol}>
        {tombol}
      </button>

      <button onClick={resetClick} disabled={jumlahKlik === 0}>
        Reset
      </button>

    {jumlahKlik === 0 ? (
        <p>Tombol belum pernah ditekan.</p>
    ) : (
    <p>Tombol sudah ditekan {jumlahKlik} kali.</p>
    )}
    </section>
  );
}

export default Hero;