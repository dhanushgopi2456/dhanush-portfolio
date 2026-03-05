const Achievement = require('../models/Achievement');

exports.getAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find().sort({ order: 1 });
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
