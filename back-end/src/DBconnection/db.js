const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
let DBconnect = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB connection established');
    })
    .catch(err => console.log(err.message));
};

module.exports = DBconnect;
