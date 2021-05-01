import React, { Component, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LoadingComponent from '../../components/lib/LoadingComponent';
import { Typography, Grid, Card, CardContent, Avatar } from '@material-ui/core';
import { Assessment } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { getDateTime, formatToDecimals } from '../../Utils';

import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class CandidateResponseReport extends Component {

    componentDidMount = () => {
        this.props.fetchCandidateResponseReport(this.props.responseId);
    }

    // formatScore = (score) => {
    //     if(score && !isNaN(score)) return score.toFixed(2);
    //     return 'NA';
    // }

    render = () => {
        let { candidateResponses, classes } = this.props;
        console.log('candidateResponses', candidateResponses);
        let { response_meta, invitation_meta } = candidateResponses || {}; 
        let { mcqs } = response_meta || {}; 
        console.log('mcq count', mcqs ? mcqs.length : 0);

        let totalQuestions = mcqs ? mcqs.length : 0;
        let candidateScore = response_meta ? formatToDecimals(response_meta.scorePercentage, 2) : 'NA';
        let completedOn = invitation_meta ? getDateTime(invitation_meta.completedOn, true) : 'NA';
        let result = response_meta ? response_meta.result : 'NA';

        // let resultCss = classNames(classes.paletteReportBox, classes.palettePrimaryDark);
        // if(result === 'CLEARED') {
        //     resultCss = classNames(classes.paletteReportBox, classes.bgSuccessMain);
        // }

        return (
            <div>
                {!mcqs && <LoadingComponent />}
                {mcqs && mcqs.length === 0 && <Typography align="center" variant="subtitle1">No Responses Found </Typography>}
                {mcqs && mcqs.length > 0 &&
                <>
                <div className="card bg-secondary text-light">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-10">
                                        Total Questions: {totalQuestions} ({response_meta.totalScore})
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-10">
                                    Correct: {candidateScore} %
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-10">
                                    Result: {result}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row mt-4">
                            <div className="col-md-12">
                            Completed On: {completedOn}
                            </div>
                        </div>
                    </div>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="left">Number</CustomTableCell>
                            <CustomTableCell align="left">Topic</CustomTableCell>
                            <CustomTableCell align="left">Question</CustomTableCell>
                            <CustomTableCell align="left">Correct</CustomTableCell>
                            <CustomTableCell align="left">Response</CustomTableCell>
                            {/* <CustomTableCell align="left">Send Reminder</CustomTableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {mcqs.map((mcqItem, index) => {
                            let mcq = mcqItem.mcq.mcq_meta;
                            let candidateResponse = mcqItem.candidateResponse ? mcqItem.candidateResponse.responseKeys.sort().join("") : '';
                            let correctAnswer = '';
                            mcq.choices.forEach((choiceItem) => {
                                if(choiceItem.isCorrect === true) {
                                    correctAnswer += choiceItem.key;
                                }
                            })
                            console.log('mcq_meta', mcq);
                        return (
                            <TableRow key={index}
                                className={candidateResponse===correctAnswer ? 'bg-warning' : 'bg-danger text-white'}    
                            >
                                <CustomTableCell align="center">{mcqItem.questionOrderIndex+1}</CustomTableCell>
                                <CustomTableCell align="left">{mcq.question}
                                </CustomTableCell>
                                <CustomTableCell align="left"
                                    dangerouslySetInnerHTML={{
                                        __html: mcq.description
                                    }}>
                                </CustomTableCell>
                                {/* <CustomTableCell align="left">{mcq.description}</CustomTableCell> */}
                                <CustomTableCell align="center">{correctAnswer}</CustomTableCell>
                                <CustomTableCell align="center">{candidateResponse}</CustomTableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
                </>
                }
            </div>
        )
    }
}
const CustomTableCell = withStyles(theme => ({
    head: {
        color: theme.palette.common.black,
        fontSize: 16,
        fontWeight: 600
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
export default CandidateResponseReport;