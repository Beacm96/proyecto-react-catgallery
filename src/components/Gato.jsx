function Gato({
  gato,
  favorito = false,
  guardarFav,
  eliminarFav
}) {
  return (
    <article className="gato-card">

      <img
        src={gato.url}
        alt="Gato"
      />

      {favorito ? (
        <button
          className="boton-card"
          onClick={() => eliminarFav(gato)}
        >
          🗑️
        </button>
      ) : (
        <button
          className="boton-card"
          onClick={() => guardarFav(gato)}
        >
          ❤️
        </button>
      )}

    </article>
  );
}

export default Gato;