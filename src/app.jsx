import { useEffect, useState } from "react";

import Galeria from "./components/Galeria";
import Favoritos from "./components/Favoritos";

const API_KEY = 'live_Btxveu4oYzQYG9BECeAOeGYzy30eZGLI95uhlzg8zDIatLwKKX5tt02yaR4kj1eB';

function App() {
  const [album, setAlbum] = useState([]);
  const [albumFavoritos, setAlbumFavoritos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [estado, setEstado] = useState("");
  const [cargando, setCargando] = useState(false);
  const [yaCargado, setYaCargado] = useState(false);
  const [vista, setVista] = useState("galeria");

  useEffect(() => {
    const datos = localStorage.getItem("favoritos");

    if (datos) {
      setAlbumFavoritos(JSON.parse(datos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favoritos",
      JSON.stringify(albumFavoritos)
    );
  }, [albumFavoritos]);

  async function obtenerImagenes(numeroPagina) {
    try {
      setCargando(true);
      setEstado("Buscando...");

      const url =
        `https://api.thecatapi.com/v1/images/search?limit=9&page=${numeroPagina}&api_key=${API_KEY}`;

      const respuesta = await fetch(url);

      if (!respuesta.ok) {
        throw new Error("Error en la petición");
      }

      const resultado = await respuesta.json();

      if (numeroPagina === 1) {
        setAlbum(resultado);
      } else {
        setAlbum((anterior) => [
          ...resultado,
          ...anterior
        ]);
      }

      setEstado("");
      return true;

    } catch (error) {
      setEstado("Error al cargar las imágenes");
      return false;

    } finally {
      setCargando(false);
    }
  }

  async function cargarImagenes() {
    setPagina(1);
    const exito=await obtenerImagenes(1);
    if(exito){
      setYaCargado(true);
    }
  }

  async function masImagenes() {
    const nuevaPagina = pagina + 1;

    const exito = await obtenerImagenes(nuevaPagina);

    if (exito) {
      setPagina(nuevaPagina);
    }
  }

  function guardarFav(gato) {
    const existe = albumFavoritos.some(
      (fav) => fav.id === gato.id
    );

    if (!existe) {
      setAlbumFavoritos((anteriores) => [
        ...anteriores,
        gato
      ]);
    }
  }

  function eliminarFav(gato) {
    setAlbumFavoritos((anteriores) =>
      anteriores.filter(
        (fav) => fav.id !== gato.id
      )
    );
  }

  return (
    <main>

      <h1>🐱 CatGallery</h1>

      <div className="controles">

        <button
          onClick={cargarImagenes}
          disabled={cargando|| yaCargado}
        >
          Cargar gatos
        </button>

        <button
          onClick={masImagenes}
          disabled={cargando || album.length === 0}
        >
          Ver más
        </button>

      </div>

      <p>{estado}</p>

      <nav className="menu-galerias">

        <button
          className={vista === "galeria" ? "activo" : ""}
          onClick={() => setVista("galeria")}
        >
          Galería
        </button>

        <button
          className={vista === "favoritos" ? "activo" : ""}
          onClick={() => setVista("favoritos")}
        >
          Favoritos
        </button>

      </nav>

      {vista === "galeria" && (
        <Galeria
          album={album}
          guardarFav={guardarFav}
        />
      )}

      {vista === "favoritos" && (
        <Favoritos
          albumFavoritos={albumFavoritos}
          eliminarFav={eliminarFav}
        />
      )}

    </main>
  );
}

export default App;