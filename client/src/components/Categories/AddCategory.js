import React from 'react';
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Loading from '../lib/LoadingComponent';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';


const AddCategoryComponent = (props) => {
    let { model } = props;
    let display = (props && props.editMode) ? 'block' : 'none';
    return (
        <Card style={{padding: "4%"}}>
        {!model && <Loading />} 
        {model &&    
            <form  noValidate autoComplete="off">
                <CardHeader 
                avatar={
                    <Avatar aria-label="Recipe" style={styles.avatar}>
                        {!props.editMode && <AddIcon />}
                        {props.editMode && <EditIcon />}
                    </Avatar>
                    }
                    action={
                        <Button style={{display: display}} onClick={() => props.onAdd()}>Add New</Button>
                    }
                    title={props.editMode ? 
                            "Edit Category" :
                            "Add Category"} 
                            >
                </CardHeader>
                <CardContent>
                    <FormControl variant="outlined" style={styles.formControl}>
                        <TextField
                            id="outlined-name"
                            label="Title"
                            value={model.title}
                            onChange={(e) => props.onFieldChange(e.target.value, 'title', props.model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <br></br>
                    <FormControl variant="outlined" style={styles.formControl}>
                        <TextField
                            id="outlined-name"
                            label="Description"
                            multiline
                            rows="4"
                            value={model.description}
                            onChange={(e) => props.onFieldChange(e.target.value, 'description', props.model)}
                            margin="normal"
                            variant="outlined"
                        />
                    </FormControl>
                    <br></br>
                    <br></br>
                </CardContent>
                <CardActions style={styles.actionButton}>
                    <Button variant="contained" size="large" color="primary" 
                                onClick={ () => props.onSubmit(props.model) }>
                        {props.editMode ? 'Update' : 'Submit'}
                    </Button>
                </CardActions>
            </form>}
        </Card>
    );
}
export default AddCategoryComponent;
const styles={
    formControl: {
        width: '90%'
    },
    actionButton: {
        marginLeft: '70%'
    },
    avatar: {
        backgroundColor: '#555'
    }
}
/*
class AddCategoryComponent extends Component {
    // model = {}; 
    constructor(props) {
        super(props);
        // this.state = {
        //     model: {
        //         title: '',
        //         description: ''
        //     }
        // }
    }

    handleChange = (event, ctl) => {
        this.props.onFieldChange(event.target.value, ctl, this.props.model);
        console.log('sending model to parent');
        console.log(this.props.model);
        // switch(ctl)
        // {
        //     case 'title':
        //     {
        //         this.model.title = event.target.value;
        //         break;
        //     }
        //     case 'description':
        //     {
        //         this.model.description = event.target.value;
        //         break;
        //     }
        // }
        // this.setState({
        //     model: this.model
        // });
    }

    onSubmit = () => {
        console.log('model to save');
        console.log(this.props.model);

        // this.props.onSubmit(this.state.model);
        this.props.onSubmit(this.props.model);
    }

    

    render = () => {
        let { model } = this.props;
        return (
            <Card style={{padding: "4%"}}>
            {!model && <Loading />} 
            {model &&    
                <form  noValidate autoComplete="off">
                    <CardHeader avatar={
                        <Avatar aria-label="Recipe">
                        +
                        </Avatar>
                        }
                        title="Add Category">
                    </CardHeader>
                    <CardContent>
                        <FormControl variant="outlined" style={{width:"70%"}}>
                            <TextField
                                id="outlined-name"
                                label="Title"
                                className={styles.dense}
                                value={model.title}
                                onChange={(e) => this.handleChange(e, 'title')}
                                margin="normal"
                                variant="outlined"
                            />
                        </FormControl>
                        <br></br>
                        <FormControl variant="outlined" style={{width:"70%"}}>
                            <TextField
                                id="outlined-name"
                                label="Description"
                                multiline
                                rows="4"
                                value={model.description}
                                className={styles.dense}
                                onChange={(e) => this.handleChange(e, 'description')}
                                margin="normal"
                                variant="outlined"
                            />
                        </FormControl>
                        <br></br>
                        <br></br>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" size="large" color="primary" 
                                    onClick={ () => this.onSubmit() }>
                            Submit
                        </Button>
                    </CardActions>
                </form>}
            </Card>
        );
    }
}
// const mapStateToProps = state => ({
//     ...state
// });
// const mapDispatchToProps = dispatch => ({
//     AddCategory: (model) => dispatch(AddCategory(model))
// });
// export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryComponent);
export default AddCategoryComponent;

const styles = theme => ({
    container: {
    //   display: 'flex',
    //   flexWrap: 'wrap',
    //   flex: 2
    padding: "20%"
    },
    textField: {
    //   marginLeft: theme.spacing.unit,
    //   marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: "16px",
      marginLeft: "30px"
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      formControl: {
        width: 320,
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
      },
});
*/