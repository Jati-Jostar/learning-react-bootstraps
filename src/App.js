<<<<<<< HEAD
import AppHeader from './components/AppHeader'
import AppHero from './components/AppHero'
import AppAbout from './components/AppAbout'
import AppServices from './components/AppServices'
import AppWorks from './components/AppWorks'
import AppTeams from './components/AppTeams'
import AppTestimonials from './components/AppTestimonials'
import AppPricing from './components/AppPricing'
import AppBlog from './components/AppBlog'
import AppContact from './components/AppContact'
import AppFooter from './components/AppFooter'
import './App.css'

function App() {
  return (
    <>
      <AppHeader />

      <main>
        <AppHero />
        <AppAbout />
        <AppServices />
        <AppWorks />
        <AppTeams />
        <AppTestimonials />
        <AppPricing />
        <AppBlog />
        <AppContact />
      </main>

      <AppFooter />
    </>
  )
}

export default App
=======
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
>>>>>>> e8e3e26deb19bd0eeaa78c774bc11d028f314935
