import React from 'react';
import { connect } from 'react-redux';
import OpProfile from './OpProfile';
import ChangePassword from './ChangePassword';

class OpProfileContainer extends React.Component {
    
    componentDidMount = () => {
    }
    
    render = () => {
        let props = this.props;
        return(
            <div className="container">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a  class="nav-item nav-link active" id="nav-upcoming-tab" 
                        data-toggle="tab" href="#nav-upcoming" role="tab" aria-controls="nav-upcoming" aria-selected="true">
                           Profile
                    </a>
                    <a  class="nav-item nav-link" id="nav-home-tab" 
                        data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                           Change Password
                    </a>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-upcoming" role="tabpanel" 
                     aria-labelledby="nav-upcoming-tab">
                    <OpProfile {...props} />
                </div>
                <div class="tab-pane fade show" id="nav-home" role="tabpanel" 
                     aria-labelledby="nav-home-tab">
                    <ChangePassword {...props} />
                </div>
            </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({
});
export default connect(mapStateToProps, mapDispatchToProps)(OpProfileContainer);