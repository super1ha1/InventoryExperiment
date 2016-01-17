import '../css/app.css';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import ReactTimeout from 'react-timeout'

import { setCorrectImage, setWrongImage, setScore } from '../actions'
import { ScanBody } from '../components/ScanBody.jsx'
import { Header } from '../components/Header.jsx'
import { ScanResult } from '../components/ScanResult.jsx'
import { TruckAlert } from '../components/TruckAlert.jsx'
import * as ScanUtils from '../utils/ScanUtils'

@ReactTimeout
class Scan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recommended: false,
            round : 1,
            scanResult: '',
            timeOut: false
        };
        this.showOneScan = this.showOneScan.bind(this)
        this.updateRound = this.updateRound.bind(this)
        this.intervalShowScan = this.intervalShowScan.bind(this)
    }

    updateRound(){
        this.setState({
            round : this.state.round + 1
        })
    }

    onImageClick(index){
        console.log("On Image click: ", index)

        if(this.state.timeOut){
            return;
        }
        const {score, wrongImage } = this.props

        console.log("Image click ", wrongImage[index], " correct ",  wrongImage[index].correct)

        if(  wrongImage[index].correct){
            this.props.setScore(score + ScanUtils.CORRECT_SCAN_LOW_POINT)
            this.setState({
                scanResult: ScanUtils.CORRECT
            })
            return
        }
        this.setState({
            scanResult: ScanUtils.INCORRECT
        })

    }

    intervalShowScan(){
        const { setInterval } = this.props.reactTimeout
        const id = setInterval(() => {
           this.showOneScan()
            if(this.state.round === 3){
                console.log("Clear interval here")
                clearInterval(id)
            }
        }, 5000)
    }

    componentDidMount(){
        console.log("Component mounted now")
        this.intervalShowScan()
    }

    showOneScan(){
        const { setTimeout } = this.props.reactTimeout
        const { wrongImage} = this.props

        const id = setTimeout(() => {
            console.log(`${this.state.round} - end`)
            this.updateRound()
        }, ScanUtils.SCAN_TIMEOUT * 1000 )

        console.log(`${this.state.round} - begin`)
        ScanUtils.showOneScan(wrongImage)
        this.props.setCorrectImage(ScanUtils.getCorrectImageArray())
        this.props.setWrongImage({...ScanUtils.getCorrectAnswerArray()})
        this.props.setWrongImage({...ScanUtils.getWrongAnswerArray()})
    }

    render() {
        const {correctImage, wrongImage, score} = this.props

        return (

            <div className="container">
                <Header />

                <div className="row">

                    <div className="col-sm-6">
                        <TruckAlert />
                        <ScanResult scanResult={this.state.scanResult} />
                    </div>

                    <ScanBody correctImage={correctImage} wrongImage={wrongImage} score={score}
                        onImageClick={this.onImageClick.bind(this)}
                    />

                </div>
            </div>

        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        correctImage: state.scan.correctImage,
        wrongImage: state.scan.wrongImage,
        score: state.scan.score
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        setCorrectImage: bindActionCreators(setCorrectImage, dispatch),
        setWrongImage: bindActionCreators(setWrongImage, dispatch),
        setScore: bindActionCreators(setScore, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Scan);


