import { useEffect, useState } from "react";
import api from "../../services/api";

function Home() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function loadFilms() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "faef24c2d618284f0095f037bf879f6c",
          language: "pt-BR",
          page: 1,
        },
      });
      console.log(response.data.results);
    }
    loadFilms();
  }, []);

  return (
    <div>
      <h1>Componente Home</h1>
    </div>
  );
}
export default Home;
