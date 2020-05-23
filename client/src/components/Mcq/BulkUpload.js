import React from 'react';
import CSVReader from 'react-csv-reader';
import { Typography, Button } from '@material-ui/core';
import repository from '../../repository';
import config from '../../config';

class BulkUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "",
            finalJson: {}
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
            this.setState({
                message: "Invalid Headers. Please check the file format and try again."
            });
            return;
        }
        if (!this.validCount(matrixArray)) {
            this.setState({
                message: `Invalid number of records. Min: ${config.minBulkCount}, Max: ${config.maxBulkCount}`
            });
            return;
        }
        matrixArray.map((itemArray, rowIndex) => {
            if (rowIndex === 0) {

            }
            else {
                let mcq = {};
                mcq.mcq_meta = {
                    choices: []
                };
                let correctAnswer = "";
                itemArray.map((colValue, colIndex) => {
                    let filteredHeaders = config.validHeaders.filter((item) => {
                        return item.name === headers[colIndex];
                    });

                    if(filteredHeaders && filteredHeaders.length > 0) {
                        let prop = filteredHeaders[0].prop;
                        if(prop.startsWith("choice")) {
                            if(colValue) {
                                mcq.mcq_meta.choices.push({
                                    content: colValue,
                                    isCorrect: correctAnswer 
                                });
                            }
                        }
                        else {
                            mcq.mcq_meta[prop] = colValue;
                        }
                    }
                });
                if(mcq.mcq_meta.question && mcq.mcq_meta.question !== '') {
                    finalJson.mcqs.push(mcq);
                }
            }
        });
        this.setState({
            finalJson: finalJson
        });
    }

    onUpload = () => {
        let { finalJson } = this.state;
        let url = config.instance.getAdminApiUrl() + 'bulkMcq';
        repository.saveData(url, finalJson)
            .then((res) => {
                this.setState({
                    message: "Successfully uploaded.",
                    finalJson: {}
                });
            })
            .catch((error) => {
                this.setState({
                    message: "Error in uploading file. Please try again."
                });
            })
    }

    validateHeaders = (headers) => {
        
        let isValid = true;
        headers.map((item, idx) => {
            let filteredHeaders = config.validHeaders.filter((vh) => {
                return vh.name === item;
            });
            if(filteredHeaders && filteredHeaders.length > 0) {
            } else {
                isValid = false;
            }
        });
        return isValid;
    }
    
    validCount = (matrix) => {
        let matrixLength = matrix.length;
        if(matrixLength < config.minBulkCount || matrixLength > config.maxBulkCount) {
            return false;
        }
        return true;
    }

    handleError = (error) => {
        console.log('error on upload', error);
    }

    render = () => {
        const { message, finalJson } = this.state;
        return (
            <div>
                <CSVReader
                    cssClass="csv-reader-input"
                    label="Select CSV with Multiple Choice Questions"
                    onFileLoaded={this.handleFileLoaded}
                    onError={this.handleError}
                    inputId="bulkmcq"
                    inputStyle={{color: 'red'}}
                />
                <br></br>
                <Typography color="primary" variant="subtitle1">{message}</Typography>
                {finalJson && finalJson.mcqs && finalJson.mcqs.length > 0 &&
                <Button color="primary" variant="contained" 
                        size="large"
                        onClick={this.onUpload}
                        >Upload</Button>
                }
                {message === "Successfully uploaded." && 
                    <Button color="primary" variant="contained" 
                    size="small"
                    onClick={() => this.props.history.goBack()}
                    >Go Back</Button>}
            </div>
        );
    }
}

export default BulkUpload;
