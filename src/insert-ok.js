var React = require('react');
var ReactDOM = require('react-dom');


/*    INSERIMENTO     

-------------------------------------

*/

const tipi = [
  {
    label: 'Seleziona',
    value: null
  },
  {
    label: 'teatro',
    value: 'teatro'
  },
  {
    label: 'cinema',
    value: 'cinema'
  },
  {
    label: 'musica',
    value: 'musica'
  },
  {
    label: 'arte',
    value: 'arte'
  }
];
const mailTime = [
  {
    label: 'Non inviare mail',
    value: null
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

// evento form
const FormEvento = React.createClass({
  getInitialState: function() {
    return { evento: [], salvato: false };    
  },
  componentDidMount: function() {
    if (this.props.params.id) {
      $.ajax({
          url: '/react/eventi/api/public/evento/' + this.props.params.id,
          dataType: 'json',
          cache: false,
          success: function(data) {
            if (data) {
              this.setState({evento: data});
              console.log('componentDidMount success');
            }
          }.bind(this),
          error: function(xhr, status, err) {
            //console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
    }
  },
  setNome: function(e) {
    let ev = this.state.evento;
    ev.nome = e.target.value;
    this.setState({ evento: ev } );
  },
  setLocale: function(e) {
    let ev = this.state.evento;
    ev.locale = e.target.value;
    this.setState({ evento: ev } );
  },
  setData: function(e) {
    let ev = this.state.evento;
    ev.data = e.target.value;
    this.setState({ evento: ev } );
  },
  setGenere: function(e) {
    let ev = this.state.evento;
    ev.genere = e.target.value;
    this.setState({ evento: ev } );
  },
  setMail: function(e) {
    let ev = this.state.evento;
    ev.mail = e.target.value;
    this.setState({ evento: ev } );
  },
  setLink: function(e) {
    let ev = this.state.evento;
    ev.link = e.target.value;
    this.setState({ evento: ev } );
  },
  salvaEvento: function(e) {
    console.log('salvaEvento');
    e.preventDefault();
    //const evento = this.state.evento;
    console.log('evento:');
    console.log(this.state.evento);
    const { nome, locale, data, genere, mail, link, id } = this.state.evento;
    if (!nome || !locale || !data || !genere) { // validazione
      console.log('not valid');
      return false;
    } else {
      const evento = { nome: nome, locale: locale, data: data, genere: genere, mail: mail , link: link};
      if (id) {
        evento.id = id;
      }
      const url = '/react/eventi/api/public/evento';
      console.log('save');
      $.ajax({
        url: url,
        dataType: 'json',
        type: 'POST',
        data: evento,
        success: function(data) {
          console.log('salvaEvento success');
          if (!id) {
            this.setState({ evento: [] });
          }
          this.setState({ salvato: true });
        }.bind(this),
        error: function(xhr, status, err) {
          console.warn(xhr.responseText);
          console.error(url, status, err.toString());
        }.bind(this)
      });

    }
  },
  render: function() {
    const salvatoClass = this.state.salvato ? 'show' : 'hide';
    const evento = this.state.evento;
    return (
      <div className="form-wrapper">
        <h1 className="titolo">Inserisci un evento</h1>
        <form onSubmit={ this.salvaEvento }>
          <div className={salvatoClass + ' msg'}>Evento salvato</div>
          
          <FormEvento.Row>

            <FormEvento.Label testo="Nome">
              <FormEvento.InputText value={evento.nome} onChange={this.setNome} />
            </FormEvento.Label>

            <FormEvento.Label testo="Locale">
              <FormEvento.InputText value={evento.locale} onChange={this.setLocale} />
            </FormEvento.Label>

            <FormEvento.Label testo="Data">
              <FormEvento.InputText value={evento.data} onChange={this.setData} />
            </FormEvento.Label>

            <FormEvento.Label testo="Genere" />
              <FormEvento.InputSelect value={evento.genere} opts={tipi} onChange={this.setGenere} />

            <FormEvento.Label testo="Ricordamelo via mail (ore di anticipo)" />
            <FormEvento.InputSelect value={evento.mail} opts={mailTime} onChange={this.setMail} />

            <FormEvento.Label testo="Link">
              <FormEvento.InputText value={evento.link} onChange={this.setLink} />
            </FormEvento.Label>
          </FormEvento.Row>
          <FormEvento.InputHidden value={evento.id} />
          <input type="submit" value="Salva" className="btn" />
        </form>
      </div>
    );
  }
});

FormEvento.Row = React.createClass({
  render: function() {
    return (
      <div>{ this.props.children }</div>
    );    
  }
});

FormEvento.Label = React.createClass({
  render: function() {
    return (
      <label><span>{ this.props.testo }</span>{ this.props.children }</label>
    );    
  }
});

FormEvento.InputHidden = React.createClass({
  render: function() {
    return (
      <input type="hidden" value={this.props.value} />
    );    
  }
});

FormEvento.InputText = React.createClass({
  render: function() {
    return (
      <input type="text" value={this.props.value} className="form-control" onChange={this.props.onChange} />
    );    
  }
});

FormEvento.InputSelect = React.createClass({
  render: function() {
    const value = this.props.value || '';
    let options = this.props.opts.map(function(opt, i) {
      if (typeof opt === "object") {
        return (
          <option value={opt.value} key={i}>{opt.label}</option>
        );
      } else {
        return (
          <option value={opt} key={i}>{opt}</option>
        );
      }
    });
    return (
      <select className="form-control" onChange={this.props.onChange} value={this.props.value}>
        {options}
      </select>
    );    
  }
});


export default FormEvento;