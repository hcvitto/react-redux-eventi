// using an ES6 transpiler, like babel
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';

import HomeContainer from './containers/home';
import Home from './index';
import NuovoEventoContainer from './containers/eventi/nuovo';
import EventiContainer from './containers/eventi';
import EventoContainer from './containers/eventi/dettaglio';

import NuovoLocaleContainer from './containers/locali/nuovo';

import NuovoGenereContainer from './containers/generi/nuovo';

const logger = createLogger();

/*    REDUX     
 
-------------------------------------

*/

// http://stackoverflow.com/questions/33749759/read-stores-initial-state-in-redux-reducer

// TODO: hydrate app con i dati dei dropbox  -- ?????????? prima 
//const hydro = collectHydro();
//redux.dispatch({type: 'HYDRATE', hydro});

let store = createStore(
  reducer,
  applyMiddleware(
    ReduxThunk, logger
  )
);

// TODO: hydrate app con i dati dei dropbox  -- ?????????? o dopo
//const hydro = collectHydro();
//redux.dispatch({type: 'HYDRATE', hydro});

/*    ROUTING     

-------------------------------------

*/

const App = () => {
  return (
    <Provider store={store}>
      <Router history={hashHistory}> 
        <Route path="/" component={HomeContainer}>
          <IndexRoute component={Home} />
          <Route path="/eventi-in-corso" component={EventiContainer} />
          <Route path="/eventi-passati" component={EventiContainer} />
          <Route path="/nuovo-evento" component={NuovoEventoContainer} />
          <Route path="/modifica-evento/:id/:titolo" component={NuovoEventoContainer} />
          <Route path="/evento/:id/:titolo" component={EventoContainer} />
          <Route path="/locali" component={NuovoLocaleContainer} />
          <Route path="/generi" component={NuovoGenereContainer} />
        </Route>
      </Router>
    </Provider>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('wrapper')
);
