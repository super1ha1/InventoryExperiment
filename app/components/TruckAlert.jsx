
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import '../css/app.css';

import _ from 'lodash';
import Immutable from 'immutable';

export  const TruckAlert = ({}) => (
    <div className="row">
        <div className="col-sm-12">
            <div className="span7 text-center">
                <h4 className="text-center">Truck Alert</h4>
                        <pre id="alarm" className="text-danger text-uppercase"
                             style={{backgroundColor: '#FFFFFF', fontSize: '20px',
                         height: '50px'}}  ></pre>
                <br/>
                <button className="btn btn-success mce-btn-large" ng-click="open()">Dispatch Truck</button>
            </div>
        </div>
    </div>
)
