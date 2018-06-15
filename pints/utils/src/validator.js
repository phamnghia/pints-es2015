const libValidator = require("validator");

/**
 * Lớp kiểm tra và xác thực input của người dùng
 * 
 * import Validator from "./core/classes/Validator";
 * let body = {name : "Pham Dai Nghia"}; 
 * let validator = new Validator(); 
 * validator.ensure("name", body.name, [
 * 	["Length", {min: 10, max: 20}, "String length error"],
 * 	["Required", null, "Required"],
 * ]); 
 * console.log(validator.isValid(), validator.getErrors());
 * 
 * @export Validator
 * @class Validator
 */
module.exports = class Validator{
	constructor(){
		this.errors = {};
	}
	
	/**
	 * Kiểm tra giá trị của fieldName có bị lỗi hay không
	 * 
	 * @param {any} fieldName 
	 * @param {any} validateValue 
	 * @param {any} rules 
	 * 
	 * @memberOf Validator
	 */
	ensure(fieldName, validateValue, rules) {
		let errs = [];

		for(let rule of rules){
			let message = rule[rule.length - 1];
			let valid = true;

			try { //Do thư viện validator chỉ hỗ trợ kiểm tra String do đó cần try catch trong trường hợp dữ liệu null

				let args = rule[1] ? rule[1] : {};
				if(rule[0] instanceof Function){
					valid = rule[0](validateValue, args);
				} else {
					valid = libValidator["is" + rule[0]](validateValue, args);
				}

			} catch(validateError){
				let isNull = (validateValue === null || validateValue === undefined || validateValue.length == 0) ? true : false;

				if(isNull){
					if(rule[0] === "Required"){
						errs = [message];
						break;
					} else {
						throw new Error("Validate rule error: " + validateError.message)
						// errs.push(message)
					}
				}
			}
			

			/**
			 * Nếu có kiểm tra "Required" và dữ liêu không hợp lệ -> return lỗi dữ liệu trống
			 * mà không cần kiểm tra các rule type khác nữa
			 */
			if(!valid){
				if(rule[0] === "Required"){
					errs = [message];
					break;
				}else {
					errs.push(message)
				}
			}
		}

		//Push vào object lưu thông tin lỗi nếu có lỗi
		if(errs.length > 0 ) {
			this.errors[fieldName] = this.errors[fieldName] ? 
																	this.errors[fieldName].concat(errs) : 
																	errs;
		}
	}

	/**
	 * Check rules defined in AppValidateRule(@pints/utils/AppValidateRule);
	 *
	 * @param {*} validateRule
	 */
	check(validateRule){
		this.ensure(validateRule.name, validateRule.fieldValue, validateRule.rules)
	}

	/**
	 * Kiểm tra lỗi hay không lỗi
	 * 
	 * @returns boolean
	 * 
	 * @memberOf Validator
	 */
	isValid(){
		return Object.keys(this.errors).length == 0 ? true : false;
	}

	/**
	 * Lấy message lỗi đầu tiên của toàn bộ validate object 
	 * 
	 * @returns String
	 * 
	 * @memberOf Validator
	 */
	getError() {
		return Object.keys(this.errors).length > 0 
							? this.errors[Object.keys(this.errors)[0]][0] 
							: null;
	}

	/**
	 * Trả về toàn bộ lỗi và mã lỗi của validate object
	 * 
	 * @returns Object
	 * 
	 * @memberOf Validator
	 */
	getErrors() {
		return Object.keys(this.errors).length > 0 ? this.errors : null;
	}
}