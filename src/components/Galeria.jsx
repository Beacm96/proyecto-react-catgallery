import Gato from "./Gato";

function Galeria({ album, guardarFav }) {

  if (album.length === 0) {
    return (
      <section>
        <h2>Galería</h2>
        <p>No hay imágenes todavía.</p>
      </section>
    );
  }

  return (
    <section>

      <h2>Galería</h2>

      <div className="galeria">

        {album.map((gato) => (
          <Gato
            key={gato.id}
            gato={gato}
            guardarFav={guardarFav}
          />
        ))}

      </div>

    </section>
  );
}

export default Galeria;