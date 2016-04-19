import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import '../css/app.css';

import _ from 'lodash';
import Immutable from 'immutable';
const IMAGE_URL = 'https://a651b92a590c93dd85474fb426c27428fdac9155.googledrive.com/host/0BziLHHDUzLXdSGMwYnI5VjNTNUU/';

export class TruckBody extends Component {

    render(){
        const { } = this.props
        return (
           <div >
               <div className="col-sm-6 " style={{paddingTop: '20px'}}>
                   <div className="row" style={{paddingTop: '30px'}}>
                       <div className="col-sm-6 col-sm-offset-6">

                           <div className="row">
                               <div className="col-sm-6">
                                   <div style={{height: '200px', width: '150px',  backgroundColor: '#fce3ac'}}>
                                       <div id="animateDiv"
                                            style={{backgroundColor: 'red', position: 'absolute', bottom: '0px', height: '50px', width: '150px'}}>

                                       </div>
                                   </div>

                               </div>
                           </div>

                           <div className="row"  style={{marginTop: '-20px' , left: '-300px', position: 'relative'}}>
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
