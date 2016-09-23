import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

const Evento = React.createClass({
	getInitialState: function() {
		return { cancellato: null }
	},
	componentDidMount: function() {
		this.props.loadEvento(this.props.params.id, this.props.params.titolo);
	},
	cancellaEvento: function() {
		if (confirm('sicuro?')) {
			this.props.deleteEvento(this.props.params.id);
		}
	},
	render: function() {
		const evento = this.props.evento.item;
		let esisteMsg;
		let esisteClass;
		let link;
		let cancellatoMsg;
		let cancellatoClass;
		let linkClass;
		let mailMsg;
		let deleteBtn;
		let modifyBtn;
		if (this.props.evento.backUrl != 'eventi-passati') {
			deleteBtn = <a className="btn btn-danger pull-right" onClick={ this.cancellaEvento }>Cancella questo evento</a>;
			modifyBtn = <Link to={{ pathname: '/modifica-evento/' + evento.id + '/' + evento.slug }} className="btn btn-primary pull-right">Modifica questo evento</Link>
		}
		if (evento.id) {
			esisteMsg = '';
			esisteClass = '';
			link = evento.link ? '<a href="' + evento.link + '" target="blank">Link</a>' : '';
			cancellatoMsg = this.state.cancellato ? 'Evento cancellato' : '';
			cancellatoClass = this.state.cancellato ? '' : 'hide';
			linkClass = evento.link ? 'show' : 'hide';
			mailMsg = (evento.mail != null && evento.mail != 0) ? 'Invio mail richiesto ' + evento.mail + ' ore prima dell\'evento' : 'Invio mail non richiesto';
		} else {
			esisteMsg = 'L\'evento selezionato non esiste';
			esisteClass = 'hide';
		}
		return (
			<div className="evento-details">
				<div className='msg'>{ esisteMsg }</div>
          		<div className={cancellatoClass + ' msg'}>{ cancellatoMsg }</div>
				<div className={ esisteClass }>
					<h1 className="titolo">
						<Link to={{ pathname: "/" + this.props.evento.backUrl }} className="btn btn-default pull-left">Torna agli eventi</Link>
						{ evento.nome } 
					</h1>
					<div className="container-fluid">
						<ul className="row">
							<li className="col-xs-4">
								<div>
									<strong>Locale</strong><br/>
								 	{ evento.locale }
								</div>
							</li>
							<li className="col-xs-4">
								<div>
									<strong>Data</strong><br/>
							 		{ evento.data }
							 	</div>
							</li>
							<li className="col-xs-4">
								<div>
									<strong>Genere</strong><br/>
								 	{ evento.genere }
							 	</div>
							</li>
						</ul>
						<ul className={ "row " + linkClass }>
							<li className="col-xs-12">
								<strong>Info</strong>
								<div dangerouslySetInnerHTML={{__html: link}} />
							</li>
						</ul>
						<ul className="row">
							<li className="col-xs-12">
								<div dangerouslySetInnerHTML={{__html: mailMsg}} />
							</li>
						</ul>
						{ deleteBtn }{ modifyBtn }  
					</div>
				</div>
			</div>
		);
	}
});

export default Evento;