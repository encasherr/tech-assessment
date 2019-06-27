import React, { Component } from 'react';
import CSVReader from 'react-csv-reader';

class BulkUpload extends React.Component {

    handleFileLoaded = (content, fileName) => {
        console.log('fileName', fileName);
        console.log('content', content);
        let matrixArray = content;
        let finalJson = {
            mcqs: []
        };
        let headers = [];
        matrixArray.map((itemArray, rowIndex) => {
            if(rowIndex === 0) {
                itemArray.map((item, columnIndex) => {
                    headers.push(item);
                });
            }
            else {
                let mcq = {};
                
            }
        });
    }

    handleError = (error) => {
        console.log('error on upload', error);
    }

    render = () => {
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
            </div>
        );
    }
}

export default BulkUpload;