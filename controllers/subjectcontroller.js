const mongoose = require("mongoose");
var subject = require("../model/subjectmodel.js");
var student = require("../model/studentmodel.js");

function get_subjects(query) {
  return new Promise(function (resolve, reject) {
    let myPromise
    if (Object.keys(query).length === 0 && query.constructor === Object){
      myPromise = new Promise((resolve,reject)=>{
        student
        .aggregate([
          {
            $lookup: {
              from: "subjects",
              localField: "rollNumber",
              foreignField: "rollNumber",
              as: "marks",
            },
          },
          {
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              rollNumber: 1,
              english: "$marks.english",
              maths: "$marks.maths",
              science: "$marks.science",
            },
          },
        ]).then((result) => {
          return resolve(result)
        })
        .catch((err) => {
          return reject({status:"Server Error"});
        });
      })
    } else if (query.by=="name" && query.value!=undefined){
      myPromise = new Promise((resolve, reject) => {
       student.aggregate([
          { $match: { name: query.value } },
          {
            $lookup: {
              from: "subjects",
              localField: "rollNumber",
              foreignField: "rollNumber",
              as: "marks",
            },
          },
          {
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              rollNumber: 1,
              english: "$marks.english",
              maths: "$marks.maths",
              science: "$marks.science",
            },
          },
        ]).then((result) => {
          return resolve(result)
        })
        .catch((err) => {
          return reject({status:"Server Error"});
        });

      });

    } else if (query.by=="rollNo" && query.value!=undefined){
      myPromise = new Promise((resolve, reject) => {
        student.aggregate([
          { $match: { rollNumber: Number(query.value) } },
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
              marks: { $arrayElemAt: ["$marks", 0] }
          }
        
          }
      ]).then((result) => {
        return resolve(result)
      })
      .catch((err) => {
        return reject({status:"Server Error"});
      });
    });
    }

    myPromise
      .then((result) => {
        return resolve(result)
      })
      .catch((err) => {
        return reject({status:"Server Error"});
      });
  });
}

function post_subjects(rollNo, english, maths,science) {
  return new Promise(async function (resolve, reject) {
 
    subject.findOne({ rollNumber: rollNo })
    .then((result) => {
        if (result){
            return subject.updateOne({
                english:english,
                maths:maths,
                science:science},
            { 
                rollNumber: rollNo
            });
        } else{
            return new subject({
                rollNumber: rollNo,
                english:english,
                maths:maths,
                science:science
             }).save();
        }
      })
      .then((result)=>{
        return resolve({status:"Success"})
      })
      .catch((e) => {
        return reject({status:"Server Error"});
      });

  });
}


function delete_subjects(rollNo) {
  return new Promise(async function (resolve, reject) {

    student.findOne({ rollNumber: rollNo })
    .then((result) => {
        if (!result){
            return reject({status:"student of given roll number is not present"})
        }
         return subject.deleteOne({ rollNumber: rollNo })
      })
      .then((result)=>{
        return resolve({status:"Success"})
      })
      .catch((e) => {
        return reject({status:"Server Error"});
      });

  });
}

exports.get_subjects = get_subjects;
exports.post_subjects = post_subjects;
exports.delete_subjects = delete_subjects;