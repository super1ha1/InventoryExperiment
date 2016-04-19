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
import { TruckBody } from '../components/TruckBody.jsx'
import * as ScanUtils from '../utils/ScanUtils'

@ReactTimeout
class Scan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            clicked: false,
            round : 0,
            scanResult: '',
            timeOut: false,
            currentPage: 'scan'
        };

        this.showOneScan = this.showOneScan.bind(this)
        this.updateWhenTimeOut = this.updateWhenTimeOut.bind(this)
        this.intervalShowScan = this.intervalShowScan.bind(this)
        this.resetScanResult = this.resetScanResult.bind(this)
        this.resetForNewRound = this.resetForNewRound.bind(this)
    }

    componentDidMount(){
        console.log("Component mounted now")
        console.log('scan AI init: ', ScanUtils.AI_Initial_suggestion)
        console.log('scan AI random: ', ScanUtils.AI_random)
        console.log('scan AI suggest: ', ScanUtils.AI_suggestion)
        this.intervalShowScan()
    }

    showOneScan(){
        const { setTimeout } = this.props.reactTimeout
        const { wrongImage} = this.props

        const id = setTimeout(() => {

            console.log(`${this.state.round} - end`)
            this.updateWhenTimeOut()

        }, ScanUtils.SCAN_TIMEOUT * 1000 )

        this.resetForNewRound()
        console.log(`${this.state.round} - begin`)
        ScanUtils.showOneScan(wrongImage)
        this.props.setCorrectImage(ScanUtils.getCorrectImageArray())
        this.props.setWrongImage({...ScanUtils.getCorrectAnswerArray()})
        this.props.setWrongImage({...ScanUtils.getWrongAnswerArray()})
    }

    intervalShowScan(){
        const { setInterval } = this.props.reactTimeout
        const id = setInterval(() => {
            this.showOneScan()
            if(this.state.round === ScanUtils.TOTAL_SCAN_TRIAL){
                console.log("Clear interval here")
                clearInterval(id)
            }
        }, ScanUtils.SCAN_INTERVAL * 1000)
    }

    updateWhenTimeOut(){
        if( this.state.clicked){
            return
        }

        this.setState({
            timeOut: true,
            clicked: false,
            scanResult: 'Timeout',
            show: false
        })
        this.resetScanResult()
    }

    resetScanResult(){
        const { setTimeout } = this.props.reactTimeout
        const id = setTimeout( () => {
            this.setState({
                scanResult: ''
            })
        }, ScanUtils.SCAN_RESULT_INTERVAL * 1000)
    }

    resetForNewRound(){

        this.setState({
            clicked: false,
            scanResult: '',
            timeOut: false,
            round : this.state.round + 1,
            show: true
        })

    }

    onImageClick(index){
        const {score, wrongImage } = this.props

        console.log("Image click ", index, wrongImage[index], " correct ",  wrongImage[index].correct)

        if(this.state.timeOut || this.state.clicked){
            return;
        }

        if(  wrongImage[index].correct){
            this.props.setScore(score + ScanUtils.CORRECT_SCAN_LOW_POINT)
            this.setState({
                scanResult: 'correct',
                clicked: true,
                show:false
            })
            this.resetScanResult()
            return
        }

        this.setState({
            scanResult: 'incorrect',
            clicked: true,
            show:false
        })

        this.resetScanResult()
    }

    onNavigationClick(page){
        this.setState({
            currentPage:page
        })
    }

    render() {
        const {correctImage, wrongImage, score} = this.props

        return (

            <div className="container">
                <Header currentPage={this.state.currentPage}
                        onNavigationClick={this.onNavigationClick.bind(this)}
                />

                <div className="row">

                    <div className="col-sm-6">
                        <TruckAlert />
                        <ScanResult scanResult={this.state.scanResult} />
                    </div>

                    {(() => {
                       if(this.state.currentPage === 'scan'){
                           return (
                               <ScanBody correctImage={correctImage} wrongImage={wrongImage} score={score}
                                              onImageClick={this.onImageClick.bind(this)} show={this.state.show}
                               />)
                       }
                        return (<TruckBody />)
                    })()}

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


