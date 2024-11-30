const mongoose=require('mongoose');

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{})
    .then(()=>console.log("DB is connected"))
    .catch((error)=>{
            console.log('issue in connecyion'),
            console.log(error),
            process.exit(1)
    })
}

module.exports=dbConnect;