import { 
  REQUEST_LOCALI, RECEIVE_LOCALI, RECEIVE_LOCALI_ERROR, 
  SENDING_LOCALE, SAVED_LOCALE } from '../actions/locali';

const initialState = {
  isLoading: false,
  ricevuto: null,
  items: [],
}


function locali(state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOCALI:
      return Object.assign({}, state, { isLoading: true });
    case RECEIVE_LOCALI:
      return Object.assign({}, state, { isLoading: false, ricevuto: action.ricevuto, items: action.data });
      //return [ ...state, isLoading: false ] 
    case RECEIVE_LOCALI_ERROR:
      return state;
    case SENDING_LOCALE:
      return Object.assign({}, state, { isLoading: true });
    case SAVED_LOCALE:
      return Object.assign({}, state, { isLoading: false, items: [...state.items, action.locale] });
    default:
      return state;
  }
}


export default locali
