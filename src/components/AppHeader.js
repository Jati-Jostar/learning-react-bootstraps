import { Container, Nav, Navbar } from 'react-bootstrap'

const menuItems = [
  {
    id: 1,
    label: 'Home',
    href: '#home',
  },
  {
    id: 2,
    label: 'About',
    href: '#about',
  },
  {
    id: 3,
    label: 'Services',
    href: '#services',
  },
  {
    id: 4,
    label: 'Works',
    href: '#works',
  },
  {
    id: 5,
    label: 'Teams',
    href: '#teams',
  },
  {
    id: 6,
    label: 'Testimonials',
    href: '#testimonials',
  },
  {
    id: 7,
    label: 'Pricing',
    href: '#pricing',
  },
  {
    id: 8,
    label: 'Blog',
    href: '#blog',
  },
  {
    id: 9,
    label: 'Contact',
    href: '#contact',
  },
  {
    id: 10,
    label: 'Test',
    href: '#contact',
  }
]

function AppHeader() {
  return (
    <Navbar
      bg="white"
      expand="lg"
      sticky="top"
      className="main-navbar shadow-sm"
    >
      <Container>
        <Navbar.Brand href="#home" className="fw-bold text-uppercase">
          Corporate
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navbar-menu"
          aria-label="Buka menu navigasi"
        />

        <Navbar.Collapse id="main-navbar-menu">
          <Nav className="ms-auto">
            {menuItems.map((item) => (
              <Nav.Link key={item.id} href={item.href}>
                {item.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default AppHeader