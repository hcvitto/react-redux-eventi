var React = require('react');
var ReactDOM = require('react-dom');
import { Link } from 'react-router';
import { connect } from 'react-redux';

import ListaEventi from '../../components/eventi/lista'; 

function setTipo(pathname) {
  let t;
  if (pathname == '/eventi-in-corso') {
    t = 'inCorso';
  } else if (pathname == '/eventi-passati') {
    t = 'passati';
  } 
  return t;
}
function setFiltro(query) {
  const k = Object.keys(query);
  const v = query[k];
  const f = { tipo: k[0], valore: v }
  return f;
}

const Eventi = React.createClass({
  componentWillReceiveProps: function(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      let t = setTipo(nextProps.location.pathname);
      const f = { tipo: null, valore: null };
      this.props.loadEventi(t, f);
    } else {
      if (nextProps.location.query) {
        if (this.props.location.query !== nextProps.location.query) {
          const t = setTipo(nextProps.location.pathname);
          const f = setFiltro(nextProps.location.query);
          this.props.loadEventi(t, f);
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  },
  componentDidMount: function() {
    let t = setTipo(this.props.location.pathname);
    let f = { tipo: null, valore: null }
    if (this.props.location.query) {
      f = setFiltro(this.props.location.query);
    }
    this.props.loadEventi(t, f);
  },
  render: function() {
    let pageTitle;
    let leftBtnTxt;
    let leftBtnUrl;
    let backBtnUrl;
    let resetUrl;
    if (this.props.location.pathname == '/eventi-in-corso') {
      pageTitle = 'Eventi in corso';
      leftBtnTxt = 'Eventi passati';
      leftBtnUrl = '/eventi-passati';
      backBtnUrl = '/eventi-in-corso';
      resetUrl = '/eventi-in-corso';
    } else if (this.props.location.pathname == '/eventi-passati') {
      pageTitle = 'Eventi passati';
      leftBtnTxt = 'Eventi in corso';
      leftBtnUrl = '/eventi-in-corso';
      backBtnUrl = '/eventi-passati';
      resetUrl = '/eventi-passati';
    }
    let resetBtn;
    let filtroLabel;
    if (this.props.eventi.filtro.tipo) {
      if (this.props.location.pathname == '/eventi-in-corso') {
        leftBtnTxt = 'Eventi in corso';
        leftBtnUrl = '/eventi-in-corso';
        resetUrl = '/eventi-in-corso';
      } else if (this.props.location.pathname == '/eventi-passati') {
        leftBtnTxt = 'Eventi passati';
        resetUrl = '/eventi-passati';
      }
      const tipo = this.props.eventi.filtro.tipo;
      const valore = this.props.eventi.filtro.valore;
      resetBtn = <Link to={ backBtnUrl } className="btn btn-default btn-xs">Tutti gli eventi</Link>;
      switch (tipo) {
        case 'data':
          filtroLabel = " del " + valore;
          break;
        case 'locale':
          filtroLabel = " presso " + valore;
          break;
        case 'genere':
          filtroLabel = " in " + valore;
          break;
        default:
          filtroLabel = "";
      }
    } 
    return (
      <div>
        <ListaEventi eventi={ this.props.eventi[this.props.eventi.selezionati] } backBtnUrl={ backBtnUrl } leftBtnUrl={ leftBtnUrl } leftBtnTxt={ leftBtnTxt } pageTitle={ pageTitle } filtroLabel={ filtroLabel } resetUrl={ resetUrl } resetBtn={ resetBtn } isLoading={ this.props.isLoading } onClick={ this.props.setFiltro } />
      </div>
    );
  }
});


export default Eventi;