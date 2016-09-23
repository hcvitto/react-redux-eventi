import React from 'react';
import ReactDOM from 'react-dom';

const Dettaglio = ({ label, id }) => {
	return (
		<li>Label: { label } - value: { id }</li>
	);
};

export default Dettaglio;
