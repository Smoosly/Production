const { USER, KIT, BREAST_TEST, BREAST_RESULT, HOME_FITTING, BRA_REVIEW, DELETED_USER, BRA_FIX } = require('../server/models');
const XLSX = require('xlsx');
const path = require('path');

const filename = path.join(__dirname + '/invoice_list.xlsx');
console.log(filename);
let workbook = XLSX.readFile(__dirname + '/invoice_list.xlsx');
let worksheet = workbook.Sheets['sheet1'];

let datas = [];
// 행의갯수만큼 반복 , 열의갯수만큼 알파벳추가
let i = 3;
while (true) {
  // console.log(worksheet['A' + i]);
  if (!worksheet['A' + i]) {
    break;
  }
  let obj = {
    invoice: worksheet['L' + i].w,
    PK_ID: worksheet['T' + i].w,
    name: worksheet['R' + i].w,
    phone: worksheet['P' + i].w,
    // postcode: worksheet['W' + i].w,
    // address: worksheet['X' + i].w,
    // message: worksheet['AC' + i].w,
  };
  // console.log(obj);
  datas.push(obj);
  i++;
}
console.log(datas);

for (const data of datas) {
  console.log(data);
  HOME_FITTING.update({ invoice: data.invoice }, { where: { PK_ID: data.PK_ID } })
    .then((result) => {
      console.log(result);
    })
    .catch(console.log);
}