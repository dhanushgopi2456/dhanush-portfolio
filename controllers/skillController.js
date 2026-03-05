const Skill = require('../models/Skill');

exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ order: 1 });
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
