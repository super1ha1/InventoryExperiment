import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import '../css/app.css';

import _ from 'lodash';
import Immutable from 'immutable';

export class TruckBody extends Component {

    render(){
        const { } = this.props
        return ( <div className="col-sm-6 " style={{paddingTop: '20px'}}>
           Truck Main page here
        </div>)
    }
}
