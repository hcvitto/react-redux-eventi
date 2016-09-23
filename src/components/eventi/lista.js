import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

import SingoloEventoInLista from './dettaglio-in-lista';

const ListaEventi = (props) => {
  const ev = props.eventi.items;
  const eventi = Object.keys(ev).map(function(evento) {
    return (
      <SingoloEventoInLista id={ev[evento].id} data={ev[evento].data} nome={ev[evento].nome} slug={ev[evento].slug} locale={ev[evento].locale} genere={ev[evento].genere} key={ev[evento].id} resetUrl={props.resetUrl} />

    )
  }, this);
  return (
      <div>
        <h1 className="titolo">
          <Link to={ props.leftBtnUrl } className="btn btn-default pull-left">{ props.leftBtnTxt }</Link>
          { props.pageTitle } 
          { props.filtroLabel }
          { props.labelGn } - { props.resetBtn }
          <Link to="/nuovo-evento" className="btn btn-success pull-right">Inserisci evento</Link>
        </h1>
        <ul className="std-list">{ props.isLoading ? "Loading" : eventi }</ul>
      </div>
  )
}

export default ListaEventi;