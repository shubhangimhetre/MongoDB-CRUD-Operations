const router = require('express').Router();
const students = require('../controllers/studentcontroller');

router.get('/get_student', function (req, res, next) {

  students.get_student()
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((e) => {
      return res.status(400).json(e);
    });

});

router.get('/get_student/:rollno', function (req, res, next) {

  const rollNo = req.params.rollno;

  students.get_student_by_rollno(rollNo)
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((e) => {
      return res.status(400).json(e);
    });

});

router.post('/post_student', function (req, res, next) {

  let { firstName, lastName, phoneNumber, email, rollNumber } = req.body;
  students.check_student_Exists(firstName, lastName, phoneNumber, email, rollNumber)
    .then((result) => {
      if (result) {
        return res.status(400).json({ status: "Student Already Exists" });
      } else {
        return students.post_student(firstName, lastName, phoneNumber, email, rollNumber)
      }
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((e) => {
      return res.status(400).json(e);
    });
});


router.put('/update_student', function (req, res, next) {
  let { studentId, firstName, lastName, phoneNumber, email, rollNumber } = req.body;
  students.get_student_by_rollno(rollNumber)
    .then((result) => {
      if (!result) {
        return res.status(400).json({ status: "Student Not Found" });
      } else {
        return students.update_student(studentId, firstName, lastName, phoneNumber, email, rollNumber)
      }
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((e) => {
      return res.status(400).json(e);
    });
});


router.delete('/delete_student/:rollno', function (req, res, next) {
  const rollNo = req.params.rollno;

  students.get_student_by_rollno(rollNo)
    .then((result) => {
      if (!result) {
        return res.status(400).json({ status: "Student Not Found" });
      } else {
        return students.delete_student(rollNo)
      }
    })
    .then((result) => {
      return res.status(200).json(result);
    })
    .catch((e) => {
      return res.status(400).json(e);
    });
});


module.exports = router;