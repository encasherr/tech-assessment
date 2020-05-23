import React from 'react';
import { Typography } from '@material-ui/core';

class TickComponent extends React.Component {
    interval = 0;

    constructor(props) {
        super(props);
        this.state = {
            currentTick: {
                minutes: 90,
                seconds: 59
            }
        }
    }

    componentDidMount = () => {
        this.interval = setInterval(
            () => {
                let { minutes, seconds } = this.state.currentTick;
                console.log('minutes', minutes);
                this.setState({
                    currentTick: {
                        minutes: parseInt(minutes) - 1
                    }
                })
            },
            60000
        );
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    }

    render = () => {
        let { currentTick } = this.state;
        return (
            <Typography variant="subtitle1" style={{color: '#fff'}}>
                Time Remaining: {currentTick.minutes} minutes
            </Typography>
        );
    }
}
export default TickComponent;