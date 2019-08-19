var domain = 'http://localhost:3001';
//domain = '';
var domainUrl = 'http://localhost:3000';
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

export default {
    adminApiUrl: domain + '/api/admin/',
    candidateApiUrl: domain + '/api/candidate/',
    domainUrl: domainUrl,
    minBulkCount: 1,
    maxBulkCount: 30,
    validHeaders
}