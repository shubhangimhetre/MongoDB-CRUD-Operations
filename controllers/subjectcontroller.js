const mongoose = require('mongoose');
var subject = require('../model/subjectmodel.js');
var student = require('../model/studentmodel.js');

exports.get_subjects = async (req, res) => {
    try {
        const subject1 = await student.aggregate([{
            $lookup: {
                from: "subjects",
                localField: "rollNumber",
                foreignField: "rollNumber",
                as: "marks"
            }
        }, {
            $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                rollNumber: 1,
                english: "$marks.english",

                maths: "$marks.maths",
                science: "$marks.science"
            }
        }
        ])
        res.status(200).send(subject1)
    } catch (err) { res.status(400).send(err); }

}



exports.get_subjects_byrollno = async (req, res) => {
    const rollNo = req.params.rollno;
    try {
        const student1 = await student.findOne({ rollNumber: rollNo });
        if (!student1) return res.status(400).send('The student of given roll number is not present');
        try {
            const subject1 = await student.aggregate([
                { $match: { rollNumber: Number(req.params.rollno) } },
                {
                    $lookup: {
                        from: "subjects",
                        localField: "rollNumber",
                        foreignField: "rollNumber",
                        as: "marks",
                    },
                }, {
                    $project: {
                        _id: 1,
                        firstName: 1,
                        lastName: 1,
                        rollNumber: 1,
                        english: "$marks.english",
                        maths: "$marks.maths",
                        science: "$marks.science"
                    }
                }
            ])
            res.status(200).send(subject1);
        } catch (err) {
            res.status(400).send(err);
        }

    } catch (err) { res.status(400).send(err); }
}


exports.get_subjects_byname = async (req, res) => {

    var student1 = await student.find({ firstName: req.params.name });
    if (!student1) return res.status(400).send('The student of given roll number is not present');

    try {
        var student1 = await student.find({ firstName: req.params.name })
        console.log(student1)
        console.log(student1[0]["rollNumber"])
        const subject1 = await student.aggregate([
            { $match: { rollNumber: Number(student1[0]["rollNumber"]) } },
            {
                $lookup: {
                    from: "subjects",
                    localField: "rollNumber",
                    foreignField: "rollNumber",
                    as: "marks",
                },
            }, {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    rollNumber: 1,
                    english: "$marks.english",
                    maths: "$marks.maths",
                    science: "$marks.science"
                }
            }
        ])
        res.status(200).send(subject1);
    } catch (err) {
        res.status(400).send(err);
    }

}

exports.get_marks_bysubjects = async (req, res) => {
    var student1 = await student.find({ firstName: req.params.name });
    if (!student1) return res.status(400).send('The student of given roll number is not present');
    try {
        var sub = req.params.subject;
        const subject1 = await student.aggregate([
            { $match: { rollNumber: Number(student1[0]["rollNumber"]) } },
            {
                $lookup: {
                    from: "subjects",
                    localField: "rollNumber",
                    foreignField: "rollNumber",
                    as: "marks",
                },
            }, {
                $project: {
                    _id: 1,
                    firstName: 1,
                    lastName: 1,
                    rollNumber: 1,
                    subject: {
                        marks: `$marks.${sub}`
                    }
                }
            }
        ])
        res.status(200).send(subject1);
    } catch (err) {
        res.status(400).send(err);
    }
}





exports.post_subjects = async (req, res) => {
    const subject_data = new subject(req.body);
    try {
        const student1 = await student.findOne({ rollNumber: req.body.rollNumber });
        if (!student1) return res.status(400).send('The student of given roll number is not present');
        const subject1 = await subject_data.save();
        res.status(200).send(subject1);
    } catch (err) { res.status(400).send(err); }
}


exports.update_subjects = async (req, res) => {
    const rollNo = req.params.rollno;
    try {
        const student1 = await student.findOne({ rollNumber: rollNo });
        if (!student1) return res.status(400).send('The student of given roll number is not present');
        const subject1 = await subject.findOne({ rollNumber: rollNo });

        const update = req.body;
        await subject1.update(update);

        const updatedsubject1 = await subject.findOne({ rollNumber: rollNo });
        res.status(200).send(updatedsubject1);

    } catch (err) { res.status(400).send(err); }

}


exports.delete_subjects = async (req, res) => {
    const rollNo = req.params.rollno;

    try {
        const subject1 = await subject.findOne({ rollNumber: rollNo });
        if (!subject1) return res.status(400).send('The student of given roll number is not present');

        subject.deleteOne({ rollNumber: rollNo }, function (err) {
            if (err) res.status(400).send(err);
            res.status(200).send('deleted successfully');
        });

    } catch (err) { res.status(400).send(err); }
}