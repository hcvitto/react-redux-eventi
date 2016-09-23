import {
  REQUEST_GENERI, RECEIVE_GENERI, RECEIVE_GENERI_ERROR,
  SENDING_GENERE, SAVED_GENERE, 
 } from '../actions/generi';

const initialState = {
  isLoading: false,
  ricevuto: null,
  items: [],
}

function generi(state = initialState, action) {
  switch (action.type) {
    case REQUEST_GENERI:
      // state update: isLoading: true
      //console.log('reducer');
      //console.log('REQUEST_GENERI');
      //console.log(state);
      //console.log(Object.assign({}, state, { isLoading: true }));
      return Object.assign({}, state, { isLoading: true });
    case RECEIVE_GENERI:
      // state update: 
      // isLoading: false
      // items: action.data
      //console.log('reducer');
      //console.log('RECEIVE_GENERI');
      //console.log(state);
      //console.log(Object.assign({}, state, { isLoading: false, ricevuto: action.ricevuto, items: action.data }));
      return Object.assign({}, state, { isLoading: false, ricevuto: action.ricevuto, items: action.data });
    case SENDING_GENERE:
      // state update: 
      // isLoading: true
      console.log('reducer');
      console.log('SENDING_GENERE');
      console.log(state);
      console.log(Object.assign({}, state, { isLoading: true }));
      return Object.assign({}, state, { isLoading: true });
    case SAVED_GENERE:  
      // state update: 
      // isLoading: false
      // item: action.genere
      console.log('reducer');
      console.log('SAVED_GENERE');
      console.log(state.items);
      console.log(action.genere);
      let i = state.items.concat(action.genere);
      console.log(i);
      console.log(Object.assign({}, state, { isLoading: false, items: i }));
      return Object.assign({}, state, { isLoading: false, items: i });    
    default:
      return state;
  }
}

export default generi
