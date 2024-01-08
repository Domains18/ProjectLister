const User = require('../models/user');
const Project = require('../models/project');


async function getProjects(req, res) {
    try {
        const projects = await Project.find({});
        projects.length > 0 ? res.status(200).json(projects) : [];
    } catch (e) {
        console.error(e);
    }
}


async function getProjectById(req, res) {
    try {
        const project = await Project.findById(req.params.id);
        project ? res.status(200).json(project) : res.status(404).json({message: 'Project not found'});
    } catch (e) {
        console.error(e);
    }
}


async function createProject(req, res) {
    const user = await User.findById(req.user._id);
    try {
        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            link: req.body.link,
            tags: req.body.tags,
            createdBy: req.user._id,
        });
        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (e) {
        console.error(e);
    }
}
