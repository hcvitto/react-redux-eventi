import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

const Header = () => {
  return (
    <nav>
      <ul role="nav">
        <li>
          <Link to="/" activeClassName="active"><i className="fa fa-home" aria-hidden="true"></i><span className="hidden-xs">Home</span></Link>
        </li>
        <li>
          <Link to="/eventi-in-corso" activeClassName="active"><i className="fa fa-calendar" aria-hidden="true"></i><span className="hidden-xs">Eventi</span></Link>
        </li>
        <li>
          <Link to="/nuovo-evento" activeClassName="active"><i className="fa fa-calendar" aria-hidden="true"></i><span className="hidden-xs">Nuovo evento</span></Link>
        </li>
        <li>
          <Link to="/locali" activeClassName="active"><i className="fa fa-map-marker" aria-hidden="true"></i><span className="hidden-xs">Locali</span></Link>
        </li>
        <li>
          <Link to="/generi" activeClassName="active"><i className="fa fa-venus-mars" aria-hidden="true"></i><span className="hidden-xs">Generi</span></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header;
