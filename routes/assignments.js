const router = require('express').Router();
const Assignment = require('../models/models.assignments');
const auth = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/authMiddleware');


router.get('/', auth, authorizeRoles('engineer', 'manager'), async (req, res) => {
  const assignments = await Assignment.find()
    .populate('engineerId', 'name email')
    .populate('projectId', 'name');
  res.json(assignments);
});

router.post('/', auth, authorizeRoles('manager'), async (req, res) => {
  const assignment = new Assignment(req.body);
  await assignment.save();
  res.status(201).json(assignment);
});

router.put('/:id', auth, authorizeRoles('engineer', 'manager'), async (req, res) => {
  const updated = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', auth, authorizeRoles('manager'), async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.json({ message: 'Assignment deleted' });
});

module.exports = router;
