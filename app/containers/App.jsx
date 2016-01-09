import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';


class App extends Component {

  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-8 col-sm-offset-2">
                    <h1 className="text-center text-primary">Introduction</h1>
                    <p className="lead text-justify " style={{padding: '10px'}}>
                        In the game you will play as a warehouse manager to receive packages and to dispatch trucks concurrently.
                        You will earn points for receiving a package and dispatching a truck successfully.
                        Before we begin, please tell us a little bit about yourself.
                    </p>
                    <div className="span7 text-center">
                        <Link to="/user">
                            <button  className="btn btn-lg btn-success" >OK
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default connect()(App);
