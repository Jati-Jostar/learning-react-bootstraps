import { Card, Col, Container, Row } from 'react-bootstrap'

const services = [
  {
    id: 1,
    icon: 'fa-solid fa-code',
    title: 'Web Development',
    description:
      'Membangun website modern, responsif, dan sesuai dengan kebutuhan bisnis.',
  },
  {
    id: 2,
    icon: 'fa-solid fa-mobile-screen-button',
    title: 'App Development',
    description:
      'Mengembangkan aplikasi mobile yang mudah digunakan dan memiliki performa baik.',
  },
  {
    id: 3,
    icon: 'fa-solid fa-palette',
    title: 'UI/UX Design',
    description:
      'Merancang tampilan aplikasi yang menarik, konsisten, dan nyaman digunakan.',
  },
  {
    id: 4,
    icon: 'fa-solid fa-bullhorn',
    title: 'Digital Marketing',
    description:
      'Membantu bisnis menjangkau lebih banyak pelanggan melalui pemasaran digital.',
  },
  {
    id: 5,
    icon: 'fa-solid fa-chart-line',
    title: 'Business Consulting',
    description:
      'Memberikan konsultasi strategi digital untuk mendukung perkembangan bisnis.',
  },
  {
    id: 6,
    icon: 'fa-solid fa-headset',
    title: 'Customer Support',
    description:
      'Memberikan dukungan untuk membantu pelanggan menggunakan produk dan layanan.',
  },
]

function AppServices() {
  return (
    <section id="services" className="py-5 bg-light">
      <Container>
        <div className="section-title">
          <h2>Our Services</h2>
          <p>Services we provide</p>
        </div>

        <Row>
          {services.map((service) => (
            <Col lg={4} md={6} className="mb-4" key={service.id}>
              <Card className="service-card h-100 text-center border-0">
                <Card.Body>
                  <i className={`${service.icon} service-icon`}></i>

                  <Card.Title className="mt-3">
                    {service.title}
                  </Card.Title>

                  <Card.Text className="text-muted">
                    {service.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default AppServices