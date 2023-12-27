const app=require('express')();

const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const student_router=require('./routes/student_routes');
const subject_router=require('./routes/subject_routes');

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

mongoose.connect(process.env.db_connect,{useNewUrlParser:true})
.then(()=>console.log("Connected to database.."))
.catch((err)=>console.log(err));

app.use('/student',student_router);
app.use('/subject',subject_router);

app.listen(process.env.port,()=>console.log("Server is listening..")); 
