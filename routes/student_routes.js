const router=require('express').Router();
const students=require('../controllers/studentcontroller');

router.get('/get_student',students.get_student);

router.get('/get_student/:rollno',students.get_student_by_rollno);

router.post('/post_student',students.post_student);

router.put('/update_student/:rollno',students.update_student);

router.delete('/delete_student/:rollno',students.delete_student);

module.exports=router;