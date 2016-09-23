import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';

const SingoloEventoInLista = (props) => {
	return (
  	<li>
     	<Link to={{ pathname: props.resetUrl, query: {data: props.data} }} title={"Tutti gli eventi del " + props.data}><span className="data">{ props.data }</span></Link><br />
   		<Link to={{ pathname: "/evento/" + props.id + "/" + props.slug }} title="Dettagli"><span className="evento">{ props.nome }</span></Link><br />
      	<Link to={{ pathname: props.resetUrl, query: {locale: props.locale} }} title={"Tutti gli eventi del " + props.locale}><span className="locale">{ props.locale }</span></Link>
       	- 
      	<Link to={{ pathname: props.resetUrl, query: {genere: props.genere} }} title={"Tutti gli eventi in " + props.genere}><span className="genere">{ props.genere }</span></Link>
  	</li>
	);
};

export default SingoloEventoInLista;