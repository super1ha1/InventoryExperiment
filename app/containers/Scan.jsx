import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import '../css/app.css';
import { setCorrectImage, setWrongImage } from '../actions'
import { ScanBody } from '../components/ScanBody.jsx'

class Scan extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log("Component mounted now")
        this.props.setCorrectImage([3,3, 3])
        this.props.setWrongImage(1, [3, 3, 3], true)
    }

    render() {
        const {correctImage, wrongImage} = this.props
        console.log("correct Image in Scan Container: " , correctImage)

        return (

            <div className="container">
                <Header />

                <div className="row">

                    <div className="col-sm-6">
                        <TruckAlert />
                        <ScanResult />
                    </div>

                    <ScanBody correctImage={correctImage} wrongImage={wrongImage} />

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


function mapStateToProps(state, ownProps) {
    return {
        correctImage: state.scan.correctImage,
        wrongImage: state.scan.wrongImage
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        setCorrectImage: bindActionCreators(setCorrectImage, dispatch),
        setWrongImage: bindActionCreators(setWrongImage, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Scan);


