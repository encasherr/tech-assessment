import React, { Component } from 'react';
import config from '../../config';

class TestLandingPage extends Component {

    openSimulator = (inviteid) => {
        let url = `${config.instance.getSiteUrl()}/simulatorShell/${inviteid}`;
        var strWindowFeatures = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
        // window.open(url, '_blank', strWindowFeatures);
        window.open(url, '_blank');
    }

    render = () => {
        let { inviteid } = this.props.match.params;
        
        if(inviteid) {
            return (
                <>
                    <p>
                        You are about to start test. 
                        It is recommended to take the exam from a silent place, please press Start to continue when ready.
                    </p>
                    <button style={styles.btn} onClick={() => this.openSimulator(inviteid)}>START</button>
                {/* <a href={`${config.instance.getSiteUrl()}/simulatorShell/${inviteid}`} target="_blank">
                        Start Exam
                </a> */}
                </>
            )
        }
        else {
                return (
                    <p>
                    Page you are trying to open could not be found. Please check with your recruiter.
                    </p>
                )
        }
    }
}
export default TestLandingPage;
const styles={
    btn: {
        background: '#aaf',
        color: '#fff',
        borderRadius: '10px',
        padding: '7px',
        border: '0px'
    }
}