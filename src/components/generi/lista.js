import React from 'react';
import ReactDOM from 'react-dom';

import Dettaglio from './dettaglio-in-lista';

export const Lista = ({ titolo, data, onClickPanelBtn }) => {
	var generi = data.map(function(genere, id) {
		return (
			<Dettaglio key={ id } label={ genere.nome } id={ genere.id } />
		)
	}, this);
	return (
		<div>
			<h1 className="titolo">
				{ titolo }
			    <a className="btn btn-success pull-right" onClick={ onClickPanelBtn }>Inserisci tipo</a>
			</h1>
			<ul className="std-list">{ generi }</ul>
		</div>
	);
}