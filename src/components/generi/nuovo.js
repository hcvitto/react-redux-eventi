var React = require('react');
var ReactDOM = require('react-dom');

import { Lista } from './lista';
import { NuovoGenereForm } from './nuovoForm';


const NuovoGenere = React.createClass({
  getInitialState: function() {
    return { genere: [], salvato: false, loading: '', rightPanel: false, inputNames: ['label'] };    
  },
  componentDidMount: function() {
    //let diff = Date.now() - this.props.generi.ricevuto;
    //if (!this.props.generi.ricevuto || (diff > 60000)){
      this.props.loadGeneri();
    //}
  },
  validate: function(t, campo) { // validazione semplice
    let genere = this.state.genere;
    genere[campo] = t.target.value;
    this.setState({ genere: genere });
  },
  setPanel: function (e) {
    e.preventDefault();
    this.setState({ rightPanel: !this.state.rightPanel });
  },
  salva: function(e) {
    e.preventDefault();
    const { label } = this.state.genere;
    if (!label) { // validazione
      alert('ci sono campi vuoti!');
      return false;
    } 
    if (this.state.loading) {
      alert('loading');
      return false;
    } 
    this.setState({ loading: 'loading' });
    const genere = { label: label };
    this.props.submitGenereForm(genere);
    this.setState({ loading: '' });
    this.setState({ genere: [] });
  },
  render: function() {
    return (
    	<div id="content-in" className={ this.props.isLoading ? 'loading' : '' }>
    	  <Lista data={ this.props.generi.items } titolo="Lista generi" onClickPanelBtn={ this.setPanel } />
      	<NuovoGenereForm 
          titolo="Inserisci un genere" 
          onSubmit={ this.salva } 
          wrapClass={ this.state.salvato ? 'show' : 'hide' }
          inputNames={ this.state.inputNames } 
          genere={ this.state.genere } 
          onChange={ this.validate } 
          submitState={this.state.loading ? this.state.loading : "Salva"} 
          onClickPanelBtn={ this.setPanel } 
          rightPanelState={ this.state.rightPanel ? "open" : ""} 
        />
      </div>
    );
  }
});


export default NuovoGenere;