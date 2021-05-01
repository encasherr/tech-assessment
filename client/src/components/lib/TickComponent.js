import React from 'react';
import { Typography } from '@material-ui/core';
import { getTwoDigitTime } from '../../Utils';

class TickComponent extends React.Component {
    secondsInterval = 0;
    minutesInterval = 0;

    constructor(props) {
        super(props);
        this.state = {
            submitAndCompleteTest: props.onTimeElapse,
            currentTick: {
                minutes: (props && props.minutes) ? getTwoDigitTime(props.minutes-1) : 89,
                seconds: 59
            }
        }
    }

    componentDidMount = () => {
        this.secondsInterval = setInterval(
            () => {
                let { seconds } = this.state.currentTick;
                //console.log('seconds', seconds);
                this.setState({
                    currentTick: {
                        ...this.state.currentTick,
                        seconds: getTwoDigitTime(parseInt(seconds) - 1)
                    }
                })
            },
            1000
        );
        this.minutesInterval = setInterval(
            () => {
                let { minutes } = this.state.currentTick;
                //console.log('minutes', minutes);
                if(minutes === "00") {
                    //console.log('test time elapsed');
                    this.state.submitAndCompleteTest();
                    clearInterval(this.secondsInterval);
                    clearInterval(this.minutesInterval);
                    return;
                }
                this.setState({
                    currentTick: {
                        ...this.state.currentTick,
                        minutes: getTwoDigitTime(parseInt(minutes) - 1),
                        seconds: 59
                    }
                })
            },
            60000
        );
    }

    componentWillUnmount = () => {
        clearInterval(this.secondsInterval);
        clearInterval(this.minutesInterval);
    }

    render = () => {
        let { currentTick } = this.state;
        return (
            <div>
                <span className="text-primary"> Time Remaining: </span><span className="font-weight-bold text-dark"> {currentTick.minutes}:{currentTick.seconds}</span><span className="text-primary"> minutes</span>
            </div>
        );
    }
}
export default TickComponent;