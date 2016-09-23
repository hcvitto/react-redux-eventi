import React from 'react';
import ReactDOM from 'react-dom';

import Dettaglio from './dettaglio-in-lista';

export const Lista = ({ titolo, data, onClickPanelBtn }) => {
	var locali = data.map(function(locale, id) {
		return (
			<Dettaglio key={ id } nome={ locale.nome } citta={ locale.citta } />
		)
	}, this);
	return (
		<div>
			<h1 className="titolo">
				{ titolo }
				<a className="btn btn-success pull-right" onClick={ onClickPanelBtn }>Inserisci locale</a>
			</h1>
			<ul className="std-list">{ locali }</ul>
		</div>
	);
}