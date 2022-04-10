/*
============================================
; Title: nodebucket Sprint3
; Author: Professor Krasso
; Date: April 10, 2022
; Modified By: William Talley
; Description: nodebucket base-response.js
;===========================================
*/

//class for all error messages

class BaseResponse {
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }

  //toObject function will return an object with all the BaseResponse fields to go into the error message

  toObject() {
    return {
      'code': this.code,
      'msg': this.msg,
      'data': this.data,
      'timestamp': new Date().toLocaleDateString()
    }
  }
}

module.exports = BaseResponse;
