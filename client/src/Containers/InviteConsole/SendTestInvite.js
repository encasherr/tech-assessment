import React from 'react';
import { FormControl,
         TextField, 
         Button,
         Typography,
         Divider} from '@material-ui/core';
// import { EditorState, convertToRaw, ContentState } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'draft-js/dist/Draft.css';


const SendTestInvite = (props) => {
    let { currentTest, inviteInfo } = props;
    
    return (
        // <Card>
        //     <CardContent>
        <div>
                <FormControl variant="outlined" style={styles.formControl}>
                    <TextField
                        id="outlined-name"
                        label="To"
                        value={inviteInfo.emailTo}
                        onChange={(e) => props.onFieldChange(e.target.value, 'emailTo')}
                        margin="normal"
                        variant="outlined"
                        helperText="e.g. john@hotmail.com (to invite multiple candidates, enter multiple email ids separated by ';')"
                    />
                </FormControl>
                <FormControl variant="outlined" style={styles.formControl}>
                    <TextField
                        id="outlined-name"
                        label="Subject"
                        value={inviteInfo.emailSubject}
                        onChange={(e) => props.onFieldChange(e.target.value, 'emailSubject')}
                        margin="normal"
                        variant="outlined"
                    />
                </FormControl>
                    <Typography align="center" variant="subtitle1">
                    You have been invited to attend the {currentTest.testName} challenge. We wish you all the best!
                    </Typography>

                    <div style={styles.margintop}>
                    <Typography variant="button" align="center">
                    Duration: {currentTest.duration} mins
                    <br></br><br></br>
                    <a href="#" style={styles.margintop}>
                    <Button variant="contained" align="center" size="large" color="secondary">
                                Start Challenge
                    </Button>
                    </a>
                    </Typography>
                    </div>
                    <Divider style={styles.margintop}/>
                    <Typography gutterBottom align="center" variant="subtitle2" style={styles.margintop}>
                        For any technical queries, please refer to <a href="#">FAQ</a> or email us at support@techassessment.com
                    </Typography>
        </div>
    );
}
export default SendTestInvite;
const styles ={
    container: {
        marginLeft: '15%'
    },
    formControl: {
        width: '70%',
        marginBottom: '1%',
        marginLeft: '15%'
    },
    margintop: {
        marginTop: '2%',
        // marginLeft: '30%'
    },
    duration: {
        marginTop: '4%',
    },
    editorControl: {
        height: '100%'
        // width: '70%',
        // padding: '1%',
        // borderRadius: '5px',
        // border: '1px solid #ccc'
    }
}