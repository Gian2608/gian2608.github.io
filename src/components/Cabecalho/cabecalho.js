import "./cabecalho.css";

export default function Cabecalho(props) {

  return (<div className="cabecalho">
    <img src="/cartola.jpg" className="logo" alt="Logo cartola" />
    <button className="btnDestaque" type="button" style={{ borderBottomColor: `${props.corMenuDestaque}` }} onClick={() => { props.destaque() }}>Destaques</button>
    <button className="btnEscalacao" type="button" style={{ borderBottomColor: `${props.corMenuEscalacao}` }} onClick={() => { props.escalacao() }}>Escalação</button>
  </div>)
}