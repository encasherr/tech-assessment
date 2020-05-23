import React from 'react';
import { Typography, Card, CardHeader, CardContent, FormControl,
         FormLabel, CardActions,
         Button } from '@material-ui/core';
import AuthHelper from '../../AuthHelper';
import LoadingComponent from '../../components/lib/LoadingComponent';
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
        let { model, currentQuestion } = this.props;
        let { selectedAnswers } = this.state;
        let qEntity = {};
        let questionNumberText = '';
        let currentQuestionIndex = 0;
        let totalQuestions = 0;
        if(model && currentQuestion) {
            qEntity = currentQuestion;
            if(model.response_meta && model.response_meta.mcqs) {
                currentQuestionIndex = (qEntity.questionOrderIndex+1);
                totalQuestions = model.response_meta.mcqs.length;
                questionNumberText = 'Q.' + currentQuestionIndex + ' of ' + totalQuestions;
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
                                <Button color="secondary" size="large" variant="contained"
                                        onClick={() => this.props.submitAnswers() }>
                                    Submit
                                </Button>
                            }
                            title={qEntity.mcq.mcq_meta.question}
                            subheader={questionNumberText}>
                    </CardHeader>
                    <CardContent>
                        <Question
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