const mongoose=require('mongoose');
Schema = mongoose.Schema;

var subSchema = new Schema({
    english: { type: Number},
    maths: {type: Number},
    science: {type: Number},
    rollNumber: {type: Number,unique:true , ref:'student'}
});

module.exports=mongoose.model('subjects',subSchema);