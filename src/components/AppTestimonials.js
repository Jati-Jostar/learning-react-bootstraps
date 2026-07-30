import { Carousel, Container } from 'react-bootstrap'

const testimonials = [
  {
    id: 1,
    message:
      'Pelayanan yang diberikan sangat profesional dan hasil website sesuai dengan kebutuhan bisnis kami.',
    name: 'Rina Wijaya',
    company: 'Owner, Rina Fashion',
  },
  {
    id: 2,
    message:
      'Tim Corporate sangat responsif dan mampu menyelesaikan proyek sesuai dengan jadwal.',
    name: 'Fajar Nugroho',
    company: 'Manager, PT Maju Jaya',
  },
  {
    id: 3,
    message:
      'Website yang dibuat mempunyai tampilan menarik dan mudah digunakan oleh pelanggan kami.',
    name: 'Sari Melati',
    company: 'Founder, Sari Boutique',
  },
]

function AppTestimonials() {
  return (
    <section
      id="testimonials"
      className="testimonial-section py-5"
    >
      <Container>
        <div className="section-title text-white">
          <h2>Client Testimonials</h2>
          <p>What our clients say about us</p>
        </div>

        <Carousel
          controls={false}
          indicators={true}
          className="testimonial-carousel text-center"
        >
          {testimonials.map((testimonial) => (
            <Carousel.Item key={testimonial.id}>
              <blockquote className="testimonial-content">
                <i className="fa-solid fa-quote-left testimonial-icon"></i>

                <p className="testimonial-message">
                  {testimonial.message}
                </p>

                <footer>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.company}</span>
                </footer>
              </blockquote>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  )
}

export default AppTestimonials