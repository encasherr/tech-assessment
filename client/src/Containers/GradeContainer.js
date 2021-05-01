import React from 'react';
import { connect } from 'react-redux';
import AddGradeComponent from '../components/Grades/AddGrade';
import GradeList from '../components/Grades/GradeList';
import {    AddGrade, FetchGrades,
            CloseSnackbar, CurrentGradeFieldChange,
            SelectCurrentGrade, CurrentSubjectChange,
            UpdateGrade,
            OpenSnackbar } from '../actions/GradeActions';
import Grid from '@material-ui/core/Grid';
import SnackbarComponent from '../components/lib/SnackbarComponent';

class GradeContainer extends React.Component {

    componentDidMount = () => {
        this.reload();
    }

    reload = () => {
        this.props.FetchGrades()
            .then((firstGrade) => {
                console.log('firstGrade', firstGrade);
                this.props.SelectCurrentGrade(firstGrade);
            })
    }

    submitNewGrade = (model) => {
        this.props.AddGrade(model)
            .then(() => {
                this.reload();
            })
    }

    render = () => {
        console.log('GradeContainer',this.props);
        let { classList, current_grade, current_subject } = this.props;
        console.log('current_subject', current_subject);
        return(
            <div className="container mx-auto">
                <div className="row">
                <div className="col-md-7">
                    <AddGradeComponent 
                        onSubmit={ (model) => this.submitNewGrade(model) }
                        model={this.props.current_grade}
                        onAdd={() => this.reload()}
                        onFieldChange={ (val, field, model) => this.props.CurrentGradeFieldChange(val, field, model) } />
                </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-7">
                        <GradeList 
                            classList={classList} 
                            current_grade={current_grade}
                            current_subject={current_subject}
                            onSelectGrade={(model) => this.props.SelectCurrentGrade(model)}
                            onCurrentSubjectChange={ (val, model) => this.props.CurrentSubjectChange(val, model) }
                            onFieldChange={ (val, field, model) => this.props.CurrentGradeFieldChange(val, field, model) }
                            onAddSubject={(model) => {this.props.UpdateGrade(model, this.props.current_grade); this.reload() }}
                            />
                    </div>
                </div>
                <SnackbarComponent 
                    openSnack={this.props.snack_open} handleClose={() => this.props.CloseSnackbar()} 
                    snackMessage={"Data Saved Successfully!"} 
                    /> 
            </div>
        );
    }
}
const mapStateToProps = state => ({
    ...state.gradeReducer
});
const mapDispatchToProps = dispatch => ({
    AddGrade: (model) => dispatch(AddGrade(model)),
    FetchGrades: () => dispatch(FetchGrades()),
    CloseSnackbar: () => dispatch(CloseSnackbar()),
    OpenSnackbar: () => dispatch(OpenSnackbar()),
    CurrentGradeFieldChange: (val, field, model) => dispatch(CurrentGradeFieldChange(val, field, model)),
    SelectCurrentGrade: (model) => dispatch(SelectCurrentGrade(model)),
    CurrentSubjectChange: (val, model) => dispatch(CurrentSubjectChange(val, model)),
    UpdateGrade: (model, grade) => dispatch(UpdateGrade(model, grade))
});
export default connect(mapStateToProps, mapDispatchToProps)(GradeContainer);