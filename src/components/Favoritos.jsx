import Gato from "./Gato";

function Favoritos({
  albumFavoritos,
  eliminarFav
}) {

  if (albumFavoritos.length === 0) {
    return (
      <section>
        <h2>❤️ Favoritos</h2>
        <p>No tienes favoritos todavía.</p>
      </section>
    );
  }

  return (
    <section>

      <h2>❤️ Favoritos</h2>

      <div className="galeria">

        {albumFavoritos.map((gato) => (
          <Gato
            key={gato.id}
            gato={gato}
            favorito={true}
            eliminarFav={eliminarFav}
          />
        ))}

      </div>

    </section>
  );
}

export default Favoritos;