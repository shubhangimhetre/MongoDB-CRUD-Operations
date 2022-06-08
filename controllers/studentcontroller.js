const mongoose = require('mongoose');
const student = require('../model/studentmodel.js');


exports.get_student = async (req, res) => {
    try {
        var students = await student.find();
        res.status(200).send(students);
    } catch (err) {
        res.status(400).send(err);
    }

}

exports.get_student_by_rollno = async (req, res) => {
    const rollNo = req.params.rollno;
    try {
        const student1 = await student.findOne({ rollNumber: rollNo });
        res.status(200).send(student1);
    } catch (err) {
        res.status(400).send(err);
    }
}

exports.post_student = async (req, res) => {
    const student_data = new student(req.body);
    try {
        const student1 = await student_data.save();
        res.status(200).send(student1);
    } catch (err) {
        res.status(400).send(err);
    }
}


exports.update_student = async (req, res) => {
    const rollNo = req.params.rollno;
    try {
        const student1 = await student.findOne({ rollNumber: rollNo });
        await student1.updateOne(req.body);
        const updatedstudent1 = await student.findOne({ rollNumber: rollNo });
        res.status(200).send(updatedstudent1);
    } catch (err) {
        res.status(400).send(err);
    }
}


exports.delete_student = async (req, res) => {
    const rollNo = req.params.rollno;
    try {
        const student1 = await student.findOne({ rollNumber: rollNo });
        if (!student1) return res.status(400).send('This roll number is not present.');

        student.deleteOne({ rollNumber: rollNo }, function (err) {
            if (err)  return res.status(400).send(err);
            res.status(200).send('deleted successfully');
        });

    } catch (err) {
        res.status(400).send(err);
    }

}
