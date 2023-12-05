const express = require('express');
const dotenv = require('dotenv');
const app = express();
const userRoutes = require('./routes/userRoutes')
const dataRoutes = require('./routes/dataRoutes')
const alertRoutes = require('./routes/alertRoutes');
const cookieParser = require("cookie-parser");
const connectDb = require('./db/connectDB');

dotenv.config();
connectDb();

app.use(express.json());
app.use(express.urlencoded({extended : true}));



app.use("/api/auth/users" , userRoutes);
app.use("/api/data" , dataRoutes);
app.use("/api/alert" , alertRoutes)

app.listen(3000, ()=>{
    console.log("server started at 3000");
})

