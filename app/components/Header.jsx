
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import '../css/app.css';

import _ from 'lodash';
import Immutable from 'immutable';

export class Header  extends Component {
    render(){

        const {currentPage} = this.props

        return  (
            <div className="row">
                <div className="col-sm-6 text-center">
                    <h4 className="text-nowrap">Automated Warehouse Management System</h4>
                </div>

                <script type="text/ng-template" id="myModalContent.html">
                    <div className="modal-header">
                        <h3 className="modal-title">I'm a modal!</h3>
                    </div>
                    <div className="modal-body">
                        <ul>
                            <li ng-repeat="item in items">
                                <a ng-click="selected.item = item"> item </a>
                            </li>
                        </ul>
                        Selected:
                        <b>selected item </b>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" ng-click="ok()">OK</button>
                        <button className="btn btn-warning" ng-click="cancel()">Cancel</button>
                    </div>
                </script>

                <div className="col-sm-6 ">
                    <div className="row">
                        <div className="col-sm-2">
                            <img
                                className="image"
                                src={'http://52.25.173.78/inventory/app/img/scan.png'}
                                style={{width: '80px' , height: '80px' ,  paddingTop: '10px', border : (currentPage ==='scan' ? '3px solid #00b050' : '' ) }}
                                onClick={this.props.onNavigationClick.bind(this, 'scan')}
                            />
                        </div>
                        <div className="col-sm-2 col-sm-offset-1">
                            <img
                                className="image"
                                src={'http://52.25.173.78/inventory/app/img/truck.png'}
                                style={{width: '100px' , height: '100px', border : (currentPage ==='truck' ? '3px solid #00b050' : '' )}}
                                onClick={this.props.onNavigationClick.bind(this, 'truck')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}