import React, { Component } from 'react';
import axios from 'axios';

export class ArrayCompare extends Component {
    static displayName = ArrayCompare.name;

    constructor(props) {
        super(props);
        this.state = {
            comparisonValue: "",
            result: "",
            items: [],
            value: "",
            error: "",
            textArrayError: "",
            textComparisonError: ""
        };
    }

    fetchResutsFromArrayCompare = (dataArray, comparisonValue) => {
        let data = dataArray.toString();
        if (data === "") {
            this.setState({ textArrayError: "No integers to compare" });
        }
        else {
            this.setState({ textArrayError: "" });
        }
        if (comparisonValue === "") {
            this.setState({ textComparisonError: "No comparison integer inputted" })
        }
        else {
            this.setState({ textComparisonError: "" });
        }
        const url = `https://codingexercises.herokuapp.com/api/getAboveAndBelow/${data}/comparisonValue/${comparisonValue}`;
        axios
            .get(url)
            .then(response => {
                this.setState({ result: response.data });
            })
            .catch(error => {
                this.setState({ error: 'Failed to generate result, please try again' });
            })
    }

    comparisonValueTextboxChange = (event) => {
        this.setState({ comparisonValue: event.target.value });
    }

    handleKeyDown = (event) => {
        if (["Enter", "Tab", ","].includes(event.key)) {
            event.preventDefault();

            var value = this.state.value.trim();

            if (value && this.isValid(value)) {
                this.setState({
                    items: [...this.state.items, this.state.value],
                    value: ""
                });
            }
        }
    };

    numberArrayTextboxChange = (event) => {
        this.setState({
            value: event.target.value,
            error: null
        });
    };

    handleDelete = (index) => {
        let temp = this.state.items;
        temp.splice(index, 1);
        this.setState({
            items: temp
        });
    };

    isValid(number) {
        const regex = /^[0-9\b]+$/;
        return regex.test(number);
    }

    handleClick = (event) => {
        this.fetchResutsFromArrayCompare(this.state.items, this.state.comparisonValue);
    };

    render() {
        return (

            <div className="container">
                <div className="row">
                    <h1>Array Search</h1>
                </div>
                <div className="row">
                    <p>Provide the count of numbers in an int[] that are above and below a specified int.</p>
                </div>
                <div className="row">
                    {this.state.items.map((item, index) => (
                        <div className="tag-item" key={index}>
                            {item}
                            <button type="button" className="button" onClick={() => this.handleDelete(index)}>
                                &times;
                        </button>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label htmlFor="txtArray"><strong>Numbers:</strong></label>
                    </div>
                    <div className="col-md-5">
                        <input id="txtArray" type="textbox" onChange={this.numberArrayTextboxChange} onKeyDown={this.handleKeyDown} value={this.state.value} placeholder="Type numbers and press `Enter`..." className="input"></input>
                    </div>
                    <div className="col-md-5">
                        <p className="error">{this.state.textArrayError}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <label htmlFor="txtComparison"><strong>Comparison Int:</strong></label>
                    </div>
                    <div className="col-md-5">
                        <input id="txtComparison" type="textbox" onChange={this.comparisonValueTextboxChange} className="input"></input>                        
                    </div>
                    <div className="col-md-5">
                        <p className="error">{this.state.textComparisonError}</p>
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