import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'

function AppFooter() {
  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="footer-section">
      <Container className="text-center">
        <h5>Corporate</h5>

        <p className="footer-description">
          Helping businesses grow through creative digital solutions.
        </p>

        <div className="footer-socials">
          <span title="Facebook">
            <i className="fa-brands fa-facebook-f"></i>
          </span>

          <span title="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </span>

          <span title="LinkedIn">
            <i className="fa-brands fa-linkedin-in"></i>
          </span>
        </div>

        <hr />

        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} Corporate. All rights reserved.
        </p>
      </Container>

      {showScrollButton && (
        <button
          type="button"
          className="btn-scroll-top"
          onClick={scrollToTop}
          aria-label="Kembali ke bagian atas halaman"
        >
          <i className="fa-solid fa-arrow-up"></i>
        </button>
      )}
    </footer>
  )
}

export default AppFooter