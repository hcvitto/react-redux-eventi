import React from 'react';
import ReactDOM from 'react-dom';

const Dettaglio = ({ nome, citta }) => {
	return (
		<li>Nome: { nome } - Citta: { citta }</li>
	);
};

export default Dettaglio;
