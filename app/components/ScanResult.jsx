
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import '../css/app.css';

import _ from 'lodash';
import Immutable from 'immutable';


export const ScanResult = ({scanResult}) => (
    <div className="row">
        <div className="col-sm-12">
            <div className="span7 text-center">{
                (scanResult) => {
                    if(scanResult === ScanUtils.CORRECT){
                        return <h1 style={{marginTop: '80px', color: ScanUtils.CORRECT_COLOR}} id="resultScan" className="text-danger text-uppercase">{scanResult}</h1>
                    }
                    else
                        return <h1 style={{marginTop: '80px', color:'red'}} id="resultScan" className="text-danger text-uppercase">{scanResult}</h1>
                }
            }

            </div>
        </div>
    </div>
)