const mongoose=require('mongoose');
Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: { type: String, trim: true, required: true },
    lastName: {type: String, trim: true, required: true},
    phoneNumber : {type: Number, unique: true},
    email: { type: String, unique: true, lowercase: true, trim: true },
    rollNumber: {type: Number,unique:true}
});

module.exports=mongoose.model('students',userSchema);

