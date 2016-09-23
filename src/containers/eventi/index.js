import React from 'react';
import { connect } from 'react-redux';

import { fetchEventi, setFiltriEventi } from '../../actions/eventi';

import Lista from './lista';

const getEventi = (state, pagina, filtro) => {
  const sel = (pagina.indexOf('passati') === -1) ? 'inCorso' : 'passati';
  if (filtro.tipo) {
    let items = [];
    for (var id in state[sel].items) {
      const i = state[sel].items[id];
      if (i[filtro.tipo] == filtro.valore) {
        items[id] = state[sel].items[id];
      }
    }
    /*const ev = state[sel].items;
    const items = Object.keys(ev).map(function(evento) {
      return (evento => (ev[evento][filtro.tipo] == filtro.valore) )
    }, this);*/
    return Object.assign({}, state, { [sel]: { items: items } });
  } else {
    return state;
  }
}

const mapStateToProps = (state) => {
  return ({
      eventi: getEventi(state.eventi, state.eventi.selezionati, state.eventi.filtro),
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadEventi: (t, f) => { dispatch(fetchEventi(t, f)) },
  }
}


const EventiContainer = connect(mapStateToProps,mapDispatchToProps)(Lista);

export default EventiContainer;