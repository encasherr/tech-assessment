import axios from 'axios';
import RedirectFromAction from './actions/RedirectFromAction';

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
            if (configValues && configValues.site_url) return;

            
            // var apiUrl = this.isdevEnv() ? domain : '';
            let apiUrl = this.getApiHomeUrl()    
            let url = apiUrl + '/api/loadConfig';
            axios.get(url)
                .then((res) => {
                    console.log('config values', res.data);
                    configValues = res.data;
                    if (configValues) {
                        if (this.isdevEnv()) {
                            configValues.site_url = domain;
                        }
                        resolve(configValues);
                    }
                })
                .catch((err) => {
                    reject(err);
                    //window.location.href = "/userForbidden";
                    //alert('err');
                    //RedirectFromAction('userForbidden');
                });
        })
    }

    isdevEnv = () => {
        let locationHref = window.location.href;
        return (locationHref.indexOf('localhost:3000') > -1 ||
                locationHref.indexOf('localhost:3001') > -1);
    }

    getSiteTitle = () => {
        return configValues.site_title;
    }

    getSiteUrl = () => {
        // if(this.isdevEnv()) return domain;
        let locationHref = window.location.href;
        if(locationHref.indexOf('localhost:3000') > -1) return `http://localhost:3001`
        if(locationHref.indexOf('localhost:3001') > -1) return `http://localhost:3001`
        // return configValues.site_url;
        return locationHref;
    }

    getSiteHomeUrl = () => {
        let siteUrl = new URL(configValues.site_url);
        let sitePort = window.location.port 
        let host = `${siteUrl.protocol}//${siteUrl.hostname}:${sitePort}`
        console.log('site home', host)
        return `${host}/home`
    }

    getApiHomeUrl = () => {
        // let apiHomeUrl = this.getSiteUrl();
        // let locationHref = window.location.href;
        // if(locationHref.indexOf('localhost:3000') > -1) apiHomeUrl = `http://localhost:3001`;
        // if(locationHref.indexOf('localhost:3001') > -1) apiHomeUrl = `http://localhost:3001`;
        let apiPort = 3001
        let apiHomeUrl = `${window.location.protocol}//${window.location.hostname}:${apiPort}` 
        console.log('apiHomeUrl', apiHomeUrl);
        return apiHomeUrl;
    }

    getAdminApiUrl = () => {
        // let apiHomeUrl = this.getSiteUrl();
        // let locationHref = window.location.href;
        // if(locationHref.indexOf('localhost:3000') > -1) apiHomeUrl = `http://localhost:3001`;
        // if(locationHref.indexOf('localhost:3001') > -1) apiHomeUrl = `http://localhost:3001`;
        return this.getApiHomeUrl() + configValues.admin_api;
    }

    getCandidateApiUrl = () => {
        // return this.getSiteUrl() + configValues.candidate_api;
        return this.getApiHomeUrl() + configValues.candidate_api;
    }

    getValue = (key) => {
        return configValues[key];
    }

    OrderedAlphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    validHeaders = validHeaders;

    Grades = ['Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8','Grade 9','Grade 10','Grade 11','Grade 12',];

    TestVisibility = {
        InvitedCandidates: 'InvitedCandidates',
        Public: 'Public'
    }

    Roles = {
        Candidate: 'candidate',
        Teacher: 'teacher',
        Student: 'student'
    }
}
