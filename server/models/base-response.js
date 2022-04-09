/*
Author: Professor Krasso
Modified by: William Talley
Date: April 7, 2022
Title: base-response.js
Description: creating a response class to streamline error messaging in the APIs
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
