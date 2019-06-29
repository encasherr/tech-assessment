import React, { Component } from 'react';
import CSVReader from 'react-csv-reader';
import { Typography } from '@material-ui/core';

class BulkUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }

    handleFileLoaded = (content, fileName) => {
        console.log('fileName', fileName);
        console.log('content', content);
        let matrixArray = content;
        let finalJson = {
            mcqs: []
        };
        let headers = [];
        let firstRow = matrixArray[0];
        firstRow.map((item, columnIndex) => {
            headers.push(item);
        });
        if (!this.validateHeaders(headers)) {
            console.log("invalid headers");
            this.setState({
                message: "Invalid Headers. Please check the file format and try again"
            });
            return;
        }
        matrixArray.map((itemArray, rowIndex) => {
            if (rowIndex === 0) {

            }
            else {
                let mcq = {};
                itemArray.map((colValue, colIndex) => {
                    mcq[headers[colIndex]] = colValue;
                });
                finalJson.mcqs.push(mcq);
            }
        });
    }

    validateHeaders = (headers) => {
        const validHeaders = [
            "Category", "Skill", "Title", "Description", "Score", "Min", "Max", "Answer", "A", "B", "C", "D", "E"
        ];
        let isValid = true;
        headers.map((item, idx) => {
            if (!validHeaders.includes(item)) {
                isValid = false;
            }
        });
        return isValid;
    }

    handleError = (error) => {
        console.log('error on upload', error);
    }

    render = () => {
        const { message } = this.state;
        return (
            <div>
                Bulk Upload
                <CSVReader
                    cssClass="csv-reader-input"
                    label="Select CSV with Multiple Choice Questions"
                    onFileLoaded={this.handleFileLoaded}
                    onError={this.handleError}
                    inputId="bulkmcq"
                    inputStyle={{color: 'red'}}
                />
                <br></br>
                <Typography variant="subtitle1">{message}</Typography>
            </div>
        );
    }
}

export default BulkUpload;
