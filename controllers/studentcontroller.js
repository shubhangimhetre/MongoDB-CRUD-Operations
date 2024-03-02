const mongoose = require("mongoose");
const student = require("../model/studentmodel.js");

function get_student() {
  return new Promise(async function (resolve, reject) {
    student
      .find()
      .then((data) => {
        if (data.length != 0) {
          return resolve(data);
        } else {
          return reject({ status: "Data Not Found" });
        }
      })
      .catch((err) => {
        return reject({ status: "Server Error" });
      });
  });
}

function get_student_by_rollno(rollNo) {
  return new Promise(async function (resolve, reject) {
    student
      .findOne({ rollNumber: rollNo })
      .then((data) => {
        if (data) {
          return resolve(data);
        } else {
          return reject({ status: "Student Not Found" });
        }
      })
      .catch((err) => {
        return reject({ status: "Server Error" });
      });
  });
}

function check_student_Exists(firstName, lastName, phoneNumber, email, rollNo) {
  return new Promise(async function (resolve, reject) {
    student.findOne({
        rollNumber: rollNo,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        email: email,
      })
      .then((result) => {
        if (result) {
          return reject({
            status: "student of given roll number is already present",
          });
        }
        return resolve();
      })

      .catch((e) => {
        return reject({ status: "Server Error" });
      });
  });
}

function post_student(firstName, lastName, phoneNumber, email, rollNumber) {
  return new Promise(async function (resolve, reject) {
    const student_data = new student({
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      email: email,
      rollNumber: rollNumber,
    });
    student_data
      .save()
      .then((data) => {
        return resolve({ status: "Success" });
      })
      .catch((err) => {
        return reject({ status: "Server Error" });
      });
  });
}

function update_student(studentId,firstName,lastName,phoneNumber,email,rollNo) {
  return new Promise(async function (resolve, reject) {
    student
      .updateOne(
        {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          email: email,
          rollNumber: rollNo,
        },
        {
          _id: studentId,
        }
      )
      .then((data) => {
        return resolve({ status: "Success" });
      })
      .catch((err) => {
        return reject({ status: "Server Error" });
      });
  });
}

function delete_student(rollNo) {
  return new Promise(async function (resolve, reject) {
    student
      .deleteOne({ rollNumber: rollNo })
      .then((data) => {
        return resolve({ status: "Success" });
      })
      .catch((err) => {
        return reject({ status: "Server Error" });
      });
  });
}

exports.post_student = post_student;
exports.get_student = get_student;
exports.get_student_by_rollno = get_student_by_rollno;
exports.check_student_Exists = check_student_Exists;
exports.update_student = update_student;
exports.delete_student = delete_student;
