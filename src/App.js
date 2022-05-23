import axios from "axios";
import './App.css';
import React, { useEffect, useState } from "react";
import Destaque from "./components/Destaque/destaque";
import Cabecalho from "./components/Cabecalho/cabecalho";
import Escalacao from "./components/Escalacao/escalacao";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className="erro">
          <img src="/cr7-triste.jpg" className="cr7-triste" alt="Cristiano Ronaldo triste" />
          <div className="objetos-erro">
            <h2 className="texto-erro">Infelizmente ocorreu um erro😢</h2>
            <h2 className="texto-erro">Principais possibilidades:</h2>
            <ul className="texto-erro-possibilidades">
              <li >
                <p style={{ margin: "0" }}>A Globo nos bloqueoou </p>
              </li>
              <li>
                <p style={{ margin: "0" }}>O banco de dados está vazio</p>
              </li>
            </ul>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [menu, setMenu] = useState("Destaques")
  const [corMenuDestaque, setcorMenuDestaque] = useState("white")
  const [corMenuEscalacao, setcorMenuEscalacao] = useState("#FE6321")
  const [equipe, setEquipe] = useState({})
  const [atletas, setAtletas] = useState({})
  const [clubes, setClubes] = useState({})
  const [formacoes, setFormacoes] = useState([])
  function atualizar() {
    axios
      .get("https://p2-cartola-backend.herokuapp.com/escalacao")
      .then((res) => setEquipe(res.data[0]))
    axios
      .get("https://api.cartola.globo.com/atletas/mercado")
      .then((res) => setAtletas(res.data.atletas))
    axios
      .get("https://api.cartola.globo.com/clubes")
      .then((res) => setClubes(res.data))
    axios
      .get("https://api.cartola.globo.com/esquemas")
      .then((res) => setFormacoes(res.data))
  }

  function escalacao() {
    setcorMenuDestaque("#FE6321")
    setcorMenuEscalacao("white")
    setMenu("Escalacao")
  }

  function destaque() {
    setcorMenuEscalacao("#FE6321")
    setcorMenuDestaque("white")
    setMenu("Destaques")
  }

  useEffect(() => { atualizar() }, []);
  return (
    <div className="App">
      <Cabecalho
        escalacao={escalacao} destaque={destaque} corMenuDestaque={corMenuDestaque} corMenuEscalacao={corMenuEscalacao}>
      </Cabecalho>
      <ErrorBoundary>
        {menu === "Destaques" && (<Destaque />)}
        {menu === "Escalacao" &&
          (<Escalacao
            equipe={equipe} atletas={atletas} clubes={clubes} formacoes={formacoes} setEquipe={setEquipe}>
          </Escalacao>)}
      </ErrorBoundary>
    </div>
  );
}

export default App;
