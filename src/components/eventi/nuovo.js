var React = require('react');
var ReactDOM = require('react-dom');

import { FormEvento } from './nuovo-form';

const mailTime = [
  {
    label: 'Non inviare mail',
    value: ''
  },
  {
    label: 6,
    value: 6
  },
  {
    label: 12,
    value: 12
  },
  {
    label: 24,
    value: 24
  }
];


const NuovoEvento = React.createClass({
  getInitialState: function() {
    return { evento: this.props.evento, salvato: false, loading: false };    
  },
  componentDidMount: function() {
    if (this.props.params.id) {
      this.props.loadEvento(this.props.params.id, this.props.params.titolo);
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({ evento: nextProps.evento });
  },
  validate: function(evt, campo) { // validazione semplice
    let evento = this.state.evento;
    evento[campo] = evt.target.value;
    this.setState({ evento: evento } );
  },
  salvaEvento: function(e) {
    e.preventDefault();
    const { nome, locale, data, genere, mail, link, id } = this.state.evento;

    if (!nome || !locale || !data || !genere ) { // validazione
      alert('ci sono campi vuoti!');
      return false;
    } 
    if (this.state.loading) {
      alert('loading');
      return false;
    } 

    this.setState({ loading: 'loading' });
    const evento = { nome: nome, locale: locale, data: data, genere: genere, mail: mail, link: link };
    if (id) {
      evento.id = id;
    }
    this.props.saveEvento(evento);
  },
  render: function() {
    const salvatoClass = this.state.salvato ? 'show' : 'hide';
    const evento = this.state.evento;
    const inputNames = ['nome', 'locale', 'data', 'genere', 'mail', 'link', 'id'];
    return (
      <FormEvento titolo="Inserisci/Modifica un evento" onSubmit={ this.salvaEvento } wrapClass={ salvatoClass } inputNames={ inputNames } evento={ evento } localiOpts={ this.props.locali } generiOpts={ this.props.generi } mailOpts={ mailTime } submitState={this.state.loading ? this.state.loading : "Salva"} onChange={ this.validate } />
    );
  }
});


export default NuovoEvento;