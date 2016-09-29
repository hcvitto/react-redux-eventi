import { REQUEST_EVENTI, RECEIVE_EVENTI, RECEIVE_EVENTI_ERROR,
REQUEST_EVENTO, RECEIVE_NEW_EVENTO, RECEIVE_CACHED_EVENTO, DELETED_EVENTO, SAVED_EVENTO, VIEWED_EVENTO } from '../actions/eventi';
import cloneDeep from 'lodash.clonedeep';

const initialState = {
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
  },
  dettaglio: null
}

function eventi(state = initialState, action) {
  switch (action.type) {
    case REQUEST_EVENTI:
      return Object.assign({}, state, { isLoading: true, selezionati: action.selezionati, filtro: action.filtro });
    case RECEIVE_EVENTI:
      return Object.assign({}, state, { isLoading: false, [state.selezionati]: { ricevuto: action.ricevuto, items: action.eventi } });
    case RECEIVE_EVENTI_ERROR:
      return state;
    case REQUEST_EVENTO:
      return Object.assign({}, state, { isLoading: true });
    case RECEIVE_CACHED_EVENTO:
      return Object.assign({}, state, { isLoading: false, dettaglio: action.id  });
    case RECEIVE_NEW_EVENTO:
      const itemsR = cloneDeep(state[action.tipo].items);
      itemsR[action.id] = action.evento[action.id];
      return Object.assign({}, state, { isLoading: false, selezionati: action.tipo,  [action.tipo]: { items: itemsR }, dettaglio: action.id  });
    case DELETED_EVENTO:
      const itemsD = cloneDeep(state[state.selezionati].items);
      delete itemsD[action.id]
      return Object.assign({}, state, { [state.selezionati]: { items: itemsD }, dettaglio: null });
    case SAVED_EVENTO:
      //const itemsD = cloneDeep(state[state.selezionati].items);
      //delete itemsD[action.id]
      return Object.assign({}, state, { inCorso: { items: [...state.inCorso.items, action.evento] } });
    case VIEWED_EVENTO:
      const itemV = cloneDeep(state.passati.items);
      itemV[state.dettaglio].visto = action.visto;
      return Object.assign({}, state, { passati: { items: itemV } });
   default:
      return state;
  }
}

export default eventi
