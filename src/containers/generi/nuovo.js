import React from 'react';
import { connect } from 'react-redux';

import { fetchGeneri, savingGenere } from '../../actions/generi';

import NuovoGenere from '../../components/generi/nuovo';

const mapStateToProps = (state) => {
	return ({
  		generi: state.generi
	})
}

const mapDispatchToProps = (dispatch) => {
	return {
		submitGenereForm: (genere) => {
			dispatch(savingGenere(genere))
		},
		loadGeneri: () => {
			dispatch(fetchGeneri())
		}
	}
}


const NuovoGenereContainer = connect(mapStateToProps,mapDispatchToProps)(NuovoGenere);

export default NuovoGenereContainer;
