/**
 *
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import '../css/app.css';

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import Immutable from 'immutable';
import { bindActionCreators } from 'redux';

import Contact from '../components/Contact';
import Price, { PriceFormat, PriceChange } from '../components/Price';
import RelativeTime from '../components/RelativeTime';
import Time from '../components/Time';
import Button from '../components/Button';
import ExpiryDate from '../components/ExpiryDate';
import { Row, Column } from '../components/Grids';
//import PDFViewer from '../components/PDFViewer';
import FileDownload from '../components/FileDownload';
import Dialog from '../components/Dialog';
import TextArea from '../components/TextArea';
import DescriptionList from '../components/DescriptionList';
import ResponsiveImage from '../components/ResponsiveImage';
import Overlay from '../components/Overlay';

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