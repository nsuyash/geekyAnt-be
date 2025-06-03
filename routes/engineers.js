const router = require('express').Router();
const User = require('../models/models.users');
const Assignment = require('../models/models.assignments');
const auth = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/authMiddleware');


router.get('/', auth, async (req, res) => {
  try {
    const engineers = await User.find({ role: 'engineer' }).select('-password');

    const result = await Promise.all(
      engineers.map(async (eng) => {
        const assignments = await Assignment.find({ engineerId: eng._id });
        const allocated = assignments.reduce((sum, a) => sum + a.allocationPercentage, 0);
        const remaining = eng.maxCapacity - allocated;

        return {
          ...eng.toObject(),
          allocated,
          remaining,
        };
      })
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

router.get('/:id/capacity', auth, authorizeRoles('manager'), async (req, res) => {
  const engineer = await User.findById(req.params.id);
  if (!engineer) return res.status(404).json({ message: 'Engineer not found' });

  const assignments = await Assignment.find({ engineerId: req.params.id });
  const totalAllocated = assignments.reduce((sum, a) => sum + a.allocationPercentage, 0);
  const remaining = engineer.maxCapacity - totalAllocated;

  res.json({ maxCapacity: engineer.maxCapacity, allocated: totalAllocated, remaining });
});

module.exports = router;
