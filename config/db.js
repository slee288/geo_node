const mongoose = require("mongoose");

// Mongoose returns promises
// You can either use .then syntax, or async await format
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log(`MongoDB connected: ${conn.connection.host}`);

    } catch(err) {
        console.error(err);
        process.exit(1);  // Exit out of the app with a failure
    }
};

module.exports = connectDB;
