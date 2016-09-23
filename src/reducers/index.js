import { combineReducers } from 'redux';

import eventi from './eventi';
import generi from './generi';
import locali from './locali';

const reducer = combineReducers({
  eventi,
  generi,
  locali
})

export default reducer
