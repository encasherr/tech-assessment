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

        let resultCss = classNames(classes.paletteReportBox, classes.palettePrimaryDark);
        if(result === 'CLEARED') {
            resultCss = classNames(classes.paletteReportBox, classes.bgSuccessMain);
        }

        return (
            <div>
                {!mcqs && <LoadingComponent />}
                {mcqs && mcqs.length === 0 && <Typography align="center" variant="subtitle1">No Responses Found </Typography>}
                {mcqs && mcqs.length > 0 &&
                <div>
                    <div className="row">
                        <div className="col-md-3">
                        <div className={classNames(classes.paletteReportBox, classes.palettePrimaryDark)}>
                            <div className={classNames("row")}>
                                <div className="col-md-6">
                                    Total Questions
                                </div>
                                <div className={classNames("col-md-6", classes.infoText)}>
                                    {totalQuestions}
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-md-3">
                        <div className={classNames(classes.paletteReportBox, classes.palettePrimaryDark)}>
                            <div className={classNames("row")}>
                                <div className="col-md-4">
                                Score
                                </div>
                                <div className={classNames("col-md-6", classes.infoText)}>
                                    {candidateScore} %
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                        <div className={classNames(classes.paletteReportBox, classes.palettePrimaryDark)}>
                            <div className={classNames("row")}>
                                <div className="col-md-6">
                                Completed On
                                </div>
                                <div className={classNames("col-md-6", classes.infoText)}>
                                    {completedOn}
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                        <div className={resultCss}>
                            <div className={classNames("row")}>
                                <div className="col-md-4">
                                Result
                                </div>
                                <div className={classNames("col-md-6", classes.infoText)}>
                                    {result}
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                {/* <Grid container spacing={32} className={classNames(classes.paletteBorderBottomPrimaryMain, classes.paddingBottom)}>
                    <Grid item xs={3} sm={3}>
                        <Card className={classes.paletteBorderLeftSuccessMain}>
                            <CardContent>
                                <Grid container spacing={32}>
                                    <Grid item xs={6} sm={6}>
                                        <div>
                                            <Typography variant="h6">Total Questions</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={6} className={classes.verticalCenter}>
                                        <Typography className="info_text">{totalQuestions}</Typography> 
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <Card className={classes.paletteBorderLeftSuccessMain}>
                            <CardContent>
                                <Grid container spacing={32}>
                                    <Grid item xs={4} sm={4}>
                                        <div>
                                            <Typography variant="h6">Score</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={8} sm={8} className={classes.verticalCenter}>
                                        <Typography variant="h4">{candidateScore}</Typography> 
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4} sm={4}>
                        <Card className={classes.paletteBorderLeftSuccessMain}>
                            <CardContent>
                                <Grid container spacing={32}>
                                    <Grid item xs={5} sm={5}>
                                        <div>
                                            <Typography variant="h6">Completed On</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={7} sm={7} className={classes.verticalCenter}>
                                        <Typography variant="h4">{completedOn}</Typography> 
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3} sm={3}>
                        <Card className={classes.paletteBorderLeftSuccessMain}>
                            <CardContent>
                                <Grid container spacing={32}>
                                    <Grid item xs={6} sm={6}>
                                        <div>
                                            <Typography variant="h6">Result</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={6} sm={6} className={classes.verticalCenter}>
                                        <Typography variant="h4">{result}</Typography> 
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid> */}
                <Table>
                    <TableHead>
                        <TableRow>
                            <CustomTableCell align="left">Category</CustomTableCell>
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
                            let candidateResponse = mcqItem.candidateResponse ? mcqItem.candidateResponse.responseKeys.join() : '';
                            // let mcq_meta = { mcq };
                            console.log('mcq_meta', mcq);
                        return (
                            <TableRow key={index}>
                                <CustomTableCell align="left">{mcq.category}</CustomTableCell>
                                <CustomTableCell align="left">{mcq.question}</CustomTableCell>
                                <CustomTableCell align="left">{mcq.description}</CustomTableCell>
                                <CustomTableCell align="center">{mcq.correctAnswer}</CustomTableCell>
                                <CustomTableCell align="center">{candidateResponse}</CustomTableCell>
                                {/* <CustomTableCell align="center" scope="row" component="th">
                                <Link to={ {pathname: "/inviteConsole", state: { testId: invitation.testId } }}>
                                    <PersonAdd />
                                </Link>
                            </CustomTableCell> */}
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>
                </div>
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