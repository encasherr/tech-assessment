class McqController {
    GetAllMcqs = (req, resp) => {
        console.log('get all mcqs called');
        resp.send('get all mcqs called');
    }

    AddMcq = (req, resp) => {
        console.log('Add Mcq called');
        resp.send('get all mcqs called');
    }

    UpdateMcq = (req, resp) => {
        console.log('get all mcqs called');
        resp.send('get all mcqs called');
    }

    DeleteMcq = (req, resp) => {
        console.log('get all mcqs called');
        resp.send('get all mcqs called');
    }
}

export default new McqController();