import React, { Component } from 'react';
import axios from 'axios';

export class RotateString extends Component {
    static displayName = RotateString.name;

    constructor(props) {
        super(props);
        this.state = {
            stringToRotate: "",
            timesToRotate: "",
            result: "",
            textToRotateError: "",
            timesToRotateError: ""
        };
    }

    fetchRotateStringResults = (data, timesToRotate) => {
        if (data === "") {
            this.setState({ textToRotateError: "No integers to compare" });
        }
        else {
            this.setState({ textToRotateError: "" });
        }
        if (timesToRotate === "") {
            this.setState({ timesToRotateError: "No comparison integer inputted" })
        }
        else {
            this.setState({ timesToRotateError: "" });
        }
        const url = `https://localhost:44333/api/rotateString/${data}/timesToRotate/${timesToRotate}`;
        axios
            .get(url)
            .then(response => {
                this.setState({ result: response.data });
            })
            .catch(error => {
                this.setState({ error: 'Failed to generate result, please try again' });
            })        
    }

    stringToRotateTextboxChange = (event) => {
        this.setState({ stringToRotate: event.target.value });
    }

    timesToRotateTextboxChange = (event) => {
        this.setState({ timesToRotate: event.target.value });
    }

    handleClick = (event) => {
        const eventValue = event.target.value;
        this.fetchRotateStringResults(this.state.stringToRotate, this.state.timesToRotate);
    };

    render() {        
        return (
            <div className="container">
                <div className="row">
                    <h1>String Rotation</h1>
                </div>
                <div className="row">
                    <p>Rotate string a specified number of times to the right.</p>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label htmlFor="txtArray"><strong>String To Rotate:</strong></label>
                    </div>
                    <div className="col-md-5">
                        <input id="txtArray" type="textbox" onChange={this.stringToRotateTextboxChange} className="input"></input>
                    </div>
                    <div className="col-md-5">
                        <p className="error">{this.state.textToRotateError}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label htmlFor="txtComparison"><strong>Times To Rotate:</strong></label>
                    </div>
                    <div className="col-md-5">
                        <input id="txtComparison" type="textbox" onChange={this.timesToRotateTextboxChange} className="input"></input>
                    </div>
                    <div className="col-md-5">
                        <p className="error">{this.state.timesToRotateError}</p>
                    </div>
                </div>
                <div className="row">
                    <button className="btn btn-primary" type="button" onClick={this.handleClick}>Run</button>
                </div>
                <div id="divResultRow" className="row">
                    <div className="col-md-2">
                        <label htmlFor="txtResult"><strong>Result:</strong></label>
                    </div>
                    <div className="col-md-5">
                        <input id="txtResult" type="textbox" value={this.state.result} className="input"></input>
                    </div>
                    <div className="col-md-5">
                    </div>
                </div>
            </div>
        );
    }
}