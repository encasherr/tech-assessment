import React from 'react';
import { connect } from 'react-redux';
import AddMcqComponent from '../components/Mcq/AddMcq';
import {    AddMcq, FetchMcqs, UpdateMcq, FetchCategories, FetchSkills, 
            CloseSnackbar, CurrentMcqFieldChange, CurrentAnswerFieldChange,
            OpenSnackbar, SelectMcq, AddAnswerChoice,
            BeginSearch, SearchMcq } from '../actions/McqActions';
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../components/lib/SnackbarComponent';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

class McqContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            questionEditorState: EditorState.createEmpty(),
            choiceEditorState: EditorState.createEmpty(),
        }
    }

    onQuestionEditorStateChange = (questionEditorState) => {
        this.setState({
            questionEditorState,
        });
        let data = draftToHtml(convertToRaw(questionEditorState.getCurrentContent()));
        this.props.CurrentMcqFieldChange(data, 'description', this.props.current_mcq);
    };

    onChoiceEditorChange = (choiceEditorState) => {
        this.setState({
            choiceEditorState,
        });
        let data = draftToHtml(convertToRaw(choiceEditorState.getCurrentContent()));
        this.props.CurrentAnswerFieldChange(data, 'content', this.props.currentAnswer);
    };

    componentDidMount = () => {
        this.reload();
    }

    componentWillUpdate = () => {
        if(this.props.success_message !== '') {
            this.props.FetchCategories();
        }
    }

    reload = () => {
        this.props.FetchCategories();
        this.props.FetchSkills();
    }

    onAddMcq = (model) => {
        let { state } = this.props.location;
        let editMode = false;
        if(state && state.mcq) {
            editMode = true;
            this.props.UpdateMcq(model)
                .then((res) => {
                    this.props.history.push('/mcqs');
                });
        }
        else {
            this.props.AddMcq(model)
                    .then((res) => {
                        this.props.history.push('/mcqs');
                    });
        }
    }

    render = () => {
        let { state } = this.props.location;
        let mcq = null;
        if(state && state.mcq) {
            mcq = state.mcq;
        }
        let { questionEditorState, choiceEditorState } = this.state;
        return(
            <Grid container spacing={16}>
                <Grid item xs={12} sm={12}>
                    <AddMcqComponent 
                        onSubmit={ (model) => this.onAddMcq(model) }
                        onAnswerAdd={ (model) => this.props.AddAnswerChoice(model, this.props.current_mcq) }
                        // model={this.props.current_mcq}
                        model={mcq ? mcq : this.props.current_mcq}
                        categories={this.props.categories}
                        skills={this.props.skills}
                        currentAnswer={this.props.currentAnswer}
                        editMode={mcq ? true : false}
                        onFieldChange={ (val, field, model) => this.props.CurrentMcqFieldChange(val, field, model) } 
                        onAnswerFieldChange={ (val, field, model) => this.props.CurrentAnswerFieldChange(val, field, model) } 
                        history={this.props.history}
                        questionEditorState={questionEditorState}
                        onQuestionEditorStateChange={this.onQuestionEditorStateChange}
                        choiceEditorState={choiceEditorState}
                        onChoiceEditorChange={this.onChoiceEditorChange}
                        />
                </Grid>
            </Grid>
        );
    }
}
const mapStateToProps = state => ({
    ...state.mcqReducer
});
const mapDispatchToProps = dispatch => ({
    AddMcq: (model, editMode) => dispatch(AddMcq(model, editMode)),
    AddAnswerChoice: (model, mcqModel) => dispatch(AddAnswerChoice(model, mcqModel)),
    UpdateMcq: (model) => dispatch(UpdateMcq(model)),
    SelectMcq: (model) => dispatch(SelectMcq(model)),
    FetchCategories: () => dispatch(FetchCategories()),
    FetchSkills: () => dispatch(FetchSkills()),
    FetchMcqs: () => dispatch(FetchMcqs()),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    BeginSearch: () => dispatch(BeginSearch()),
    SearchMcq: (searchTerm, mcqList) => dispatch(SearchMcq(searchTerm, mcqList)),
    CurrentMcqFieldChange: (val, field, model) => dispatch(CurrentMcqFieldChange(val, field, model)),
    CurrentAnswerFieldChange: (val, field, model) => dispatch(CurrentAnswerFieldChange(val, field, model))
});
export default connect(mapStateToProps, mapDispatchToProps)(McqContainer);