import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import { CardHeader, CardContent, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ListIcon from '@material-ui/icons/ViewHeadline';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField'
import Collapse from '@material-ui/core/Collapse';
import Chip from '@material-ui/core/Chip';
import EditGrade from './EditGrade';

class GradeList extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            selectedGrade: {}
        }
    }

    onCurrentSubjectChange = (val, field, model) => {
        this.props.onFieldChange(val, field, this.props.current_grade);
        console.log('changinh sub now');
        this.props.onCurrentSubjectChange(val, this.props.current_subject);
    }

    render = () => {

        return (
            <Card style={{padding: "4%"}}>
                <CardHeader 
                    avatar={
                        <Avatar aria-label="Recipe" style={styles.avatar}>
                            <ListIcon />
                        </Avatar>
                    }      
                    title={`Grades ${this.props.classList ? "("+this.props.classList.length+")" : "" }`}>
                </CardHeader>
                <CardContent>
                    <div className="row">
                        <div className="col-md-5">
                        {this.props.classList && this.props.classList.length > 0
                        && this.props.classList.map((gradeItem, index) => {
                            let item = gradeItem.grade_meta;
                            return(
                                
                                        <div 
                                        // className={`${this.state.selectedGrade.id == gradeItem.id ? 'card bg-warning' : 'card'}`}
                                        className={`${this.props.current_grade && this.props.current_grade.id == gradeItem.id ? 'card bg-warning' : 'card'}`}
                                            onClick={() => this.props.onSelectGrade(gradeItem)}
                                            >
                                            <div className="card-body">
                                                <h5 className="card-title text-center">{item.name}</h5>
                                            </div>
                                        </div>
                            )
                        })}
                        </div>
                        <div className="col-md-7">
                            <EditGrade 
                                {...this.props.current_grade}
                                current_subject={this.props.current_subject}
                                onAddSubject={(model) => this.props.onAddSubject(model)}
                                // onFieldChange={ (val, field) => this.props.onFieldChange(val, field, this.props.current_grade) } 
                                onFieldChange={ (val, field) => this.onCurrentSubjectChange(val, field, this.props.current_grade) } 
                            />
                        </div>
                    </div>
                        
                {(!this.props.classList || this.props.classList.length === 0) &&
                <Typography variant="h6" align="center">
                    There are currently no Grades added
                </Typography>}
                </CardContent>
            </Card>
        )
    }
}

export default GradeList;

const styles = {
    avatar: {
        backgroundColor: '#555'
    },
    formControl: {
        width: '70%'
    },
    chip: {
        margin: 10
    }
}