const AppException = require("./exception");
const AppLang = require("./language");

class AppResponse{
	static success(message, data){
		message = message ? message : AppLang("DEFAULT_SUCCESS");
		return { code : 0, message, data };
	}

	static error(exception_code, message){
		let exception = new AppException(exception_code);
		return exception.toObject();
	}
}

module.exports = AppResponse;