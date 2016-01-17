
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import '../css/app.css';

import _ from 'lodash';
import Immutable from 'immutable';
import * as ScanUtils from '../utils/ScanUtils'


export const ScanResult = ({scanResult}) => (
            <div className="row">
                <div className="col-sm-12">
                    <div className="span7 text-center">
                        {
                            (() => {
                                if(scanResult === 'correct'){
                                    return <h1 style={{marginTop: '80px', color: ScanUtils.CORRECT_COLOR}}  className="text-danger text-uppercase">{scanResult}</h1>
                                }
                                return <h1 style={{marginTop: '80px', color:'red'}} className="text-danger text-uppercase">{scanResult}</h1>
                            })()
                        }
                    </div>
                </div>
            </div>
)


