const mongoose = require('mongoose');

const uri = 'mongodb+srv://kspm123:kspm123@cluster0.midb9uu.mongodb.net/kspm-website?retryWrites=true&w=majority';

mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  .then(() => {
    console.log('SUCCESS: MongoDB connected!');
    process.exit(0);
  })
  .catch(err => {
    console.error('FAILED:', err.message);
    process.exit(1);
  });
