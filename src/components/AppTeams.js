import { Card, Col, Container, Row } from 'react-bootstrap'

const teamMembers = [
  {
    id: 1,
    photo: 'https://picsum.photos/id/1005/400/400',
    name: 'Andi Saputra',
    position: 'Chief Executive Officer',
    description: 'Memimpin visi, strategi, dan perkembangan perusahaan.',
  },
  {
    id: 2,
    photo: 'https://picsum.photos/id/1011/400/400',
    name: 'Budi Santoso',
    position: 'Project Manager',
    description: 'Mengatur perencanaan dan pelaksanaan setiap proyek.',
  },
  {
    id: 3,
    photo: 'https://picsum.photos/id/1027/400/400',
    name: 'Citra Dewi',
    position: 'UI/UX Designer',
    description: 'Merancang tampilan produk yang menarik dan mudah digunakan.',
  },
  {
    id: 4,
    photo: 'https://picsum.photos/id/1012/400/400',
    name: 'Dian Permata',
    position: 'Web Developer',
    description: 'Mengembangkan website yang responsif dan memiliki performa baik.',
  },
]

function AppTeams() {
  return (
    <section id="teams" className="py-5 bg-light">
      <Container>
        <div className="section-title">
          <h2>Our Teams</h2>
          <p>Meet our professional team</p>
        </div>

        <Row>
          {teamMembers.map((member) => (
            <Col lg={3} sm={6} className="mb-4" key={member.id}>
              <Card className="team-card h-100 text-center border-0">
                <Card.Img
                  variant="top"
                  src={member.photo}
                  alt={member.name}
                />

                <Card.Body>
                  <Card.Title>{member.name}</Card.Title>

                  <Card.Subtitle className="mb-3 text-muted">
                    {member.position}
                  </Card.Subtitle>

                  <Card.Text>{member.description}</Card.Text>

                  <div className="team-socials">
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
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default AppTeams