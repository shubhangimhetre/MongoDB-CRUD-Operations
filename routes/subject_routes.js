const router=require('express').Router();
const subjects=require('../controllers/subjectcontroller');

router.get('/get_subject',subjects.get_subjects);

router.get('/get_subject/:rollno',subjects.get_subjects_byrollno);

router.get('/get_subject_byname/:name',subjects.get_subjects_byname);

router.get('/get_marks_bysubject/:name/:subject',subjects.get_marks_bysubjects);

router.post('/post_subject',subjects.post_subjects);

router.put('/update_subject/:rollno',subjects.update_subjects);

router.delete('/delete_subject/:rollno',subjects.delete_subjects);

module.exports=router;