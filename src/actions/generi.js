import axios from 'axios';

// actions
export const REQUEST_GENERI = 'REQUEST_GENERI';
export const RECEIVE_GENERI = 'RECEIVE_GENERI';
export const RECEIVE_GENERI_ERROR = 'RECEIVE_GENERI';
export const SENDING_GENERE = 'SENDING_GENERE';
export const SAVED_GENERE = 'SAVED_GENERE';


// action creators
export function fetchGeneri() {
	//console.log('actions: fetchGeneri');
	return function(dispatch, getState) {
		
		//console.log('actions: fetchGeneri - dispatch: requestGeneri');
		dispatch(requestGeneri());  // generi loading true
		const state = getState();
	    const ricevuto = state.generi.ricevuto;
    	if (!ricevuto || ((Date.now() - ricevuto) > 60000)) {
			return axios.get('/react/eventi/api/public/generi')
				.then(function (response) {
				    //console.log('axios ok response');
				    //console.log(response);
				    dispatch(receiveGeneri(response.data));   // generi loading false
				})
				.catch(function (error) {
				    console.log('axios ko response');
				    console.log(error);
				});
		} else {
			dispatch(receiveGeneri(state.generi.items));
		}
	}
}
export function requestGeneri() {
	//console.log('actions');
	//console.log('requestLocali');
	return {
		type: REQUEST_GENERI
	}
}
export function receiveGeneri(json) {
	//console.log('actions');
	//console.log('receiveLocali');
	return {
		type: RECEIVE_GENERI,
		data: json,
		ricevuto: Date.now()
	}
}
export function savingGenere(genere) {
	return function(dispatch) {
		dispatch(sendingGenere());  // locali loading true
		return axios.post('/react/eventi/api/public/genere',
				genere
			)
			.then(function (response) {
			    dispatch(savedGenere(response.data.data[0]));   // locali loading false
			})
			.catch(function (error) {
			    console.log('axios ko response');
			    console.log(error);
			});
	}
}
export function sendingGenere() {
	return {
		type: SENDING_GENERE
	}
}
export function savedGenere(genere) {
	return {
		type: SAVED_GENERE,
		genere: genere
	}
}