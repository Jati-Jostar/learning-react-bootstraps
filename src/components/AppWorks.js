import { Col, Container, Pagination, Row } from 'react-bootstrap'

const works = [
  {
    id: 1,
    image: 'https://picsum.photos/id/101/500/350',
    title: 'Brand Identity',
    category: 'Graphic Design',
  },
  {
    id: 2,
    image: 'https://picsum.photos/id/102/500/350',
    title: 'Company Website',
    category: 'Web Development',
  },
  {
    id: 3,
    image: 'https://picsum.photos/id/103/500/350',
    title: 'Mobile Application',
    category: 'App Development',
  },
  {
    id: 4,
    image: 'https://picsum.photos/id/104/500/350',
    title: 'Marketing Campaign',
    category: 'Digital Marketing',
  },
  {
    id: 5,
    image: 'https://picsum.photos/id/106/500/350',
    title: 'Online Store',
    category: 'E-Commerce',
  },
  {
    id: 6,
    image: 'https://picsum.photos/id/110/500/350',
    title: 'Business Dashboard',
    category: 'UI/UX Design',
  },
]

function AppWorks() {
  return (
    <section id="works" className="py-5">
      <Container>
        <div className="section-title">
          <h2>Our Works</h2>
          <p>Some projects we have completed</p>
        </div>

        <Row>
          {works.map((work) => (
            <Col lg={4} md={6} className="mb-4" key={work.id}>
              <div className="work-item" tabIndex="0">
                <img
                  src={work.image}
                  alt={work.title}
                  className="work-image"
                />

                <div className="work-overlay">
                  <h4>{work.title}</h4>
                  <p>{work.category}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Pagination className="justify-content-center mb-0">
          <Pagination.Prev />
          <Pagination.Item active>1</Pagination.Item>
          <Pagination.Item>2</Pagination.Item>
          <Pagination.Item>3</Pagination.Item>
          <Pagination.Next />
        </Pagination>
      </Container>
    </section>
  )
}

export default AppWorks