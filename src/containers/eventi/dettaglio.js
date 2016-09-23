import React from 'react';
import { connect } from 'react-redux';

import { fetchEvento, deletingEvento } from '../../actions/eventi';

import Dettaglio from '../../components/eventi/dettaglio';

const getEvento = (state, pagina, id) => {
  //const sel = (pagina.indexOf('passati') === -1) ? 'inCorso' : 'passati';
  //return { item: state[sel].items[id] || {}, backUrl: pagina };
  const backUrl = (pagina == 'passati') ? 'eventi-passati' : 'eventi-in-corso';
  return { item: state[pagina].items[id] || {}, backUrl: backUrl };
}

const mapStateToProps = (state) => {
  return ({
      evento: getEvento(state.eventi, state.eventi.selezionati, state.eventi.dettaglio),
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvento: (id, titolo) => { dispatch(fetchEvento(id, titolo)) },
    deleteEvento: (id) => { dispatch(deletingEvento(id)) }
  }
}


const EventoContainer = connect(mapStateToProps,mapDispatchToProps)(Dettaglio);

export default EventoContainer;