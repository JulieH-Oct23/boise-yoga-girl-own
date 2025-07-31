import express from 'express';
import Meditation from '../models/Meditations.js'; // Make sure this is correct path and model

const router = express.Router();

// GET all meditations
router.get('/', async (req, res) => {
  try {
    const meditations = await Meditation.find({});
    res.json(meditations);
  } catch (error) {
    console.error('Error fetching meditations:', error);
    res.status(500).json({ error: 'Failed to fetch meditations' });
  }
});

// POST new meditation (you already have this)
router.post('/', async (req, res) => {
  try {
    const { name, text, category } = req.body;
    const newMeditation = new Meditation({ name, text, category });
    await newMeditation.save();
    res.status(201).json(newMeditation);
  } catch (error) {
    console.error('Error saving meditation:', error);
    res.status(500).json({ error: 'Failed to save meditation' });
  }
});

export default router;