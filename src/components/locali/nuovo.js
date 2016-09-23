var React = require('react');
var ReactDOM = require('react-dom');

import { Lista } from './lista';
import { NuovoLocaleForm } from './nuovoForm';


const NuovoLocale = React.createClass({
  getInitialState: function() {
    return { locale: [], salvato: false, loading: '', rightPanel: false, inputNames: ['nome', 'citta'] };    
  },
  componentDidMount: function() {
    //let diff = Date.now() - this.props.locali.ricevuto;
    //if (!this.props.locali.ricevuto || (diff > 60000)){
      this.props.loadLocali();
    //}
  },
  validate: function(t, campo) { // validazione semplice
    let locale = this.state.locale;
    locale[campo] = t.target.value;
    this.setState({ locale: locale });
  },
  setPanel: function (e) {
    e.preventDefault();
    this.setState({ rightPanel: !this.state.rightPanel });
  },
  salva: function(e) {
    e.preventDefault();
    const { nome, citta } = this.state.locale;
    if (!nome || !citta ) { // validazione
      alert('ci sono campi vuoti!');
      return false;
    } 
    if (this.state.loading) {
      alert('loading');
      return false;
    } 

    const locale = { nome: nome, citta: citta };
    this.props.submitLocaleForm(locale);
    this.setState({ loading: '' });
    this.setState({ locale: [] });
  },
  render: function() {
    return (
    	<div id="content-in" className={ this.props.isLoading ? 'loading' : '' }>
    	  <Lista data={ this.props.locali.items } titolo="Lista locali" onClickPanelBtn={ this.setPanel }  />
      	<NuovoLocaleForm 
          titolo="Inserisci un locale" 
          onSubmit={ this.salva } 
          wrapClass={ this.state.salvato ? 'show' : 'hide' } 
          inputNames={ this.state.inputNames } 
          locale={ this.state.locale } 
          onChange={ this.validate } 
          submitState={this.state.loading ? this.state.loading : "Salva"} 
          onClickPanelBtn={ this.setPanel }
          rightPanelState={ this.state.rightPanel ? "open" : ""} 
        />
      </div>
    );
  }
});


export default NuovoLocale;