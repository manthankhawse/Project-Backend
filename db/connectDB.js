const mongoose = require('mongoose');

const connectDb = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);

        console.log("database connected");
        
    } catch (error) {
        console.log("error occured ", error)
        process.exit(1);
    }
}

module.exports = connectDb;