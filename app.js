const express = require('express');
const connectDB = require('./db/connect')
const userRouter=require('./routes/userRouter')
const stateRouter=require('./routes/stateRouter')
const districtRouter=require('./routes/districtRouter')
const townRouter=require('./routes/townRoutes')
// const cookieParser= require("cookie-parser")


const app = express();
const port = process.env.PORT|| 5000

require('dotenv').config();


const cors = require('cors');

// app.enable('trust proxy');
app.use(cors(
    // {
    // origin: true, //included origin as true
    // credentials: true, }
))

// app.use(cookieParser());








app.use(express.json());

app.use(express.static('build'))  // frontend build!!!!!!

//app.get('/',(req, res) => {
//    res.send('Jai Sia Ram Jai Bajrangbali')

   
//})


app.use('/api/v1/users',userRouter)
app.use('/api/v1/states',stateRouter)
app.use('/api/v1/districts',districtRouter)
app.use('/api/v1/towns',townRouter)



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    }
    catch (error) {
        console.log(error)
    }
}

start();
