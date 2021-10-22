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
import { EscapeSpecialCharacters } from '../../common/HelperFunctions';

class CandidateResponseReport extends Component {

    componentDidMount = () => {
        console.log('this.props.candidateId', this.props.candidateId);
        console.log('this.props.responseId', this.props.responseId);
        this.props.fetchCandidateResponseReport(this.props.responseId, this.props.candidateId);
    }

    // formatScore = (score) => {
    //     if(score && !isNaN(score)) return score.toFixed(2);
    //     return 'NA';
    // }

    render = () => {
        let { candidateResponses } = this.props;
        let { response_meta, invitation_meta, evaluation_meta,
              mcqCorrectAnswers } = candidateResponses || {}; 
        let { mcqs } = response_meta || {}; 

        let summary = {
            totalQuestions:  mcqs ? mcqs.length : 0,
            correctAnswersCount: 0,
            totalScore: 'NA', 
            candidateScore: 'NA', 
            result: 'NA', 
            completedOn: 'NA'
        };
        let responsesToRender = [];
        if(mcqs && mcqs.length > 0){
            mcqs.map((mcqItem, index) => {
                let mcq = mcqItem.mcq.mcq_meta;
                let candidateResponse = mcqItem.candidateResponse ? mcqItem.candidateResponse.responseKeys.sort().join("") : '';
                let matchingMcqItem = mcqCorrectAnswers.filter((item) => {
                    return item.mcqId === mcqItem.mcq.id;
                })
                let correctAnswer = '';
                if(matchingMcqItem && matchingMcqItem.length > 0) {
                    correctAnswer = matchingMcqItem[0].correctAnswer;
                }
                if(!correctAnswer) { // for unregistered candidates
                    mcq.choices.forEach((choiceItem) => {
                        if(choiceItem.isCorrect === true) {
                            correctAnswer += choiceItem.key;
                        }
                    })
                }
                if(candidateResponse === correctAnswer) {
                    summary.correctAnswersCount++;
                }
                responsesToRender.push({
                    mcq,
                    candidateResponse,
                    correctAnswer,
                    isCorrect: candidateResponse === correctAnswer,
                })
            });
        }
        if(response_meta && response_meta.scorePercentage) {
            summary.candidateScore = formatToDecimals(response_meta.scorePercentage, 2);
            summary.totalScore = response_meta.totalScore;
            summary.result = response_meta.result;
        }
        else if(evaluation_meta && evaluation_meta.scorePercentage) {
            summary.candidateScore = formatToDecimals(evaluation_meta.scorePercentage, 2);
            summary.totalScore = evaluation_meta.totalScore;
            summary.result = evaluation_meta.result;
        }
        if(invitation_meta && invitation_meta.completedOn) {
            summary.completedOn = getDateTime(invitation_meta.completedOn);
        }
        else if(evaluation_meta && evaluation_meta.completedOn) {
            summary.completedOn = getDateTime(evaluation_meta.completedOn);
        }

        return (
            <div>
                {!mcqs && <LoadingComponent />}
                {mcqs && mcqs.length === 0 && <Typography align="center" variant="subtitle1">No Responses Found </Typography>}
                {mcqs && mcqs.length > 0 &&
                <>
                {this.renderSummary(summary)}
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
                        {responsesToRender.map((responseItem, index) => {
                            // let mcq = mcqItem.mcq.mcq_meta;
                            // let candidateResponse = mcqItem.candidateResponse ? mcqItem.candidateResponse.responseKeys.sort().join("") : '';
                            // let matchingMcqItem = mcqCorrectAnswers.filter((item) => {
                            //     return item.mcqId === mcqItem.mcq.id;
                            // })
                            // let correctAnswer = '';
                            // if(matchingMcqItem && matchingMcqItem.length > 0) {
                            //     correctAnswer = matchingMcqItem[0].correctAnswer;
                            // }
                            // if(!correctAnswer) {
                            //     mcq.choices.forEach((choiceItem) => {
                            //         if(choiceItem.isCorrect === true) {
                            //             correctAnswer += choiceItem.key;
                            //         }
                            //     })
                            // }
                            // if(candidateResponse === correctAnswer) {
                            //     correctAnswersCount++;
                            // }
                            // console.log('mcq_meta', mcq);
                        return (
                            <TableRow key={index}
                                className={responseItem.isCorrect ? 'bg-warning' : 'bg-danger text-white'}    
                            >
                                <CustomTableCell align="center">{responseItem.mcq.questionOrderIndex+1}</CustomTableCell>
                                <CustomTableCell align="left">{responseItem.mcq.question}
                                </CustomTableCell>
                                <CustomTableCell align="left"
                                    dangerouslySetInnerHTML={{
                                        __html: EscapeSpecialCharacters(responseItem.mcq.description)
                                    }}>
                                </CustomTableCell>
                                {/* <CustomTableCell align="left">{mcq.description}</CustomTableCell> */}
                                <CustomTableCell align="center">{responseItem.correctAnswer}</CustomTableCell>
                                <CustomTableCell align="center">{responseItem.candidateResponse}</CustomTableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
                </>
                }
            </div>
        )
    }

    renderSummary = (summary) => {
        return (
            <>
                <div className="card bg-secondary text-light">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-10">
                                        Correct Response: {summary.correctAnswersCount} / {summary.totalQuestions}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-10">
                                    Score: {summary.candidateScore} %
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-md-10">
                                    Result: {summary.result}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row mt-4">
                            <div className="col-md-12">
                            Completed On: {summary.completedOn}
                            </div>
                        </div>
                    </div>
                </div>
            </>
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