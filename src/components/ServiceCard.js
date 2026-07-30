function ServiceCard({ judul, deskripsi }) {
  return (
    <article className="service-card">
      <h3>{judul}</h3>
      <p>{deskripsi}</p>
    </article>
  );
}

export default ServiceCard;