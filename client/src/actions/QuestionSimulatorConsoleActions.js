import config from '../config';
import repository from '../repository';
import AuthHelper from '../AuthHelper';

export const LOAD_EXAM_SIMULATOR_SUCCESS = 'LOAD_EXAM_SIMULATOR_SUCCESS';

export const LoadExamSimulator = () => dispatch => {
    let userInfo = AuthHelper.GetUserInfo();
    let url = config.candidateApiUrl + 'startTest';
    let testModel = {
        testId: 1
    };
    repository.saveData(url, testModel)
            .then((res) => {
                console.log('exam simulator loaded', res);
                dispatch({
                    type: LOAD_EXAM_SIMULATOR_SUCCESS,
                    payload: res.data
                });
            })
}