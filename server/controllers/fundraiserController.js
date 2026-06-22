const Fundraiser = require('../models/Fundraiser');

exports.createFundraiser = async (req, res) => {
  const { name, target, groupId } = req.body;

  if (!name || !target || !groupId) {
    return res.status(400).json({ message: 'Missing required fields: name, target, groupId' });
  }

  try {
    const fundraiser = await Fundraiser.create({ name, target, groupId });
    res.status(201).json(fundraiser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllFundraisers = async (req, res) => {
  try {
    const fundraisers = await Fundraiser.find().populate('groupId', 'name target');
    res.json(fundraisers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFundraiserById = async (req, res) => {
  try {
    const fundraiser = await Fundraiser.findById(req.params.id).populate('groupId', 'name target');
    if (!fundraiser) {
      return res.status(404).json({ message: 'Fundraiser not found' });
    }
    res.json(fundraiser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFundraiser = async (req, res) => {
  try {
    const fundraiser = await Fundraiser.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('groupId', 'name target');

    if (!fundraiser) {
      return res.status(404).json({ message: 'Fundraiser not found' });
    }
    res.json(fundraiser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



