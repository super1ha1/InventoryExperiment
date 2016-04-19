import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import '../css/app.css';

import _ from 'lodash';
import Immutable from 'immutable';
const IMAGE_URL = 'https://a651b92a590c93dd85474fb426c27428fdac9155.googledrive.com/host/0BziLHHDUzLXdSGMwYnI5VjNTNUU/';
import moment from 'moment';

// truck width = 5.8 cm, height = 7.8 cm

export class TruckBody extends Component {

    render(){
        const {truckStartTime,truckEndTime, truckAlarmType, truckAlarmTime,currentTruckPercent, truckFull,timeLeft } = this.props
        console.log('props in truck body', this.props)
        return (
           <div >
               <div className="col-sm-6 " style={{paddingTop: '20px'}}>
                   <div className="row" style={{paddingTop: '30px'}}>
                       <div className="col-sm-6 col-sm-offset-6">

                           <div className="row">
                               <div className="col-sm-6">
                                   <div style={{height: '268px', width: '200px',  backgroundColor: '#fff', border:'1px solid black'}}>
                                       <div
                                           style={{backgroundColor: 'red', position: 'absolute',  width: '200px',
                                            bottom: currentTruckPercent + 'px',
                                            height:  (268 - currentTruckPercent) + 'px',
                                            transition:  ('height ' + timeLeft + 's')

                                            }}>

                                       </div>

                                       <div
                                           style={{backgroundColor: '#0070c0', position: 'absolute', bottom: '0px', width: '200px',
                                            height: currentTruckPercent,
                                            }}>

                                       </div>

                                   </div>

                               </div>
                           </div>

                           <div className="row"  style={{marginTop: '0px' , left: '15px', position: 'relative'}}>
                               <div className="col-sm-1 col-sm-offset-1">
                                   <img src={IMAGE_URL + 'wheel.png'} />
                               </div>
                               <div className="col-sm-1 col-sm-offset-2">
                                   <img src={IMAGE_URL + 'wheel.png'}  />
                               </div>
                           </div>

                           <br/>

                           <button className="btn btn-success mce-btn-large"
                                   style={{marginLeft: '45px', marginTop: '10px'}}>Dispatch Truck</button>
                       </div>
                   </div>
               </div>
           </div>
        );
    }
}
