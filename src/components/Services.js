import ServiceCard from "./ServiceCard";

const servicesData = [
  {
    id: 1,
    judul: "Web Development",
    deskripsi: "Membuat website sederhana menggunakan React."
  },
  {
    id: 2,
    judul: "Responsive Design",
    deskripsi: "Membuat tampilan yang dapat menyesuaikan ukuran layar."
  },
  {
    id: 3,
    judul: "UI Design",
    deskripsi: "Membuat tampilan website yang nyaman digunakan."
  }
];

function Services() {
  return (
    <section id="services" className="services">
      <h2>Our Services</h2>

      <div className="service-list">
        {servicesData.map(function (data) {
            return (
            <ServiceCard
              key={data.id}
              judul={data.judul}
              deskripsi={data.deskripsi}
            />
            ) 
        }

        )

        }

      </div>
    </section>
  );
}

export default Services;