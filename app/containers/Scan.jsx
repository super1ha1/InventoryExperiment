import '../css/app.css';

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import ReactTimeout from 'react-timeout'

import { setCorrectImage, setWrongImage, setScore, setScoreRecord } from '../actions'
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
            scanScore: 0,
            truckScore: 0,

                truckStartTime: 0,
                truckEndTime: 0,
                truckAlarmType: 0,
                truckAlarmTime: 0,
                currentTruckPercent: 0,
                truckFull: false,
                timeLeft: 0,
                isClickedDispatch: false,
                showTruckAlert: false,
                showRatingForm: false,
                showScoreBoard: false,
                rateValue: -1,
                truckResult: ''
        };

        //scan
        this.showOneScan = this.showOneScan.bind(this)
        this.updateWhenTimeOut = this.updateWhenTimeOut.bind(this)
        this.startScanRound = this.startScanRound.bind(this)
        this.resetScanResult = this.resetScanResult.bind(this)
        this.resetForNewRound = this.resetForNewRound.bind(this)

        //truck
        this.startTruckTrial = this.startTruckTrial.bind(this)
        this.resetTruckForNewTrial = this.resetTruckForNewTrial.bind(this)
        this.updateTruckWhenExpired = this.updateTruckWhenExpired.bind(this)
        this.displayTruckAlert = this.displayTruckAlert.bind(this)
        this.setARating = this.setARating.bind(this)
        this.dispatchATruck = this.dispatchATruck.bind(this)

        //score
        this.getTotalScanScoreUpToNow = this.getTotalScanScoreUpToNow.bind(this)
        this.getTotalTruckScoreUpToNow = this.getTotalTruckScoreUpToNow.bind(this)
        this.saveScoreRecordToState = this.saveScoreRecordToState.bind(this)
    }

    componentDidMount(){
        console.log("Component mounted now")
        this.startScanRound()
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

    startScanRound(){
        //const { setInterval } = this.props.reactTimeout
        //const id = setInterval(() => {
        //    this.showOneScan()
        //    if(this.state.round === ScanUtils.TOTAL_TRIAL){
        //        console.log("Clear interval here")
        //        clearInterval(id)
        //    }
        //}, ScanUtils.SCAN_INTERVAL * 1000)
        if(this.state.showScoreBoard){
            console.log('already show ending form, not continue scan')
            return
        }
        this.showOneScan()

    }

    updateWhenTimeOut(){
        if(this.state.showScoreBoard ||  this.state.clicked){
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

            setTimeout( () => {
                //show a new round of scan
                if(this.state.clicked) console.log('start new scan on image click')
                else console.log('start new scan on time out')

                this.showOneScan()
            }, 1 * 1000)


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
                show:false,
                scanScore: this.state.scanScore + ScanUtils.CORRECT_SCAN_LOW_POINT
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

        this.showOneTruck()

    }

    showOneTruck(){
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

        /*
         2 time out that we need to cater, 2 cases
         - alarm time: show alert
         - truck is totally expired: after 10 + end time > start a new round
         */

        //time out when expired
        const { setTimeout } = this.props.reactTimeout
        const showEndTrial = setTimeout(() => {

            console.log(`${this.state.trial} - trial end`)
            this.updateTruckWhenExpired()

        }, (truckPeriod + 10 ) * 1000 )

        //time out when alert truck full
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

        //reset for new round and start round
        this.resetTruckForNewTrial()
        console.log(`${this.state.trial} - trial begin`)

        //show one truck here
        this.setState({
            truckAlarmType: alarmType,
            truckStartTime: startTime,
            truckEndTime: endTime,
            truckAlarmTime: alarmTime,
        })

        console.log('Start new Truck: state after set truck detail: ',  alarmType, startTime, endTime, alarmTime)
    }

    displayTruckAlert(){
        this.setState({
            showTruckAlert: true
        })
    }

    updateTruckWhenExpired(){
        console.log('truck expired here')
        if( this.state.isClickedDispatch){
            return
        }

        //show that truck is expired and end a trial
        //show score result
        this.setState({
            showScoreBoard: true
        })

        //start a new trial if not end yet
        if(this.state.trial >= ScanUtils.TOTAL_TRIAL) return
        this.componentDidMount()
    }

    dispatchATruck(){

        //calculate score
        const currentTime = moment().unix()
        const endTime = this.state.truckEndTime
        var truckScore, truckResult
        if(currentTime < endTime){ //under load
            truckScore = 0
            truckResult='underload'
        }else if( currentTime <= endTime + 10){//correct
            truckScore = 100
            truckResult='success'
        }else if(currentTime > endTime + 10){ //overload
            truckScore = 0
            truckResult='overload'
        }
        this.setState({truckScore: truckScore, truckResult: truckResult, isClickedDispatch:true})

        //show score result
        this.setState({
            showScoreBoard: true
        })
    }

    saveScoreRecordToState(){
        this.props.setScoreRecord({
            trial: this.state.trial,
            scan: this.state.scanScore,
            truck: this.state.truckScore
        })
    }

    resetTruckForNewTrial(){
        this.setState({
            clicked: false,
            show: true,
            round : 0,
            trial: this.state.trial + 1,
            scanResult: '',
            timeOut: false,
            scanScore: 0,
            truckScore: 0,

            truckStartTime: -1,
            truckEndTime: -1,
            truckAlarmType: -1,
            truckAlarmTime: -1,
            currentTruckPercent: -1,
            truckFull: false,
            timeLeft: -1,
            isClickedDispatch: false,
            showTruckAlert: false,
            showRatingForm: false,
            showScoreBoard: false,
            rateValue: -1,
            truckResult: ''
        })
    }

    setARating(rate){
        this.setState({
            rateValue: rate
        })
    }

    getTotalScanScoreUpToNow(){
        var totalScan = 0
        for( var i = 1 ; i < this.state.trial; i++){
            totalScan += this.props.scoreRecord[i-1]['scan']
        }
        return totalScan
    }

    getTotalTruckScoreUpToNow(){
        var totalTruck = 0
        for( var i = 1 ; i < this.state.trial; i++){
            totalTruck += this.props.scoreRecord[i-1]['truck']
        }
        return totalTruck
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

                <Dialog
                    opened={this.state.showScoreBoard}
                    headerLeft={'Your performance'}
                >

                    <div style={{ padding: 0 }}>

                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            {(()=> {
                                if(this.state.truckResult === 'success'){
                                    return (
                                        <p  style={{margin : 0}}>You have <strong style={{ color:  ScanUtils.CORRECT_COLOR}}>successfully</strong> dispatched the truck
                                        </p>
                                    )
                                }else {
                                    return (
                                        <p  style={{margin : 0}}>You have failed to dispatch the truck: {this.state.truckResult}</p>
                                    )
                                }
                            })()}
                        </div>
                        <br />

                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <p  style={{margin : 0}}>This round your score for receiving package is: {this.state.scanScore}</p>
                        </div>
                        <br />

                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <p  style={{margin : 0}}>This round your score for dispatching truck is: {this.state.truckScore}</p>
                        </div>
                        <br />

                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <p  style={{margin : 0}}>Your accumulative score for receiving package is: {this.state.scanScore + this.getTotalScanScoreUpToNow() }</p>
                        </div>
                        <br />

                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <p  style={{margin : 0}}>Your accumulative score for dispatching truck is: {this.state.truckScore + this.getTotalTruckScoreUpToNow() }</p>
                        </div>
                        <br />

                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <button className="btn btn-success mce-btn-large"
                                    style={{margin: 0}}
                                    onClick={() => {
                                    this.setState({showRatingForm: true, showScoreBoard: false})
                                    this.saveScoreRecordToState()
                                    }}>OK</button>
                        </div>
                    </div>
                </Dialog>

                <div className="row">
                    <div className="col-sm-6">
                        {(() => {
                            if(this.state.currentPage === 'scan'){
                                return (
                                    <div>
                                        <TruckAlert showTruckAlert={this.state.showTruckAlert}
                                                    dispatchATruck = {this.dispatchATruck}
                                        />
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
        score: state.scan.score,
        scoreRecord: state.scan.scoreRecord
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        setCorrectImage: bindActionCreators(setCorrectImage, dispatch),
        setWrongImage: bindActionCreators(setWrongImage, dispatch),
        setScore: bindActionCreators(setScore, dispatch),
        setScoreRecord: bindActionCreators(setScoreRecord, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Scan);


