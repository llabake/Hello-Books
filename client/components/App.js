import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default class App extends Component {
    render () {
        return (
            <div>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

