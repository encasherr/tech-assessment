import React, { Component } from 'react';
import { Link } from '@material-ui/core';
import AuthHelper from '../../AuthHelper';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import repository from '../../repository';
import config from '../../config';

class OpEmailVerifiedSuccess extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progressText: 'Verifying',
            isError: false
        }
    }

    componentDidMount = () => {
        let { userIv, userContent } = this.props.match.params;
        console.log('this.props.match.params', this.props.match.params);
        let url = config.instance.getCandidateApiUrl() + `verifyUser?userIv=${userIv}&userContent=${userContent}`;
        repository.getData(url)
            .then((res) => {
                console.log('res from verify api', res);
                this.setState({
                    progressText: res.data
                })
            })
            .catch((err) => {
                console.log('err from verify api', err);
                this.setState({
                    progressText: err.data,
                    isError: true
                })
            })
    }

    render = () => {
        return (
            <div>
                {/* <div className="alert alert-success text-center">
                    Email Id is verifed successfully. You can use your credentials to log in now. 
                </div> */}
                <div className={`alert text-center ${this.state.isError ? 'alert-danger' : 'alert-success' }`}>
                    {this.state.progressText}
                </div>
                
                <div className="">
                    <div className="text-center">
                        <Link color="inherit" href="/login" onClick={() => AuthHelper.LogOut()} >
                            {`${this.state.isError ? 'SIGN UP' : 'LOG IN'}`}
                        </Link>
                    </div>
                </div>

            </div>
        )
    }
}
export default OpEmailVerifiedSuccess;