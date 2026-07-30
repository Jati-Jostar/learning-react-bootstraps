import { Card, Col, Container, Row } from 'react-bootstrap'

const blogPosts = [
  {
    id: 1,
    image: 'https://picsum.photos/id/180/600/400',
    category: 'Web Development',
    date: '10 Juli 2026',
    title: 'Tips Membangun Website untuk Bisnis',
    description:
      'Beberapa hal penting yang perlu diperhatikan ketika membuat website untuk sebuah bisnis.',
  },
  {
    id: 2,
    image: 'https://picsum.photos/id/183/600/400',
    category: 'Web Design',
    date: '5 Juli 2026',
    title: 'Tren Desain Website Modern',
    description:
      'Mengenal beberapa tren desain yang dapat membuat website terlihat lebih menarik dan profesional.',
  },
  {
    id: 3,
    image: 'https://picsum.photos/id/184/600/400',
    category: 'UI/UX Design',
    date: '1 Juli 2026',
    title: 'Pentingnya UI/UX untuk Produk Digital',
    description:
      'Tampilan dan pengalaman pengguna memiliki peran penting dalam keberhasilan sebuah produk digital.',
  },
]

function AppBlog() {
  return (
    <section id="blog" className="py-5">
      <Container>
        <div className="section-title">
          <h2>Latest Blog</h2>
          <p>Read our latest articles</p>
        </div>

        <Row>
          {blogPosts.map((post) => (
            <Col lg={4} md={6} className="mb-4" key={post.id}>
              <Card className="blog-card h-100">
                <Card.Img
                  variant="top"
                  src={post.image}
                  alt={post.title}
                />

                <Card.Body>
                  <div className="blog-meta">
                    <span>
                      <i className="fa-solid fa-folder me-1"></i>
                      {post.category}
                    </span>

                    <span>
                      <i className="fa-solid fa-calendar-days me-1"></i>
                      {post.date}
                    </span>
                  </div>

                  <Card.Title className="mt-3">
                    {post.title}
                  </Card.Title>

                  <Card.Text className="text-muted">
                    {post.description}
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

export default AppBlog