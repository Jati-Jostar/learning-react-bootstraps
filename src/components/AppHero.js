import { Button, Carousel } from 'react-bootstrap'

const slides = [
  {
    id: 1,
    image: 'https://picsum.photos/id/0/1600/750',
    title: 'Build Your Digital Presence',
    description: 'Kami membantu bisnis membangun website yang modern dan profesional.',
  },
  {
    id: 2,
    image: 'https://picsum.photos/id/1/1600/750',
    title: 'Creative Digital Solutions',
    description: 'Solusi digital yang dibuat sesuai dengan kebutuhan bisnis Anda.',
  },
  {
    id: 3,
    image: 'https://picsum.photos/id/3/1600/750',
    title: 'Responsive on Every Device',
    description: 'Website nyaman digunakan melalui komputer, tablet, dan handphone.',
  },
]

function AppHero() {
  return (
    <section id="home" className="hero-section">
      <Carousel fade>
        {slides.map((slide) => (
          <Carousel.Item key={slide.id}>
            <img
              src={slide.image}
              alt={slide.title}
              className="d-block w-100 hero-image"
            />

            <Carousel.Caption>
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>

              <Button href="#about" variant="primary">
                Learn More
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  )
}

export default AppHero