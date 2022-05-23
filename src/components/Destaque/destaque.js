import axios from "axios";
import React, { useEffect, useState } from "react";
import "./destaque.css";


export default function Destaque(props) {
  const [jogadores, setJogadores] = useState([])

  function adicionarClassificacao(players) {
    for (var i = 0; i < players.length; i++) {
      players[i]['classificacao'] = parseInt(Object.keys(players)[i]) + 1
    }
    setJogadores(players)
  }
  useEffect(() => {
    axios
      .get("https://api.cartola.globo.com/mercado/destaques")
      .then((res) => adicionarClassificacao(res.data))
  }, []);
  return (
    <div className="card-container">
      {jogadores.map((jogador) => <div className="card-player" key={jogador.Atleta.atleta_id}>
        <p className="classificacao">{jogador.classificacao}º</p>
        <img src={jogador.escudo_clube} className="escudo" alt="Escudo do clube do jogador" />
        <div className="text">
          <p className="nome-atleta">{jogador.Atleta.apelido}</p>
          <p className="numero-escalacoes">Escalações: {jogador.escalacoes}</p>
          <p className="posicao">Posição: {jogador.posicao}</p>
        </div>
      </div>)}
    </div>
  );
}
