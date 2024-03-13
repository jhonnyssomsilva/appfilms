import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./filme-info.css";
import { toast } from "react-toastify";

function Filme() {
  const { id } = useParams();
  const navigation = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api
        .get(`/movie/${id}`, {
          params: {
            api_key: "faef24c2d618284f0095f037bf879f6c",
            language: "pt-BR",
          },
        })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          console.log("filme nao encontrado!");
          navigation("/", { replace: true });
          return;
        });
    }
    loadFilme();

    return () => {
      console.log("componente desmontado");
    };
  }, [navigation, id]);

  function salvarFilme() {
    const minhaLista = localStorage.getItem("filmFlix");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some(
      (filmesSalvo) => filmesSalvo.id === filme.id
    );
    if (hasFilme) {
      toast.warn("Esse filme já está salvo nos favoritos!");
      return;
    }
    filmesSalvos.push(filme);
    localStorage.setItem("filmFlix", JSON.stringify(filmesSalvos));
    toast.success("Seu filme está salvo!");
  }

  if (loading) {
    <div className="filme-info">
      <h1>Carregando detalhes...</h1>
    </div>;
  }

  return (
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}
        alt={filme.title}
      ></img>
      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} /10</strong>
      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a
            target="blank"
            rel="external"
            href={`https://youtube.com/results?search_query=${filme.title} Trailer Legendado`}
          >
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}
export default Filme;
