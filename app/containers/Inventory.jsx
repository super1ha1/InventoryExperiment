
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';


class Inventory extends Component {

    render() {
        return (

            <div className="container">
                <Header />
                
                <div className="row">

                    <div className="col-sm-6">
                        <TruckAlert />
                        <ScanResult />
                    </div>

                    <Scan />

                </div>
            </div>

        )
    }
}

const Header = ({}) => (
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
                         style={{width: '80px' , height: '80px' ,  paddingTop: '10px'}}
                        />
                </div>
                <div className="col-sm-2 col-sm-offset-1">
                    <img
                        className="image"
                         src={'http://52.25.173.78/inventory/app/img/truck.png'}
                         style={{width: '100px' , height: '100px'}}
                        />
                </div>
            </div>
        </div>
    </div>
)

const TruckAlert = ({}) => (
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

const ScanResult = ({}) => (
    <div className="row">
        <div className="col-sm-12">
            <div className="span7 text-center">
                <h1 id="resultScan" className="text-danger text-uppercase" style={{marginTop: '80px'}}></h1>
            </div>
        </div>
    </div>
)

const Scan = ({}) => (
    <div className="col-sm-6 " style={{paddingTop: '20px'}}>
        <div className="row">
            <div className="col-sm-3">
                <h4>Total Score:</h4>
            </div>
            <div className="col-sm-2">
                <pre id="score"  style={{backgroundColor: '#FFFFFF' }}  ></pre>
            </div>
        </div>
        <ScanDisplay />
    </div>
)

class ScanDisplay extends Component {
    render (){
        return (
            <div className="row" style={{paddingTop: '20px'}}>
                <div className="col-sm-12 ">
                    <div className="row" style={{backgroundColor: '#0a000a' }}>
                        <div className="col-sm-6" style={{  height: '500px' , padding: '10px 10px 10px 20px'}}>
                            <div className="row imageRow" id="movingRow" style={{position: 'relative' }}>
                                <img src="img/easy/item1.png"  className="eachImage"  id="movingImage1" />
                                <img src="img/easy/item2.png" className="eachImage"   id="movingImage2" />
                                <img src="img/easy/item3.png"  className="eachImage"   id="movingImage3" />
                            </div>
                        </div>
                        <div className="col-sm-6" style={{ height: '500px', padding: '10px 10px'}} >
                            <div style={{backgroundColor: '#ffffff', height: '100%',  padding: '10px 10px'}}>
                                <div className="row imageRow answerRow" id="row1">
                                    <img src="img/easy/item1.png" id="image11" className="eachImage"  />
                                    <img src="img/easy/item2.png" id="image12" className="eachImage"  />
                                    <img src="img/easy/item3.png" id="image13" className="eachImage"/>
                                </div>
                                <div className="row imageRow answerRow"  id="row2">
                                    <img src="img/easy/item1.png" id="image21" className="eachImage"/>
                                    <img src="img/easy/item2.png" id="image22" className="eachImage"/>
                                    <img src="img/easy/item3.png" id="image23" className="eachImage"/>
                                </div>
                                <div className="row imageRow answerRow" id="row3"  >
                                    <img src="img/easy/item1.png" id="image31" className="eachImage"/>
                                    <img src="img/easy/item2.png" id="image32" className="eachImage"/>
                                    <img src="img/easy/item3.png" id="image33" className="eachImage"/>
                                </div>
                                <div className="row imageRow answerRow" id="row4" >
                                    <img src="img/easy/item1.png" id="image41" className="eachImage"/>
                                    <img src="img/easy/item2.png" id="image42" className="eachImage"/>
                                    <img src="img/easy/item3.png" id="image43" className="eachImage"/>
                                </div>
                                <div className="span7 text-center" style={{marginTop: '20px'}}>
                                    <button className="btn btn-lg btn-success" ng-click="cancel()">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Inventory
