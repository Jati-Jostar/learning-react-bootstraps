import { Col, Container, ProgressBar, Row } from 'react-bootstrap'

const expertiseLevels = [
  {
    id: 1,
    name: 'Website Development',
    value: 90,
  },
  {
    id: 2,
    name: 'Responsive Design',
    value: 85,
  },
  {
    id: 3,
    name: 'UI/UX Design',
    value: 75,
  },
]

function AppAbout() {
  return (
    <section id="about" className="py-5">
      <Container>
        <div className="section-title">
          <h2>About Us</h2>
          <p>Learn more about our company</p>
        </div>

        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <img
              src="https://picsum.photos/id/20/700/470"
              alt="Tim perusahaan sedang bekerja"
              className="img-fluid rounded"
            />
          </Col>

          <Col md={6}>
            <h3>Who We Are</h3>

            <p>
              Corporate adalah perusahaan yang menyediakan berbagai solusi
              digital untuk membantu bisnis berkembang.
            </p>

            <p>
              Kami menggabungkan teknologi, kreativitas, dan pengalaman untuk
              menghasilkan produk digital yang modern dan mudah digunakan.
            </p>

            <h4 className="mt-4">Our Expertise</h4>

            <p className="text-muted">
              Persentase berikut menggambarkan fokus dan pengalaman tim kami
              pada setiap bidang layanan.
            </p>

            {expertiseLevels.map((expertise) => (
              <div key={expertise.id} className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>{expertise.name}</span>
                  <span>{expertise.value}%</span>
                </div>

                <ProgressBar
                  now={expertise.value}
                  aria-label={`${expertise.name} ${expertise.value}%`}
                />
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AppAbout