import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from 'react-bootstrap'

const pricingPlans = [
  {
    id: 1,
    name: 'Basic',
    price: 'Rp500.000',
    period: 'per project',
    features: [
      '1 halaman website',
      'Desain responsif',
      'Form kontak',
      'Support melalui email',
    ],
  },
  {
    id: 2,
    name: 'Premium',
    price: 'Rp1.500.000',
    period: 'per project',
    features: [
      '5 halaman website',
      'Desain responsif',
      'Optimasi dasar SEO',
      'Support prioritas',
      'Gratis 1 kali revisi',
    ],
  },
  {
    id: 3,
    name: 'Ultimate',
    price: 'Rp3.000.000',
    period: 'per project',
    features: [
      'Halaman sesuai kebutuhan',
      'Desain khusus',
      'Integrasi sistem',
      'Support prioritas',
      'Gratis 3 kali revisi',
    ],
  },
]

function AppPricing() {
  return (
    <section id="pricing" className="py-5 bg-light">
      <Container>
        <div className="section-title">
          <h2>Pricing Plans</h2>
          <p>Choose a plan for your business</p>
        </div>

        <Row className="justify-content-center">
          {pricingPlans.map((plan) => (
            <Col lg={4} md={6} className="mb-4" key={plan.id}>
              <Card className="pricing-card h-100 text-center">
                <Card.Header>
                  <h4 className="mb-0">{plan.name}</h4>
                </Card.Header>

                <Card.Body className="d-flex flex-column">
                  <div className="pricing-price">
                    <strong>{plan.price}</strong>
                    <span>{plan.period}</span>
                  </div>

                  <ListGroup variant="flush" className="my-4">
                    {plan.features.map((feature) => (
                      <ListGroup.Item key={feature}>
                        <i className="fa-solid fa-check me-2"></i>
                        {feature}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>

                  <Button
                    href="#contact"
                    variant="primary"
                    className="mt-auto"
                  >
                    Choose Plan
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default AppPricing