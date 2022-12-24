class ResponseAPI {
  constructor(statusCode, data) {
    this.statusCode = statusCode;
    this.data = data;
  }
  getStatusCode() {
    return this.statusCode;
  }
  getData() {
    return this.data;
  }
}

exports.ResponseAPI = ResponseAPI;
