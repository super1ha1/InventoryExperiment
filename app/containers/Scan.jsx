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
import Dialog from '../components/Dialog';
import Rating  from 'react-rating';
import * as ScanUtils from '../utils/ScanUtils'
import moment from 'moment'

@ReactTimeout
class Scan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            clicked: false,
            round : 0,
            trial: 0,
            scanResult: '',
            timeOut: false,
            currentPage: 'scan',

                truckStartTime: 0,
                truckEndTime: 0,
                truckAlarmType: 0,
                truckAlarmTime: 0,
                currentTruckPercent: 0,
                truckFull: false,
                timeLeft: 0,
                isClickedDispatch: false,
                showTruckAlert: false,
                showRatingForm: true,
                rateValue: -1
        };

        //scan
        this.showOneScan = this.showOneScan.bind(this)
        this.updateWhenTimeOut = this.updateWhenTimeOut.bind(this)
        this.intervalShowScan = this.intervalShowScan.bind(this)
        this.resetScanResult = this.resetScanResult.bind(this)
        this.resetForNewRound = this.resetForNewRound.bind(this)

        //truck
        this.startTruckTrial = this.startTruckTrial.bind(this)
        this.resetTruckForNewRound = this.resetTruckForNewRound.bind(this)
        this.updateTruckWhenExpired = this.updateTruckWhenExpired.bind(this)
        this.displayTruckAlert = this.displayTruckAlert.bind(this)
        this.setARating = this.setARating.bind(this)
    }

    componentDidMount(){
        console.log("Component mounted now")
        this.intervalShowScan()
        this.startTruckTrial()
    }

    onNavigationClick(page){
        const currentTime = moment().unix()
        const percent = (currentTime - this.state.truckStartTime) /(this.state.truckEndTime - this.state.truckStartTime)
        const timeLeft = this.state.truckEndTime - currentTime;
        var full;
        if(timeLeft < -10){
            //outdated > next round
            full = true
        }else if(timeLeft < 0){
            //still can dispatch
            full = true
        }else if(timeLeft > 0){
            //have not full yet
            full = false
        }

        console.log('on Navigation: ', percent, full, timeLeft)
        this.setState({
            currentPage:page,
            currentTruckPercent: percent,
            truckFull: full,
            timeLeft: timeLeft
        })
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
            if(this.state.round === ScanUtils.TOTAL_TRIAL){
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

    startTruckTrial(){

        //1 calculate the alarm type and alarm time, start time, end time
        console.log('truck AI suggest: ', ScanUtils.AI_suggestion)
        console.log('truck interval: ', ScanUtils.AI_TRUCK_INTERVAL_ARRAY)

        const startTime = moment().unix()
        const truckPeriod = ScanUtils.AI_TRUCK_INTERVAL_ARRAY[this.state.trial]
        const endTime = startTime + truckPeriod
        const alarmType = ScanUtils.AI_suggestion[this.state.trial]

        let alarmTime;
        switch (alarmType){
            case ScanUtils.AI_CORRECT:
                alarmTime = endTime
                break;

            case ScanUtils.AI_FALSE_ALARM:
                alarmTime = startTime + Math.floor(truckPeriod/2)
                break;

            case ScanUtils.AI_MISS_ALARM:
                alarmTime = 0
                break;
        }

        //set time out
        /*
         2 time out that we need to cater, 2 cases
         - alarm time: show alert
         - truck is totally expired: after 10 + end time > start a new round
         */
        const { setTimeout } = this.props.reactTimeout
        const showEndTrial = setTimeout(() => {

            console.log(`${this.state.trial} - trial end`)
            this.updateTruckWhenExpired()

        }, (truckPeriod + 10 ) * 1000 )

        let showAlertTruck
        switch (alarmType){
            case ScanUtils.AI_CORRECT: //show correct alert
                showAlertTruck = setTimeout(() => {
                    console.log(`show alert correct`)
                    this.displayTruckAlert()
                }, truckPeriod * 1000)
                break;

            case ScanUtils.AI_FALSE_ALARM:
                showAlertTruck = setTimeout(() => {
                    console.log(`show alert wrong`)
                    this.displayTruckAlert()
                }, (truckPeriod /2) * 1000)
                break;

            case ScanUtils.AI_MISS_ALARM:
                showAlertTruck = null;
                break;
        }

        this.resetTruckForNewRound()
        console.log(`${this.state.trial} - trial begin`)

        //show one truck here
        this.setState({
            truckAlarmType: alarmType,
            truckStartTime: startTime,
            truckEndTime: endTime,
            truckAlarmTime: alarmTime,
        })

        console.log('state after set truck detail, ',  alarmType, startTime, endTime, alarmTime)

    }

    displayTruckAlert(){
        this.setState({
            showTruckAlert: true
        })
    }

    updateTruckWhenExpired(){
        if( this.state.isClickedDispatch){
            return
        }

        //show that truck is expired and end a trial
        this.setState({showRatingForm: true})

        //start a new trial if not end yet
        if(this.state.trial >= ScanUtils.TOTAL_TRIAL) return
        this.startTruckTrial()
    }

    resetTruckForNewRound(){
        this.setState({
            truckAlarmType: -1,
            truckStartTime: -1,
            truckEndTime: -1,
            truckAlarmTime: -1,
            trial : this.state.trial + 1,
            showTruckAlert: false
        })
    }

    setARating(rate){
        console.log('rate: ', rate)
        this.setState({
            rateValue: rate
        })
    }
    render() {
        const {correctImage, wrongImage, score} = this.props

        return (

            <div className="container">
                <Header  {...this.state}
                        onNavigationClick={this.onNavigationClick.bind(this)}
                        onClick={this.displayTruckAlert}
                />

                <Dialog
                    opened={this.state.showRatingForm}
                    headerLeft={'Please indicate your trust level of the sensor'}
                    clickRightIconHandler={() => {
                        alert('please select a rating!')
                    }}
                >

                    <div style={{ padding: 0 }}>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Rating
                                start = {0}
                                stop = {9}
                                onClick={this.setARating}
                                style={{padding: 5, width:'100%',margin : 0}}
                            />
                        </div>

                        <div style={{display: 'inline', width: '100%'}} >
                            <div style={{float: 'left', width:'100px', height: 'auto', lineHeight:'0.5'}}>
                                <p>I don't trust the</p>
                                <p>sensor at all</p>
                            </div>
                            <div style={{float: 'right', width:'120px', height: 'auto', lineHeight:'0.5', paddingLeft: '15px'}}>
                                <p>I absolutely trust</p>
                                <p>the sensor</p>
                            </div>
                        </div>

                        <br />
                        <br />


                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <p  style={{margin : 0}}>You selected: {this.state.rateValue == -1 ? '?' : this.state.rateValue}</p>
                        </div>

                        <br />

                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <button className="btn btn-success mce-btn-large"
                                    style={{margin: 0}}
                                    onClick={() => this.setState({showRatingForm: false})}>OK</button>
                        </div>


                    </div>
                </Dialog>

                <div className="row">
                    <div className="col-sm-6">
                        {(() => {
                            if(this.state.currentPage === 'scan'){
                                return (
                                    <div>
                                        <TruckAlert showTruckAlert={this.state.showTruckAlert} />
                                        <ScanResult scanResult={this.state.scanResult} />
                                        </div>
                                )
                            }
                            return (null)
                        })()}
                    </div>

                    {(() => {
                       if(this.state.currentPage === 'scan'){
                           return (
                               <ScanBody correctImage={correctImage} wrongImage={wrongImage} score={score}
                                              onImageClick={this.onImageClick.bind(this)} show={this.state.show}
                               />)
                       }
                        return (<TruckBody  {...this.state}

                                />)
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


