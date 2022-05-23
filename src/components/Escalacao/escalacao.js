import React, { useEffect, useState } from "react";
import Select from 'react-select'
import "./escalacao.css";
import axios from "axios";
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'

export default function Escalacao(props) {
  const [isLoading, setIsLoading] = useState(true)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [formacoes, setFormacoes] = useState([])
  const esquemas = props.formacoes
  const [alterarJogador, setAlterarJogador] = useState(false)
  const [escalacao, setEscalacao] = useState({
    "jogador01": props.equipe.jogador01,
    "jogador02": props.equipe.jogador02,
    "jogador03": props.equipe.jogador03,
    "jogador04": props.equipe.jogador04,
    "jogador05": props.equipe.jogador05,
    "jogador06": props.equipe.jogador06,
    "jogador07": props.equipe.jogador07,
    "jogador08": props.equipe.jogador08,
    "jogador09": props.equipe.jogador09,
    "jogador10": props.equipe.jogador10,
    "jogador11": props.equipe.jogador11,
    "treinador": props.equipe.treinador,
    "reserva01": props.equipe.reserva01,
    "reserva02": props.equipe.reserva02,
    "reserva03": props.equipe.reserva03,
    "reserva04": props.equipe.reserva04,
    "reserva05": props.equipe.reserva05,
    "formacao": props.equipe.formacao
  })
  const [ataque, setAtaque] = useState([{}])
  const [meio, setMeio] = useState([{}])
  const [defesa, setDefesa] = useState([{}])
  const [alas, setAlas] = useState([{}])
  const [goleiro, setGoleiro] = useState({})
  const [reservas, setReservas] = useState([{}])
  const [treinador_, setTreinador_] = useState({})
  const [popupJogadores, setPopupJogadores] = useState(false)
  const [jogadorIndex, setJogadorIndex] = useState('');
  const [posicao, setPosicao] = useState('');

  const popupClose = () => setPopupJogadores(false);

  function salvar() {
    setIsButtonDisabled(true)
    axios
      .post("https://p2-cartola-backend.herokuapp.com/escalacao", escalacao)
      .then((response) => {
        setIsButtonDisabled(false)
        props.setEquipe(response.data[0])
      })
  }
  function apagar(tudo = true) {
    let escalacaoVazia = {}
    if (tudo) {
      escalacaoVazia = {
        jogador01: "",
        jogador02: "",
        jogador03: "",
        jogador04: "",
        jogador05: "",
        jogador06: "",
        jogador07: "",
        jogador08: "",
        jogador09: "",
        jogador10: "",
        jogador11: "",
        treinador: "",
        reserva01: "",
        reserva02: "",
        reserva03: "",
        reserva04: "",
        reserva05: "",
        formacao: escalacao.formacao
      }
    } else {
      escalacaoVazia = escalacao
      escalacaoVazia.jogador01 = ""
      escalacaoVazia.jogador02 = ""
      escalacaoVazia.jogador03 = ""
      escalacaoVazia.jogador04 = ""
      escalacaoVazia.jogador05 = ""
      escalacaoVazia.jogador06 = ""
      escalacaoVazia.jogador07 = ""
      escalacaoVazia.jogador08 = ""
      escalacaoVazia.jogador09 = ""
      escalacaoVazia.jogador10 = ""
      escalacaoVazia.jogador11 = ""
    }

    setEscalacao(escalacaoVazia)
    setAlterarJogador(!alterarJogador)
  }

  useEffect(() => {
    let lista_esquemas = []
    for (let esquema of esquemas) {
      lista_esquemas.push({
        value: esquema.nome,
        label: esquema.nome
      })
    }
    setFormacoes(lista_esquemas)
    setIsLoading(false)
    setIsDisabled(false)
  }, [esquemas]);

  useEffect(() => {
    let atacantes = []
    let meios = []
    let zagueiros = []
    let laterais = []
    let reservas_ = []
    let posicoes = {}
    for (let esquema of Object.values(esquemas)) {
      if (esquema.nome === escalacao.formacao) { posicoes = esquema.posicoes }
    }
    let qtn_atacantes = posicoes.ata
    let qtn_meias = posicoes.mei
    let qtn_laterais = posicoes.lat
    let reservasPosicao = { 1: 1, 2: 3, 3: 4, 4: 4, 5: 5 }
    let lista_jogadores = Object.entries(escalacao)
    for (let i = 1; i <= lista_jogadores.length; i++) {
      for (let atleta of props.atletas) {
        if (lista_jogadores[i - 1][0].slice(0, 7) !== 'reserva') {
          if (parseInt(lista_jogadores[i - 1][0].slice(-2)) <= qtn_atacantes) {
            if (parseInt(lista_jogadores[i - 1][1]) === atleta.atleta_id) {
              atacantes.push({
                apelido: atleta.apelido,
                imagem: props.clubes[atleta.clube_id].escudos["60x60"],
                jogador: lista_jogadores[i - 1][0],
                id: atleta.atleta_id,
                posicao: atleta.posicao_id
              })
              break
            }
            else if (lista_jogadores[i - 1][1] === "") {
              atacantes.push({
                apelido: "Selecione o atacante",
                imagem: props.clubes[1].escudos["60x60"],
                jogador: lista_jogadores[i - 1][0],
                id: parseInt(lista_jogadores[i - 1][0].slice(-2)),
                posicao: 5
              })
              break
            }

          }
          if (parseInt(lista_jogadores[i - 1][0].slice(-2)) > qtn_atacantes &&
            parseInt(lista_jogadores[i - 1][0].slice(-2)) <= (qtn_atacantes + qtn_meias)) {
            if (parseInt(lista_jogadores[i - 1][1]) === atleta.atleta_id) {
              meios.push({
                apelido: atleta.apelido,
                imagem: props.clubes[atleta.clube_id].escudos["60x60"],
                jogador: lista_jogadores[i - 1][0],
                id: atleta.atleta_id,
                posicao: atleta.posicao_id
              })
              break
            }
            else if (lista_jogadores[i - 1][1] === "") {
              meios.push({
                apelido: "Selecione o meia",
                imagem: props.clubes[1].escudos["60x60"],
                jogador: lista_jogadores[i - 1][0],
                id: parseInt(lista_jogadores[i - 1][0].slice(-2)),
                posicao: 4
              })
              break
            }
          }
          if (qtn_laterais > 0) {
            if (parseInt(lista_jogadores[i - 1][0].slice(-2)) > qtn_atacantes + qtn_meias &&
              parseInt(lista_jogadores[i - 1][0].slice(-2)) <= qtn_atacantes + qtn_meias + qtn_laterais) {
              if (parseInt(lista_jogadores[i - 1][1]) === atleta.atleta_id) {
                laterais.push({
                  apelido: atleta.apelido,
                  imagem: props.clubes[atleta.clube_id].escudos["60x60"],
                  jogador: lista_jogadores[i - 1][0],
                  id: atleta.atleta_id,
                  posicao: atleta.posicao_id
                })
                break
              }
              else if (lista_jogadores[i - 1][1] === "") {
                laterais.push({
                  apelido: "Selecione o lateral",
                  imagem: props.clubes[1].escudos["60x60"],
                  jogador: lista_jogadores[i - 1][0],
                  id: parseInt(lista_jogadores[i - 1][0].slice(-2)),
                  posicao: 2
                })
                break
              }
            }
          }
          if (parseInt(lista_jogadores[i - 1][0].slice(-2)) > qtn_atacantes + qtn_meias + qtn_laterais &&
            parseInt(lista_jogadores[i - 1][0].slice(-2)) < 11) {
            if (parseInt(lista_jogadores[i - 1][1]) === atleta.atleta_id) {
              zagueiros.push({
                apelido: atleta.apelido,
                imagem: props.clubes[atleta.clube_id].escudos["60x60"],
                jogador: lista_jogadores[i - 1][0],
                id: atleta.atleta_id,
                posicao: atleta.posicao_id
              })
              break
            }
            else if (lista_jogadores[i - 1][1] === "") {
              zagueiros.push({
                apelido: "Selecione o zagueiro",
                imagem: props.clubes[1].escudos["60x60"],
                jogador: lista_jogadores[i - 1][0],
                id: parseInt(lista_jogadores[i - 1][0].slice(-2)),
                posicao: 3
              })
              break
            }
          }
        }
        if (lista_jogadores[i - 1][0] === "jogador11") {
          if (parseInt(lista_jogadores[i - 1][1]) === atleta.atleta_id) {
            setGoleiro({
              apelido: atleta.apelido,
              imagem: props.clubes[atleta.clube_id].escudos["60x60"],
              jogador: lista_jogadores[i - 1][0],
              id: atleta.atleta_id,
              posicao: atleta.posicao_id,
            })
            break
          }
          else if (lista_jogadores[i - 1][1] === "") {
            setGoleiro({
              apelido: "Selecione o goleiro",
              imagem: props.clubes[1].escudos["60x60"],
              jogador: lista_jogadores[i - 1][0],
              id: lista_jogadores[i - 1][0],
              posicao: 1,
            })
            break
          }
        }

        if (lista_jogadores[i - 1][0] === "treinador") {
          if (parseInt(lista_jogadores[i - 1][1]) === atleta.atleta_id) {
            setTreinador_({
              apelido: atleta.apelido,
              imagem: props.clubes[atleta.clube_id].escudos["60x60"],
              jogador: lista_jogadores[i - 1][0],
              id: atleta.atleta_id,
              posicao: atleta.posicao_id,
            })
            break
          }
          else if (lista_jogadores[i - 1][1] === "") {
            setTreinador_({
              apelido: "Selecione o treinador",
              imagem: props.clubes[1].escudos["60x60"],
              jogador: lista_jogadores[i - 1][0],
              id: lista_jogadores[i - 1][0],
              posicao: 6,
            })
            break
          }
        }

        if (lista_jogadores[i - 1][0].slice(0, 7) === "reserva") {
          if (parseInt(lista_jogadores[i - 1][1]) === atleta.atleta_id) {
            reservas_.push({
              apelido: atleta.apelido,
              imagem: props.clubes[atleta.clube_id].escudos["60x60"],
              jogador: lista_jogadores[i - 1][0],
              id: atleta.atleta_id,
              posicao: atleta.posicao_id
            })
            break
          }
          else if (lista_jogadores[i - 1][1] === "") {
            reservas_.push({
              apelido: "Selecione o reserva",
              imagem: props.clubes[1].escudos["60x60"],
              jogador: lista_jogadores[i - 1][0],
              id: parseInt(lista_jogadores[i - 1][0].slice(-2)) * 11,
              posicao: reservasPosicao[parseInt(lista_jogadores[i - 1][0].slice(-1))]
            })
            break
          }
        }
      }
      setAlas(laterais)
      setAtaque(atacantes)
      setMeio(meios)
      setDefesa(zagueiros)
      setReservas(reservas_)
    }
  }, [alterarJogador, escalacao, esquemas, props.clubes, props.atletas]);

  function atualizarFormacao(tatica) {
    let formacaoAtualizada = escalacao
    formacaoAtualizada["formacao"] = tatica
    setEscalacao(formacaoAtualizada)
    apagar(false)
  }

  function selecionar(jogadorID, local) {
    setJogadorIndex(jogadorID)
    setPosicao(local)
    setPopupJogadores(true)
  }

  function editar(jogador, id) {
    let jogadores = escalacao
    jogadores[jogador] = `${id}`
    setEscalacao(jogadores)
    setAlterarJogador(!alterarJogador)
    popupClose()
  }
  return (
    <div>
      <Modal show={popupJogadores} onHide={popupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Selecione o jogador:</Modal.Title>
        </Modal.Header>
        {props.atletas.map((atleta) => Object.values(escalacao).includes(`${atleta.atleta_id}`) === false && atleta.posicao_id === posicao &&
          (<Modal.Body className="jogadores-popup" key={parseInt(atleta.atleta_id)}>
            <Card style={{ width: '100%', cursor: 'pointer', }} onClick={() => { editar(jogadorIndex, atleta.atleta_id) }}>
              <Card.Body>
                <Card.Title><img src={props.clubes[atleta.clube_id].escudos["30x30"]} alt="escudo do clube do jogador" />{atleta.apelido}</Card.Title>
                <Card.Text>Preço: $ {atleta.preco_num}</Card.Text>
                <Card.Text>Média: {atleta.media_num}</Card.Text>
                <Card.Text> Mínimo para valorizar: {atleta.minimo_para_valorizar}</Card.Text>
                {parseInt(atleta.status_id) === 7 && <p class="status" style={{ color: "Green" }}>Status: Provável </p>}
                {parseInt(atleta.status_id) === 5 && <p class="status" style={{ color: "Red" }}>Status: Contundido </p>}
                {parseInt(atleta.status_id) === 2 && <p class="status" style={{ color: "OrangeRed" }}>Status: Dúvida </p>}
                {parseInt(atleta.status_id) === 3 && <p class="status" style={{ color: "Red" }}>Status: Suspenso </p>}
                {parseInt(atleta.status_id) === 6 && <p class="status" style={{ color: "Gray" }}>Status: Nulo </p>}
              </Card.Body>
            </Card>
          </Modal.Body>)
        )}
      </Modal>

      <div className="container-buttons">
        <div className="container-formacao">
          <p className="texto-formacao">Formação:</p>
          <Select
            isLoading={isLoading}
            isDisabled={isDisabled}
            defaultValue={{
              value: escalacao.formacao,
              label: escalacao.formacao
            }}
            onChange={(e) => atualizarFormacao(e.value)}
            isSearchable={false}
            options={formacoes} />
        </div>
        <div className="buttons">
          <button className="apagar" onClick={apagar}>Limpar</button>
          <button className="salvar" onClick={salvar} disabled={isButtonDisabled}>Salvar</button>
        </div>
      </div>

      <div className="container-campo">
        <div className="campo" style={{ backgroundImage: `url(/campo.jpg)` }}>
          <div className="container-ataque">
            {ataque.map((atacante) => <div key={parseInt(atacante.id)} className="jogadores" onClick={() => { selecionar(atacante.jogador, atacante.posicao) }}>
              <img src={atacante.imagem} className="escudo" alt="Escudo do clube do jogador" />
              <p className="apelido">{atacante.apelido}</p>
            </div>)}
          </div>
          <div className="container-meio">
            {meio.map((meiuca) => <div key={parseInt(meiuca.id)} className="jogadores" onClick={() => { selecionar(meiuca.jogador, meiuca.posicao) }}>
              <img src={meiuca.imagem} className="escudo" alt="Escudo do clube do jogador" />
              <p className="apelido">{meiuca.apelido}</p>
            </div>)}
          </div>
          <div className="container-defesa">
            <div className="laterais">
              {alas.map((ala) => <div className="jogadores" key={parseInt(ala.id)} onClick={() => { selecionar(ala.jogador, ala.posicao) }}>
                <img src={ala.imagem} className="escudo" alt="Escudo do clube do jogador" />
                <p className="apelido">{ala.apelido}</p>
              </div>)}
            </div>
            <div className="zagueiros">
              {defesa.map((zagueiro) => <div className="jogadores-zagueiros" key={parseInt(zagueiro.id)} onClick={() => { selecionar(zagueiro.jogador, zagueiro.posicao) }}>
                <img src={zagueiro.imagem} className="escudo" alt="Escudo do clube do jogador" />
                <p className="apelido">{zagueiro.apelido}</p>
              </div>)}
            </div>
          </div>
          <div className="container-goleiro" onClick={() => { selecionar(goleiro.jogador, goleiro.posicao) }}>
            <img src={goleiro.imagem} className="escudo" alt="Escudo do clube do jogador" />
            <p className="apelido">{goleiro.apelido}</p>
          </div>

        </div>
        <div className="container-treinador-reserva">
          <p className="titulo-banco">Treinador:</p>
          <div className="container-treinador" onClick={() => { selecionar("treinador", treinador_.posicao) }}>
            <img src={treinador_.imagem} className="escudo" alt="Escudo do clube do jogador" />
            <p className="apelido">{treinador_.apelido}</p>
          </div>
          <p className="titulo-banco">Reservas:</p>
          <div className="container-reservas">
            {reservas.map((reserva) => <div className="jogadores" key={parseInt(reserva.id)} onClick={() => { selecionar(reserva.jogador, reserva.posicao) }}>
              <img src={reserva.imagem} className="escudo" alt="Escudo do clube do jogador" />
              <p className="apelido">{reserva.apelido}</p>
            </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}