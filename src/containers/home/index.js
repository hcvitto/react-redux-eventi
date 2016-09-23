import React from 'react';
import { connect } from 'react-redux';

//import { setLoading } from '../../actions';

import MainLayout from '../../components/home';

const mapStateToProps = (state) => {
	//console.log('mapStateToProps');
	//console.log(state);
	return ({
		isLoading: false
	})
}

const HomeContainer = connect(mapStateToProps)(MainLayout);

export default HomeContainer;
