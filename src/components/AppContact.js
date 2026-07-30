import { useState } from 'react'
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap'

function AppContact() {
  const [showMessage, setShowMessage] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setShowMessage(true)
  }

  return (
    <section id="contact" className="py-5 bg-light">
      <Container>
        <div className="section-title">
          <h2>Contact Us</h2>
          <p>Get in touch with our team</p>
        </div>

        {showMessage && (
          <Alert
            variant="info"
            dismissible
            onClose={() => setShowMessage(false)}
          >
            Form berhasil diproses, tetapi data belum dikirim karena website
            belum terhubung dengan server.
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group controlId="contactName">
                <Form.Label>Full Name</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="contactEmail">
                <Form.Label>Email Address</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Enter your email address"
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="contactPhone">
                <Form.Label>Phone Number</Form.Label>

                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group controlId="contactMessage">
                <Form.Label>Message</Form.Label>

                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Write your message"
                  required
                />
              </Form.Group>
            </Col>

            <Col xs={12} className="text-center">
              <Button type="submit" variant="primary">
                Submit Message
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <div className="map-wrapper">
        <iframe
          title="Peta lokasi perusahaan di Surabaya"
          src="https://www.openstreetmap.org/export/embed.html?bbox=112.694%2C-7.291%2C112.785%2C-7.230&amp;layer=mapnik"
          loading="lazy"
        ></iframe>
      </div>

      <Container>
        <Row className="contact-info text-center">
          <Col md={4} className="mb-4 mb-md-0">
            <i className="fa-solid fa-envelope"></i>
            <h5>Email</h5>
            <p>hello@corporate.com</p>
          </Col>

          <Col md={4} className="mb-4 mb-md-0">
            <i className="fa-solid fa-phone"></i>
            <h5>Phone</h5>
            <p>031-123-4567</p>
          </Col>

          <Col md={4}>
            <i className="fa-solid fa-location-dot"></i>
            <h5>Address</h5>
            <p>Surabaya, Indonesia</p>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AppContact