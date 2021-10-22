import React from 'react';
import { Typography } from '@material-ui/core';
import { getTwoDigitTime, wait } from '../../Utils';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import config from '../../config';
// import Webcam from 'react-webcam';

class RecordingComponent extends React.Component {
    secondsInterval = 0;
    minutesInterval = 0;

    constructor(props) {
        super(props);
        this.state = {
            // submitAndCompleteTest: props.onTimeElapse,
            // currentTick: {
            //     minutes: (props && props.minutes) ? getTwoDigitTime(props.minutes-1) : 89,
            //     seconds: 59
            // }
        }
    }

    componentDidMount = () => {
        this.onStartRecording(5000, this.props.responseId);
        setInterval(() => this.onStartRecording(6000, this.props.responseId), 7000);
        // this.onStartCapturingScreenshots(5000);
    }

    onStartCapturingScreenshots = (interval) => {
        setTimeout(() => this.takeScreenShot(this.props.responseId), interval);
    }

    componentWillUnmount = () => {
    }

    onStartRecording = (lengthInMS, responseId) => {
        if(!navigator.mediaDevices) {
            console.log('media disabled');
            return;            
        }
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
            .then(stream => {
                console.log('started recording');
                this.props.setDeviceAccess('granted');
                let options = { mimeType: "video/webm; codecs=vp9" };
                let recorder = new MediaRecorder(stream, options);
                let data = [];

                recorder.ondataavailable = event => data.push(event.data);
                recorder.start();
                console.log(recorder.state + " for " + (lengthInMS / 1000) + " seconds...");

                let stopped = new Promise((resolve, reject) => {
                    recorder.onstop = resolve;
                    recorder.onerror = event => reject(event.name);
                });

                let recorded = wait(lengthInMS).then(
                    () => recorder.state == "recording" && recorder.stop()
                );

                return Promise.all([
                    stopped,
                    recorded
                ])
                    .then(() => data);

            })
            .catch((ex) => {
                console.log('exception in getting media stream', ex);
                this.props.setDeviceAccess('denied');
            })
            .then(async recordedChunks => {
                if (recordedChunks && recordedChunks.length) {
                    let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
                    //let recordingSrc = URL.createObjectURL(recordedBlob);
                    // recording.src = URL.createObjectURL(recordedBlob);
                    // downloadButton.href = recording.src;
                    // downloadButton.download = "RecordedVideo.webm";

                    console.log("Successfully recorded " + recordedBlob.size + " bytes of " +
                        recordedBlob.type);

                    const requestConfig = {
                        headers: {
                            'Content-Type': 'multipart/form-data;'
                        }
                    };

                    try {
                        this.postToServer(recordedBlob, this.props.responseId);
                        /*
                        let formData = new FormData();
                        let url = config.instance.getCandidateApiUrl() + 'submitRecording';
                        //let url = 'http://localhost:3001/api/candidate/submitRecording';
                        let now = new Date();

                        let fileName = `${responseId}_${now.getDate()}_${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}`;
                        console.log('fileName', fileName);
                        formData.append(responseId, recordedBlob, fileName);
                        //formData.append('video', recordedBlob, fileName);
                        formData.append('responseId', responseId);


                        const res = await axios.post(url, formData, requestConfig);
                        */
                        console.log(`submitRecording complete`);
                    } catch (err) {
                        console.log(err);
                    }
                }
                else {
                    alert('Your exam may not be recorded without webcam. Please check with test taker.');
                }
            });
    }

    onStop = (stream) => {
        //stream.getTracks().forEach(track => track.stop());
        window.location.reload();
    }


    takeScreenShot = async () => {
        //const canIRun = navigator.mediaDevices.getDisplayMedia
        //if(!canIRun) return;

        const stream = navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: 'screen' },
        })
        // get correct video track
        const track = stream.getVideoTracks()[0]
        // init Image Capture and not Video stream
        const imageCapture = new ImageCapture(track)
        // take first frame only
        const bitmap = await imageCapture.grabFrame()
        // destory video track to prevent more recording / mem leak
        track.stop()

        const canvas = document.getElementById('fake')
        // this could be a document.createElement('canvas') if you want
        // draw weird image type to canvas so we can get a useful image
        canvas.width = bitmap.width
        canvas.height = bitmap.height
        const context = canvas.getContext('2d')
        context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height)
        const image = canvas.toDataURL()

        // this turns the base 64 string to a [File] object
        const res = await fetch(image)
        const buff = await res.arrayBuffer()
        // clone so we can rename, and put into array for easy proccessing
        const file = [
            new File([buff], `photo_${new Date()}.jpg`, {
                type: 'image/jpeg',
            }),
        ]
        // return file

        this.postToServer(file, this.props.responseId);
    }

    // const button = document.getElementById('cake').onclick = () => canIRun ? takeScreenShot() : {}

    postToServer = async (blob, responseId) => {
        try {
            
            const requestConfig = {
                headers: {
                    'Content-Type': 'multipart/form-data;'
                }
            };
            let formData = new FormData();
            let url = config.instance.getCandidateApiUrl() + 'submitRecording';
            //let url = 'http://localhost:3001/api/candidate/submitRecording';
            let now = new Date();

            let fileName = `${responseId}_${now.getDate()}_${now.getHours()}_${now.getMinutes()}_${now.getSeconds()}`;
            console.log('fileName', fileName);
            formData.append(responseId, blob, fileName);
            //formData.append('video', recordedBlob, fileName);
            formData.append('responseId', responseId);


            const res = await axios.post(url, formData, requestConfig);

            console.log(`submitRecording complete: ${res}`);
        } catch (err) {
            console.log(err);
        }
    }

    render = () => {
        return (
            <>
            <canvas id="fake"></canvas>
                {false && <div className="card bg-default">
                    <button className="btn btn-primary"
                        onClick={() => this.onStartRecording(15000)}>
                        Start
                </button>
                    <br />
                    <video id="preview" width="160" height="120" controls>
                        <source src="http://localhost:3001/api/candidate/getRecording"
                            type="video/webm" />
                    </video>
                    <button className="btn btn-primary"
                        onClick={() => this.onStop()}>
                        Stop
                </button>
                </div>}
            </>
        );
    }
}
/*
const SnapComponent = (props) => {
    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);

    return (
        <>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button onClick={capture}>Capture photo</button>
            {imgSrc && (
                <img
                    src={imgSrc}
                />
            )}
        </>
    );

}
const RecordingComponent = () => {
    const webcamRef = React.useRef(null);
    const recordedVideoRef = React.useRef(null);
    const mediaRecorderRef = React.useRef(null);
    const [capturing, setCapturing] = React.useState(false);
    const [recordedChunks, setRecordedChunks] = React.useState([]);
    const [recordeVideUrl, setrecordeVideUrl] = React.useState('');

    const handleStartCaptureClick = React.useCallback(() => {
        setCapturing(true);
        mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm"
        });
        mediaRecorderRef.current.addEventListener(
            "dataavailable",
            handleDataAvailable
        );
        mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = React.useCallback(
        ({ data }) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data));
            }
        },
        [setRecordedChunks]
    );

    const handleStopCaptureClick = React.useCallback(() => {
        mediaRecorderRef.current.stop();
        setCapturing(false);
    }, [mediaRecorderRef, webcamRef, setCapturing]);

    const handleDownload = React.useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "react-webcam-stream-capture.webm";
            // recordedVideoRef.src = url;
            setrecordeVideUrl(url);
            // a.click();
            // window.URL.revokeObjectURL(url);
            setRecordedChunks([]);
        }
    }, [recordedChunks]);

    const submitRecordingChunk = async () => {
        if (recordedChunks.length) {
            const recordedBlob = new Blob(recordedChunks, {
                type: "video/webm"
            });

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data;'
                }
            };

            try {
                let formData = new FormData();
                // let url = config.instance.getCandidateApiUrl() + 'submitRecording';
                let url = 'http://localhost:3001/api/candidate/submitRecording';
                formData.append('video', recordedBlob);


                const res = await axios.post(url, formData, config);

                console.log(`submitRecording complete: ${res}`);
            } catch (err) {
                console.log(err);
            }
        }
    }

    const stopWebcam = () => {
        navigator.getUserMedia({audio: true, video: true},
            function(stream) {
                 // can also use getAudioTracks() or getVideoTracks()
                // var track = stream.getTracks()[0];  // if only one media track
                // ...
                // track.stop();
                console.log('stopping webcam');
                stream.getTracks().forEach(function(track) {
                    console.log('stopping track');
                    track.stop();
                });
            },
            function(error){
                console.log('getUserMedia() error', error);
            });
    }

    return (
        <>
            <Webcam audio={false} ref={webcamRef} />
            {capturing ? (
                <button onClick={handleStopCaptureClick}>Stop Capture</button>
            ) : (
                    <button onClick={handleStartCaptureClick}>Start Capture</button>
                )}
            {recordedChunks.length > 0 && (
                <button onClick={submitRecordingChunk}>Submit Recording</button>
            )}
                <button onClick={stopWebcam}>Stop Webcam</button>
        </>
    );
};
*/
export {
    // SnapComponent,
    RecordingComponent
};
