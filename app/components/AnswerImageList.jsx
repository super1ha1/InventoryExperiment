/**
 *
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import '../css/app.css';

import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';

import {
    getListing,
    sendEnquiry,
    resetEnquiryForm,
} from '../actions';

class AnswerImageList extends Component{
    constructor(props){
        super(props)
        this.state = {
            values: [1, 2, 3]
        }
    }

    render(){

        const {values}
        return (
            <div>

            </div>
        )
    }

}

const EachImage = ({itemId}) => {
    <img src={'http://52.25.173.78/inventory/app/img/easy/item' + ${itemId}  + '.png'}  className="eachImage" />
}