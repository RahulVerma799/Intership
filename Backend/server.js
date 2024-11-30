const express=require('express');

const app=express();
const cors = require('cors');
app.use(cors());

require('dotenv').config();
const PORT=process.env.PORT || 4000

app.use(express.json());

//require("./config/Database").connect();
require("./config/Database")();


const user=require("./routes/user");
app.use('/api',user);

app.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`)
})