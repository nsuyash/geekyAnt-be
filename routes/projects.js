const router = require('express').Router();
const Project = require('../models/models.projects');
const auth = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/authMiddleware');

router.get('/', auth, authorizeRoles('engineer', 'manager'), async (req, res) => {
  const projects = await Project.find().populate('managerId', 'name email');
  res.json(projects);
});

router.post('/', auth, authorizeRoles('manager'), async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
});

router.get('/:id', auth, authorizeRoles('engineer', 'manager'), async (req, res) => {
  const project = await Project.findById(req.params.id).populate('managerId', 'name email');
  if (!project) return res.status(404).json({ message: 'Project not found' });
  res.json(project);
});

router.delete('/:id', auth, authorizeRoles('manager'), async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


module.exports = router;
