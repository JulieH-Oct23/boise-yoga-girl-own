import mongoose from 'mongoose';

const MeditationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  category: { type: String, required: false }, 
});

const Meditation = mongoose.model('Meditation', MeditationSchema);

export default Meditation;