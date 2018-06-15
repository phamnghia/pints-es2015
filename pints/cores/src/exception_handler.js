const { AppLogger } = require("@pints/utils");
const AppException = require("./exception");

module.exports = class AppExceptionHandler{
	constructor(err){
		this.$error = this.parseError(err);
		this.writeLogFile = true;
	}

	parseError(err){
		if(!err.type){
			err = new AppException("UNDEFINED_EXCEPTION", err.message, err.stack);
		}
		return err;
	}

	withResponse(res){
		this.$res = res;
		return this;
	}

	writeLogFile(isWriteLog){
		this.isWriteLog = isWriteLog;
		return this;
	}

	handle(){
		AppLogger.error(
			`
			${this.$error.stack}
			---
			${JSON.stringify(this.$error.toObject())} | trace: ${this.$error.trace || ""}
			---
			`, 
			this.isWriteLog
		);

		if(this.$res) this.$res.json(this.$error.toObject());
	}
}