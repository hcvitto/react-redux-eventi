var React = require('react');
var ReactDOM = require('react-dom');
import { Link } from 'react-router';

import ListaEventi from '../../components/eventi/lista'; 

var Eventi = React.createClass({
  getInitialState: function() {
    return { data: [], filtri: {}, stateMsg: 'Loading' };    
  },
  serverCall: function(filtri = {}, url = '') {
    this.serverRequest = $.ajax({
      url: "/react/eventi/api/public/eventi" + url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        if (data.length) {
          this.setState({ data: data, filtri: filtri, stateMsg: '' });
        } else {
          this.setState({ data: data, filtri: filtri, stateMsg: 'Non ci sono eventi' });
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentWillReceiveProps: function(nextProps) {
    let f = {};
    let url = '';
    if (this.props.location.pathname !== nextProps.location.pathname) {
      const url = (nextProps.location.pathname == '/eventi') ? '' : '/passati';
      this.serverCall(f, url); 
    } else {
      if ((this.props.location.query !== nextProps.location.query)) {
        this.setState({ filtri: nextProps.location.query }); // -- 
      }
    }
  },
  componentDidMount: function() {
    this.serverCall(this.props.location.query);
  },
  componentWillUnmount: function() {
    this.serverRequest.abort();
  },
  render: function() {
    if (this.props.location.pathname == '/eventi') {
      var pageTitle = 'Eventi in corso';
      var leftBtnTxt = 'Eventi passati';
      var leftBtnUrl = '/eventi-passati';
      var backBtnUrl = '/eventi';
    } else if (this.props.location.pathname == '/eventi-passati') {
      var pageTitle = 'Eventi passati';
      var leftBtnTxt = 'Eventi in corso';
      var leftBtnUrl = '/eventi';
      var backBtnUrl = '/eventi-passati';
    }
    let labelDt = '';
    let labelLc = '';
    let labelGn = '';
    let resetBtn = '';
    let filteredData = [];
    let data = [];
    const filtri = this.state.filtri;
    if ((Object.keys(filtri).length !== 0)) {
      const filtri = this.state.filtri;
      if (filtri.dt || filtri.lc || filtri.gn) {
        resetBtn = <Link to={ backBtnUrl } className="btn btn-default btn-xs">Tutti gli eventi</Link>;
        labelDt = filtri.dt ? " del " + filtri.dt : '';
        labelLc = filtri.lc ? " presso '" + filtri.lc + "'" : '';
        labelGn = filtri.gn ? " in '" + filtri.gn + "'" : '';
        console.log('inizio foreach');
        this.state.data.forEach(function(evento) { 
          if ((evento.data === filtri.dt) || (evento.locale === filtri.lc) || (evento.genere === filtri.gn)) {
            filteredData.push(evento);
          }
        }.bind(this));
      }
      data = filteredData;
    } else {
      data = this.state.data;
    }
    const msg = 'Non ci sono eventi';
    const eventi = this.state.data.length ? <ListaEventi data={ data } backUrl={ backBtnUrl } /> : <div className="msg" dangerouslySetInnerHTML={{__html: this.state.stateMsg}} />;
    return (
      <div>
        <h1 className="titolo">
          <Link to={leftBtnUrl} className="btn btn-default pull-left">{leftBtnTxt}</Link>
          { pageTitle } { labelDt } { labelLc } { labelGn } {resetBtn}
          <Link to="/nuovo-evento" className="btn btn-success pull-right">Inserisci evento</Link>
        </h1>
        {eventi}
      </div>
    );
  }
});

export default Eventi;