import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { getAbsolutePath } from '../../utils/general';
import Constants from '../../commons/Constants';

class MediaController {

    SubmitRecording = (req, resp) => {
        resp.status(200).send('ok');
        // console.log('submit recording called', req.files[0]);
        // let baseDir = 'C:\\Alok\\nodejs\\webapp\\tech-assessment\\uploads\\';
        // let responseId = req.body.responseId || '103';
        // let recordingFilePath = `${baseDir}${responseId}\\${req.files[0].filename}`;
        // console.log('req.body.responseId', req.body.responseId);
        // console.log('recordingFilePath', recordingFilePath);
        //fs.writeFile(recordingFilePath, req.files['video'].buffer, (err) => {
        /*fs.writeFile(req.files[0].originalname, req.files[0].buffer, (err) => {
            if (err) {
                console.log('Error uploading file: ', err);
                resp.status(500).send('An error occurred: ' + err.message);
            } else {
                resp.status(200).send('ok');
            }
        });*/
        // resp.status(200).send('success');
    }

    GetRecording = (req, resp) => {
        console.log('get recording called');
        let { responseId, fileName } = req.query;
        let baseDir = getAbsolutePath(Constants.Paths.recordingBaseDir);
        console.log('basedirectory', baseDir);
        let file = `${baseDir}\\${responseId}\\${fileName}`;
        console.log('blob file', file);
        resp.sendFile(file);
    }

    GetRecordingFileNames = (req, resp) => {
        console.log('get recording file names called');
        let { responseId } = req.query;
        let baseDir = getAbsolutePath(Constants.Paths.recordingBaseDir);
        let recordingDir = `${baseDir}\\${responseId}`;
        console.log('recordingdir', recordingDir);
        let filesInfo = [];
        if(fs.existsSync(recordingDir)) {
            let files = fs.readdirSync(recordingDir);
            if(files && files.length > 0) {
                files.forEach((file) => {
                    filesInfo.push(file);
                });
            }
        }
        resp.status(200).send(filesInfo);
    }
}
export default new MediaController();

