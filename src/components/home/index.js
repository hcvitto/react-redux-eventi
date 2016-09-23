import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../header';

const MainLayout = (props) => {
	//console.log(props);
    return (
      <div id="innerWrapper" className={ props.isLoading ? 'loading' : '' }>
      <div id="loadingWrapper">Loading data</div>
        <Header />
        <div id="content">
          {props.children}
        </div>
      </div>
    )
}

export default MainLayout;