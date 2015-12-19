/**
 *
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';


class User extends Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <h1 className="text-center text-primary">Tell me about your self?   </h1>
                        <form className="form-horizontal" role="form">
                            <div className="form-group">

                                <label  className="col-sm-4 control-label">
                                    Have you played this game before
                                </label>
                                <div className="col-sm-6">

                                    <select name="cars">
                                        <option value="Yes">Yes</option>
                                        <option value="have not, but soon">No</option>

                                    </select>
                                </div>
                            </div>


                            <div className="form-group">

                                <label  className="col-sm-4 control-label text-left">
                                    What is your gender?
                                </label>
                                <div className="col-sm-6">

                                    <select name="cars">
                                        <option value="Yes">Male</option>
                                        <option value="have not, but soon">Female</option>

                                    </select>
                                </div>
                            </div>

                            <div className="form-group">

                                <label  className="col-sm-4 control-label">
                                    How old are you ?
                                </label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group">

                                <label  className="col-sm-4 control-label">
                                    Where are you from ?
                                </label>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" />
                                </div>
                            </div>

                            <div className="form-group">

                                <label  className="col-sm-4 control-label">
                                    What is the highest level of education you have received or are pursuing?
                                </label>
                                <div className="col-sm-6">

                                    <select name="cars">
                                        <option value="Yes">No schooling completed</option>
                                        <option value="poly">Nursery school to 8th grade</option>
                                        <option value="poly">Some high school, no diploma</option>
                                        <option value="poly">High school graduate, diploma or the equivalent (for example: GED)</option>
                                        <option value="poly">Some college credit, no degree</option>
                                        <option value="poly">Trade/technical/vocational training</option>
                                        <option value="poly">Associate degree</option>
                                        <option value="poly">Bachelor degree</option>
                                        <option value="poly">Professional degree</option>
                                        <option value="poly">Doctorate degree</option>

                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-sm-offset-4 col-sm-10">
                                    <Link to="/inventory">

                                    <button type="submit" ng-click="goToEasyOrHard()" className="btn btn-lg btn-success">
                                        Start
                                    </button>
                                    </Link>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        );
    }
}

export default User;
