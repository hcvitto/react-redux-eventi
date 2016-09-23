import axios from 'axios';

// actions
export const REQUEST_LOCALI = 'REQUEST_LOCALI';
export const RECEIVE_LOCALI = 'RECEIVE_LOCALI';
export const RECEIVE_LOCALI_ERROR = 'RECEIVE_LOCALI_ERROR';
export const SENDING_LOCALE = 'SENDING_LOCALE';
export const SAVED_LOCALE = 'SAVED_LOCALE';


// action creators
export function fetchLocali() {
	console.log('actions: fetchLocali');
	return function(dispatch, getState) {
		
		console.log('actions: fetchLocali - dispatch: locali');
		dispatch(requestLocali());  // locali loading true
		const state = getState();
	    const ricevuto = state.locali.ricevuto;
    	if (!ricevuto || ((Date.now() - ricevuto) > 60000)) {
			return axios.get('/react/eventi/api/public/locali')
				.then(function (response) {
				    console.log('axios ok response');
				    console.log(response);
				    dispatch(receiveLocali(response.data));   // locali loading false
				})
				.catch(function (error) {
				    console.log('axios ko response');
				    console.log(error);
				});
		} else {
			dispatch(receiveLocali(state.locali.items));
		}
	}
}
export function requestLocali() {
	//console.log('actions');
	//console.log('requestLocali');
	return {
		type: REQUEST_LOCALI
	}
}
export function receiveLocali(json) {
	//console.log('actions');
	//console.log('receiveLocali');
	return {
		type: RECEIVE_LOCALI,
		data: json,
		ricevuto: Date.now()
	}
}
/*export function receiveLocaliError() {
	//console.log('actions');
	//console.log('receiveLocaliError');
	return {
		type: RECEIVE_EVENTI_ERROR
	}
}*/
export function savingLocale(locale) {
	console.log('actions: savingLocale');
	return function(dispatch) {
		
		console.log('actions: savingLocale - dispatch: locali');
		dispatch(sendingLocale());  // locali loading true

		return axios.post('/react/eventi/api/public/locale',
				locale
			)
			.then(function (response) {
			    console.log('axios ok response');
			    console.log(response);
			    // TODO: controllo se il salvataggio è andato a buon fine
			    dispatch(savedLocale(response.data.data[0]));   // locali loading false
			})
			.catch(function (error) {
			    console.log('axios ko response');
			    console.log(error);
			});
	}
}
export function sendingLocale() {
	console.log('actions');
	console.log('sendingLocale');
	console.log();
	return {
		type: SENDING_LOCALE
	}
}
export function savedLocale(locale) {
	console.log('actions');
	console.log('savedLocale');
	return {
		type: SAVED_LOCALE,
		locale: locale
	}
}