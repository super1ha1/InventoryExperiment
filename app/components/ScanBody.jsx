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
        const { correctImage, wrongImage, score, onImageClick, show} = this.props
        return ( <div className="col-sm-6 " style={{paddingTop: '20px'}}>
            <div className="row">
                <div className="col-sm-6">
                    <h4>Total Score:  {score}</h4>
                </div>
            </div>
            <ScanDisplay correctImage={correctImage} wrongImage={wrongImage} onImageClick={onImageClick} show={show} />
        </div>)
    }
}

class ScanDisplay extends Component {

    render (){
        const {correctImage, wrongImage, onImageClick, show} = this.props
        return (
            <div className="row" style={{paddingTop: '20px'}}>
                <div className="col-sm-12 ">
                    <div className="row" style={{backgroundColor: '#0a000a' }}>
                        <MovingImage  correctImage={ correctImage } show={show} />
                        <AnswerImage wrongImage = {wrongImage} onImageClick={onImageClick} show={show} />
                    </div>
                </div>
            </div>
        )
    }
}

const MovingImage = ({correctImage, show}) => (
    <div className="col-sm-6" style={{  height: '500px' , padding: '10px 10px 10px 20px' }}>
        <div className="row imageRow" id="movingRow" style={{position: 'relative' }}>
            <div  className="row imageRow" style={{  visibility: show ? 'visible' : 'hidden'}}>
                {correctImage.map( (image, i) => {
                    return (
                        <img key={i} src={'http://52.25.173.78/inventory/app/img/easy/item' + image + '.png'}  className="eachImage"   />
                    )
                }) }
            </div>
        </div>
    </div>
)

class AnswerImage  extends Component {

    render() {
        const {wrongImage, show} = this.props
        const firstRow = wrongImage[0]
        const secondRow = wrongImage[1]
        const thirdRow = wrongImage[2]
        const forthRow = wrongImage[3]

        return (

            <div className="col-sm-6" style={{ height: '500px', padding: '10px 10px'}} >
                <div style={{backgroundColor: '#ffffff', height: '100%',  padding: '10px 10px' }}>
                    <div style={{  visibility: show ? 'visible' : 'hidden'}}>
                        <div className="row imageRow answerRow" id="row1">
                            {firstRow.value.map( (image, i) => {
                                return (
                                    <img key={i} src={'http://52.25.173.78/inventory/app/img/easy/item' + image + '.png'}
                                         className="eachImage" onClick={ this.props.onImageClick.bind(this, 0)}  />
                                )
                            })}
                        </div>

                        <div className="row imageRow answerRow"  id="row2">
                            {secondRow.value.map( (image, i) => {
                                return (
                                    <img key={i} src={'http://52.25.173.78/inventory/app/img/easy/item' + image + '.png'}
                                         className="eachImage" onClick={ this.props.onImageClick.bind(this, 1)}  />
                                )
                            })}
                        </div>

                        <div className="row imageRow answerRow" id="row3"  >
                            {thirdRow.value.map((image, i) => {
                                return (
                                    <img key={i} src={'http://52.25.173.78/inventory/app/img/easy/item' + image + '.png'}
                                         className="eachImage"onClick={ this.props.onImageClick.bind(this, 2)}  />
                                )
                            })}
                        </div>

                        <div className="row imageRow answerRow" id="row4" >
                            {forthRow.value.map( (image, i) => {
                                return (
                                    <img key={i} src={'http://52.25.173.78/inventory/app/img/easy/item' + image + '.png'}
                                         className="eachImage"  onClick={ this.props.onImageClick.bind(this, 3)}  />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )}
}

