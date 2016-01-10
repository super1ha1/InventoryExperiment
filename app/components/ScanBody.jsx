/**
 *
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import '../css/app.css';

import _ from 'lodash';
import Immutable from 'immutable';

export class ScanBody extends Component {

    render(){
        const { correctImage, wrongImage} = this.props
        return ( <div className="col-sm-6 " style={{paddingTop: '20px'}}>
            <div className="row">
                <div className="col-sm-3">
                    <h4>Total Score:</h4>
                </div>
                <div className="col-sm-3">
                    <pre id="score"  style={{backgroundColor: '#FFFFFF', height: '15px', marginTop:'5px' }}  ></pre>
                </div>
            </div>
            <ScanDisplay correctImage={correctImage} wrongImage={wrongImage} />
        </div>)
    }
}

class ScanDisplay extends Component {

    render (){
        const {correctImage, wrongImage} = this.props
        return (
            <div className="row" style={{paddingTop: '20px'}}>
                <div className="col-sm-12 ">
                    <div className="row" style={{backgroundColor: '#0a000a' }}>
                        <MovingImage  correctImage={ correctImage }/>
                        <AnswerImage wrongImage = {wrongImage} />
                    </div>
                </div>
            </div>
        )
    }
}

const MovingImage = ({correctImage}) => (
    <div className="col-sm-6" style={{  height: '500px' , padding: '10px 10px 10px 20px'}}>
        <div className="row imageRow" id="movingRow" style={{position: 'relative' }}>
            {correctImage.map( image => {
                return (
                    <img key={correctImage.indexOf(image)} src={'http://52.25.173.78/inventory/app/img/easy/item' + image + '.png'}  className="eachImage"   />
                )
            }) }
        </div>
    </div>
)

class AnswerImage   extends Component {

    render() {
        const {wrongImage} = this.props
        console.log("wrongImage in Answer class", wrongImage)
        const firstRow = wrongImage[0]
        const secondRow = wrongImage[1]
        const thirdRow = wrongImage[2]
        const forthRow = wrongImage[3]

        return (

            <div className="col-sm-6" style={{ height: '500px', padding: '10px 10px'}} >
                <div style={{backgroundColor: '#ffffff', height: '100%',  padding: '10px 10px'}}>

                    <div className="row imageRow answerRow" id="row1">
                        {firstRow.value.map(image => {
                            return (
                                <img key={firstRow.value.indexOf(image)} src={'http://52.25.173.78/inventory/app/img/easy/item' + image + '.png'}  className="eachImage"   />
                            )
                        })}
                    </div>

                    <div className="row imageRow answerRow"  id="row2">
                        {secondRow.value.map(image => {
                            return (
                                <img key={secondRow.value.indexOf(image)} src={'http://52.25.173.78/inventory/app/img/easy/item' + image + '.png'}  className="eachImage"   />
                            )
                        })}
                    </div>

                    <div className="row imageRow answerRow" id="row3"  >
                        {thirdRow.value.map(image => {
                            return (
                                <img key={thirdRow.value.indexOf(image)} src={'http://52.25.173.78/inventory/app/img/easy/item' + image + '.png'}  className="eachImage"   />
                            )
                        })}
                    </div>

                    <div className="row imageRow answerRow" id="row4" >
                        {forthRow.value.map(image => {
                            return (
                                <img key={forthRow.value.indexOf(image)} src={'http://52.25.173.78/inventory/app/img/easy/item' + image + '.png'}  className="eachImage"   />
                            )
                        })}
                    </div>
                </div>
            </div>
        )}
}
