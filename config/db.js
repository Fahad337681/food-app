const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Database ${mongoose.connection.host}`.bgCyan.white);
    } catch (error) {
        console.log('Error in DB connection', error);
    }
};

module.exports = connectDb;