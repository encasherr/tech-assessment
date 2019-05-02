import db from '../../db';

class SkillController {
    GetAll = (req, resp) => {
        console.log('get all skills called');
        let skills = this.initializeCollection();
        console.log(skills.data.length);
        resp.send(skills.data);
    }

    Add = (req, resp) => {
        console.log('Add skill called');
        console.log(req.body);
        let skills = this.initializeCollection();
        skills.insert(req.body);
        db.saveDatabase();
        resp.send(JSON.stringify(req.body));
    }

    Delete = (req, resp) => {
        console.log('delete mcq called');
        resp.send('delete mcq called');
    }

    initializeCollection = () => {
        let skills = db.getCollection('skills');
        if(!skills) {
            skills = db.addCollection('skills');
        }
        return skills;
    }
}

export default new SkillController();