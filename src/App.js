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