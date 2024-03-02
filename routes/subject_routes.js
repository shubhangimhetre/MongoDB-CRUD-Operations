const router=require('express').Router();
const subjects=require('../controllers/subjectcontroller');

router.get('/get_subject',function (req, res, next) {
    subjects.get_subjects(req.query)
    .then((result) => {
      if (result) {
        return res.status(200).json(result);
      } else{
        return res.status(400).json({status:"Data Not Found"});
      }
      })
      .catch((e) => {
        return res.status(400).json(e);
      });
});

router.post('/post_subject',function (req, res, next) {

    const {rollNo, english, maths, science } = req.body;

    subjects.post_subjects(rollNo, english, maths,science)
    .then((result) => {
        return res.status(200).json(result);
      })
      .catch((e) => {
        return res.status(400).json(e);
      });
});

router.delete('/delete_subject/:rollno',function (req, res, next) {
    const rollNo = req.params.rollno;

    subjects.delete_subjects(rollNo)
    .then((result) => {
        return res.status(200).json(result);
      })
      .catch((e) => {
        return res.status(400).json(e);
      });

});

module.exports=router;