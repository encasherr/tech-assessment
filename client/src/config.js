import axios from 'axios';

var domain = 'http://localhost:3001';
//domain = '';
var domainUrl = 'http://localhost:3000';
var configValues = {};
const validHeaders = [
    { prop: "category", name: "Category" },
    { prop: "skill", name: "Skill" },
    { prop: "question", name: "Title" },
    { prop: "description", name: "Description" },
    { prop: "score", name: "Score" },
    { prop: "minimumExperience", name: "Min" },
    { prop: "maximumExperience", name: "Max" },
    { prop: "correctAnswer", name: "Answer" },
    { prop: "choiceA", name: "A" },
    { prop: "choiceB", name: "B" },
    { prop: "choiceC", name: "C" },
    { prop: "choiceD", name: "D" },
    { prop: "choiceE", name: "E" }
];

const techAssessment = 'Tech Assessment';
const hitech = 'Highness Admin';
const hitechConfig = {
    notifyEmailId: 'encasherr@gmail.com'
}

export default class config {
    static instance = config.instance || new config();

    initialize = () => {
        return new Promise((resolve, reject) => {
            if(configValues && configValues.site_url) return;
    
            var locationHref = window.location.href;
            var apiUrl = locationHref.indexOf('localhost:3000') > -1 ? domain : '';
            let url = apiUrl + '/api/loadConfig';
            axios.get(url)
                .then((res) => {
                    console.log('config values', res.data);
                    configValues = res.data;
                    if(configValues) {
                        if(locationHref.indexOf('localhost:3000') > -1) {
                            configValues.site_url = domain;
                        }
                        resolve(configValues);
                    }
                })
                .catch((err) => {
                    reject(err);  
                });
        })
    }

    getAdminApiUrl = () => {
        return configValues.site_url + configValues.admin_api;
    }

    getCandidateApiUrl = () => {
        return configValues.site_url + configValues.candidate_api;
    }

    getValue = (key) => {
        return configValues[key];
    }
    
    OrderedAlphabets = ['A','B','C','D','E','F','G','H','I','J'];

    validHeaders;
}
