import axios from 'axios';

export const REQUEST_EVENTI = 'REQUEST_EVENTI';
export const RECEIVE_EVENTI = 'RECEIVE_EVENTI';
export const RECEIVE_EVENTI_ERROR = 'RECEIVE_EVENTI_ERROR';
export const REQUEST_EVENTO = 'REQUEST_EVENTO';
export const RECEIVE_NEW_EVENTO = 'RECEIVE_NEW_EVENTO';
export const RECEIVE_CACHED_EVENTO = 'RECEIVE_CACHED_EVENTO';
export const DELETING_EVENTO = 'DELETING_EVENTO';
export const DELETED_EVENTO = 'DELETED_EVENTO';
export const SAVING_EVENTO = 'SAVING_EVENTO';
export const SAVED_EVENTO = 'SAVED_EVENTO';

/* eventi
params: 
tipo: inCorso / passati
filtro: object filtro: { tipo: null, valore: null }
*/
// TODO
// 1 - selector function for items -- http://redux.js.org/docs/recipes/ComputingDerivedData.html
// 2 - call api for initial state (generi, locali) -- https://github.com/reactjs/redux/issues/433
export function fetchEventi(tipo, filtro) {
	var t = tipo;
	var f = filtro;
	return function(dispatch, getState) {

		dispatch(requestEventi(t, f)); // cambio stato: loading true, selezionati: tipo, filtro: filtro

		// controllare se sono scaduti i tempi per un refresh ??
		const state = getState();
	    const ricevuto = state.eventi[tipo].ricevuto;
    	if (!ricevuto || ((Date.now() - ricevuto) > 60000)) {
			return axios.get('/react/eventi/api/public/eventi/' + t)
				.then(function(response) {
					//console.log(response);
					dispatch(receiveEventi(response.data));
				})
				.catch(function(error) {
					// TODO
					//dispatch(receiveEventiError(response.data));
			    	console.log('axios get eventi ko');
			    	console.log(error);
				})
		} else {
			dispatch(receiveEventi(state.eventi[tipo].items));
		}
	}
}
export function requestEventi(tipo, filtro) {
	// loading state
	//console.log('actions');
	//console.log('requestEventi');
	return {
		type: REQUEST_EVENTI,
		selezionati: tipo,
		filtro: filtro,
	}
}
export function receiveEventi(json) {
	//console.log(json);
	//console.log('receiveEventi');
	//console.log(json);
	return {
		type: RECEIVE_EVENTI,
		eventi: json,
		ricevuto: Date.now()
	}
}
export function receiveEventiError() {
	//console.log('actions');
	//console.log('receiveEventi');
	return {
		type: RECEIVE_EVENTI_ERROR
	}
}
export function fetchEvento(id, titolo) {
	return function(dispatch, getState) {

		const state = getState();
	    const evento = state.eventi[state.eventi.selezionati].items[id];
		// controllo se l'evento selezionato è già nello store
		if (evento) {
			//console.log('evento in cache');
			dispatch(receiveCachedEvento(id));
		} else {
			dispatch(requestEvento());
			return axios.get('/react/eventi/api/public/evento/' + id + '/' + titolo)
				.then(function(response) {
					//console.log('evento da server');
					//console.log(response.data);
					dispatch(receiveNewEvento(id, response.data));
				})
				.catch(function(error) {
					// TODO
					//dispatch(receiveEventiError(response.data));
			    	console.log('axios get eventi ko');
			    	console.log(error);
				})
		}
	}
}
export const requestEvento = () => ({ type: REQUEST_EVENTO })
/*export function requestEvento() {
	return {
		type: REQUEST_EVENTO,
	}
}*/
export function receiveCachedEvento(id) {
	return {
		type: RECEIVE_CACHED_EVENTO,
		id: id,
	}
}
export function receiveNewEvento(id, json) {
	return {
		type: RECEIVE_NEW_EVENTO,
		id: id,
		evento: json,
	}
}
export function deletingEvento(id) {
	return function(dispatch, getState) {
		return axios.get('/react/eventi/api/public/evento/cancella/' + id)
			.then(function(response) {
				//console.log('deletingEvento');
				//console.log(response);
				dispatch(deletedEvento(id));
			})
			.catch(function(error) {
				// TODO
				//dispatch(receiveEventiError(response.data));
		    	console.log('axios deletingEvento ko');
		    	console.log(error);
			})
	}
}
export function deletedEvento(id) {
	return {
		type: DELETED_EVENTO,
		id: id
	}
}
export function savingEvento(evento) {
	//console.log(evento);
	return function(dispatch, getState) {
		return axios.post('/react/eventi/api/public/evento',
			evento
			)
			.then(function(response) {
				//console.log('savingEvento');
				//console.log(response);
				dispatch(savedEvento(response.data));
			})
			.catch(function(error) {
				// TODO
				//dispatch(receiveEventiError(response.data));
		    	console.log('axios savingEvento ko');
		    	console.log(error);
			})
	}
}
export function savedEvento(evento) {
	return {
		type: SAVED_EVENTO,
		evento: evento
	}
}
