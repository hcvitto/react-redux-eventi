var React = require('react');
import { connect } from 'react-redux';

import { fetchEvento, savingEvento } from '../../actions/eventi';

import NuovoEvento from '../../components/eventi/nuovo';

function filter(g) {
	const ggg = g.map(function(gg) {
		return ({
			value: gg.id,
			label: gg.nome
		})
	})
	return ggg;
}

const mapStateToProps = (state, ownProps) => {  //  TODO: questi dati dovrebbero essere caricati via api se non presenti nello store
	return {
  		evento: ownProps.params.id ? state.eventi[state.eventi.selezionati].items[state.eventi.dettaglio] : [],
  		generi: filter(state.generi.items),
  		locali: filter(state.locali.items),
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadEvento: (id, titolo) => { dispatch(fetchEvento(id, titolo)) },
    saveEvento: (evento) => { dispatch(savingEvento(evento)) },
  }
}

const NuovoEventoContainer = connect(mapStateToProps,mapDispatchToProps)(NuovoEvento);

export default NuovoEventoContainer;
