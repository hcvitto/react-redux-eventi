// REDUCER

import { combineReducers } from 'redux';

import { 
  REQUEST_EVENTI, RECEIVE_EVENTI, RECEIVE_EVENTI_ERROR, SET_EVENTI_FILTER,
  REQUEST_GENERI, RECEIVE_GENERI, RECEIVE_GENERI_ERROR,
  SENDING_GENERE, SAVED_GENERE, 
  REQUEST_LOCALI, RECEIVE_LOCALI, RECEIVE_LOCALI_ERROR, 
  SENDING_LOCALE, SAVED_LOCALE } from '../actions';

const initialState = {
  //initStore: true, // ?
  //isLoading: true, // ?
  eventi: {
    isLoading: false,
    selezionati: 'inCorso',
    filtro: {
      tipo: null,
      valore: null
    },
    inCorso: {
      ricevuto: null,
      items: []
    },
    passati: {
      ricevuto: null,
      items: []
    }
  },
  locali: {
    isLoading: false,
    ricevuto: null,
    items: [],
  },
  generi: {
    isLoading: false,
    ricevuto: null,
    items: [],
  },

}

/*  EVENTI  */
function eventi(state = initialState.eventi, action) {
  switch (action.type) {
    case REQUEST_EVENTI:
      //console.log('reducer');
      //console.log('REQUEST_EVENTI');
      //console.log(action);
      //console.log(Object.assign({}, state, { isLoading: true }));
      return Object.assign({}, state, { isLoading: true, selezionati: action.selezionati });
    case RECEIVE_EVENTI:
      //console.log('reducer');
      //console.log('RECEIVE_EVENTI');
      //console.log(state);
      /*console.log(Object.assign(
        {}, 
        state, 
        { 
          isLoading: false, 
          [action.selezionati]: 
          { 
            ricevuto: action.ricevuto, 
            items: action.eventi 
          }
        })
      );*/
      return Object.assign(
        {}, 
        state, 
        { 
          isLoading: false, 
          [state.selezionati]: 
          { 
            ricevuto: action.ricevuto, 
            items: action.eventi 
          }
        });
    case RECEIVE_EVENTI_ERROR:
      //console.log('GET_TIPI');
      return state;
    case SET_EVENTI_FILTER:
      //console.log('reducer');
      //console.log('SET_EVENTI_FILTER');
      //console.log(state);
      //console.log(action);
      //console.log(Object.assign({}, state, { filtro: action.filtro }));
      const f = (action.filtro) ? action.filtro : { tipo: null, valore: null };
      return Object.assign({}, state, { filtro: action.filtro });
    default:
      return state;
  }
}

/*  GENERI  */
function generi(state = initialState.generi, action) {
  switch (action.type) {
    case REQUEST_GENERI:
      // state update: isLoading: true
      console.log('reducer');
      console.log('REQUEST_GENERI');
      console.log(state);
      console.log(Object.assign({}, state, { isLoading: true }));
      return Object.assign({}, state, { isLoading: true });
    case RECEIVE_GENERI:
      // state update: 
      // isLoading: false
      // items: action.data
      console.log('reducer');
      console.log('RECEIVE_GENERI');
      console.log(state);
      console.log(Object.assign({}, state, { isLoading: false, ricevuto: action.ricevuto, items: action.data }));
      return Object.assign({}, state, { isLoading: false, ricevuto: action.ricevuto, items: action.data });
      //return [ ...state, isLoading: false ] 
    case RECEIVE_LOCALI_ERROR:
      //console.log('RECEIVE_LOCALI_ERROR');
      return state;
    default:
      return state;
  }
}

/*  LOCALI  */
function locali(state = initialState.locali, action) {
  switch (action.type) {
    case REQUEST_LOCALI:
      // state update: isLoading: true
      console.log('reducer');
      console.log('REQUEST_LOCALI');
      console.log(state);
      console.log(Object.assign({}, state, { isLoading: true }));
      return Object.assign({}, state, { isLoading: true });
    case RECEIVE_LOCALI:
      // state update: 
      // isLoading: false
      // items: action.data
      console.log('reducer');
      console.log('RECEIVE_LOCALI');
      console.log(state);
      console.log(Object.assign({}, state, { isLoading: false, ricevuto: action.ricevuto, items: action.data }));
      return Object.assign({}, state, { isLoading: false, ricevuto: action.ricevuto, items: action.data });
      //return [ ...state, isLoading: false ] 
    case RECEIVE_LOCALI_ERROR:
      //console.log('RECEIVE_LOCALI_ERROR');
      return state;
    case SENDING_LOCALE:
      // sta iniziando l'invio dei dati del locale al server
      // isLoading: true
      // optimistic update ??
      console.log('reducer');
      console.log('SENDING_LOCALE');
      console.log(state);
      console.log(Object.assign({}, state, { isLoading: true }));
      return Object.assign({}, state, { isLoading: true });
    case SAVED_LOCALE:
      console.log('reducer');
      console.log('SEND_LOCALE');
      console.log(action.locale);
      console.log(state);
      console.log(Object.assign({}, state, { isLoading: false, items: [...state.items, action.locale] }));
      return Object.assign({}, state, { isLoading: false, items: [...state.items, action.locale] });
    default:
      return state;
  }
}

const reducer = combineReducers({
  eventi,
  generi,
  locali
})

export default reducer
