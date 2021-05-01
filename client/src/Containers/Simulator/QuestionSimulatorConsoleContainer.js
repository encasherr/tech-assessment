import React from 'react';
import { Typography, Card, CardHeader, CardContent, FormControl,
         FormLabel, CardActions,
         Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AuthHelper from '../../AuthHelper';
import LoadingComponent from '../../components/lib/LoadingComponent';
import TickComponent from '../../components/lib/TickComponent';
import Question from '../../components/Simulator/Question';

class QuestionSimulatorConsoleContainer extends React.Component {
    constructor(props) {
        super(props);
        let userInfo = AuthHelper.GetUserInfo();
        console.log('userInfo', userInfo);
        this.state = {
            mcq: {},
            selectedAnswers : []
        };
    }

    render = () => {
        let { model, currentQuestion, classes } = this.props;
        let { selectedAnswers } = this.state;
        let qEntity = {};
        let questionNumberText = '';
        let currentQuestionIndex = 0;
        let totalQuestions = 0;
        let testDurtion = 90;
        if(model && currentQuestion) {
            qEntity = currentQuestion;
            if(model.response_meta && model.response_meta.mcqs) {
                currentQuestionIndex = (qEntity.questionOrderIndex+1);
                totalQuestions = model.response_meta.mcqs.length;
                questionNumberText = 'Q.' + currentQuestionIndex + ' of ' + totalQuestions;
                testDurtion = model.response_meta.duration;
                console.log('current-q: ', currentQuestion);
            }
        }
        if(!qEntity) {
            return (
                <LoadingComponent />
            )
        }
        else {
        return (
                <Card>
                    <CardHeader
                            action={
                                <div className="row">
                                    <div className="col-md-8">
                                        <TickComponent 
                                            onTimeElapse={() => this.props.submitAnswers() }
                                            minutes={testDurtion}/>
                                    </div>
                                    <div className="col-md-4">
                                    <Button color="secondary" size="large" variant="contained"
                                            onClick={() => this.props.submitAnswers() }>
                                        Submit
                                    </Button>
                                    </div>
                                </div>
                            }
                            title={qEntity.mcq.mcq_meta.question}
                            subheader={<span text="text-dark">{questionNumberText}</span>}>
                    </CardHeader>
                    <CardContent>
                        <Question
                            classes={classes}
                            model = {qEntity}
                            onResponseChange = {(choiceKey) => this.props.onResponseChange(choiceKey)}
                        />
                    </CardContent>
                    <CardActions>
                        {currentQuestionIndex !== 1 &&
                        <Button variant="contained" size="small"
                                onClick={() => this.props.goToPrevious()} >Previous</Button>
                        }
                        {currentQuestionIndex !== totalQuestions &&
                        <Button variant="contained" size="small" color="primary"
                                onClick={() => this.props.goToNext()}>Next</Button>
                        }
                    </CardActions>
                </Card>
            );
        }
    }
}
export default QuestionSimulatorConsoleContainer;