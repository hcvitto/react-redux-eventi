import React from 'react';
import { connect } from 'react-redux';

import { fetchLocali, savingLocale } from '../../actions/locali';

import NuovoLocale from '../../components/locali/nuovo';

const mapStateToProps = (state) => {
	return ({
		locali: state.locali
	})
}

const mapDispatchToProps = (dispatch) => {
	return {
		submitLocaleForm: (locale) => {
			dispatch(savingLocale(locale))
		},
		loadLocali: () => {
			dispatch(fetchLocali())
		}

	}
}


const NuovoLocaleContainer = connect(mapStateToProps,mapDispatchToProps)(NuovoLocale);

export default NuovoLocaleContainer;
